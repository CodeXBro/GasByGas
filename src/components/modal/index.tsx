"use client";

import React, { ReactNode } from "react";
import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalWrapper = styled.div`
  position: relative;
  background: #e8e9eb;

  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 32rem;
  width: 100%;
  height: 80%;
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: hidden; /* Optional: prevent horizontal scrolling */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #4a5568;
  &:hover {
    color: #2d3748;
  }
`;

const Header = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: #f8f9fa;
  font-size: 1.25rem;
  font-weight: bold;

  /* Keeps the header above other content while scrolling */
`;

const Content = styled.div`
  padding: 1.5rem;
  color: #222;
`;

const Footer = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  background: #f8f9fa;
`;

const Modal: React.FC<ModalProps> & {
  Header: React.FC<{ children: ReactNode }>;
  Content: React.FC<{ children: ReactNode }>;
  Footer: React.FC<{ children: ReactNode }>;
} = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalWrapper>
        <CloseButton onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </CloseButton>
        {children}
      </ModalWrapper>
    </Overlay>
  );
};

Modal.Header = ({ children }) => <Header>{children}</Header>;
Modal.Content = ({ children }) => <Content>{children}</Content>;
Modal.Footer = ({ children }) => <Footer>{children}</Footer>;

export default Modal;
