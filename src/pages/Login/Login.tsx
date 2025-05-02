import ImageLogin from "../../images/login.png";
import Screen from "../../components/Screen/Screen";

import useAuthentication from "../../hooks/useAuthentication";

import { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { UserType } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Image, ImageContainer, LoginContainer, LoginContent, LoginForm, LoginPage, LoginTitle } from "./styles";
import useTitle from "../../hooks/useTitle";
import { RoutesEnum } from "../../enums/routes";
import { useNotification } from "../../hooks/useNotification";
import { useAppDispatch } from "../../hooks/store";
import { setOpenCurrentMenu } from "../../redux/globalReducer/slice";

const Login = () => {
  useTitle("Login");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, setLogin] = useState<UserType>({
    email: "",
    password: "",
  });

  const { contextHolder } = useNotification();
  const { login: loginFirebase, watchAuthState, loading } = useAuthentication();

  useEffect(() => {
    const unsubscribe = watchAuthState(navigate);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    dispatch(setOpenCurrentMenu(["login"]));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await loginFirebase(login.email, login.password);
    if (success) {
      navigate(RoutesEnum.Home);
    }
  };

  return (
    <Screen>
      <LoginPage>
        {contextHolder}
        <LoginContainer>
          <ImageContainer>
            <Image src={ImageLogin} alt="Logo" />
          </ImageContainer>

          <LoginContent>
            <LoginTitle>Login</LoginTitle>
            <LoginForm onSubmit={handleLogin}>
              <Input
                variant="underlined"
                prefix={<UserOutlined />}
                style={{ fontSize: "15px" }}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={login.email}
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
                value={login.password}
                onChange={handleChange}
                required
              />

              <Button htmlType="submit" color="cyan" loading={loading} variant="solid">
                Entrar
              </Button>
            </LoginForm>
          </LoginContent>
        </LoginContainer>
      </LoginPage>
    </Screen>
  );
};

export default Login;
