import Table from "../../../../components/Table/Table";
import Painel from "../../../../components/Painel/Painel";

import { WhereFilterOp } from "firebase/firestore";
import { ProductType } from "../../../../types/types";
import { useFields } from "../../../../hooks/useFields";
import { useAppSelector } from "../../../../hooks/store";
import { useRealtimeDocuments } from "../../../../hooks/useRealtimeDocuments";
import { AppstoreAddOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ButtonAdd, ButtonsTable, ContainerButtonsTable, ProductsPage, TableContainer } from "./styles";

const Products = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id: string) => <span style={{ color: "#1677ff" }}>{id}</span>,
    },
    {
      title: "Produto",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Código de barras",
      dataIndex: "barcode",
      key: "barcode",
    },
    {
      title: "",
      key: "action",
      render: (_: any, record: ProductType) => (
        <ContainerButtonsTable>
          <ButtonsTable color="primary" variant="outlined">
            <EditOutlined />
            <span>Editar</span>
          </ButtonsTable>
          <ButtonsTable color="danger" variant="outlined" onClick={() => handleRemove(dataSource?.id, record)}>
            <DeleteOutlined />
            <span>Excluir</span>
          </ButtonsTable>
        </ContainerButtonsTable>
      ),
    },
  ];

  const { user } = useAppSelector((state) => state.globalReducer);

  const conditions = [
    {
      field: "access",
      op: "array-contains" as WhereFilterOp,
      value: user?.email || "",
    },
  ];

  const { documents: dataSource } = useRealtimeDocuments("lojas", conditions);
  const { removeItemFromArray } = useFields("lojas");

  async function handleRemove(docId: string, itemToRemove: ProductType) {
    await removeItemFromArray(docId, "products", itemToRemove);
  }

  return (
    <Painel>
      <ProductsPage>
        <h2>Produtos cadastrados</h2>
        <TableContainer>
          <ButtonAdd icon={<AppstoreAddOutlined />} color="primary" variant="solid">
            Novo
          </ButtonAdd>
          <Table dataSource={dataSource?.products} columns={columns} />
        </TableContainer>
      </ProductsPage>
    </Painel>
  );
};

export default Products;
