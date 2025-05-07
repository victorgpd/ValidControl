import { Button } from "antd";
import styled from "styled-components";

export const ValiditysPage = styled.div`
  width: 100%;
  height: 100%;
  padding: 32px 24px;

  display: flex;
  justify-content: center;

  h2 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 16px;
    color: #1f2937;
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  padding: 24px;
  border-radius: 16px;

  background-color: #ffffff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ContainerButtonsTable = styled.div`
  gap: 12px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const ButtonsTable = styled(Button)`
  svg {
    font-size: 16px;
  }
`;

export const ButtonAdd = styled(Button)`
  width: 140px;
  height: 40px;
  font-weight: 600;
  font-size: 14px;
  background-color: #4f46e5;
  border-color: #4f46e5;
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 18px;
    margin-right: 6px;
  }

  &:hover {
    background-color: #4338ca;
    border-color: #4338ca;
  }
`;
