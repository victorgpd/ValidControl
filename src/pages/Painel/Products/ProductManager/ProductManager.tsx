import useTitle from "../../../../hooks/useTitle";
import Painel from "../../../../components/Painel/Painel";

import { useEffect, useState } from "react";
import { ProductType } from "../../../../types/types";
import { RoutesEnum } from "../../../../enums/routes";
import { useFields } from "../../../../hooks/useFields";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { setOpenCurrentMenu } from "../../../../redux/globalReducer/slice";
import { Container, Form, InputNew, Label, ButtonNew, ContainerInput } from "./styles";

const ProductManager = () => {
  useTitle("Cadastrar / Editar Produto");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const [product, setProduct] = useState<ProductType>({
    id: "",
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
    } else if (loja?.products && loja?.products?.filter((product) => product.id === id).length <= 0) {
      navigate(RoutesEnum.Products);
    } else {
      dispatch(setOpenCurrentMenu(["products", "product1"]));
      setEdit(true);

      console.log(loja?.products);
      const product = loja?.products?.filter((product) => product.id === id);
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
        id: newId.toString(),
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
    <Painel>
      <Container>
        <Form onSubmit={handleSubmit}>
          <ContainerInput>
            <Label>ID:</Label>
            <InputNew size="large" name="id" value={product.id} disabled onChange={handleChange} placeholder="Digite o ID" />
          </ContainerInput>

          <ContainerInput>
            <Label>Descrição do Produto:</Label>
            <InputNew size="large" name="name" value={product.name} onChange={handleChange} placeholder="Digite a descrição" />
          </ContainerInput>

          <ContainerInput>
            <Label>Código de Barras:</Label>
            <InputNew size="large" name="barcode" value={product.barcode} onChange={handleChange} placeholder="Digite o código de barras" />
          </ContainerInput>

          <ButtonNew htmlType="submit" type="primary" size="large" loading={loading}>
            {edit ? "Editar" : "Cadastrar"} Produto
          </ButtonNew>
        </Form>
      </Container>
    </Painel>
  );
};

export default ProductManager;
