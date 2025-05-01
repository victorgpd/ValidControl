import useTitle from "../../../../hooks/useTitle";
import Painel from "../../../../components/Painel/Painel";

import { useEffect, useState } from "react";
import { ProductType } from "../../../../types/types";
import { RoutesEnum } from "../../../../enums/routes";
import { useFields } from "../../../../hooks/useFields";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { setOpenCurrentMenu } from "../../../../redux/globalReducer/slice";
import { Container, InputNew, Label, ButtonNew, ContainerInput } from "./styles";
import { Form as FormAntd } from "antd";

const ProductManager = () => {
  useTitle("Cadastrar / Editar Produto");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const [product, setProduct] = useState<ProductType>({
    id: 0,
    name: "",
    barcode: "",
  });

  const [edit, setEdit] = useState(false);

  const { loja } = useAppSelector((state) => state.globalReducer);
  const { addItemToArray, updateFieldValue, loading } = useFields("lojas");

  useEffect(() => {
    if (!id) {
      navigate(RoutesEnum.Product_Create);
      dispatch(setOpenCurrentMenu(["products", "product2"]));
      setEdit(false);
    } else if (loja?.products && loja?.products?.filter((product) => product.id === Number(id)).length <= 0) {
      navigate(RoutesEnum.Products);
    } else {
      dispatch(setOpenCurrentMenu(["products", "product1"]));
      setEdit(true);

      const product = loja?.products?.filter((product) => product.id === Number(id));
      if (product) {
        setProduct(product[0]);
      }
    }
  }, [loja]);

  useEffect(() => {
    if (!edit) {
      const newId = loja?.products?.length ? Number(loja?.products[loja?.products?.length - 1].id) + 1 : 1;
      setProduct((prev) => ({
        ...prev,
        id: newId,
      }));
    }
  }, [loja]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loja?.idDocument) return;

    if (edit) {
      if (!loja.products) return;
      const updatedProducts = loja.products.map((p) => (p.id === product.id ? product : p));

      await updateFieldValue(loja.idDocument, "products", updatedProducts);
    } else {
      if (!loja.products) return;
      await addItemToArray(loja?.idDocument, "products", product);
    }
    navigate(RoutesEnum.Products);
  };

  return (
    <Painel title={edit ? "Editar Produto" : "Cadastrar Produto"}>
      <Container>
        <FormAntd
          style={{
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
          }}
          onFinish={handleSubmit}
        >
          <FormAntd.Item name="id" style={{ width: "100%" }}>
            <ContainerInput>
              <Label>ID:</Label>
              <InputNew size="large" name="id" value={product.id} disabled onChange={handleChange} placeholder="Digite o ID" />
            </ContainerInput>
          </FormAntd.Item>

          <FormAntd.Item name="barcode" style={{ width: "100%" }} rules={[{ required: true, message: "Por favor, insira o código de barras!" }]}>
            <ContainerInput>
              <Label>Código de Barras:</Label>
              <InputNew size="large" name="barcode" value={product.barcode} onChange={handleChange} placeholder="Digite o código de barras" />
            </ContainerInput>
          </FormAntd.Item>

          <FormAntd.Item name="name" style={{ width: "100%" }} rules={[{ required: true, message: "Por favor, insira a descrição do produto!" }]}>
            <ContainerInput>
              <Label>Descrição do Produto:</Label>
              <InputNew size="large" name="name" value={product.name} onChange={handleChange} placeholder="Digite a descrição" />
            </ContainerInput>
          </FormAntd.Item>

          <ButtonNew htmlType="submit" type="primary" size="large" loading={loading}>
            {edit ? "Editar" : "Cadastrar"} Produto
          </ButtonNew>
        </FormAntd>
      </Container>
    </Painel>
  );
};

export default ProductManager;
