import styled from "styled-components";

export const ImportProductPage = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
  overflow-x: hidden;
`;

interface ContainerProps {
  direction: string;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: 20px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: ${({ direction }: ContainerProps) => direction};
  gap: 30px;
  margin-bottom: 30px;
`;

export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 320px;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  width: 100%;
  margin-top: 24px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #4338ca;
  }

  &:disabled {
    background-color: #b3b3b3;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ddd;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: #4f46e5;
    outline: none;
  }
`;
