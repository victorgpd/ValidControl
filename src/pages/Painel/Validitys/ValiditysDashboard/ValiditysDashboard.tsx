import useTitle from "../../../../hooks/useTitle";
import Table from "../../../../components/Table/Table";
import Painel from "../../../../components/Painel/Painel";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../../hooks/useModal";
import { ProductType } from "../../../../types/types";
import { RoutesEnum } from "../../../../enums/routes";
import { useFields } from "../../../../hooks/useFields";
import { useNotification } from "../../../../hooks/useNotification";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { setOpenCurrentMenu } from "../../../../redux/globalReducer/slice";
import { AppstoreAddOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ButtonAdd, ButtonsTable, ContainerButtonsTable, ValiditysPage, TableContainer } from "./styles";

const Validitys = () => {
  useTitle("Validades");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { showNotification, contextHolder } = useNotification();
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
      title: "Código de barras",
      dataIndex: "barcode",
      key: "barcode",
    },
    {
      title: "Produto",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantidade",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Data de validade",
      dataIndex: "date",
      key: "date",
      render: (date: string) => {
        const localDate = new Date(date + "T00:00:00"); // Adiciona um horário para evitar problemas de fuso horário
        return localDate.toLocaleDateString("pt-BR");
      },
    },
    {
      title: "",
      key: "action",
      render: (_: any, record: ProductType) => (
        <ContainerButtonsTable>
          <ButtonsTable onClick={() => navigate(`/painel/validitys/edit/${record.id}`)} color="primary" variant="outlined">
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
      title: "Excluir validade",
      message: `Tem certeza que deseja excluir a validade?<br />ID: ${itemToRemove.id}<br />Produto: ${itemToRemove.name}?`,
      okText: "Excluir",
      cancelText: "Cancelar",
      onConfirm: async () => {
        await removeItemFromArray(docId, "validitys", itemToRemove);
        showNotification("success", "Sucesso", "Validade excluida com sucesso.");
      },
    });
  }

  useEffect(() => {
    dispatch(setOpenCurrentMenu(["validitys", "validity1"]));
  }, []);

  return (
    <Painel title="Validades">
      {contextHolder}
      <ValiditysPage>
        <Modal />
        <h2>Validades cadastradas</h2>
        <TableContainer>
          <ButtonAdd icon={<AppstoreAddOutlined />} onClick={() => navigate(RoutesEnum.Validitys_Create)} color="primary" variant="solid">
            Novo
          </ButtonAdd>
          {loja?.validitys && <Table dataSource={loja?.validitys} columns={columns} rowKey="id" />}
        </TableContainer>
      </ValiditysPage>
    </Painel>
  );
};

export default Validitys;
