import Logo from "../../images/logo.png";

import { Button, MenuProps } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BarChartOutlined,
  CloseOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  PieChartOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  StarOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  HeaderContainer,
  LogoContainer,
  LogoImage,
  ButtonsContainer,
  AnchorMenu,
  UserMenuContainer,
  UserButton,
  MenuUser,
  MainContainer,
  ButtonMenu,
  MenuContainer,
  InfoContainer,
  Info,
  MenuList,
} from "./styles";
import { useNotification } from "../../hooks/useNotification";
import { useAppSelector } from "../../hooks/store";
import useAuthentication from "../../hooks/useAuthentication";
import { useEffect, useState } from "react";
import { RoutesEnum } from "../../enums/routes";

interface ScreenProps {
  displayMenu?: () => void;
  isVisible?: boolean;
  children?: React.ReactNode;
}

type MenuItem = Required<MenuProps>["items"][number];

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

const Screen = ({ displayMenu, isVisible, children }: ScreenProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { contextHolder } = useNotification();
  const { user } = useAppSelector((state) => state.globalReducer);
  const { logout, verifyLogged, isCheckingAuth } = useAuthentication();

  const [message, setMessage] = useState<string>("");
  const [openCurrent, setOpenCurrent] = useState<string[]>(["home"]);
  const [menuHomeIsVisible, setMenuHomeIsVisible] = useState<boolean>(false);

  const itemsUser: MenuProps["items"] = [
    {
      key: "1",
      label: `Olá, ${user?.name}`,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Painel",
      icon: <PieChartOutlined />,
      onClick: () => navigate(RoutesEnum.Dashboard),
    },
    {
      key: "3",
      label: "Perfil",
      icon: <UserOutlined />,
    },
    {
      key: "4",
      label: "Configurações",
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "5",
      danger: true,
      label: "Sair",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  const dynamicItems: MenuItem[] = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Home",
      onClick: () => navigate(RoutesEnum.Home),
    },
    {
      key: "overview",
      icon: <BarChartOutlined />,
      label: "Visão geral",
      onClick: () => navigate("/#overview"),
    },
    {
      key: "vantages",
      icon: <StarOutlined />,
      label: "Vantagens",
      onClick: () => navigate("/#vantages"),
    },
    {
      key: "use",
      icon: <PlayCircleOutlined />,
      label: "Como usar",
      onClick: () => navigate("/#use"),
    },
    {
      type: "divider",
      style: { color: "white", backgroundColor: "white" },
    },
    ...(user?.name
      ? [
          {
            key: "painel",
            icon: <PieChartOutlined />,
            label: "Painel",
            onClick: () => navigate(RoutesEnum.Dashboard),
          },
          {
            key: "profile",
            icon: <UserOutlined />,
            label: "Perfil",
            onClick: () => navigate("/painel/dashboard"),
          },
          {
            key: "configuration",
            icon: <SettingOutlined />,
            label: "Configurações",
            onClick: () => navigate("/painel/dashboard"),
          },
          {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Sair",
            style: { color: "red" },
            onClick: handleLogout,
          },
        ]
      : [
          {
            key: "login",
            icon: <LoginOutlined />,
            label: "Login",
            onClick: () => navigate(RoutesEnum.Login),
          },
          {
            key: "register",
            icon: <UserAddOutlined />,
            label: "Cadastro",
            onClick: () => navigate(RoutesEnum.Register),
          },
        ]),
  ];

  useEffect(() => {
    verifyLogged();
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    let message = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

    if (user?.name) {
      message += `, ${user.name.split(" ")[0]}`;
    }

    message += " 👋!";

    setMessage(message);
  }, []);

  useEffect(() => {
    const width = window.innerWidth;

    if (width < 750) {
      setMenuHomeIsVisible(false);
    }
  }, [location.pathname]);

  function handleLogout() {
    logout();
    navigate(RoutesEnum.Login);
  }

  const handleClickMenu = (e: { keyPath: string[] }) => {
    setOpenCurrent(e.keyPath);
  };

  const handleDisplayMenuHome = () => {
    setMenuHomeIsVisible(!menuHomeIsVisible);
  };

  return (
    <>
      {contextHolder}
      <HeaderContainer>
        <LogoContainer>
          {location.pathname.includes("/painel") && (
            <ButtonMenu className="menu-painel" onClick={displayMenu}>
              {isVisible ? <CloseOutlined /> : <MenuOutlined />}
            </ButtonMenu>
          )}
          {!location.pathname.includes("/painel") && (
            <ButtonMenu className="menu-home" onClick={handleDisplayMenuHome}>
              {menuHomeIsVisible ? <CloseOutlined /> : <MenuOutlined />}
            </ButtonMenu>
          )}
          <Link to={"/"} style={{ height: "100%" }}>
            <LogoImage src={Logo} alt="Logo" />
          </Link>
        </LogoContainer>

        {!location.pathname.includes("/painel") && (
          <ButtonsContainer>
            <AnchorMenu direction="horizontal" items={itemsAnchor} style={{ color: "white" }} />
          </ButtonsContainer>
        )}

        <UserMenuContainer>
          {isCheckingAuth ? null : user?.uid ? (
            <MenuUser menu={{ items: itemsUser }} placement="bottomRight" arrow>
              <UserButton>
                <UserOutlined style={{ fontSize: "24px", color: "white" }} />
              </UserButton>
            </MenuUser>
          ) : (
            <>
              <Button color="cyan" onClick={() => navigate(RoutesEnum.Login)} variant="text">
                Acessar
              </Button>

              <Button color="cyan" onClick={() => navigate(RoutesEnum.Register)} variant="text">
                Começar agora
              </Button>
            </>
          )}
        </UserMenuContainer>

        <MenuContainer isVisible={menuHomeIsVisible}>
          <InfoContainer>
            <Info className="greeting">{message}</Info>
            <Info className="welcome">Seja bem-vindo ao ValidControl!</Info>
          </InfoContainer>
          <MenuList onClick={handleClickMenu} style={{ width: 256 }} selectedKeys={openCurrent} mode="vertical" theme="dark" items={dynamicItems} />
        </MenuContainer>
      </HeaderContainer>

      <MainContainer>{children}</MainContainer>
    </>
  );
};

export default Screen;
