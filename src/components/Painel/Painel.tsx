import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MenuProps } from "antd";
import { CalendarOutlined, DatabaseOutlined, LogoutOutlined, PieChartOutlined, SettingOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import Screen from "../Screen/Screen";

import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useRealtimeDocuments } from "../../hooks/useRealtimeDocuments";
import useAuthentication from "../../hooks/useAuthentication";

import { setLoja, setOpenCurrentMenu } from "../../redux/globalReducer/slice";
import { RoutesEnum } from "../../enums/routes";

import { Container, Info, InfoContainer, MenuContainer, MenuList, PainelContainer } from "./styles";

import { WhereFilterOp } from "firebase/firestore";

type MenuItem = Required<MenuProps>["items"][number];

interface PainelProps {
  title?: string;
  children?: React.ReactNode;
}

const Painel = ({ children, title }: PainelProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { logout } = useAuthentication();
  const { user, openCurrentMenu } = useAppSelector((state) => state.globalReducer);

  const conditions = useMemo(() => {
    return user?.email ? [{ field: "access", op: "array-contains" as WhereFilterOp, value: user?.email }] : [];
  }, [user?.email]);

  const { documents } = useRealtimeDocuments("lojas", conditions);

  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [openCurrent, setOpenCurrent] = useState<string[]>(openCurrentMenu);

  const name = useMemo(() => {
    const firstName = user?.name?.split(" ")[0];
    return firstName || "";
  }, [user?.name]);

  const menuItems: MenuItem[] = [
    {
      key: "painel",
      label: "Painel",
      type: "group",
      children: [
        { key: "dashboard", icon: <PieChartOutlined />, label: "Dashboard", onClick: () => navigate(RoutesEnum.Dashboard) },
        {
          key: "products",
          label: "Produtos",
          icon: <ShoppingCartOutlined />,
          children: [
            { key: "product1", label: "Produtos cadastrados", onClick: () => navigate(RoutesEnum.Products) },
            { key: "product2", label: "Cadastrar novo produto", onClick: () => (window.location.href = RoutesEnum.Product_Create) },
          ],
        },
        {
          key: "validitys",
          label: "Validades",
          icon: <CalendarOutlined />,
          children: [
            { key: "validity1", label: "Validades cadastradas", onClick: () => navigate(RoutesEnum.Validitys) },
            { key: "validity2", label: "Cadastrar nova validade", onClick: () => (window.location.href = RoutesEnum.Validitys_Create) },
          ],
        },
      ],
    },
    {
      key: "data",
      label: "Dados",
      type: "group",
      children: [
        {
          key: "data",
          label: "Gerenciar Dados",
          icon: <DatabaseOutlined />,
          children: [
            { key: "data1", label: "Importar produtos", onClick: () => navigate(RoutesEnum.Data_Import) },
            { key: "data2", label: "Exportar produtos" },
            { key: "data3", label: "Exportar validades" },
          ],
        },
      ],
    },
    {
      key: "user",
      label: "Usuário",
      type: "group",
      children: [
        {
          key: "configuration",
          label: "Configurações",
          icon: <SettingOutlined />,
          onClick: () => navigate(RoutesEnum.Configuration),
        },
        {
          key: "logout",
          label: "Sair",
          icon: <LogoutOutlined />,
          style: { color: "red" },
          onClick: handleLogout,
        },
      ],
    },
  ];

  useEffect(() => {
    if (documents) {
      dispatch(
        setLoja({
          ...documents,
          idDocument: documents.id,
          createdAt: documents.createdAt?.toDate().toISOString(),
          updatedAt: documents.updatedAt?.toDate().toISOString(),
        })
      );
    }
  }, [documents, dispatch]);

  useEffect(() => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";
    setMessage(greeting);
  }, []);

  useEffect(() => {
    setOpenCurrent(openCurrentMenu);
  }, [openCurrentMenu]);

  function handleLogout() {
    logout();
    navigate(RoutesEnum.Login);
  }

  const handleClickMenu: MenuProps["onClick"] = (e) => {
    dispatch(setOpenCurrentMenu(e.keyPath));
  };

  const toggleMenuVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <Screen painel={true} text={title} isVisible={isVisible} displayMenu={toggleMenuVisibility}>
      <MenuContainer isVisible={isVisible}>
        <InfoContainer>
          <Info className="greeting">
            {message}, {name} 👋!
          </Info>
          <Info className="welcome">Seja bem-vindo ao seu painel!</Info>
        </InfoContainer>

        <MenuList onClick={handleClickMenu} selectedKeys={openCurrent} mode="inline" theme="light" items={menuItems} />
      </MenuContainer>

      <Container isVisible={isVisible} onClick={toggleMenuVisibility} />

      <PainelContainer isVisible={isVisible}>{children}</PainelContainer>
    </Screen>
  );
};

export default Painel;
