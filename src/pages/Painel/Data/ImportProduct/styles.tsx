import styled from "styled-components";

export const ImportProductPage = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  overflow-x: hidden;
`;

interface ContainerProps {
  direction: string;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 20px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: ${({ direction }: ContainerProps) => direction};
  gap: 20px;
  margin-bottom: 20px;
`;

export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #444;
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  width: 100%;
  margin-top: 20px;
`;
