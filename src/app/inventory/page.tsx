"use client";

import AuthRoleCheck from "@/components/Auth";
import AppLayout from "@/components/layouts/AppLayout";
import Modal from "@/components/modal";
import Button from "@/components/subcomponents/button";
import Input from "@/components/subcomponents/input";
import { Table } from "@/components/table";
import { Dispatch, RootState } from "@/data";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UserRole } from "../api/types/user";
import { GasTypes, GasTypesValues } from "@/constants/common";
import Select from "@/components/subcomponents/select";
import styled from "styled-components";

// Styled components

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #e8ebe9;
  padding: 2rem;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #aaa;
  text-align: center;
`;

const StockCard = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  width: 100%;
  max-width: 900px;
  text-align: center;
  justify-content: center;
  margin: auto;
`;

const StockTable = styled.table`
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
  margin-bottom: 2rem;
  th,
  td {
    padding: 1rem;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }
  tr:nth-child(even) {
    background-color: #f9fafb;
  }
  tr:hover {
    background-color: #f1f5f9;
  }
`;

const TableTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #aaa;
  text-align: center;
  margin-top: 2rem;
`;

const AddButton = styled(Button)`
  background-color: #ffa500;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ff8c00;
  }
`;

const AddInventoryModal = styled(Modal)`
  max-width: 500px;
  width: 100%;
  padding: 2rem;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const ContentWrapper = styled.div`
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Inventory = () => {
  const dispatch = useDispatch<Dispatch>();
  const { currentStock, history = [] } = useSelector(
    (state: RootState) => state.inventory
  );

  useEffect(() => {
    dispatch.inventory.fetchInventory();
  }, []);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: GasTypes.TWO_KG,
    quantity: 0,
    dateAdded: moment().format("YYYY-MM-YY"),
  });
  const [formErrors, setFormErrors] = useState({
    type: "",
    quantity: "",
    dateAdded: "",
  });

  const handleAddInventory = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setFormData({
      type: GasTypes.TWO_KG,
      quantity: 0,
      dateAdded: moment().format("YYYY-MM-YY"),
    });
    setFormErrors({ type: "", quantity: "", dateAdded: "" });
    setIsPopupOpen(false);
  };

  const handleChangeField = (field: string, val: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "quantity" ? parseInt(val) : val,
    }));
  };

  const validateForm = () => {
    const errors = { type: GasTypes.TWO_KG, quantity: "", dateAdded: "" };
    let isValid = true;

    if (
      !formData.quantity ||
      isNaN(Number(formData.quantity)) ||
      Number(formData.quantity) <= 0
    ) {
      errors.quantity = "Please enter a valid quantity";
      isValid = false;
    }

    if (!formData.dateAdded) {
      errors.dateAdded = "Please select a valid date";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const data = await dispatch.inventory.createInventory(formData);

      toast.success(data?.message || "Inventory has been updated successfully");
      dispatch.inventory.fetchInventory();

      handleClosePopup();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Unknown error occurred!");
      console.log("Create inventory failed:", error);
    } finally {
      setIsLoading(false);
    }

    handleClosePopup();
  };

  const columns = [
    {
      key: "dateAdded",
      label: "Date Added",
      render: (inv: any) => moment(inv.dateAdded).format("YYYY-MM-DD"),
    },
    {
      key: "type",
      label: "Type",
      render: ({ type: key }: { type: string }) => (GasTypesValues as any)[key],
    },
    { key: "quantity", label: "Quantity" },
  ];

  return (
    <AppLayout>
      <PageWrapper>
        <Title>Inventory Management</Title>

        {/* Current Stock Card */}
        <StockCard>
          <h2 className="text-lg font-bold text-gray-700 dark:text-gray-100">
            Current Gas Cylinders Stock
          </h2>
          {currentStock && (
            <StockTable>
              <tbody>
                {Object.entries(currentStock).map((item, idx) => (
                  <tr key={idx}>
                    <td>{(GasTypesValues as any)[item[0]]} Cylinders</td>
                    <td>{item[1]}</td>
                  </tr>
                ))}
              </tbody>
            </StockTable>
          )}
          <AddButton text="Add Inventory" onClick={handleAddInventory} />
        </StockCard>

        {/* Inventory History */}
        <TableTitle>Inventory History</TableTitle>
        <Table columns={columns} data={history} />

        {/* Add Inventory Popup */}
        <AddInventoryModal isOpen={isPopupOpen} onClose={handleClosePopup}>
          <Modal.Header>
            <ModalTitle>Add Inventory</ModalTitle>
          </Modal.Header>
          <Modal.Content>
            <ContentWrapper>
              <Select
                error={formErrors.type}
                options={Object.entries(GasTypes).map((item) => ({
                  label: item[1],
                  value: item[0],
                }))}
                value={formData.type}
                label="Type"
                onChange={handleChangeField.bind(null, "type")}
              />
            </ContentWrapper>
            <ContentWrapper>
              <Input
                id=""
                type="number"
                error={formErrors.quantity}
                min={0}
                value={formData.quantity}
                label="Quantity"
                onChange={handleChangeField.bind(null, "quantity")}
              />
            </ContentWrapper>
          </Modal.Content>
          <Modal.Footer>
            <ModalFooter>
              <Button
                color="secondary"
                text="Cancel"
                onClick={handleClosePopup}
              />
              <Button
                isLoading={isLoading}
                text="Submit"
                onClick={handleSubmit}
              />
            </ModalFooter>
          </Modal.Footer>
        </AddInventoryModal>
      </PageWrapper>
    </AppLayout>
  );
};

export default AuthRoleCheck(Inventory, { roles: [UserRole.ADMIN] });
