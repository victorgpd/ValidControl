import { Button, MenuProps } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BarChartOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  DownOutlined,
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
  AnchorContainer,
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
  ButtonRegister,
} from "./styles";
import { useNotification } from "../../hooks/useNotification";
import { useAppSelector } from "../../hooks/store";
import useAuthentication from "../../hooks/useAuthentication";
import { useEffect, useMemo, useState } from "react";
import { RoutesEnum } from "../../enums/routes";

interface ScreenProps {
  displayMenu?: () => void;
  isVisible?: boolean;
  painel?: boolean;
  text?: string;
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

const Screen = ({ displayMenu, painel, text, isVisible, children }: ScreenProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { contextHolder } = useNotification();
  const { user } = useAppSelector((state) => state.globalReducer);
  const { logout, verifyLogged, isCheckingAuth } = useAuthentication();

  const [message, setMessage] = useState<string>("");
  const [openCurrent, setOpenCurrent] = useState<string[]>(["home"]);
  const [menuHomeIsVisible, setMenuHomeIsVisible] = useState<boolean>(false);

  const itemsUser = useMemo<MenuProps["items"]>(() => {
    return [
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
        label: "Configurações",
        icon: <SettingOutlined />,
        onClick: () => navigate(RoutesEnum.Configuration),
      },
      {
        type: "divider",
      },
      {
        key: "4",
        danger: true,
        label: "Sair",
        icon: <LogoutOutlined />,
        onClick: handleLogout,
      },
    ];
  }, [user]);

  const dynamicItems = useMemo<MenuItem[]>(() => {
    return [
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
        style: { color: "black", backgroundColor: "black" },
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
  }, [user]);

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
      <HeaderContainer>
        <LogoContainer>
          {painel && (
            <ButtonMenu className="menu-painel" onClick={displayMenu}>
              {isVisible ? <CloseOutlined /> : <MenuOutlined />}
            </ButtonMenu>
          )}
          {!painel && (
            <ButtonMenu className="menu-home" onClick={handleDisplayMenuHome}>
              {menuHomeIsVisible ? <CloseOutlined /> : <MenuOutlined />}
            </ButtonMenu>
          )}
          <Link to={"/"} style={{ height: "100%", gap: "10px", marginRight: "65px", display: "flex", alignItems: "center" }}>
            <CheckCircleOutlined style={{ height: "100%", fontSize: "34px", color: "rgba(16, 185, 129, 1)" }} />
            <span style={{ fontWeight: "500", fontSize: "20px", color: "black" }}>ValidControl</span>
          </Link>

          {!painel && (
            <AnchorContainer>
              <AnchorMenu direction="horizontal" items={itemsAnchor} style={{ color: "black" }} />
            </AnchorContainer>
          )}

          {painel && <span style={{ fontSize: "20px" }}> | {text}</span>}
        </LogoContainer>

        <UserMenuContainer>
          {isCheckingAuth ? null : user?.uid ? (
            <MenuUser menu={{ items: itemsUser }} placement="bottomRight" arrow>
              <UserButton>
                {user.image ? <img src={user.image} style={{ width: "32px", height: "32px", borderRadius: "50%" }} /> : <UserOutlined style={{ fontSize: "24px", color: "black" }} />}
                <span style={{ fontSize: "14px", fontWeight: "500", color: "black" }}>{user.name}</span>
                <DownOutlined style={{ fontSize: "12px", color: "black" }} />
              </UserButton>
            </MenuUser>
          ) : (
            <>
              <Button style={{ color: "black", border: "none", backgroundColor: "transparent" }} onClick={() => navigate(RoutesEnum.Login)} variant="text">
                Acessar
              </Button>

              <ButtonRegister onClick={() => navigate(RoutesEnum.Register)} variant="text">
                Começar agora
              </ButtonRegister>
            </>
          )}
        </UserMenuContainer>
      </HeaderContainer>

      <MainContainer>
        <MenuContainer isVisible={menuHomeIsVisible}>
          <InfoContainer>
            <Info className="greeting">{message}</Info>
            <Info className="welcome">Seja bem-vindo ao ValidControl!</Info>
          </InfoContainer>
          <MenuList onClick={handleClickMenu} style={{ width: 256 }} selectedKeys={openCurrent} mode="vertical" theme="dark" items={dynamicItems} />
        </MenuContainer>

        {contextHolder}
        {children}
      </MainContainer>
    </>
  );
};

export default Screen;
