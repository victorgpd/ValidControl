import { Menu } from "antd";
import styled from "styled-components";

export const PainelContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: row;
`;

export const MenuContainer = styled.aside<{ isVisible: boolean }>`
  width: 256px;
  height: 100%;
  padding: 10px 0;
  background-color: #2f2f2f;

  gap: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: sticky;
  transition: left 0.3s;

  @media screen and (max-width: 920px) {
    height: calc(100% - 62px);
    position: fixed;
    top: 62px;
    left: ${(props) => (props.isVisible ? "0" : "-256px")};

    z-index: 998;
  }
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
