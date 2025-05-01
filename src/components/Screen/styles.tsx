import styled from "styled-components";
import { Anchor, Button, Dropdown, Menu } from "antd";

export const HeaderContainer = styled.header`
  width: 100%;
  height: 64px;
  padding: 0 20px;

  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const AnchorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 750px) {
    display: none;
  }
`;

export const AnchorMenu = styled(Anchor)`
  .ant-anchor-link-title {
    color: black;
    font-weight: 500;
  }
`;

export const UserMenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UserButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const MenuUser = styled(Dropdown)`
  cursor: pointer;
`;

export const MainContainer = styled.main`
  flex: 1;
  background: #f0f2f5;
  padding-top: 64px;

  z-index: 9;
`;

export const ButtonMenu = styled(Button)`
  display: none;

  @media (max-width: 750px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
  }
`;

export const MenuContainer = styled.aside<{ isVisible: boolean }>`
  width: 256px;
  height: calc(100% - 64px);
  padding: 10px 5px;
  background-color: white;

  gap: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  top: 64px;
  left: ${(props) => (props.isVisible ? "0" : "-256px")};

  transition: left 0.3s;

  z-index: 9;

  @media screen and (min-width: 750px) {
    left: -256px;
  }
`;

export const InfoContainer = styled.div`
  padding: 16px;
  color: white;
`;

export const Info = styled.p`
  margin: 0;
  font-size: 14px;

  &.greeting {
    font-weight: bold;
    font-size: 16px;
  }

  &.welcome {
    font-size: 14px;
    opacity: 0.8;
  }
`;

export const MenuList = styled(Menu)`
  width: 240px !important;
  background-color: white !important;
  color: white !important;

  .ant-menu-item-selected {
    background-color: #f0fdf4 !important;
    color: #374151 !important;
    border-left: 4px solid #10b981;
  }

  .ant-menu-item {
    color: black;
  }

  .ant-menu-item-active {
    color: #10b981 !important;
  }

  .ant-menu-item:hover {
    background-color: #f5f5f5 !important;
  }

  .ant-menu-submenu-active > .ant-menu-submenu-title {
    background: #f5f5f5 !important;
    color: #10b981 !important;
  }

  .ant-menu-submenu-title {
    color: black;
  }

  .ant-menu-submenu-selected {
    background-color: #f0fdf4 !important;
    border-left: 4px solid #10b981;

    & span {
      color: #374151 !important;
    }
  }
`;

export const ButtonRegister = styled(Button)`
  background-color: #10b981;
  border: none;
  color: white;
  font-weight: 500;

  &:hover {
    background-color: #059669;
    color: white;
  }
`;
