import ImageRegister from "../../images/login.png";
import Screen from "../../components/Screen/Screen";

import useAuthentication from "../../hooks/useAuthentication";

import { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { UserType } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Image, ImageContainer, RegisterContainer, RegisterContent, RegisterForm, RegisterPage, RegisterTitle } from "./styles";

const Register = () => {
  const navigate = useNavigate();

  const [register, setRegister] = useState<UserType>({
    name: "",
    email: "",
    password: "",
  });

  const { register: RegisterFirebase, watchAuthState, loading } = useAuthentication();

  useEffect(() => {
    const unsubscribe = watchAuthState(navigate);
    return () => unsubscribe();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegister({ ...register, [event.target.name]: event.target.value });
  };

  const handleRegister = async () => {
    const success = await RegisterFirebase(register);
    if (success) {
      navigate("/");
    }
  };

  return (
    <Screen>
      <RegisterPage>
        <RegisterContainer>
          <ImageContainer>
            <Image src={ImageRegister} alt="Logo" />
          </ImageContainer>

          <RegisterContent>
            <RegisterTitle>Cadastrar-se</RegisterTitle>
            <RegisterForm>
              <Input variant="underlined" prefix={<UserOutlined />} style={{ fontSize: "15px" }} type="name" id="name" name="name" placeholder="Nome" value={register.name} onChange={handleChange} />
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
              />

              <Button color="cyan" onClick={handleRegister} loading={loading} variant="solid">
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
