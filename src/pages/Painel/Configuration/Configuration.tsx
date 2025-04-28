import { useEffect, useState } from "react";
import Painel from "../../../components/Painel/Painel";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import useTitle from "../../../hooks/useTitle";
import { ConfigurationContainer, ConfigurationPage, ProfileSection, Image, ImageContainer, InputConfiguration, InputContainer } from "./styles";
import { Button } from "antd";
import { updateEmail, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase/config";
import { useNotification } from "../../../hooks/useNotification";
import { setUser } from "../../../redux/globalReducer/slice";

const Configuration = () => {
  useTitle("Configurações");

  const dispatch = useAppDispatch();

  const { contextHolder, showNotification } = useNotification();
  const { user } = useAppSelector((state) => state.globalReducer);

  const [loading, setLoading] = useState(false);
  const [userConfiguration, setUserConfiguration] = useState({
    name: "",
    email: "",
    login: "",
    uid: "",
    image: "",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserConfiguration((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditProfile = async () => {
    setLoading(true);
    const currentUser = auth.currentUser;
    if (!currentUser) return;

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
      showNotification("error", "Erro", "Erro ao atualizar perfil.");
    }
    setLoading(false);
  };

  return (
    <Painel>
      {contextHolder}
      <ConfigurationPage>
        <ConfigurationContainer heightValue="400px">
          <h2>Meu Perfil</h2>

          <ProfileSection>
            <ImageContainer>
              <Image src={userConfiguration.image || "/default-profile.png"} alt="Imagem de perfil" />
            </ImageContainer>
          </ProfileSection>

          <InputContainer>
            <InputConfiguration placeholder="Nome" name="name" value={userConfiguration.name} onChange={handleInputChange} />
            <InputConfiguration placeholder="Login" name="login" value={userConfiguration.login} onChange={handleInputChange} />
            <InputConfiguration placeholder="Email" name="email" value={userConfiguration.email} onChange={handleInputChange} />
            <InputConfiguration placeholder="UID" name="uid" value={userConfiguration.uid} disabled />
          </InputContainer>

          <Button onClick={handleEditProfile} loading={loading} type="primary" style={{ width: "100px" }}>
            Salvar
          </Button>
        </ConfigurationContainer>
      </ConfigurationPage>
    </Painel>
  );
};

export default Configuration;
