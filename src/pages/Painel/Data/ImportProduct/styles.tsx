import styled from "styled-components";

export const ImportProductPage = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: #f9f9f9;

  gap: 15px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  overflow-x: hidden;
`;

interface ContainerProps {
  direction: string;
}

export const Container = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 12px;

  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.16);

  gap: 5px;
  display: flex;
  flex-flow: ${({ direction }: ContainerProps) => direction};
`;

export const ContainerInput = styled.div`
  width: 100%;

  gap: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.label`
  /* font-weight: bold; */
  color: #333;
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
`;
