"use client";

import styled from "styled-components";
import { keyframes } from "styled-components";

import AppLayout from "@/components/layouts/AppLayout";
import DashboardWidget from "@/components/widget";
import {
  Building2Icon,
  CalculatorIcon,
  CogIcon,
  ShipIcon,
  ShoppingCart,
} from "lucide-react";
import useUser from "@/hooks/useUser";
import useDashboard from "@/hooks/useDashboard";

const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #e8e9eb;
`;

const DashboardContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const WelcomeMessage = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #4a4a4a;
`;

const WidgetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.125rem;
  color: #757575;
`;

const fadeInSlide = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background-color: #e8e9eb; /* Dark background color */
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Heading = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: black;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 1.125rem;
  color: #aaa;
`;

// New styled components for the image and address input
const TopImageWrapper = styled.div`
  width: 100%; /* Full width */
  height: 350px; /* Increase height for better visibility */
  border-radius: 8px;
  position: relative;
  margin-top: 0; /* Remove top margin to bring it closer to the header */
`;

const TopImage = styled.img`
  background: linear-gradient(
      to right,
      rgba(232, 233, 235, 0.8) 0%,
      rgba(232, 233, 235, 0.8) 40%,
      rgba(232, 233, 235, 0.8) 50%,
      rgba(255, 165, 0, 0.8) 100%
    ),
    url("https://live.staticflickr.com/6208/6146724547_9e1c645a28_b.jpg");
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  opacity: 0.6; /* Keep opacity for a darkened effect */
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  z-index: 1;
  padding: 0 15px;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: 400;
  font-size: 3.2rem;
  color: #222;
  font-family: "Roboto Slab", "Arial", serif;
  line-height: 1.2;
  letter-spacing: 2px;
  animation: ${fadeInSlide} 0.8s ease-out;
  text-transform: capitalize;
  text-align: center;

  span {
    color: #ffa500;
  }
`;

const Paragraph = styled.p`
  font-size: 1rem;
  color: #222;
  line-height: 1.5;
`;

const AddressWrapper = styled.div`
  margin-bottom: 2rem;
`;

const AddressInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-top: 1rem;

  &:focus {
    border-color: #ffa500;
    outline: none;
  }
`;

// New styled component for the icon wrapper
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Adjusted to cover full width */
  height: 120px; /* Set a fixed height for the icon wrapper */
  margin-bottom: 10px; /* Space between icon and title */

  img {
    width: 90px; /* Icon size */
    height: 90px; /* Icon size */
    object-fit: contain; /* Ensure the image maintains its aspect ratio */
  }
`;

// New wrapper for setting max height and width for DashboardWidget
// Update the StyledDashboardWidgetWrapper
const StyledDashboardWidgetWrapper = styled.div`
  max-width: 500px; /* Increased max width */
  min-width: 280px; /* Set a minimum width to ensure readability */
  max-height: 500px; /* Keeps max height */
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Adjusted shadow for better visibility */
  transition: box-shadow 0.3s ease; /* Smooth transition for shadow effect on hover */

  border-radius: 15px;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Enhance shadow on hover */
  }
`;

