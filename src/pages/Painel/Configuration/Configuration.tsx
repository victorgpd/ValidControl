import useTitle from "../../../hooks/useTitle";
import Painel from "../../../components/Painel/Painel";

import { Button } from "antd";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { auth } from "../../../firebase/config";
import { updateEmail, updateProfile } from "firebase/auth";
import { setUser } from "../../../redux/globalReducer/slice";
import { useNotification } from "../../../hooks/useNotification";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { ConfigurationContainer, ConfigurationPage, ProfileSection, Image, ImageContainer, InputConfiguration, InputsContainer, InputContainer, Label } from "./styles";
import { useDocument } from "../../../hooks/useDocument";

const Configuration = () => {
  useTitle("Configurações");

  const dispatch = useAppDispatch();
  const { updateDocument } = useDocument("lojas");
  const { contextHolder, showNotification } = useNotification();
  const { user, loja } = useAppSelector((state) => state.globalReducer);

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [loadingLoja, setLoadingLoja] = useState(false);
  const [disabledLoja, setDisabledLoja] = useState(true);
  const [disabledInputsLoja, setDisabledInputsLoja] = useState(true);
  const [userConfiguration, setUserConfiguration] = useState({
    name: "",
    email: "",
    login: "",
    uid: "",
    image: "",
  });
  const [lojaConfiguration, setLojaConfiguration] = useState({
    store: "",
    lengthBarcode: 0,
  });

  useEffect(() => {
    if (user) {
      setUserConfiguration({
        name: user.name ?? "",
        email: user.email ?? "",
        login: user.email ?? "",
        uid: user.uid ?? "",
        image: user.image ?? "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (loja?.createdBy === user?.email) {
      setDisabledInputsLoja(false);
    }

    if (loja) {
      setLojaConfiguration({
        store: loja.store ?? "",
        lengthBarcode: loja.lengthBarcode ?? 0,
      });
    }
  }, [loja]);

  useEffect(() => {
    if (userConfiguration.name === "" || userConfiguration.name.length < 2) {
      setDisabled(true);
    } else if (user?.name !== userConfiguration.name) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [userConfiguration, user]);

  useEffect(() => {
    if (lojaConfiguration.store === "" || lojaConfiguration.store.length < 4 || lojaConfiguration.lengthBarcode === 0 || lojaConfiguration.lengthBarcode < 1) {
      setDisabledLoja(true);
    } else if (loja?.store !== lojaConfiguration.store || loja?.lengthBarcode !== lojaConfiguration.lengthBarcode) {
      setDisabledLoja(false);
    } else {
      setDisabledLoja(true);
    }
  }, [lojaConfiguration, loja]);

  function formatDate(date: string | Timestamp | null | undefined) {
    if (!date) return "Indisponível";

    if (typeof date === "string") {
      return new Date(date).toLocaleDateString("pt-BR");
    }
    const localDate = new Date(date + "T00:00:00"); // Adiciona um horário para evitar problemas de fuso horário
    return localDate.toLocaleDateString("pt-BR");
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserConfiguration((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputLojaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLojaConfiguration((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditProfile = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      showNotification("error", "Erro", "Usuário não autenticado.");
      return;
    }

    setLoading(true);

    try {
      await updateProfile(currentUser, {
        displayName: userConfiguration.name,
        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(userConfiguration.name)}`,
      });

      if (currentUser.email !== userConfiguration.email) {
        await updateEmail(currentUser, userConfiguration.email);
      }

      dispatch(
        setUser({
          name: userConfiguration.name,
          email: userConfiguration.email,
          uid: currentUser.uid,
          image: `https://ui-avatars.com/api/?name=${encodeURIComponent(userConfiguration.name)}`,
        })
      );

      showNotification("success", "Sucesso", "Perfil atualizado com sucesso.");
    } catch (error) {
      console.error(error);
      showNotification("error", "Erro", "Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditLoja = async () => {
    setLoadingLoja(true);

    try {
      await updateDocument(loja?.idDocument!, lojaConfiguration);
      showNotification("success", "Sucesso", "Loja atualizada com sucesso.");
    } catch (error) {
      console.error(error);
      showNotification("error", "Erro", "Erro ao atualizar loja.");
    } finally {
      setLoadingLoja(false);
    }
  };

  return (
    <Painel>
      {contextHolder}
      <ConfigurationPage>
        <ConfigurationContainer heightValue="auto">
          <h2>Meu Perfil</h2>

          <ProfileSection>
            <ImageContainer>
              <Image src={userConfiguration.image} alt="Imagem de perfil" />
            </ImageContainer>
          </ProfileSection>

          <InputsContainer>
            <InputContainer>
              <Label>Nome:</Label>
              <InputConfiguration placeholder="Nome" name="name" value={userConfiguration.name} onPressEnter={handleEditProfile} onChange={handleInputChange} />
            </InputContainer>

            <InputContainer>
              <Label>Email:</Label>
              <InputConfiguration placeholder="Email" name="email" value={userConfiguration.email} disabled />
            </InputContainer>

            <InputContainer>
              <Label>Login:</Label>
              <InputConfiguration placeholder="Login" name="login" value={userConfiguration.login} disabled />
            </InputContainer>

            <InputContainer>
              <Label>UID:</Label>
              <InputConfiguration placeholder="UID" name="uid" value={userConfiguration.uid} disabled />
            </InputContainer>
          </InputsContainer>

          <Button onClick={handleEditProfile} loading={loading} disabled={disabled} type="primary" style={{ width: "100px" }}>
            Salvar
          </Button>
        </ConfigurationContainer>

        <ConfigurationContainer heightValue="auto">
          <h2>Informações da Loja</h2>

          {loja ? (
            <InputsContainer>
              <InputContainer>
                <Label>Nome da Loja:</Label>
                <InputConfiguration name="store" value={lojaConfiguration.store ?? "Não informado"} disabled={disabledInputsLoja} onChange={handleInputLojaChange} />
              </InputContainer>

              <InputContainer>
                <Label>Tamanho do Código de Barras:</Label>
                <InputConfiguration name="lengthBarcode" type="number" value={lojaConfiguration.lengthBarcode ?? "Não informado"} disabled={disabledInputsLoja} onChange={handleInputLojaChange} />
              </InputContainer>

              <InputContainer>
                <Label>Criado Por:</Label>
                <InputConfiguration value={loja.createdBy ?? "Não informado"} disabled />
              </InputContainer>

              <InputContainer>
                <Label>Quantidade de Produtos:</Label>
                <InputConfiguration value={loja.products?.length ?? 0} disabled />
              </InputContainer>

              <InputContainer>
                <Label>Data de Criação:</Label>
                <InputConfiguration value={formatDate(loja.createdAt) ?? "Indisponível"} disabled />
              </InputContainer>
            </InputsContainer>
          ) : (
            <p style={{ color: "#999" }}>Nenhuma informação disponível da loja.</p>
          )}

          <Button onClick={handleEditLoja} loading={loadingLoja} disabled={disabledLoja} type="primary" style={{ width: "100px" }}>
            Salvar
          </Button>
        </ConfigurationContainer>
      </ConfigurationPage>
    </Painel>
  );
};

export default Configuration;
