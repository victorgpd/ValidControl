import styled from "styled-components";

export const ExportProductPage = styled.div`
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

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 1100px;
  padding: 20px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: ${({ direction }) => direction};
  gap: 10px;
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  width: 100%;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #059669;
  }

  &:disabled {
    background-color: #b3b3b3;
    cursor: not-allowed;
  }
`;
