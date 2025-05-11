import { Menu, Select } from "antd";
import styled from "styled-components";

export const PainelContainer = styled.div<{ isVisible: boolean }>`
  width: 100%;
  height: 100%;
  padding-left: ${(props) => (props.isVisible ? "250px" : "0")};

  display: flex;
  flex-flow: row;
  z-index: 7;
  transition: padding-left 0.3s;

  @media screen and (max-width: 768px) {
    padding-left: 0;
  }
`;

export const MenuContainer = styled.aside<{ isVisible: boolean }>`
  width: 250px;
  height: 100dvh;
  padding: 10px 10px;
  background-color: white;

  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  top: 64px;
  left: ${(props) => (props.isVisible ? "0" : "-256px")};
  z-index: 9;

  transition: left 0.3s;

  @media screen and (max-width: 768px) {
    position: fixed;
    top: 64px;
    left: ${(props) => (props.isVisible ? "0" : "-256px")};
  }
`;

export const Container = styled.div<{ isVisible: boolean }>`
  width: 100%;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.45);

  position: fixed;
  top: 64px;
  left: 0;

  display: ${(props) => (props.isVisible ? "block" : "none")};

  z-index: 8;

  transition: all 0.3s ease-in-out;

  @media screen and (min-width: 750px) {
    display: none;
  }
`;

export const InfoContainer = styled.div`
  padding: 16px;

  gap: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Info = styled.span`
  color: black;
  margin: 0;
  font-size: 14px;

  &.greeting {
    font-weight: 600;
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

export const SelectStore = styled(Select)`
  width: 200px;
  margin-top: 10px;

  @media screen and (min-width: 650px) {
    display: none;
  }
`;
