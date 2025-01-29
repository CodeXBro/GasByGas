"use client";

import { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
import AppLayout from "@/components/layouts/AppLayout";
import Modal from "@/components/modal";
import Button from "@/components/subcomponents/button";
import Input from "@/components/subcomponents/input";
import Select from "@/components/subcomponents/select";
import { Table } from "@/components/table";
import TimelineView from "@/components/Timeline";
import StatusLabel from "@/components/status";
import AuthRoleCheck from "@/components/Auth";
import { Dispatch, RootState } from "@/data";
import { UserRole } from "../api/types/user";
import { DeliveryStatus } from "../api/types/deliveries";
import { IRequestItem } from "../api/models/deliveries.model";
import useUser from "@/hooks/useUser";
import { GasTypes, GasTypesValues } from "@/constants/common";

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #e8e9eb;
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333333;
`;

const ButtonContainer = styled.div`
  margin: 0.5rem 0;
`;

const FormWrapper = styled.div`
  max-width: 40rem;
  background-color: #ffffff;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1rem;
`;

const ItemList = styled.div`
  margin-top: 1rem;
  background-color: #ffffff;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
  &:hover {
    background-color: #dcdcdc;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: #666666;
  margin-top: 1rem;
`;

// Component Implementation
function Deliveries() {
  const dispatch = useDispatch<Dispatch>();
  const { user, isOutletManager, isAdmin } = useUser();
  const deliveries = useSelector((state: RootState) => state.deliveries.list);

  const [currentDelivery, setCurrentDelivery] = useState<{
    id: string;
    item: any;
    action: "timeline";
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [item, setItem] = useState<IRequestItem>({
    type: GasTypes.TWO_KG,
    quantity: 1,
  });
  const [formData, setFormData] = useState<{ items: IRequestItem[] }>({
    items: [],
  });

  const columns = useMemo(
    () => [
      {
        key: "outlet",
        label: "Outlet",
        render: (delivery: any) => {
          const outlet = delivery.outlet;
          return outlet ? `${outlet.name}/${outlet.district}` : "No Outlet";
        },
      },
      {
        key: "order",
        label: "Order Items",
        render: (delivery: any) => {
          return delivery.items && Array.isArray(delivery.items)
            ? delivery.items.map((d: any) => (
                <div key={d.type}>
                  {(GasTypesValues as any)[d.type]}: {d.quantity}
                </div>
              ))
            : "No Items";
        },
      },
      {
        key: "lastUpdatedAt",
        label: "Last Updated At",
        render: (delivery: any) =>
          moment(delivery.updatedAt).format("YYYY-MM-DD HH:MM") || "N/A",
      },
      {
        key: "status",
        label: "Status",
        render: (request: any) => <StatusLabel status={request.status} />,
      },
    ],
    []
  );

  useEffect(() => {
    dispatch.outlets.fetchOutlets();
    dispatch.deliveries.fetchDeliveries();
  }, [dispatch]);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => {
    setItem({ quantity: 1, type: GasTypes.TWO_KG });
    setIsPopupOpen(false);
  };

  const handleChangeField = (field: string, val: any) => {
    setItem((prev) => ({
      ...prev,
      [field]: field === "quantity" ? parseInt(val) : val,
    }));
  };

  const validateForm = () => formData.items.length > 0;

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const data = await dispatch.deliveries.createDelivery({
        items: formData.items,
      });
      toast.success(data?.message || "Delivery scheduled successfully");
      dispatch.deliveries.fetchDeliveries();
      handleClosePopup();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Unknown error occurred!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (status: DeliveryStatus, item: any) => {
    try {
      const data = await dispatch.deliveries.confirmDelivery({
        _id: item._id,
        status,
      });
      toast.success(data?.message || "Delivery updated successfully");
      dispatch.deliveries.fetchDeliveries();
      handleClosePopup();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Unknown error occurred!");
    }
  };

  const handleViewTimeline = (item: any) =>
    setCurrentDelivery({ id: item._id, item, action: "timeline" });

  const actions = useMemo(() => {
    const baseActions = [
      { label: "View Timeline", onClick: handleViewTimeline },
    ];

    if (isAdmin) {
      return [
        ...baseActions,
        {
          label: "Confirm",
          onClick: handleUpdateStatus.bind(null, DeliveryStatus.CONFIRMED),
          condition: (item: any) => item.status === DeliveryStatus.PLACED,
        },
        {
          label: "Make Ready",
          onClick: handleUpdateStatus.bind(null, DeliveryStatus.READY),
          condition: (item: any) => item.status === DeliveryStatus.CONFIRMED,
        },
        {
          label: "Dispatch",
          onClick: handleUpdateStatus.bind(null, DeliveryStatus.DISPATCHED),
          condition: (item: any) => item.status === DeliveryStatus.READY,
        },
        {
          label: "Cancel",
          onClick: handleUpdateStatus.bind(null, DeliveryStatus.CANCELLED),
          condition: (item: any) => item.status === DeliveryStatus.PLACED,
        },
      ];
    } else if (isOutletManager) {
      return [
        ...baseActions,
        {
          label: "Confirm Arrival",
          onClick: handleUpdateStatus.bind(null, DeliveryStatus.ARRIVED),
          condition: (item: any) => item.status === DeliveryStatus.DISPATCHED,
        },
        {
          label: "Cancel",
          onClick: handleUpdateStatus.bind(null, DeliveryStatus.CANCELLED),
          condition: (item: any) => item.status === DeliveryStatus.PLACED,
        },
      ];
    }

    return baseActions;
  }, [isAdmin, isOutletManager]);

  const onAddItem = () => {
    if (item?.type && item?.quantity) {
      setFormData((prev) => {
        const existingItemIndex = prev.items.findIndex(
          (i) => i.type === item.type
        );
        if (existingItemIndex !== -1) {
          return {
            ...prev,
            items: prev.items.map((i, index) =>
              index === existingItemIndex
                ? { ...i, quantity: item.quantity }
                : i
            ),
          };
        } else {
          return { ...prev, items: [...prev.items, item] };
        }
      });
    }
  };

  const onRemoveItem = (type: GasTypes) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.type !== type),
    }));
  };

  return (
    <AppLayout>
      <PageContainer>
        <Title>Delivery Requests</Title>
        {isOutletManager && (
          <ButtonContainer>
            <Button text="Request Delivery" onClick={handleOpenPopup} />
          </ButtonContainer>
        )}

        <Table columns={columns} data={deliveries} actions={actions} />

        <Modal isOpen={isPopupOpen} onClose={handleClosePopup}>
          <Modal.Header>Request Delivery</Modal.Header>
          <Modal.Content>
            <FormWrapper>
              <FormRow>
                <Select
                  options={Object.keys(GasTypes).map((key) => ({
                    label: (GasTypesValues as any)[key],
                    value: key,
                  }))}
                  value={item.type}
                  label="Type"
                  onChange={handleChangeField.bind(null, "type")}
                />
                <Input
                  label="Quantity"
                  type="number"
                  min={0}
                  value={item.quantity}
                  onChange={handleChangeField.bind(null, "quantity")}
                />
                <Button onClick={onAddItem} text="Add" />
              </FormRow>

              <ItemList>
                {formData.items.length ? (
                  formData.items.map((item) => (
                    <ItemRow key={item.type}>
                      <div>
                        <div>{(GasTypesValues as any)[item.type]}</div>
                        <div>Quantity: {item.quantity}</div>
                      </div>
                      <Button
                        text="Remove"
                        onClick={onRemoveItem.bind(null, item.type)}
                        className="bg-red-500 hover:bg-red-600"
                      />
                    </ItemRow>
                  ))
                ) : (
                  <EmptyState>Please add request items.</EmptyState>
                )}
              </ItemList>
            </FormWrapper>
          </Modal.Content>
          <Modal.Footer>
            <Button
              text="Submit"
              isLoading={isLoading}
              onClick={handleSubmit}
            />
            <Button
              text="Cancel"
              color="secondary"
              onClick={handleClosePopup}
            />
          </Modal.Footer>
        </Modal>

        {currentDelivery && currentDelivery.action === "timeline" && (
          <TimelineView
            events={currentDelivery.item.timelines}
            onClose={() => setCurrentDelivery(null)}
          />
        )}
      </PageContainer>
    </AppLayout>
  );
}

export default AuthRoleCheck(Deliveries, {
  roles: [UserRole.ADMIN, UserRole.OUTLET_MANAGER],
});
