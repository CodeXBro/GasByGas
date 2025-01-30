"use client";

import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Dispatch } from "@/data";
import Link from "next/link";
import Button from "@/components/subcomponents/button";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
`;

const Input = styled.input<{ hasError: boolean }>`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid ${(props) => (props.hasError ? "#e53e3e" : "#cbd5e0")};
  background: ${(props) => (props.hasError ? "#fff5f5" : "#fff")};
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#e53e3e" : "#3182ce")};
    box-shadow: 0 0 0 2px ${(props) => (props.hasError ? "#feb2b2" : "#63b3ed")};
  }
`;

const ErrorText = styled.p`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SuccessMessage = styled.p`
  text-align: center;
  font-size: 0.875rem;
  color: #38a169;
`;

const LinkText = styled.span`
  text-align: center;
  font-size: 0.875rem;
  color: #718096;
  a {
    color: #3182ce;
    font-weight: 500;
    &:hover {
      color: #2b6cb0;
    }
  }
`;

export default function ForgotPasswordPage() {
  const dispatch = useDispatch<Dispatch>();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = () => {
    if (!email) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateEmail()) return;
    setIsLoading(true);
    try {
      await dispatch.auth.forgotPassword({ email });
      setSuccessMessage("A password reset link has been sent to your email.");
    } catch (error) {
      console.error("Password reset failed:", error);
      setError("Failed to send password reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Forgot Password">
      <FormContainer onSubmit={handleSubmit}>
        <InputContainer>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            hasError={!!error}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <ErrorText>{error}</ErrorText>}
        </InputContainer>

        <Button
          type="submit"
          disabled={isLoading}
          text={isLoading ? "Sending..." : "Send Reset Link"}
        />

        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

        <LinkText>
          Remember your password? <Link href="/auth/login">Sign in</Link>
        </LinkText>
      </FormContainer>
    </AuthLayout>
  );
}
