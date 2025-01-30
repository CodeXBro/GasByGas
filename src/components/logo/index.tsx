import React from "react";
import styled from "styled-components";

// Container for the logo (centering it)
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0rem;
`;

// Box that holds the logo
const LogoBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.375rem;

  @media (prefers-color-scheme) {
    color: #ffa500; /* Tailwind blue-400 */
  }
`;

// Image style that accepts width and height props
const LogoImage = styled.img<{ width?: string; height?: string }>`
  width: ${({ width }) =>
    width || "3rem"}; /* Default width is 3rem if not passed */
  height: ${({ height }) =>
    height || "3rem"}; /* Default height is 3rem if not passed */
  opacity: 1;
  margin-left: 20px;
`;

interface LogoProps {
  width?: string; // Accepts width as a string (e.g., '100px' or '250px')
  height?: string; // Accepts height as a string (e.g., '100px' or '250px')
}

export default function Logo({ width, height }: LogoProps) {
  return (
    <LogoContainer>
      <LogoBox>
        <LogoImage
          src="/LogoIcon.png"
          alt="Logo"
          width={width}
          height={height}
        />
      </LogoBox>
    </LogoContainer>
  );
}
