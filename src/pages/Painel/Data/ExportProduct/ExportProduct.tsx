import useTitle from "../../../../hooks/useTitle";
import Table from "../../../../components/Table/Table";
import Painel from "../../../../components/Painel/Painel";

import { useEffect, useState } from "react";
import { ProductType } from "../../../../types/types";
import { exportToExcel } from "../../../../utils/exportExcel";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { setOpenCurrentMenu } from "../../../../redux/globalReducer/slice";
import { ExportProductPage, Container, ContainerButton, Button } from "./styles";

const ExportProduct = () => {
  useTitle("Exportar produtos");

  const dispatch = useAppDispatch();

  const { loja } = useAppSelector((state) => state.globalReducer);
  const [products, setProducts] = useState<ProductType[]>([]);

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
  ];

  useEffect(() => {
    dispatch(setOpenCurrentMenu(["data", "data2"]));
  }, []);

  useEffect(() => {
    if (!loja?.products) return;
    setProducts(loja?.products);
  }, [loja]);

  const handleExport = () => {
    exportToExcel(products, "produtos_cadastrados");
  };

  return (
    <Painel title="Exportar produtos">
      <ExportProductPage>
        <Container direction="column">
          <Table dataSource={products} columns={columns} rowKey="id" />
          <ContainerButton>
            <Button onClick={handleExport}>Exportar para Excel</Button>
          </ContainerButton>
        </Container>
      </ExportProductPage>
    </Painel>
  );
};

export default ExportProduct;
