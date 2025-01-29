import React from "react";
import styled from "styled-components";
import Button from "../subcomponents/button";

// Define styled components
const WidgetContainer = styled.div<{
  color: "blue" | "green" | "yellow" | "red";
}>`
  padding: 1rem 1rem; /* Further reduced padding for compactness */
  border-radius: 1rem;
  background-color: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 80px; /* Further reduced minimum height */
  height: 100%; /* Ensure it can grow when needed */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(
      to right,
      #e8e9eb 0%,
      #e8e9eb 40%,
      #e8e9eb 50%,
      #ffa500 200%
    );
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const WidgetHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem; /* Further reduced margin */
  justify-content: center;
  width: 100%;
`;

const WidgetTitle = styled.h3`
  font-size: 1rem; /* Reduced font size */
  font-weight: 600;
  color: #333;
  margin-top: 5px; /* Reduced margin */
  text-align: center;

  @media (prefers-color-scheme: dark) {
    color: black;
  }
`;

const WidgetContent = styled.div`
  font-size: 1.2rem; /* Slightly smaller content font */
  font-weight: 500;
  color: #4b5563;
  text-align: center;
  margin: 0.5rem 0; /* Reduced margin */
  flex-grow: 1; /* Ensures content takes up the remaining space */

  @media (prefers-color-scheme: dark) {
    color: black;
  }
`;

const WidgetFooter = styled.div`
  padding-top: 0.5rem; /* Reduced padding */
  border-top: 1px solid #d1d5db;
  font-size: 0.75rem; /* Smaller footer font */
  color: #6b7280;
  text-align: center;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 0.5rem; /* Reduced margin */
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 0;
`;

interface DashboardWidgetProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  color?: "blue" | "green" | "yellow" | "red";
  className?: string;
  path?: string;
  footer?: React.ReactNode;
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  icon,
  children,
  color = "blue",
  className = "",
  path,
  footer,
}) => {
  return (
    <WidgetContainer
      color={color}
      className={className}
      onClick={() => {
        if (path) {
          window.location.href = path;
        }
      }}
      style={{
        cursor: "pointer", // Make it look clickable
        padding: "20px", // Optional: Add padding if needed
        backgroundColor: color || "#f0f0f0", // Optional: Background color from prop or default
        borderRadius: "8px", // Optional: Border radius for rounded corners
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Optional: Shadow for effect
      }}
    >
      {icon && <div>{icon}</div>} {/* Center icon */}
      <WidgetHeader>
        <WidgetTitle>{title}</WidgetTitle>
      </WidgetHeader>
      <WidgetContent>{children}</WidgetContent>
      {footer && <WidgetFooter>{footer}</WidgetFooter>}
    </WidgetContainer>
  );
};

export default DashboardWidget;
