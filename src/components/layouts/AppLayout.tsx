import { ReactNode, useEffect } from "react";
import Header from "../header/Header";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/data";
import useUser from "@/hooks/useUser";
import styled from "styled-components";

interface AppLayoutProps {
  children: ReactNode;
}

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  background-color: #e8e9eb;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`;

const MainContent = styled.main`
  padding: 1.5rem;
`;

export default function AppLayout({ children }: AppLayoutProps) {
  const dispatch = useDispatch();
  const { replace: navigate } = useRouter();

  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch.auth.fetchUser();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/login");
    } else {
      if (user && user.requestChangePassword) {
        navigate("/settings/change-password");
      }
    }
  }, [isLoggedIn, navigate, user]);

  return (
    <LayoutWrapper>
      {/* Main Content */}
      <ContentWrapper>
        {/* Header */}
        <Header />
        {/* Page Content */}
        <MainContent>{children}</MainContent>
      </ContentWrapper>
    </LayoutWrapper>
  );
}
