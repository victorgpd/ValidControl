import Screen from "../Screen/Screen";
import useAuthentication from "../../hooks/useAuthentication";

import { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useEffect, useMemo, useState } from "react";
import { Info, InfoContainer, MenuContainer, MenuList, PainelContainer } from "./styles";
import { CalendarOutlined, DatabaseOutlined, LogoutOutlined, PieChartOutlined, SettingOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { RoutesEnum } from "../../enums/routes";
import { setOpenCurrentMenu } from "../../redux/globalReducer/slice";

type MenuItem = Required<MenuProps>["items"][number];

interface PainelProps {
  children?: React.ReactNode;
}

const Painel = ({ children }: PainelProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { openCurrentMenu } = useAppSelector((state) => state.globalReducer);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [openCurrent] = useState<string[]>(openCurrentMenu);

  const { logout } = useAuthentication();
  const { user } = useAppSelector((state) => state.globalReducer);

  const name = useMemo(() => {
    const nameLocal = user?.name?.split(" ");

    return nameLocal ? nameLocal[0] : "";
  }, [user?.name]);

  const items: MenuItem[] = [
    { key: "dashboard", icon: <PieChartOutlined />, label: "Dashboard", onClick: () => navigate(RoutesEnum.Dashboard) },
    {
      key: "products",
      label: "Produtos",
      icon: <ShoppingCartOutlined />,
      children: [
        {
          key: "product1",
          label: "Produtos cadastrados",
          onClick: () => navigate(RoutesEnum.Products),
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
    navigate(RoutesEnum.Login);
  }

  const handleClickMenu: MenuProps["onClick"] = (e) => {
    dispatch(setOpenCurrentMenu(e.keyPath));
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
          <MenuList onClick={handleClickMenu} style={{ width: 256 }} selectedKeys={openCurrent} mode="inline" theme="dark" items={items} />
        </MenuContainer>

        {children}
      </PainelContainer>
    </Screen>
  );
};

export default Painel;
