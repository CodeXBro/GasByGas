"use client";

import AppLayout from "@/components/layouts/AppLayout";
import Modal from "@/components/modal";
import Button from "@/components/subcomponents/button";
import Select from "@/components/subcomponents/select";
import { Table } from "@/components/table";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AreasList from "../../../public/areas.json";
import Input from "@/components/subcomponents/input";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/data";
import { toast } from "react-toastify";
import ViewOutlet from "@/components/outlets/ViewOutlet";
import AuthRoleCheck from "@/components/Auth";
import { UserRole } from "../api/types/user";

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: #e8e9eb;
  padding: 2rem;
`;

const Header = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;

  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

const FooterButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5rem;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 10px;
`;

const DistrictsList = Object.keys(AreasList).map((d) => ({
  label: d,
  value: d,
}));

const CitiesList = (district: string) =>
  ((AreasList as any)[district]?.cities || []).map((c: string) => ({
    label: c,
    value: c,
  }));

function Outlets() {
  const dispatch = useDispatch<Dispatch>();
  const outlets = useSelector((state: RootState) => state.outlets.list);

  useEffect(() => {
    dispatch.outlets.fetchOutlets();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [currentOutlet, setCurrentOutlet] = useState<{
    id: string;
    action: "view";
  } | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    district: "",
    city: "",
    name: "",
    address: "",
    managerName: "",
    managerEmail: "",
    managerPhoneNumber: "",
  });

  const [formErrors, setFormErrors] = useState({
    district: "",
    city: "",
    name: "",
    address: "",
    managerName: "",
    managerEmail: "",
    managerPhoneNumber: "",
  });

  const columns = [
    { key: "name", label: "Name" },
    { key: "district", label: "District" },
    { key: "city", label: "City" },
    { key: "address", label: "Address" },
    { key: "managerName", label: "Manager" },
    { key: "managerEmail", label: "Email" },
    { key: "managerPhoneNumber", label: "Phone" },
  ];

  const handleOpenPopup = () => setIsPopupOpen(true);

  const handleClosePopup = () => {
    setFormData({
      district: "",
      city: "",
      name: "",
      address: "",
      managerName: "",
      managerEmail: "",
      managerPhoneNumber: "",
    });
    setFormErrors({
      district: "",
      city: "",
      name: "",
      address: "",
      managerName: "",
      managerEmail: "",
      managerPhoneNumber: "",
    });
    setIsPopupOpen(false);
  };

  const handleChangeField = (field: string, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const validateForm = () => {
    const errors = {
      district: "",
      city: "",
      name: "",
      address: "",
      managerName: "",
      managerEmail: "",
      managerPhoneNumber: "",
    };
    let isValid = true;

    if (!formData.district)
      (errors.district = "District is required"), (isValid = false);
    if (!formData.name)
      (errors.name = "Outlet name is required"), (isValid = false);
    if (!formData.address)
      (errors.address = "Address is required"), (isValid = false);
    if (!formData.managerName)
      (errors.managerName = "Manager name is required"), (isValid = false);
    if (!formData.managerEmail)
      (errors.managerEmail = "Manager email is required"), (isValid = false);
    if (!formData.managerPhoneNumber)
      (errors.managerPhoneNumber = "Manager phone number is required"),
        (isValid = false);

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const data = await dispatch.outlets.createOutlet(formData);
      toast.success(data?.message || "Outlet created successfully!");
      dispatch.outlets.fetchOutlets();
      handleClosePopup();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error occurred!");
    } finally {
      setIsLoading(false);
    }
  };

  const onViewOutlet = (item: any) => {
    setCurrentOutlet({ id: item._id, action: "view" });
  };

  return (
    <AppLayout>
      <Container>
        <Header>Outlets</Header>

        {/* Add Outlet Button */}
        <ButtonWrapper>
          <Button text="Create Outlet" onClick={handleOpenPopup} />
        </ButtonWrapper>

        {/* Outlets Table */}
        <Table
          columns={columns}
          data={outlets}
          actions={[{ label: "View Outlet", onClick: onViewOutlet }]}
        />

        {/* Create Outlet Modal */}
        <Modal isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
          <Modal.Header>Create Outlet</Modal.Header>
          <Modal.Content>
            <FormSection>
              <Select
                label="District"
                value={formData.district}
                options={DistrictsList}
                onChange={handleChangeField.bind(null, "district")}
                error={formErrors.district}
              />
              <Select
                label="City"
                value={formData.city}
                options={CitiesList(formData.district)}
                onChange={handleChangeField.bind(null, "city")}
                error={formErrors.city}
              />
              <Input
                label="Outlet Name"
                value={formData.name}
                onChange={handleChangeField.bind(null, "name")}
                error={formErrors.name}
              />
              <Input
                label="Address"
                value={formData.address}
                onChange={handleChangeField.bind(null, "address")}
                error={formErrors.address}
              />
              <Input
                label="Manager Name"
                value={formData.managerName}
                onChange={handleChangeField.bind(null, "managerName")}
                error={formErrors.managerName}
              />
              <Input
                label="Manager Email"
                value={formData.managerEmail}
                onChange={handleChangeField.bind(null, "managerEmail")}
                error={formErrors.managerEmail}
              />
              <Input
                label="Manager Phone Number"
                value={formData.managerPhoneNumber}
                onChange={handleChangeField.bind(null, "managerPhoneNumber")}
                error={formErrors.managerPhoneNumber}
              />
            </FormSection>
          </Modal.Content>
          <Modal.Footer>
            <FooterButtons>
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
            </FooterButtons>
          </Modal.Footer>
        </Modal>

        {/* View Outlet Modal */}
        {currentOutlet && currentOutlet.action === "view" && (
          <ViewOutlet
            id={currentOutlet.id}
            onClose={() => setCurrentOutlet(null)}
          />
        )}
      </Container>
    </AppLayout>
  );
}

export default AuthRoleCheck(Outlets, { roles: [UserRole.ADMIN] });
