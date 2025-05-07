import { useState } from "react";
import { Form, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

import { InformacoesType } from "../../../types/types";
import { RoutesEnum } from "../../../enums/routes";
import { useNotification } from "../../../hooks/useNotification";
import { useDocument } from "../../../hooks/useDocument";
import Painel from "../../../components/Painel/Painel";
import {
  CreateStoreContainer,
  TitleWrapper,
  StyledForm,
  StyledInput,
  StyledInputNumber,
  SubmitButton,
  CreateStorePage,
  InputContainer,
  Label,
  InputConfiguration,
  AccessInputWrapper,
  AddEmailButton,
  AccessEmailRow,
  RemoveEmailButton,
} from "./styles";
import { useAppSelector } from "../../../hooks/store";

const { Title } = Typography;

const CreateStore = () => {
  const navigate = useNavigate();

  const { showNotification } = useNotification();
  const { insertDocument: insertStore } = useDocument("lojas");
  const { user } = useAppSelector((state) => state.globalReducer);

  const [loading, setLoading] = useState(false);
  const [accessEmails, setAccessEmails] = useState<string[]>([]);
  const [newAccessEmail, setNewAccessEmail] = useState<string>("");

  const handleAddAccessEmail = () => {
    const email = newAccessEmail.trim();
    if (email && !accessEmails.includes(email)) {
      setAccessEmails([...accessEmails, email]);
      setNewAccessEmail("");
    }
  };

  const handleRemoveAccessEmail = (emailToRemove: string) => {
    setAccessEmails(accessEmails.filter((email) => email !== emailToRemove));
  };

  const onFinish = async (values: any) => {
    setLoading(true);

    const novaLoja: InformacoesType = {
      uid: null,
      name: user?.name!,
      store: values.store,
      logs: [
        {
          id: 1,
          user: user?.email!,
          date: new Date().toLocaleString(),
          action: "Criação da loja",
          data: user?.name!,
        },
      ],
      access: [...accessEmails, user?.email!],
      createdBy: user?.email!,
      lengthBarcode: values.lengthBarcode,
      products: [],
      validitys: [],
      createdAt: Timestamp.now(),
    };

    try {
      await insertStore(novaLoja);
      showNotification("success", "Sucesso", "Loja criada com sucesso!");
      navigate(RoutesEnum.Dashboard);
    } catch (error) {
      console.error(error);
      showNotification("error", "Falha...", "Erro ao criar loja.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Painel title="Criar Loja">
      <CreateStorePage>
        <CreateStoreContainer>
          <TitleWrapper>
            <Title level={3}>Criar nova loja</Title>
          </TitleWrapper>
          <Form layout="vertical" onFinish={onFinish} component={StyledForm}>
            <Form.Item label="Nome da loja" name="store" rules={[{ required: true, message: "Informe o nome da loja" }]}>
              <StyledInput />
            </Form.Item>

            <InputContainer>
              <Label>Acesso (Emails):</Label>
              <AccessInputWrapper>
                <InputConfiguration placeholder="Adicionar email" value={newAccessEmail} onPressEnter={handleAddAccessEmail} onChange={(e) => setNewAccessEmail(e.target.value)} />
                <AddEmailButton type="primary" disabled={!newAccessEmail.trim() || accessEmails.includes(newAccessEmail.trim())} onClick={handleAddAccessEmail}>
                  Adicionar
                </AddEmailButton>
              </AccessInputWrapper>

              {accessEmails.map((email, index) => (
                <AccessEmailRow key={index}>
                  <InputConfiguration value={email} disabled />
                  <RemoveEmailButton danger onClick={() => handleRemoveAccessEmail(email)}>
                    Remover
                  </RemoveEmailButton>
                </AccessEmailRow>
              ))}
            </InputContainer>

            <Form.Item label="Quantidade de dígitos do código de barras" name="lengthBarcode" rules={[{ required: true, message: "Informe o tamanho do código de barras" }]}>
              <StyledInputNumber min={1} max={30} />
            </Form.Item>

            <Form.Item>
              <SubmitButton type="primary" htmlType="submit" loading={loading}>
                Criar Loja
              </SubmitButton>
            </Form.Item>
          </Form>
        </CreateStoreContainer>
      </CreateStorePage>
    </Painel>
  );
};

export default CreateStore;
