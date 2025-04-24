import Logo from "../../images/logo.png";

import { MenuProps } from "antd";
import { useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { HeaderContainer, LogoContainer, LogoImage, ButtonsContainer, AnchorMenu, UserMenuContainer, UserButton, MenuUser, MainContainer } from "./styles";

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

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "My Account",
    disabled: true,
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: "Profile",
    extra: "⌘P",
  },
  {
    key: "3",
    label: "Billing",
    extra: "⌘B",
  },
  {
    key: "4",
    danger: true,
    label: "Settings",
    // icon: <SettingOutlined />,
    extra: "⌘S",
  },
];

const Screen = ({ children }: ScreenProps) => {
  const location = useLocation();

  return (
    <>
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
          <MenuUser menu={{ items }} placement="bottomRight" arrow>
            <UserButton>
              <UserOutlined style={{ fontSize: "24px", color: "white" }} />
            </UserButton>
          </MenuUser>
        </UserMenuContainer>
      </HeaderContainer>

      <MainContainer>{children}</MainContainer>
    </>
  );
};

export default Screen;
