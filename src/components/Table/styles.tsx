import { Table } from "antd";
import styled from "styled-components";

export const TableGeneral = styled(Table)`
  width: 100%;

  .ant-table {
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    overflow-x: auto;

    // Ocupa toda a largura da tela no mobile com rolagem horizontal
    @media (max-width: 768px) {
      display: block;

      .ant-table-content {
        overflow-x: auto;
      }

      table {
        width: 700px; // Define uma largura mínima para possibilitar rolagem
      }

      th,
      td {
        white-space: nowrap;
      }
    }
  }
`;
