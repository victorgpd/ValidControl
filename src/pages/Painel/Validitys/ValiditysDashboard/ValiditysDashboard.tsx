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
import { ButtonAdd, ButtonsTable, ContainerButtonsTable, ValiditysPage, TableContainer } from "./styles";

const Validitys = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loja } = useAppSelector((state) => state.globalReducer);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
      render: (date: string) => new Date(date).toLocaleDateString("pt-BR"),
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

    await removeItemFromArray(docId, "validitys", itemToRemove);
  }

  useEffect(() => {
    dispatch(setOpenCurrentMenu(["validitys", "validity1"]));
  }, []);

  return (
    <Painel>
      <ValiditysPage>
        <h2>Validades cadastrades</h2>
        <TableContainer>
          <ButtonAdd icon={<AppstoreAddOutlined />} onClick={() => navigate(RoutesEnum.Validitys_Create)} color="primary" variant="solid">
            Novo
          </ButtonAdd>
          {loja?.validitys && <Table dataSource={loja?.validitys} columns={columns} />}
        </TableContainer>
      </ValiditysPage>
    </Painel>
  );
};

export default Validitys;
