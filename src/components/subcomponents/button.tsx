"use client";

import React from "react";
import styled, { css } from "styled-components";

interface IButtonProps {
  text: string;
  onClick?: () => void;
  color?: "primary" | "secondary"; // Only primary and secondary colors
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "gradient";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean; // New prop for loading state
}

// Define the types for the size and color keys
type ButtonSize = "sm" | "md" | "lg";
type ButtonColor = "primary" | "secondary";
type ButtonVariant = "solid" | "outline" | "gradient";

const Button: React.FC<IButtonProps> = ({
  text,
  onClick,
  color = "primary",
  size = "sm",
  variant = "solid",
  className = "",
  disabled = false,
  type = "button",
  isLoading = false,
}) => {
  // Color and variant styles (Primary: #ffa500, Secondary: #e8e9eb)
  const colorVariants: Record<
    ButtonColor,
    Record<ButtonVariant, ReturnType<typeof css>>
  > = {
    primary: {
      solid: css`
        background-color: #ffa500;
        color: white;
        &:hover {
          background-color: #ff8c00;
        }
        &:focus {
          outline: 2px solid #ff8c00; /* Replaced ring with outline */
        }
      `,
      outline: css`
        border: 2px solid #ffa500;
        color: #ffa500;
        &:hover {
          background-color: #fffbf1;
        }
        &:focus {
          outline: 2px solid #ff8c00; /* Replaced ring with outline */
        }
      `,
      gradient: css`
        background: linear-gradient(to right, #ffa500, #ff8c00);
        color: white;
        &:hover {
          background: linear-gradient(to right, #ff8c00, #ff6000);
        }
        &:focus {
          outline: 2px solid #ff8c00; /* Replaced ring with outline */
        }
      `,
    },
    secondary: {
      solid: css`
        background-color: #e8e9eb;
        color: #333;
        &:hover {
          background-color: #d1d4d7;
        }
        &:focus {
          outline: 2px solid #d1d4d7; /* Replaced ring with outline */
        }
      `,
      outline: css`
        border: 2px solid #e8e9eb;
        color: #e8e9eb;
        &:hover {
          background-color: #f4f6f7;
        }
        &:focus {
          outline: 2px solid #d1d4d7; /* Replaced ring with outline */
        }
      `,
      gradient: css`
        background: linear-gradient(to right, #e8e9eb, #d1d4d7);
        color: #333;
        &:hover {
          background: linear-gradient(to right, #d1d4d7, #b3b9bc);
        }
        &:focus {
          outline: 2px solid #d1d4d7; /* Replaced ring with outline */
        }
      `,
    },
  };

  // Size styles
  const sizeVariants: Record<ButtonSize, ReturnType<typeof css>> = {
    sm: css`
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    `,
    md: css`
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    `,
    lg: css`
      padding: 1rem 2rem;
      font-size: 1.125rem;
    `,
  };

  // Base button styles
  const baseStyles = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border: none;
    outline: none;
    position: relative;
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  // Styled Button Component
  const StyledButton = styled.button<{
    color: ButtonColor;
    size: ButtonSize;
    variant: ButtonVariant;
    disabled: boolean;
  }>`
    ${baseStyles}
    ${({ color, variant }) => colorVariants[color][variant]}
    ${({ size }) => sizeVariants[size]}
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  `;

  return (
    <StyledButton
      type={type}
      color={color}
      size={size}
      variant={variant}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={className}
    >
      {isLoading ? (
        <>
          <svg
            role="status"
            className="w-5 h-5 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 101"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M100 50c0-27.614-22.386-50-50-50S0 22.386 0 50s22.386 50 50 50 50-22.386 50-50z"
              fill="currentColor"
            />
          </svg>
          Please wait
        </>
      ) : (
        text
      )}
    </StyledButton>
  );
};

export default Button;
