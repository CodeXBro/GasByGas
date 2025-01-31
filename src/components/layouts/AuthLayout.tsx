"use client";

import { Dispatch, RootState } from "@/data";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../logo"; // Ensure Logo accepts width/height props
import styled from "styled-components";

interface AuthLayoutProps {
  children: ReactNode;
  showLogo?: boolean;
  title?: string;
}

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 0;
  background-color: #f3f4f6;
  transition: background-color 0.3s ease;
`;

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 24rem;
`;

const Heading = styled.h2`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 1.875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #111827;

  &.Login-title {
    color: #000000;
  }
`;

const LogoImg = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  margin-top: 2.5rem;
`;

export default function AuthLayout({
  children,
  showLogo = true,
  title = "Welcome back",
}: AuthLayoutProps) {
  const { replace: navigate } = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user) {
      if (user.requestChangePassword) {
        navigate("/settings/change-password");
      } else {
        navigate("/dashboard");
      }
    }
  }, [navigate, user]);

  return (
    <LayoutWrapper>
      <Container>
        {/* Pass the width and height directly as props to Logo */}
        {showLogo && <Logo width="100px" height="100px" />} {" "}
        {/* Resize the logo here */}
        <Heading className="Login-title">{title}</Heading>
      </Container>

      <Container>
        {children}
      </Container>
    </LayoutWrapper>
  );
}
