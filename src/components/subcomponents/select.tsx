"use client";

import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.25rem;
`;

const Input = styled.input<{ $error?: boolean; disabled?: boolean }>`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${(props) => (props.$error ? "#e53e3e" : "#cbd5e0")};
  border-radius: 6px;
  background-color: ${(props) => (props.disabled ? "#f7fafc" : "white")};
  color: ${(props) => (props.disabled ? "#a0aec0" : "#2d3748")};
  outline: none;

  &:focus {
    border-color: ${(props) => (props.$error ? "#e53e3e" : "#3182ce")};
    box-shadow: 0 0 0 2px ${(props) => (props.$error ? "#feb2b2" : "#63b3ed")};
  }
`;

const Dropdown = styled.div`
  position: absolute;
  width: 100%;
  margin-top: 4px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
`;

const Option = styled.div`
  padding: 10px 14px;
  cursor: pointer;
  color: #2d3748;

  &:hover {
    background: #edf2f7;
  }
`;

const ErrorText = styled.p`
  color: #e53e3e;
  font-size: 0.75rem;
  margin-top: 4px;
`;

// Component
interface SelectProps {
  name?: string;
  label: string;
  options: { label: string; value: string }[];
  value: string | null;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  disabled = false,
  error,
}) => {
  const [searchQuery, setSearchQuery] = useState(
    (value ? options.find((o) => o.value === value)?.label : "") || ""
  );
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SelectContainer>
      <Label>{label}</Label>
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder="Search..."
        disabled={disabled}
        $error={!!error}
      />

      {isOpen && (
        <Dropdown>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <Option
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setSearchQuery(option.label);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </Option>
            ))
          ) : (
            <Option>No results found</Option>
          )}
        </Dropdown>
      )}

      {error && <ErrorText>{error}</ErrorText>}
    </SelectContainer>
  );
};

export default Select;
