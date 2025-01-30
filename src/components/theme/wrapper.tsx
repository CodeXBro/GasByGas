"use client";

import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import Link from "next/link";
import Logo from "../logo";

// Global Styles
const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box; /* Prevent padding/margin from causing overflow */
  }

  body {
    background-color: #e8e9eb; /* Set default background */
    color: #333;
    margin: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-x: hidden; /* Prevent horizontal overflow */
    transition: background-color 0.3s ease;

    /* Dark theme styles */
    &[data-theme='dark'] {
      background-color: #333;
      color: #e8e9eb;
    }
  }
`;

// Styled Components
const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh; /* Ensure full height */
`;

const MainContent = styled.main`
  flex: 1; /* Take up remaining space */
  display: flex;
  flex-direction: column;
`;

const StyledLogo = styled.div`
  cursor: pointer;
  width: auto;

  span {
    color: #fff;
    background-color: #ffa500;
    padding: 2px 6px;
    margin: 0 4px;
    border-radius: 4px;
  }
`;

const FooterContainer = styled.footer`
  background-color: #ffa500; /* Solid background color */
  padding: 20px;
  text-align: center;
  color: black; /* White text for contrast */
`;

const FooterContent = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const FooterLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin-top: 10px;
  display: block;

  &:hover {
    opacity: 0.8;
  }
`;

const FooterText = styled.div`
  font-size: 14px;
  color: black;
  font-weight: 100;
`;

interface AppThemeProviderProps {
  children: React.ReactNode;
}

export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({
  children,
}) => {
  // Add mounted state to handle hydration
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return null or a loading state on server-side/initial render
  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      themes={["light", "dark"]}
      disableTransitionOnChange
      enableColorScheme={true}
      storageKey="gasbygas-theme-setting"
    >
      <GlobalStyle />
      <AppWrapper>
        {/* Top Logo */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            opacity: 0.6,
          }}
        ></div>
        {/* Main Content */}
        <MainContent>{children}</MainContent>
        {/* Footer */}
        <FooterContainer>
          <FooterContent>
            <div>
              Gas<span>BY</span>Gas
            </div>
            <FooterText>
              &copy; {new Date().getFullYear()} GasBYGas. All rights reserved.
            </FooterText>
          </FooterContent>
        </FooterContainer>
      </AppWrapper>
    </ThemeProvider>
  );
};
