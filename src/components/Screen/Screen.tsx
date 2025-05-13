import { Button, MenuProps, Select } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppstoreFilled,
  BarChartOutlined,
  DownOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  LaptopOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  PieChartOutlined,
  RocketOutlined,
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
  LogoLink,
  TitleSpan,
  Container,
} from "./styles";
import { useNotification } from "../../hooks/useNotification";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import useAuthentication from "../../hooks/useAuthentication";
import { useEffect, useRef, useState } from "react";
import { RoutesEnum } from "../../enums/routes";
import { setOpenCurrentMenu, setSelectedLojaId } from "../../redux/globalReducer/slice";

interface ScreenProps {
  displayMenu?: () => void;
  isVisible?: boolean;
  painel?: boolean;
  text?: string;
  children?: React.ReactNode;
  selectedLojaId?: string | null;
  setSelectedLojaId?: (id: string) => void;
}

type MenuItem = Required<MenuProps>["items"][number];

const itemsAnchor = [
  {
    key: "home",
    href: "/validcontrol/#home",
    title: "Inicio",
  },
  {
    key: "problems",
    href: "/validcontrol/#problems",
    title: "Soluções",
  },
  {
    key: "features",
    href: "/validcontrol/#features",
    title: "Funcionalidades",
  },
  {
    key: "future-goals",
    href: "/validcontrol/#future-goals",
    title: "Objetivos",
  },
  {
    key: "technologies",
    href: "/validcontrol/#technologies",
    title: "Tecnologias",
  },

  {
    key: "about",
    href: "/validcontrol/#about",
    title: "Sobre",
  },
];

const Screen = ({ displayMenu, painel, text, children }: ScreenProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const topRef = useRef<HTMLDivElement>(null);

  const { contextHolder } = useNotification();
  const { logout, verifyLogged, isCheckingAuth } = useAuthentication();
  const { user, openCurrentMenu, lojas, selectedLojaId } = useAppSelector((state) => state.globalReducer);

  const [message, setMessage] = useState<string>("");
  const [openCurrent, setOpenCurrent] = useState<string[]>(openCurrentMenu);
  const [menuHomeIsVisible, setMenuHomeIsVisible] = useState<boolean>(false);
  const [targetOffset, setTargetOffset] = useState<number>();

  useEffect(() => {
    setTargetOffset(topRef.current?.clientHeight! + 20);
  }, []);

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

  const dynamicItems: MenuItem[] = [
    {
      key: "1",
      label: "Navegação",
      type: "group",
      children: [
        {
          key: "home",
          icon: <HomeOutlined />,
          label: "Inicio",
          onClick: () => navigate(RoutesEnum.Home),
        },
        {
          key: "problems",
          icon: <BarChartOutlined />,
          label: "Soluções",
          onClick: () => navigate("/#problems"),
        },
        {
          key: "features",
          icon: <StarOutlined />,
          label: "Funcionalidades",
          onClick: () => navigate("/#features"),
        },
        {
          key: "future-goals",
          icon: <RocketOutlined />,
          label: "Objetivos",
          onClick: () => navigate("/#future-goals"),
        },
        {
          key: "technologies",
          icon: <LaptopOutlined />,
          label: "Tecnologias",
          onClick: () => navigate("/#technologies"),
        },

        {
          key: "about",
          icon: <InfoCircleOutlined />,
          label: "Sobre",
          onClick: () => navigate("/#about"),
        },
      ],
    },
    {
      key: "2",
      label: "Usuário",
      type: "group",
      children: [
        ...(user?.name
          ? [
              {
                key: "painel",
                icon: <PieChartOutlined />,
                label: "Painel",
                onClick: () => navigate(RoutesEnum.Dashboard),
              },
              {
                key: "configuration",
                icon: <SettingOutlined />,
                label: "Configurações",
                onClick: () => navigate(RoutesEnum.Configuration),
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
      ],
    },
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
    setOpenCurrent(openCurrentMenu);
  }, [openCurrentMenu]);

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

  const handleChangeLoja = (value: string) => {
    dispatch(setSelectedLojaId(value));
  };

  const handleClickMenu = (e: { keyPath: string[] }) => {
    setOpenCurrent(e.keyPath);
    dispatch(setOpenCurrentMenu(e.keyPath));
  };

  const handleDisplayMenuHome = () => {
    setMenuHomeIsVisible(!menuHomeIsVisible);
  };

  return (
    <>
      <HeaderContainer ref={topRef}>
        <LogoContainer>
          {painel && (
            <ButtonMenu className="menu-painel" onClick={displayMenu}>
              <MenuOutlined />
            </ButtonMenu>
          )}
          {!painel && (
            <ButtonMenu className="menu-home" onClick={handleDisplayMenuHome}>
              <MenuOutlined />
            </ButtonMenu>
          )}
          <LogoLink to={RoutesEnum.Home}>
            <AppstoreFilled style={{ height: "100%", fontSize: "34px", color: "rgba(16, 185, 129, 1)" }} />
            <span style={{ fontWeight: "500", fontSize: "20px", color: "black" }}>ValidControl</span>
          </LogoLink>

          {!painel && (
            <AnchorContainer>
              <AnchorMenu direction="horizontal" items={itemsAnchor} targetOffset={targetOffset} />
            </AnchorContainer>
          )}

          {painel && <TitleSpan> | {text}</TitleSpan>}
        </LogoContainer>

        <UserMenuContainer>
          {painel && (
            <Select
              style={{ width: 200, marginTop: 8 }}
              placeholder="Selecione uma loja"
              value={selectedLojaId}
              onChange={(value) => {
                if (value === selectedLojaId) return;
                if (value === "create") {
                  navigate(RoutesEnum.CreateStore);
                } else {
                  handleChangeLoja(value);
                }
              }}
              loading={!lojas}
              optionLabelProp="label"
              options={[
                {
                  label: "Minhas Lojas",
                  options:
                    lojas?.map((l) => ({
                      label: l.store,
                      value: l.idDocument,
                    })) || [],
                },
                {
                  label: "Outras opções",
                  options: [
                    {
                      label: "➕ Criar nova loja",
                      value: "create",
                    },
                  ],
                },
              ]}
            />
          )}
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
          <MenuList onClick={handleClickMenu} style={{ width: 256 }} selectedKeys={openCurrent} mode="vertical" theme="light" items={dynamicItems} />
        </MenuContainer>

        <Container isVisible={menuHomeIsVisible} onClick={handleDisplayMenuHome} />

        {contextHolder}
        {children}
      </MainContainer>
    </>
  );
};

export default Screen;
