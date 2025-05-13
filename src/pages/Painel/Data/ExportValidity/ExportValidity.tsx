import useTitle from "../../../../hooks/useTitle";
import Table from "../../../../components/Table/Table";
import Painel from "../../../../components/Painel/Painel";

import { useEffect, useState } from "react";
import { ValidityType } from "../../../../types/types";
import { exportToExcel } from "../../../../utils/exportExcel";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { setOpenCurrentMenu } from "../../../../redux/globalReducer/slice";
import { ExportValidityPage, Container, ContainerButton, Button } from "./styles";

const ExportValiditys = () => {
  useTitle("Exportar validades");

  const dispatch = useAppDispatch();

  const { loja } = useAppSelector((state) => state.globalReducer);
  const [validitys, setValiditys] = useState<ValidityType[]>([]);

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
  ];

  useEffect(() => {
    dispatch(setOpenCurrentMenu(["data", "data3"]));
  }, []);

  useEffect(() => {
    if (!loja?.validitys) return;
    setValiditys(loja?.validitys);
  }, [loja]);

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

  const handleExport = () => {
    exportToExcel(validitys, "validades_cadastradas");
  };

  return (
    <Painel title="Exportar validades">
      <ExportValidityPage>
        <Container direction="column">
          <Table dataSource={validitys} columns={columns} rowKey="id" />
          <ContainerButton>
            <Button onClick={handleExport}>Exportar para Excel</Button>
          </ContainerButton>
        </Container>
      </ExportValidityPage>
    </Painel>
  );
};

export default ExportValiditys;
