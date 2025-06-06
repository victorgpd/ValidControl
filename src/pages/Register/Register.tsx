import Screen from "../../components/Screen/Screen";

import useAuthentication from "../../hooks/useAuthentication";

import { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { LockOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons";
import { Image, ImageContainer, RegisterContainer, RegisterContent, RegisterForm, RegisterPage, RegisterTitle } from "./styles";
import useTitle from "../../hooks/useTitle";
import { RoutesEnum } from "../../enums/routes";
import { useNotification } from "../../hooks/useNotification";
import { useAppDispatch } from "../../hooks/store";
import { setOpenCurrentMenu } from "../../redux/globalReducer/slice";

const Register = () => {
  useTitle("Cadastrar-se");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [register, setRegister] = useState({
    nameStore: "",
    name: "",
    email: "",
    password: "",
  });

  const { contextHolder } = useNotification();
  const { register: RegisterFirebase, watchAuthState, loading } = useAuthentication();

  useEffect(() => {
    const unsubscribe = watchAuthState(navigate);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    dispatch(setOpenCurrentMenu(["register"]));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegister({ ...register, [event.target.name]: event.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await RegisterFirebase(register);
    if (success) {
      navigate(RoutesEnum.Home);
    }
  };

  return (
    <Screen>
      {contextHolder}
      <RegisterPage>
        <RegisterContainer>
          <ImageContainer>
            <Image src="./images/login.png" alt="Logo" />
          </ImageContainer>

          <RegisterContent>
            <RegisterTitle>Cadastrar-se</RegisterTitle>
            <RegisterForm onSubmit={handleRegister}>
              <Input
                variant="underlined"
                prefix={<ShopOutlined />}
                style={{ fontSize: "15px" }}
                type="name"
                id="nameStore"
                name="nameStore"
                placeholder="Nome da loja"
                value={register.nameStore}
                onChange={handleChange}
                required
              />
              <Input
                variant="underlined"
                prefix={<UserOutlined />}
                style={{ fontSize: "15px" }}
                type="name"
                id="name"
                name="name"
                placeholder="Nome"
                value={register.name}
                onChange={handleChange}
                required
              />
              <Input
                variant="underlined"
                prefix={<UserOutlined />}
                style={{ fontSize: "15px" }}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={register.email}
                onChange={handleChange}
                required
              />

              <Input
                variant="underlined"
                prefix={<LockOutlined />}
                style={{ fontSize: "15px" }}
                type="password"
                id="password"
                name="password"
                placeholder="Senha"
                value={register.password}
                onChange={handleChange}
                required
              />

              <Button htmlType="submit" color="cyan" loading={loading} variant="solid">
                Entrar
              </Button>
            </RegisterForm>
          </RegisterContent>
        </RegisterContainer>
      </RegisterPage>
    </Screen>
  );
};

export default Register;