export default function Dashboard() {
  const { user, isAdmin, isOutletManager, isCustomer, isBusiness } = useUser();
  const data = useDashboard();

  return (
    <AppLayout>
      <Container>
        <ContentWrapper>
          <TopImageWrapper>
            <TopImage />
            <TextWrapper>
              <div>
                <Heading>Welcome, {user?.firstName}!</Heading>
              </div>
            </TextWrapper>
          </TopImageWrapper>

          <GridWrapper>
            {isAdmin && (
              <>
                <StyledDashboardWidgetWrapper>
                  <DashboardWidget
                    title="Outlets"
                    icon={
                      <IconWrapper>
                        <img
                          src="https://imgs.search.brave.com/DkHHEBh0tmGqfpFEsO70C5zW64jjPxQ-ssar8rhsr68/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91eHdp/bmcuY29tL3dwLWNv/bnRlbnQvdGhlbWVz/L3V4d2luZy9kb3du/bG9hZC9idWlsZGlu/Z3MtYXJjaGl0ZWN0/dXJlLXJlYWwtZXN0/YXRlL3Byb3BlcnR5/LWNvbG9yLWljb24u/c3Zn"
                          alt="Outlets Icon"
                        />
                      </IconWrapper>
                    }
                    path="/outlets"
                    children={data.outlets}
                  />
                </StyledDashboardWidgetWrapper>
                <StyledDashboardWidgetWrapper>
                  <DashboardWidget
                    title="Inventory"
                    icon={
                      <IconWrapper>
                        <img
                          src="https://imgs.search.brave.com/ZDVtaZ4kf1X-tPl3q37WTadxBLikCeuO5QOg2zUKWjQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aWNvbnNob2NrLmNv/bS9pbWFnZS9Ccmls/bGlhbnQvQWNjb3Vu/dGluZy9pbnZlbnRv/cnk"
                          alt="Inventory Icon"
                        />
                      </IconWrapper>
                    }
                    path="/inventory"
                    children={data.inventory}
                  />
                </StyledDashboardWidgetWrapper>
                <StyledDashboardWidgetWrapper>
                  <DashboardWidget
                    title="Requests"
                    icon={
                      <IconWrapper>
                        <img
                          src="https://imgs.search.brave.com/s_OkKrrm0jMK57k7TBd0mu9amgWzYo0Orh3oAMT7AZA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni84MzkyLzgzOTIx/NzgucG5nP3NlbXQ9/YWlzX2h5YnJpZA"
                          alt="Requests Icon"
                        />
                      </IconWrapper>
                    }
                    children={data.requests}
                  />
                </StyledDashboardWidgetWrapper>
                <StyledDashboardWidgetWrapper>
                  <DashboardWidget
                    title="Deliveries"
                    icon={
                      <IconWrapper>
                        <img
                          src="https://imgs.search.brave.com/1XjllqqStvYyppCrmOK9PPLpP3CBbFvhlC2C21XNG_4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL2ZyZWUv/cG5nLTI1Ni9mcmVl/LWRlbGl2ZXJ5LWlj/b24tZG93bmxvYWQt/aW4tc3ZnLXBuZy1n/aWYtZmlsZS1mb3Jt/YXRzLS10cnVjay1l/Y29tbWVyY2UtaWNv/bnMtcGFjay1lLWNv/bW1lcmNlLXNob3Bw/aW5nLTQ1NDg5MC5w/bmc_Zj13ZWJwJnc9/MjU2"
                          alt="Deliveries Icon"
                        />
                      </IconWrapper>
                    }
                    path="/deliveries"
                    children={data.deliveries}
                  />
                </StyledDashboardWidgetWrapper>
              </>
            )}

            {isOutletManager && (
              <>
                <StyledDashboardWidgetWrapper>
                  <DashboardWidget
                    title="Stocks"
                    icon={
                      <IconWrapper>
                        <img
                          src="https://imgs.search.brave.com/stBc70PVLxf7F-JW1sfUcqakoeEn0cf2wL6oOKW-rvI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJzLzM4NDkx/L3NjcmVlbnNob3Rz/LzU5MDg1MS9tZWRp/YS85ZDEyZTIxOThj/YmY0NDY1YmM1ODc4/NWY1ODUyM2FiOC5w/bmc_cmVzaXplPTQw/MHgw"
                          alt="Stocks Icon"
                        />
                      </IconWrapper>
                    }
                    path="/stocks"
                    children={data.stocks}
                  />
                </StyledDashboardWidgetWrapper>
                <StyledDashboardWidgetWrapper>
                  <DashboardWidget
                    title="Requests"
                    icon={
                      <IconWrapper>
                        <img
                          src="https://imgs.search.brave.com/s_OkKrrm0jMK57k7TBd0mu9amgWzYo0Orh3oAMT7AZA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni84MzkyLzgzOTIx/NzgucG5nP3NlbXQ9/YWlzX2h5YnJpZA"
                          alt="Requests Icon"
                        />
                      </IconWrapper>
                    }
                    path="/requests"
                    children={data.requests}
                  />
                </StyledDashboardWidgetWrapper>
                <StyledDashboardWidgetWrapper>
                  <DashboardWidget
                    title="Deliveries"
                    icon={
                      <IconWrapper>
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/9/96/Ship_icon.svg"
                          alt="Deliveries Icon"
                        />
                      </IconWrapper>
                    }
                    path="/deliveries"
                    children={data.deliveries}
                  />
                </StyledDashboardWidgetWrapper>
              </>
            )}

            {(isCustomer || isBusiness) && (
              <>
                <StyledDashboardWidgetWrapper>
                  <DashboardWidget
                    title="Requests"
                    icon={
                      <IconWrapper>
                        <img
                          src="https://imgs.search.brave.com/s_OkKrrm0jMK57k7TBd0mu9amgWzYo0Orh3oAMT7AZA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni84MzkyLzgzOTIx/NzgucG5nP3NlbXQ9/YWlzX2h5YnJpZA"
                          alt="Requests Icon"
                        />
                      </IconWrapper>
                    }
                    path="/requests"
                    children={data.requests}
                  />
                </StyledDashboardWidgetWrapper>
              </>
            )}
          </GridWrapper>
        </ContentWrapper>
      </Container>
    </AppLayout>
  );
}
