import { Menu } from "antd";
import styled from "styled-components";

export const PainelContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 240px;

  display: flex;
  flex-flow: row;

  @media screen and (max-width: 1060px) {
    padding-left: 0;
  }
`;

export const MenuContainer = styled.aside<{ isVisible: boolean }>`
  width: 250px;
  height: 100%;
  padding: 10px 5;
  background-color: white;

  gap: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  top: 62px;
  left: 0;

  transition: left 0.3s;

  @media screen and (max-width: 1060px) {
    height: calc(100% - 62px);
    position: fixed;
    top: 62px;
    left: ${(props) => (props.isVisible ? "0" : "-256px")};

    z-index: 9;
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
