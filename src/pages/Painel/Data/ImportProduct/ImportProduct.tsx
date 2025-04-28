import useTitle from "../../../../hooks/useTitle";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Painel from "../../../../components/Painel/Painel";
import { Container, ContainerInput, ImportProductPage, Label } from "./styles";
import { Button, Form, Input, InputRef } from "antd";
import Table from "../../../../components/Table/Table";
import { useFields } from "../../../../hooks/useFields";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { ProductType } from "../../../../types/types";
import { useNotification } from "../../../../hooks/useNotification";
import { setOpenCurrentMenu } from "../../../../redux/globalReducer/slice";

const ImportProduct = () => {
  useTitle("Importar produtos");

  const dispatch = useAppDispatch();

  const fileInputRef = React.useRef<InputRef>(null);

  const [message, setMessage] = useState("Por favor, selecione um arquivo!");
  const [data, setData] = useState<ProductType[]>([]);
  const [fields, setFields] = useState({
    id: "",
    name: "",
    barcode: "",
  });

  const { addItemToArray, loading } = useFields("lojas");
  const { showNotification, contextHolder } = useNotification();
  const { loja } = useAppSelector((state) => state.globalReducer);

  const columns = [
    {
      title: "Código do produto",
      dataIndex: "id",
      rowScope: "row",
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
  ];

  useEffect(() => {
    dispatch(setOpenCurrentMenu(["data", "data1"]));
  }, []);

  const handleFileUpload = () => {
    const file = fileInputRef.current?.input?.files?.[0];
    if (!file) {
      setMessage("Por favor, selecione um arquivo!");
      showNotification("warning", "Atenção", "Por favor, selecione um arquivo!");
      return;
    }

    if (!fields.id || !fields.barcode || !fields.name) {
      setMessage("Preencha os campos da tabela!");
      showNotification("warning", "Atenção", "Preencha os campos da tabela!");
      return; // Interrompe a execução da função
    }

    setMessage("");

    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target?.result;
      if (typeof binaryStr !== "string") return;

      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      let jsonData: { [key: string]: string | number }[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      if (!(fields.id in jsonData[0]) || !(fields.barcode in jsonData[0]) || !(fields.name in jsonData[0])) {
        setData([]);
        setMessage("Preencha os campos da tabela corretamente!");
        showNotification("warning", "Atenção", "Preencha os campos da tabela corretamente!");

        return;
      }

      const produtosCorrigidos: ProductType[] = jsonData
        .map((item) => {
          if (item[fields.barcode]) {
            const codigoBarras = item[fields.barcode].toString();

            if (codigoBarras === "") {
              return null;
            }

            let barcodeCorrigido = codigoBarras;
            if (codigoBarras.length <= loja?.lengthBarcode! && codigoBarras.length >= 1) {
              barcodeCorrigido = "0".repeat(loja?.lengthBarcode! - codigoBarras.length) + codigoBarras;
            }

            const idProduto = Number(item[fields.id]);

            if (isNaN(idProduto)) {
              return null; // Se não for número, descarta
            }

            return {
              id: idProduto,
              name: item["Produto"] || "",
              barcode: barcodeCorrigido,
            };
          }

          return null;
        })
        .filter((item): item is ProductType => item !== null);

      setData(produtosCorrigidos);
    };

    reader.readAsBinaryString(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (message !== "") {
      showNotification("warning", "Atenção", message);
      return;
    }

    if (!loja?.idDocument) return;

    await addItemToArray(loja?.idDocument, "products", data);

    if (fileInputRef.current?.input) {
      fileInputRef.current.input.value = "";
    }

    setData([]);
  };

  return (
    <Painel>
      <ImportProductPage>
        <Container direction="column">
          <h2>Nome dos campos na tabela</h2>
          <div style={{ width: "100%", gap: "40px", display: "flex", flexFlow: "row wrap" }}>
            <ContainerInput style={{ maxWidth: "400px" }}>
              <Label>Cód. Produto: </Label>
              <Input name="id" value={fields.id} onChange={handleChange} placeholder="Cód. Produto" size="middle" style={{ width: "250px" }} />
            </ContainerInput>
            <ContainerInput style={{ maxWidth: "400px" }}>
              <Label>Cód. Barras: </Label>
              <Input name="barcode" value={fields.barcode} onChange={handleChange} placeholder="Cód. Barras" size="middle" style={{ width: "250px" }} />
            </ContainerInput>
            <ContainerInput style={{ maxWidth: "400px" }}>
              <Label>Produto: </Label>
              <Input name="name" value={fields.name} onChange={handleChange} placeholder="Produto" size="middle" style={{ width: "250px" }} />
            </ContainerInput>
          </div>
        </Container>

        <Container direction="column">
          <Form
            style={{
              width: "100%",
              gap: "10px",
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "center",
            }}
            onFinish={handleSubmit}
          >
            <Form.Item name="file" rules={[{ required: true, message: "Por favor, escolha um arquivo!" }]}>
              <ContainerInput>
                <h3 style={{ minWidth: "116px" }}>Arquivo Excel:</h3>
                <Input ref={fileInputRef} name="file" type="file" size="middle" style={{ width: "100%", maxWidth: "400px" }} accept=".xlsx, .xls, .csv" required />
              </ContainerInput>
            </Form.Item>
            <Button variant="outlined" color="primary" size="middle" style={{ width: "100%", maxWidth: "120px" }} disabled={loading} onClick={handleFileUpload}>
              Importar
            </Button>
            <Button type="primary" size="middle" style={{ width: "100%", maxWidth: "120px" }} loading={loading} disabled={loading} onClick={handleSubmit}>
              Cadastrar
            </Button>
          </Form>
          <Table dataSource={data} columns={columns} key={"Cod. Interno"} rowKey={"id"} />
        </Container>
      </ImportProductPage>
      {contextHolder}
    </Painel>
  );
};

export default ImportProduct;
