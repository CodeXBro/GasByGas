"use client";

import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import AuthLayout from "@/components/layouts/AuthLayout";
import Link from "next/link";
import { Dispatch } from "@/data";
import Button from "@/components/subcomponents/button";
import { toast } from "react-toastify";
import styled from "styled-components";

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #000000;
`;

const Input = styled.input<{ iserror?: string }>`
  padding: 14px 16px;
  border-radius: 8px;
  border: 1px solid
    ${(props) => (props.iserror === "true" ? "#f87171" : "#020202")};
  background-color: ${(props) =>
    props.iserror === "true" ? "#fff0f0" : "#f8fafc"};
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  color: #000000;

  &:focus {
    border-color: ${(props) =>
      props.iserror === "true" ? "#f87171" : "#ffa500"};
    color: #000000;
  }

  &::placeholder {
    color: #000000;
  }
`;

const ErrorMessage = styled.p`
  color: #f87171;
  font-size: 12px;
  margin-top: 4px;
`;

const ForgotPasswordLink = styled(Link)`
  font-size: 14px;
  color: #000000;
  transition: color 0.2s ease;

  &:hover {
    color: #ffa500;
  }
`;

const RememberMeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SignUpLink = styled(Link)`
  font-size: 14px;
  color: #000000;
  transition: color 0.2s ease;

  &:hover {
    color: #ffa500;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default function LoginPage() {
  const dispatch = useDispatch<Dispatch>();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    if (!form.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!form.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await dispatch.auth.login(form);
      toast.success("Logged in successfully!");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Unknown error occurred!");
      console.log("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <AuthLayout title="Sign in to your account">
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "24px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <FormField>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={handleChange}
            iserror={errors.email ? "true" : undefined}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={form.password}
            onChange={handleChange}
            iserror={errors.password ? "true" : undefined}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </FormField>

        <RememberMeWrapper>
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-yellow-500"
            />
            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-400">
              Remember me
            </label>
          </div>
          <ForgotPasswordLink href="/auth/forgot-password">
            Forgot your password?
          </ForgotPasswordLink>
        </RememberMeWrapper>

        <ActionContainer>
          <Button
            type="submit"
            text={isLoading ? "Signing in..." : "Sign in"}
            disabled={isLoading}
          />
          <div className="text-center mt-4">
            <span className="text-sm text-gray-400">
              Don't have an account?{" "}
              <SignUpLink href="/auth/register">Sign up</SignUpLink>
            </span>
          </div>
        </ActionContainer>
      </form>
    </AuthLayout>
  );
}
