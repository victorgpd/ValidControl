import ImageLogin from "../../images/login.png";
import Screen from "../../components/Screen/Screen";

import { Button, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Image, ImageContainer, LoginContainer, LoginContent, LoginForm, LoginPage, LoginTitle } from "./styles";
import { useState } from "react";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  return (
    <Screen>
      <LoginPage>
        <LoginContainer>
          <ImageContainer>
            <Image src={ImageLogin} alt="Logo" />
          </ImageContainer>

          <LoginContent>
            <LoginTitle>Login</LoginTitle>
            <LoginForm>
              <Input variant="underlined" prefix={<UserOutlined />} style={{ fontSize: "15px" }} type="email" id="email" name="email" placeholder="Email" value={login.email} onChange={handleChange} />

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
              />

              <Button color="cyan" variant="solid">
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
