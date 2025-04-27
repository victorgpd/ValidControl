import styled from "styled-components";
import { Anchor, Dropdown, Menu } from "antd";

export const HeaderContainer = styled.header`
  width: 100%;
  height: 62px;
  padding: 10px 15px;
  background-color: #2f2f2f;
  border-bottom: 1px solid rgba(222, 224, 224, 0.5);

  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;

  z-index: 999;
`;

export const LogoContainer = styled.div`
  height: 100%;

  gap: 10px;
  display: flex;
  align-items: center;
`;

export const LogoImage = styled.img`
  height: 100%;
`;

export const ButtonMenu = styled.button`
  cursor: pointer;
  color: white;
  height: 100%;
  font-size: 20px;
  display: none;

  @media screen and (max-width: 1060px) {
    &.menu-painel {
      display: inline-block;
    }
  }

  @media screen and (max-width: 750px) {
    &.menu-home {
      display: inline-block;
    }
  }
`;

export const ButtonsContainer = styled.ul`
  height: 100%;

  gap: 10px;
  display: flex;
  align-items: center;

  position: relative;

  @media screen and (max-width: 750px) {
    display: none;
  }
`;

export const AnchorMenu = styled(Anchor)`
  .ant-anchor-ink {
    background-color: white !important;
  }

  .ant-anchor-ink-visible {
    background-color: white !important;
  }

  .ant-anchor-link-title {
    color: white !important;
  }
`;

export const UserMenuContainer = styled.ul`
  gap: 5px;
  display: flex;

  @media screen and (max-width: 750px) {
    display: none;
  }
`;

export const UserButton = styled.div`
  width: 42px;
  height: 42px;
  padding: 18px;
  border-radius: 50%;
  border: 2px solid white;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

export const MenuUser = styled(Dropdown)``;

export const MainContainer = styled.main`
  width: 100%;

  flex: 1;
  padding-top: 62px;
  background-color: #f0f4f8;
`;

export const PainelContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: row;
`;

export const MenuContainer = styled.aside<{ isVisible: boolean }>`
  width: 256px;
  padding: 10px 0;
  height: calc(100% - 62px);
  background-color: #2f2f2f;

  gap: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  top: 62px;
  left: ${(props) => (props.isVisible ? "0" : "-256px")};

  transition: left 0.3s;

  z-index: 998;
`;

export const InfoContainer = styled.div`
  width: 100%;
  padding: 10px 0;

  gap: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Info = styled.span`
  color: white;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);

  &.greeting {
    font-size: 20px;
    font-weight: 600;
  }

  &.welcome {
    font-size: 16px;
    font-weight: 400;
    color: #bbbbbb;
  }
`;

export const MenuList = styled(Menu)`
  background-color: #2f2f2f !important;
  color: white !important;

  .ant-menu-item-selected {
    background-color: #4b4b4b !important; /* Fundo do item selecionado */
    color: #80d8ff !important;
  }

  .ant-menu-item {
    color: white;
  }

  .ant-menu-item-active {
    color: #1677ff !important;
  }

  .ant-menu-item:hover {
    background-color: white !important;
  }

  .ant-menu-submenu-active > .ant-menu-submenu-title {
    background: white !important;
    color: #1677ff;
  }

  .ant-menu-submenu-title {
    color: white;
  }

  .ant-menu-submenu-selected {
    background-color: #4b4b4b !important;

    & span {
      color: #80d8ff !important;
    }
  }
`;
