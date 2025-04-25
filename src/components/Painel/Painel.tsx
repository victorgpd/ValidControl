import Screen from "../Screen/Screen";
import useAuthentication from "../../hooks/useAuthentication";

import { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/store";
import { useEffect, useMemo, useState } from "react";
import { Info, InfoContainer, MenuContainer, MenuList, PainelContainer } from "./styles";
import { CalendarOutlined, DatabaseOutlined, LogoutOutlined, PieChartOutlined, SettingOutlined, ShoppingCartOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

interface PainelProps {
  children?: React.ReactNode;
}

const Painel = ({ children }: PainelProps) => {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [openCurrent, setOpenCurrent] = useState<string[]>(["dashboard"]);

  const { logout } = useAuthentication();
  const { user } = useAppSelector((state) => state.globalReducer);

  const name = useMemo(() => {
    const nameLocal = user?.name?.split(" ");

    return nameLocal ? nameLocal[0] : "";
  }, [user?.name]);

  const items: MenuItem[] = [
    { key: "dashboard", icon: <PieChartOutlined />, label: "Dashboard" },
    {
      key: "products",
      label: "Produtos",
      icon: <ShoppingCartOutlined />,
      children: [
        {
          key: "product1",
          label: "Produtos cadastrados",
        },
        {
          key: "product2",
          label: "Cadastrar novo produto",
        },
      ],
    },
    {
      key: "validity",
      label: "Validades",
      icon: <CalendarOutlined />,
      children: [
        {
          key: "validity1",
          label: "Validades cadastradas",
        },
        {
          key: "validity2",
          label: "Cadastrar nova validade",
        },
      ],
    },
    {
      key: "data",
      label: "Gerenciar Dados",
      icon: <DatabaseOutlined />,
      children: [
        { key: "category1", label: "Importar produtos" },
        { key: "category2", label: "Exportar produtos" },
        { key: "category3", label: "Exportar validades" },
      ],
    },
    {
      key: "configuration",
      label: "Configurações",
      icon: <SettingOutlined />,
    },
    {
      key: "logout",
      label: "Sair",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    const message = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

    setMessage(message);
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const handleClickMenu: MenuProps["onClick"] = (e) => {
    setOpenCurrent(e.keyPath);
  };

  const handleDisplayMenu = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Screen isVisible={isVisible} displayMenu={handleDisplayMenu}>
      <PainelContainer>
        <MenuContainer isVisible={isVisible}>
          <InfoContainer>
            <Info className="greeting">
              {message}, {name}👋!
            </Info>
            <Info className="welcome">Seja bem-vindo ao seu painel!</Info>
          </InfoContainer>
          <MenuList onClick={handleClickMenu} style={{ width: 256 }} selectedKeys={openCurrent} mode="vertical" theme="dark" items={items} />
        </MenuContainer>

        {children}
      </PainelContainer>
    </Screen>
  );
};

export default Painel;
