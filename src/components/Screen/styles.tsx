import styled from "styled-components";
import { Anchor, Button, Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.header`
  width: 100%;
  height: 64px;
  padding: 0 10px;
  padding-right: 20px;

  background: rgba(255, 255, 255, 0.8);
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

export const LogoLink = styled(Link)`
  height: 100%;
  margin-right: 45px;

  gap: 5px;
  display: flex;
  align-items: center;

  @media (max-width: 750px) {
    margin-right: 20px;
  }
`;

export const TitleLogo = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: black;
`;

export const TitleSpan = styled.span`
  font-size: 20px;

  @media (max-width: 750px) {
    font-size: 16px;
  }
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
  gap: 12px;
  display: flex;
  align-items: center;

  @media (max-width: 750px) {
    display: none;
  }
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
  width: 30px;
  border: none;
  font-size: 20px;
  margin-right: 5px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const MenuContainer = styled.aside<{ isVisible: boolean }>`
  width: 256px;
  height: 100dvh;
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
`;

export const InfoContainer = styled.div`
  padding: 16px;

  gap: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Info = styled.p`
  color: black;
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
  border: none !important;
  width: 240px !important;
  color: white !important;
  background-color: white !important;

  .ant-menu-item-group-title {
    color: rgba(0, 0, 0, 0.65);
  }

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

export const Container = styled.div<{ isVisible: boolean }>`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);

  position: absolute;
  top: 64px;
  left: 0;
  z-index: 8;

  display: ${(props) => (props.isVisible ? "block" : "none")};
`;
