import { Button, MenuProps, Select } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppstoreFilled,
  BarChartOutlined,
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
  LogoLink,
  TitleSpan,
  Container,
} from "./styles";
import { useNotification } from "../../hooks/useNotification";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import useAuthentication from "../../hooks/useAuthentication";
import { useEffect, useState } from "react";
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
    title: "Home",
  },
  {
    key: "overview",
    href: "/validcontrol/#overview",
    title: "Visão geral",
  },
  {
    key: "vantages",
    href: "/validcontrol/#vantages",
    title: "Vantagens",
  },
  {
    key: "use",
    href: "/validcontrol/#use",
    title: "Como usar",
  },
];

const Screen = ({ displayMenu, painel, text, children }: ScreenProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { contextHolder } = useNotification();
  const { logout, verifyLogged, isCheckingAuth } = useAuthentication();
  const { user, openCurrentMenu, lojas, selectedLojaId } = useAppSelector((state) => state.globalReducer);

  const [message, setMessage] = useState<string>("");
  const [openCurrent, setOpenCurrent] = useState<string[]>(openCurrentMenu);
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
      label: "Página Inicial",
      type: "group",
      children: [
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
      <HeaderContainer>
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
              <AnchorMenu direction="horizontal" items={itemsAnchor} style={{ color: "black" }} />
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
