import useTitle from "../../../../hooks/useTitle";
import Table from "../../../../components/Table/Table";
import Painel from "../../../../components/Painel/Painel";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../../hooks/useModal";
import { ProductType, ValidityType } from "../../../../types/types";
import { RoutesEnum } from "../../../../enums/routes";
import { useFields } from "../../../../hooks/useFields";
import { useNotification } from "../../../../hooks/useNotification";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { setOpenCurrentMenu } from "../../../../redux/globalReducer/slice";
import { AppstoreAddOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ButtonAdd, ButtonsTable, ContainerButtonsTable, ValiditysPage, TableContainer } from "./styles";
import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";

const Validitys = () => {
  useTitle("Validades");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { openModal, Modal } = useModal();
  const { removeItemFromArray } = useFields("lojas");
  const { showNotification, contextHolder } = useNotification();
  const { loja } = useAppSelector((state) => state.globalReducer);

  const [filter, setFilter] = useState<"todos" | "aVencer" | "vencidos">("todos");

  function handleStatus(validityDate: string): string {
    const expiryDate = new Date(validityDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = expiryDate.getTime() - today.getTime();
    const remainingDays = Math.ceil(diffTime / (1000 * 3600 * 24));

    if (remainingDays > 0) {
      return `${remainingDays} dias restantes`;
    } else if (remainingDays === 0) {
      return "Hoje";
    } else {
      return `${Math.abs(remainingDays)} dias vencido(s)`;
    }
  }

  const filteredData = useMemo(() => {
    if (!loja?.validitys) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return loja.validitys.filter((item) => {
      if (!item.date) return false;

      const itemDate = new Date(item.date + "T00:00:00");

      if (filter === "aVencer") return itemDate >= today;
      if (filter === "vencidos") return itemDate < today;
      return true;
    });
  }, [loja?.validitys, filter]);

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
        const localDate = new Date(date + "T00:00:00");
        return localDate.toLocaleDateString("pt-BR");
      },
    },
    {
      title: "Dias restantes",
      dataIndex: "status",
      key: "status",
      render: (_: any, props: ValidityType) => (
        <span
          style={{
            color: handleStatus(props.date).includes("vencido") ? "#F04444" : "#F59E4A",
          }}
        >
          {handleStatus(props.date)}
        </span>
      ),
    },
    {
      title: "Ações",
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

  async function handleRemove(docId: string | undefined, itemToRemove: ProductType) {
    if (!docId) return;

    openModal({
      title: "Excluir validade",
      message: `Tem certeza que deseja excluir a validade?<br />ID: ${itemToRemove.id}<br />Produto: ${itemToRemove.name}?`,
      okText: "Excluir",
      cancelText: "Cancelar",
      onConfirm: async () => {
        await removeItemFromArray(docId, "validitys", itemToRemove);
        showNotification("success", "Sucesso", "Validade excluída com sucesso.");
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
        <TableContainer>
          <h2>Validades cadastradas</h2>

          <ContainerButtonsTable>
            <Radio.Group onChange={(e: RadioChangeEvent) => setFilter(e.target.value)} value={filter} buttonStyle="solid">
              <Radio.Button value="todos">Todos</Radio.Button>
              <Radio.Button value="aVencer">A vencer</Radio.Button>
              <Radio.Button value="vencidos">Vencidos</Radio.Button>
            </Radio.Group>

            <ButtonAdd icon={<AppstoreAddOutlined />} onClick={() => navigate(RoutesEnum.Validitys_Create)} color="primary" variant="solid">
              Novo
            </ButtonAdd>
          </ContainerButtonsTable>

          <Table dataSource={filteredData} columns={columns} rowKey="id" />
        </TableContainer>
      </ValiditysPage>
    </Painel>
  );
};

export default Validitys;
