import * as XLSX from "xlsx";
import Table from "../../../../components/Table/Table";
import Painel from "../../../../components/Painel/Painel";

import useTitle from "../../../../hooks/useTitle";
import { useEffect, useRef, useState } from "react";
import { Button, Form, Input, InputRef } from "antd";
import { ProductType } from "../../../../types/types";
import { useFields } from "../../../../hooks/useFields";
import { useNotification } from "../../../../hooks/useNotification";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { setOpenCurrentMenu } from "../../../../redux/globalReducer/slice";
import { Container, ContainerInput, ImportProductPage, Label, ContainerButton } from "./styles";

interface ProductData {
  [key: string]: string | number | undefined; // Permite acesso dinâmico às propriedades
}

const ImportProduct = () => {
  useTitle("Importar produtos");

  const dispatch = useAppDispatch();
  const fileInputRef = useRef<InputRef>(null);

  const [data, setData] = useState<ProductType[]>([]);
  const [fields, setFields] = useState({ id: "", name: "", barcode: "" });
  const [message, setMessage] = useState("Por favor, selecione um arquivo!");

  const { addItemToArray, loading } = useFields("lojas");
  const { showNotification, contextHolder } = useNotification();
  const { loja } = useAppSelector((state) => state.globalReducer);

  const columns = [
    { title: "Código do produto", dataIndex: "id", rowScope: "row" },
    { title: "Código de barras", dataIndex: "barcode", key: "barcode" },
    { title: "Produto", dataIndex: "name", key: "name" },
  ];

  useEffect(() => {
    dispatch(setOpenCurrentMenu(["data", "data1"]));
  }, []);

  const handleFileUpload = () => {
    const file = fileInputRef.current?.input?.files?.[0]; // Usando .input para acessar o campo de arquivo
    if (!file) {
      setMessage("Por favor, selecione um arquivo!");
      // showNotification() can be added here
      return;
    }

    if (!fields.id || !fields.barcode || !fields.name) {
      setMessage("Preencha os campos da tabela!");
      showNotification("warning", "Atenção", "Preencha os campos da tabela!");
      return;
    }

    setMessage("");
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target?.result;
      if (typeof binaryStr !== "string") return;

      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      let jsonData: ProductData[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      if (!(fields.id in jsonData[0]) || !(fields.barcode in jsonData[0]) || !(fields.name in jsonData[0])) {
        setData([]);
        setMessage("Preencha os campos da tabela corretamente!");
        showNotification("warning", "Atenção", "Preencha os campos da tabela corretamente!");
        return;
      }

      const produtosCorrigidos = jsonData
        .map((item) => {
          if (item[fields.barcode]) {
            const codigoBarras = item[fields.barcode]!.toString();
            if (codigoBarras === "") return null;

            let barcodeCorrigido = codigoBarras;
            if (codigoBarras!.length <= loja?.lengthBarcode! && codigoBarras!.length >= 1) {
              barcodeCorrigido = "0".repeat(loja?.lengthBarcode! - codigoBarras!.length) + codigoBarras;
            }

            const idProduto = Number(item[fields.id]);
            if (isNaN(idProduto)) return null;

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
    setFields((prev) => ({ ...prev, [name]: value }));
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
    <Painel title="Importar produtos">
      <ImportProductPage>
        <Container direction="column">
          <h2>Nome dos campos na tabela</h2>
          <div style={{ width: "100%", gap: "40px", display: "flex", flexWrap: "wrap" }}>
            <ContainerInput>
              <Label>Cód. Produto: </Label>
              <Input name="id" value={fields.id} onChange={handleChange} placeholder="Cód. Produto" size="middle" />
            </ContainerInput>
            <ContainerInput>
              <Label>Cód. Barras: </Label>
              <Input name="barcode" value={fields.barcode} onChange={handleChange} placeholder="Cód. Barras" size="middle" />
            </ContainerInput>
            <ContainerInput>
              <Label>Produto: </Label>
              <Input name="name" value={fields.name} onChange={handleChange} placeholder="Produto" size="middle" />
            </ContainerInput>
          </div>
        </Container>

        <Container direction="column">
          <Form onFinish={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Form.Item name="file" rules={[{ required: true, message: "Por favor, escolha um arquivo!" }]}>
              <ContainerInput>
                <Label>Arquivo Excel:</Label>
                <Input ref={fileInputRef} name="file" type="file" accept=".xlsx, .xls, .csv" required />
              </ContainerInput>
            </Form.Item>

            <ContainerButton>
              <Button variant="outlined" color="primary" size="middle" onClick={handleFileUpload} disabled={loading}>
                Importar
              </Button>
              <Button type="primary" size="middle" onClick={handleSubmit} loading={loading} disabled={loading}>
                Cadastrar
              </Button>
            </ContainerButton>
          </Form>
          <Table dataSource={data} columns={columns} rowKey="id" />
        </Container>
      </ImportProductPage>
      {contextHolder}
    </Painel>
  );
};

export default ImportProduct;
