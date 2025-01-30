"use client";

import AuthRoleCheck from "@/components/Auth";
import AppLayout from "@/components/layouts/AppLayout";
import Input from "@/components/subcomponents/input";
import Button from "@/components/subcomponents/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/data";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import styled from "styled-components";

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

const WarningBox = styled.div`
  background-color: #ffa500;
  color: #fff;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 1px solid #ffa500;
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

function ChangePassword() {
  const dispatch = useDispatch<Dispatch>();
  const { user } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangeField = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const errors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (!formData.currentPassword) {
      errors.currentPassword = "Current password is required";
      isValid = false;
    }
    if (!formData.newPassword || formData.newPassword.length < 6) {
      errors.newPassword = "New password must be at least 6 characters";
      isValid = false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const data: any = await dispatch.auth.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      toast.success(data?.message || "Password changed successfully");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to change password"
      );
      console.log("Change password failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <PageContainer>
        <FormWrapper>
          <Heading>Change Password</Heading>

          {user?.requestChangePassword && (
            <WarningBox>
              <strong>Warning: </strong>
              Your password is outdated/required to update. Please update it
              immediately to secure your account.
            </WarningBox>
          )}

          <InputGroup>
            <StyledInput
              id="currentPassword"
              type="password"
              error={formErrors.currentPassword}
              value={formData.currentPassword}
              label="Current Password"
              onChange={handleChangeField.bind(null, "currentPassword")}
            />
          </InputGroup>

          <InputGroup>
            <StyledInput
              id="newPassword"
              type="password"
              error={formErrors.newPassword}
              value={formData.newPassword}
              label="New Password"
              onChange={handleChangeField.bind(null, "newPassword")}
            />
          </InputGroup>

          <InputGroup>
            <StyledInput
              id="confirmPassword"
              type="password"
              error={formErrors.confirmPassword}
              value={formData.confirmPassword}
              label="Confirm Password"
              onChange={handleChangeField.bind(null, "confirmPassword")}
            />
          </InputGroup>

          <StyledButtonWrapper>
            <StyledButton
              isLoading={isLoading}
              text="Change Password"
              onClick={handleSubmit}
            />
          </StyledButtonWrapper>
        </FormWrapper>
      </PageContainer>
    </AppLayout>
  );
}

export default AuthRoleCheck(ChangePassword, { roles: [] });
