import useTitle from "../../../../hooks/useTitle";
import Table from "../../../../components/Table/Table";
import Painel from "../../../../components/Painel/Painel";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../../../../types/types";
import { RoutesEnum } from "../../../../enums/routes";
import { useFields } from "../../../../hooks/useFields";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { setOpenCurrentMenu } from "../../../../redux/globalReducer/slice";
import { AppstoreAddOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ButtonAdd, ButtonsTable, ContainerButtonsTable, ProductsPage, TableContainer } from "./styles";
import { useModal } from "../../../../hooks/useModal";
import { useNotification } from "../../../../hooks/useNotification";

const Products = () => {
  useTitle("Produtos");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { contextHolder, showNotification } = useNotification();
  const { openModal, Modal } = useModal();
  const { loja } = useAppSelector((state) => state.globalReducer);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      rowScope: "row",
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
      title: "Ações",
      key: "action",
      render: (_: any, record: ProductType) => (
        <ContainerButtonsTable>
          <ButtonsTable onClick={() => navigate(`/painel/products/edit/${record.id}`)} color="primary" variant="outlined">
            <EditOutlined />
            <span>Editar</span>
          </ButtonsTable>
          {loja?.idDocument && (
            <ButtonsTable color="danger" variant="outlined" onClick={() => handleRemove(loja?.idDocument, record)}>
              <DeleteOutlined />
              <span>Excluir</span>
            </ButtonsTable>
          )}
        </ContainerButtonsTable>
      ),
    },
  ];

  const { removeItemFromArray } = useFields("lojas");

  async function handleRemove(docId: string | undefined, itemToRemove: ProductType) {
    if (!docId) return;

    openModal({
      title: "Excluir produto",
      message: `Tem certeza que deseja excluir o produto?<br />ID: ${itemToRemove.id}<br />Produto: ${itemToRemove.name}?`,
      okText: "Excluir",
      cancelText: "Cancelar",
      onConfirm: async () => {
        await removeItemFromArray(docId, "products", itemToRemove);
        showNotification("success", "Sucesso", "Produto excluido com sucesso.");
      },
    });
  }

  useEffect(() => {
    dispatch(setOpenCurrentMenu(["products", "product1"]));
  }, []);

  return (
    <Painel title="Produtos">
      <ProductsPage>
        {contextHolder}
        <Modal />
        <TableContainer>
          <h2>Produtos cadastrados</h2>
          <ButtonAdd icon={<AppstoreAddOutlined />} onClick={() => navigate(RoutesEnum.Product_Create)} color="primary" variant="solid">
            Novo
          </ButtonAdd>
          {loja?.products && <Table dataSource={loja?.products} columns={columns} rowKey="id" />}
        </TableContainer>
      </ProductsPage>
    </Painel>
  );
};

export default Products;
