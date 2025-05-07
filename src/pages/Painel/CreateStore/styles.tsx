import { Button, Input, InputNumber, Select } from "antd";
import styled from "styled-components";

export const CreateStorePage = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CreateStoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
  background-color: #f9fafb;
  border-radius: 16px;
  max-width: 700px;
  max-height: 800px;
  margin: 0 auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

export const TitleWrapper = styled.div`
  margin-bottom: 2rem;

  h3 {
    font-size: 1.75rem;
    font-weight: 600;
    color: #111827; /* texto escuro */
    text-align: center;
  }
`;

export const StyledForm = styled.form`
  width: 100%;

  .ant-form-item-label > label {
    font-weight: 500;
    color: #374151; /* cinza escuro */
  }

  .ant-form-item {
    margin-bottom: 25px;
  }
`;

export const StyledInput = styled(Input)`
  height: 40px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  padding: 0 12px;
`;

export const StyledInputNumber = styled(InputNumber)`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  padding: 0 12px;

  display: flex;
  align-items: center;
`;

export const StyledSelect = styled(Select)`
  .ant-select-selector {
    border-radius: 8px !important;
    height: 40px !important;
    align-items: center;
    display: flex;
    padding: 0 12px;
  }
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  height: 44px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  background-color: #10b981; /* emerald-500 */
  border-color: #10b981;

  &:hover,
  &:focus {
    background-color: #059669 !important; /* emerald-600 */
    border-color: #059669 !important;
  }
`;

export const InputContainer = styled.div`
  width: 100%;

  gap: 6px;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  color: #555;
  font-size: 14px;
  font-weight: 600;
`;

export const InputConfiguration = styled(Input)`
  padding: 10px 14px;
  border-radius: 8px;
`;

export const AccessInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

export const AccessEmailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
  gap: 8px;
`;

export const AddEmailButton = styled(Button)`
  height: 40px;
  padding: 0 16px;
  border-radius: 8px;
  background-color: #3b82f6; /* blue-500 */
  border-color: #3b82f6;

  &:hover,
  &:focus {
    background-color: #2563eb !important; /* blue-600 */
    border-color: #2563eb !important;
  }
`;

export const RemoveEmailButton = styled(Button)`
  height: 40px;
  padding: 0 16px;
  border-radius: 8px;
`;
