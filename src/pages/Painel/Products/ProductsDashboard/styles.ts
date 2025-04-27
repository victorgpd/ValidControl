import { Button } from "antd";
import styled from "styled-components";

export const ProductsPage = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  background-color: #f9f9f9;

  h2 {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 24px;
    color: #333;
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  padding: 16px;
  border-radius: 12px;

  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);

  gap: 15px;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
`;

export const ContainerButtonsTable = styled.div`
  gap: 12px;
  display: flex;
  align-items: center;
`;

export const ButtonsTable = styled(Button)`
  svg {
    font-size: 16px;
  }
`;

export const ButtonAdd = styled(Button)`
  width: 120px;
  svg {
    font-size: 20px;
  }
`;
