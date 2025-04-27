import useTitle from "../../../../hooks/useTitle";
import Painel from "../../../../components/Painel/Painel";

import { useEffect, useState } from "react";
import { useModal } from "../../../../hooks/useModal";
import { Select, Spin, Form as FormAntd } from "antd";
import { RoutesEnum } from "../../../../enums/routes";
import { ValidityType } from "../../../../types/types";
import { useFields } from "../../../../hooks/useFields";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { setOpenCurrentMenu } from "../../../../redux/globalReducer/slice";
import { Container, InputNew, Label, ButtonNew, ContainerInput, ContainerInputButton } from "./styles";

const ValidityManager = () => {
  useTitle("Cadastrar / Editar Validade");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [validity, setValidity] = useState<ValidityType>({
    id: 0,
    name: "",
    barcode: "",
    date: "",
    quantity: 0,
  });

  const [edit, setEdit] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { id } = useParams();
  const { openModal, Modal } = useModal();
  const { loja } = useAppSelector((state) => state.globalReducer);
  const { addItemToArray, updateFieldValue, loading } = useFields("lojas");

  useEffect(() => {
    if (!id) {
      navigate(RoutesEnum.Validitys_Create);
      dispatch(setOpenCurrentMenu(["validitys", "validity2"]));
      setEdit(false);
    } else if (loja?.validitys && loja?.validitys?.filter((validity) => validity.id === Number(id)).length <= 0) {
      navigate(RoutesEnum.Validitys);
    } else {
      dispatch(setOpenCurrentMenu(["validitys", "validity1"]));
      setEdit(true);

      let validitys = loja?.validitys?.filter((validity) => validity.id === Number(id))[0];
      if (validitys) {
        setValidity(validitys);
      }
    }
  }, [loja]);

  useEffect(() => {
    if (!edit) {
      const newId = loja?.validitys?.length ? Number(loja?.validitys[loja?.validitys?.length - 1].id) + 1 : 1;
      setValidity((prev) => ({
        ...prev,
        id: newId,
      }));
    }
  }, [loja]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValidity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBarcodeChange = (value: string | undefined) => {
    if (!value) {
      setValidity((prev) => ({
        ...prev,
        barcode: "",
        name: "",
      }));
      return;
    }

    setValidity((prev) => ({
      ...prev,
      barcode: value,
    }));

    const product = loja?.products?.find((p) => p.barcode === value);
    if (product) {
      setValidity((prev) => ({
        ...prev,
        name: product.name,
      }));
      setDisabled(true);
    } else {
      setValidity((prev) => ({
        ...prev,
        name: "",
      }));
      setDisabled(false);
    }
  };

  const handleSubmit = async () => {
    if (!loja?.idDocument) return;

    const productExists = loja.products?.some((p) => p.barcode === validity.barcode);

    if (!edit && !productExists) {
      openModal({
        title: "Produto não encontrado",
        message: `O código de barras ${validity.barcode} não está cadastrado. Deseja cadastrar este produto agora?`,
        okText: "Cadastrar Produto",
        cancelText: "Cancelar",
        onConfirm: async () => {
          const newProductId = loja.products?.length ? Number(loja.products[loja.products.length - 1].id) + 1 : 1;
          const newProduct = { id: newProductId, name: validity.name, barcode: validity.barcode };
          await addItemToArray(loja.idDocument!, "products", newProduct);

          await addItemToArray(loja.idDocument!, "validitys", validity);
          navigate(RoutesEnum.Validitys);
        },
      });
    } else {
      if (edit) {
        if (!loja.validitys) return;
        const updatedProducts = loja.validitys.map((p) => (p.id === validity.id ? validity : p));
        await updateFieldValue(loja.idDocument, "validitys", updatedProducts, validity);
      } else {
        await addItemToArray(loja.idDocument, "validitys", validity);
      }
      navigate(RoutesEnum.Validitys);
    }
  };

  return (
    <Painel>
      <Modal />
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
              <InputNew size="large" name="id" value={validity.id} disabled onChange={handleChange} placeholder="Digite o ID" />
            </ContainerInput>
          </FormAntd.Item>

          <FormAntd.Item name="barcode" style={{ width: "100%" }} rules={[{ required: false, message: "Por favor, selecione o código de barras!" }]}>
            <ContainerInput>
              <Label>Código de Barras:</Label>
              <ContainerInputButton>
                {loja?.products ? (
                  <Select
                    showSearch
                    allowClear
                    size="large"
                    placeholder="Selecione ou digite o código de barras"
                    value={validity.barcode || undefined}
                    onChange={(value) => handleBarcodeChange(value)}
                    onSearch={(text) => {
                      setValidity((prev) => ({
                        ...prev,
                        barcode: text,
                      }));
                      const product = loja?.products?.find((p) => p.barcode === text);
                      if (product) {
                        setValidity((prev) => ({
                          ...prev,
                          name: product.name,
                        }));
                        setDisabled(true);
                      } else {
                        setValidity((prev) => ({
                          ...prev,
                          name: "",
                        }));
                        setDisabled(false);
                      }
                    }}
                    onSelect={(value) => {
                      // Lógica para preencher o nome do produto ao selecionar o código de barras
                      const product = loja?.products?.find((p) => p.barcode === value);
                      if (product) {
                        setValidity((prev) => ({
                          ...prev,
                          barcode: value,
                          name: product.name,
                        }));
                        setDisabled(true);
                      }
                    }}
                    options={[
                      ...(loja.products?.map((product) => ({
                        value: product.barcode,
                        label: `${product.name} (${product.barcode})`,
                      })) || []),
                      ...(validity.barcode && !loja.products?.some((p) => p.barcode === validity.barcode) ? [{ value: validity.barcode, label: `Novo código: ${validity.barcode}` }] : []),
                    ]}
                    filterOption={(input, option) => (option?.label as string).toLowerCase().includes(input.toLowerCase())}
                    style={{ width: "100%" }}
                    optionLabelProp="value"
                  />
                ) : (
                  <Spin spinning />
                )}
              </ContainerInputButton>
            </ContainerInput>
          </FormAntd.Item>

          <FormAntd.Item name="name" style={{ width: "100%" }} rules={[{ required: false, message: "Por favor, insira a descrição do produto!" }]}>
            <ContainerInput>
              <Label>Descrição do Produto:</Label>
              <InputNew disabled={disabled} size="large" name="name" value={validity.name} onChange={handleChange} placeholder="Digite a descrição" required />
            </ContainerInput>
          </FormAntd.Item>

          <FormAntd.Item name="quantity" style={{ width: "100%" }} rules={[{ required: true, min: 1, message: "Por favor, insira a quantidade!" }]}>
            <ContainerInput>
              <Label>Quant. de Produtos:</Label>
              <InputNew type="number" size="large" name="quantity" value={validity.quantity} onChange={handleChange} placeholder="Digite a quantidade" />
            </ContainerInput>
          </FormAntd.Item>

          <FormAntd.Item name="date" style={{ width: "100%" }} rules={[{ required: true, message: "Por favor, insira a data de validade!" }]}>
            <ContainerInput>
              <Label>Data de Validade:</Label>
              <InputNew type="date" size="large" name="date" value={!edit ? formatDate(Number(validity.date)) : validity.date} onChange={handleChange} />
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

export default ValidityManager;
