import { CylinderIcon } from 'lucide-react'
import React from 'react'
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  padding: 1rem 1rem;
  border-radius: 0.375rem;
  margin-top: 10px;

  @media (prefers-color-scheme) {
    color: #ffa500; /* Tailwind blue-400 */
  }
`;

const LogoImage = styled.img`
  width: 4rem;
  height: 4rem;
`;


export default function Logo() {
  return (
    <LogoContainer>
      <LogoBox>
        <LogoImage src="/LogoIcon.png" alt="Logo" />
      </LogoBox>
    </LogoContainer>
  );
}
