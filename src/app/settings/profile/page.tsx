"use client";

import AuthRoleCheck from "@/components/Auth";
import AppLayout from "@/components/layouts/AppLayout";
import Input from "@/components/subcomponents/input";
import Button from "@/components/subcomponents/button";
import Select from "@/components/subcomponents/select";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/data";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import AreasList from "../../../../public/areas.json";
import styled from "styled-components";

const ErrorFields = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  district: "",
  phoneNumber: "",
};

const DistrictsList = Object.keys(AreasList).map((d) => ({
  label: d,
  value: d,
}));

const CitiesList = (district: string) =>
  ((AreasList as any)[district]?.cities || []).map((c: string) => ({
    label: c,
    value: c,
  }));

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #e8e9eb;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  background-color: #fff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #333;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledInput = styled(Input)`
  border-radius: 8px;

  width: 100%;
  &:focus {
    border-color: #ffa500;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 165, 0, 0.4);
  }
  ${(props) =>
    props.error &&
    `
    border-color: red;
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.4);
  `}
`;

const StyledSelect = styled(Select)`
  background-color: #e8e9eb;

  border-radius: 8px;
  padding: 0.8rem;
  width: 100%;
  &:focus {
    border-color: #ffa500;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 165, 0, 0.4);
  }
  ${(props) =>
    props.error &&
    `
    border-color: red;
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.4);
  `}
`;

const StyledButton = styled(Button)`
  background-color: #ffa500;
  color: #fff;
  &:hover {
    background-color: #ff7f00;
  }
`;

function Profile() {
  const dispatch = useDispatch<Dispatch>();
  const { user, isBusiness, isCustomer } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    address: user?.address || "",
    city: user?.city || "",
    district: user?.district || "",
    phoneNumber: user?.phoneNumber || "",
  });

  const [formErrors, setFormErrors] = useState(ErrorFields);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangeField = (field: string, value: any) => {
    let optional = {};
    if (field === "district") {
      optional = { city: "" };
    }
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...optional,
    }));
  };

  const validateForm = () => {
    const errors = ErrorFields;
    let isValid = true;

    if (!formData.firstName) {
      errors.firstName = "First Name is required";
      isValid = false;
    }

    if (!formData.lastName) {
      errors.lastName = "Last Name is required";
      isValid = false;
    }

    if (!formData.address) {
      errors.address = "Address is required";
      isValid = false;
    }

    if (!formData.city) {
      errors.city = "City is required";
      isValid = false;
    }

    if (!formData.district) {
      errors.district = "District is required";
      isValid = false;
    }

    if (!formData.phoneNumber || !formData.phoneNumber.match(/07[0-9]{8}/g)) {
      errors.phoneNumber = "A Valid phone Number is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const data: any = await dispatch.auth.updateProfile(formData as any);
      toast.success(data?.message || "Profile updated successfully");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
      console.log("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <PageContainer>
        <FormWrapper>
          <Heading>Profile</Heading>

          <InputGroup>
            <StyledInput
              id="firstName"
              type="text"
              error={formErrors.firstName}
              value={formData.firstName}
              label="First Name"
              onChange={handleChangeField.bind(null, "firstName")}
            />
          </InputGroup>

          <InputGroup>
            <StyledInput
              id="lastName"
              type="text"
              error={formErrors.lastName}
              value={formData.lastName}
              label="Last Name"
              onChange={handleChangeField.bind(null, "lastName")}
            />
          </InputGroup>

          <InputGroup>
            <StyledInput
              id="email"
              type="text"
              value={user?.email || ""}
              label="Email"
              disabled
            />
          </InputGroup>

          <InputGroup>
            <StyledInput
              id="address"
              type="text"
              error={formErrors.address}
              value={formData.address}
              label="Address"
              onChange={handleChangeField.bind(null, "address")}
            />
          </InputGroup>

          <InputGroup>
            <StyledSelect
              label="District"
              value={formData.district}
              options={DistrictsList}
              onChange={handleChangeField.bind(null, "district")}
              error={formErrors.district}
            />
          </InputGroup>

          <InputGroup>
            <StyledSelect
              label="City"
              value={formData.city || ""}
              options={CitiesList(formData.district)}
              onChange={handleChangeField.bind(null, "city")}
              error={formErrors.city}
            />
          </InputGroup>

          {isBusiness && (
            <InputGroup>
              <StyledInput
                id="businessRegId"
                type="text"
                value={user?.businessRegId || ""}
                label="Business Registration Id"
                disabled
              />
            </InputGroup>
          )}

          {isCustomer && (
            <InputGroup>
              <StyledInput
                id="nic"
                type="text"
                value={user?.nationalIdNumber || ""}
                label="NIC"
                disabled
              />
            </InputGroup>
          )}

          <InputGroup>
            <StyledInput
              id="phoneNumber"
              type="text"
              error={formErrors.phoneNumber}
              value={formData.phoneNumber}
              label="Phone Number"
              onChange={handleChangeField.bind(null, "phoneNumber")}
            />
          </InputGroup>

          <StyledButtonWrapper>
            <StyledButton
              isLoading={isLoading}
              text="Save Profile"
              onClick={handleSubmit}
            />
          </StyledButtonWrapper>
        </FormWrapper>
      </PageContainer>
    </AppLayout>
  );
}

export default AuthRoleCheck(Profile, { roles: [] });
