import Logo from "../../images/logo.png";

import { Button, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { HeaderContainer, LogoContainer, LogoImage, ButtonsContainer, AnchorMenu, UserMenuContainer, UserButton, MenuUser, MainContainer } from "./styles";
import { useNotification } from "../../hooks/useNotification";
import { useAppSelector } from "../../hooks/store";
import useAuthentication from "../../hooks/useAuthentication";
import { useEffect } from "react";

interface ScreenProps {
  children?: React.ReactNode;
}

const itemsAnchor = [
  {
    key: "home",
    href: "/#home",
    title: "Home",
  },
  {
    key: "overview",
    href: "/#overview",
    title: "Visão geral",
  },
  {
    key: "vantages",
    href: "/#vantages",
    title: "Vantagens",
  },
  {
    key: "use",
    href: "/#use",
    title: "Como usar",
  },
];

const Screen = ({ children }: ScreenProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { contextHolder } = useNotification();
  const { logout, verifyLogged } = useAuthentication();
  const { user } = useAppSelector((state) => state.globalReducer);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: `Olá, ${user?.name}`,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Perfil",
      icon: <UserOutlined />,
    },
    {
      key: "3",
      label: "Configurações",
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "4",
      danger: true,
      label: "Sair",
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ];

  useEffect(() => {
    if (!user?.uid) {
      verifyLogged();
    }
  }, []);

  return (
    <>
      {contextHolder}
      <HeaderContainer>
        <LogoContainer>
          <LogoImage src={Logo} alt="Logo" />
        </LogoContainer>

        {!location.pathname.includes("/painel") && (
          <ButtonsContainer>
            <AnchorMenu direction="horizontal" items={itemsAnchor} style={{ color: "white" }} />
          </ButtonsContainer>
        )}

        <UserMenuContainer>
          {user?.uid ? (
            <MenuUser menu={{ items }} placement="bottomRight" arrow>
              <UserButton>
                <UserOutlined style={{ fontSize: "24px", color: "white" }} />
              </UserButton>
            </MenuUser>
          ) : (
            <>
              <Button color="cyan" onClick={() => navigate("/login")} variant="text">
                Entrar
              </Button>

              <Button color="cyan" onClick={() => navigate("/register")} variant="text">
                Começar agora
              </Button>
            </>
          )}
        </UserMenuContainer>
      </HeaderContainer>

      <MainContainer>{children}</MainContainer>
    </>
  );
};

export default Screen;
