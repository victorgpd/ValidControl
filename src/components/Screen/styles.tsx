import styled from "styled-components";
import { Anchor, Dropdown } from "antd";

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
  font-size: larger;
  display: none;

  @media screen and (max-width: 920px) {
    display: inline-block;
  }
`;

export const ButtonsContainer = styled.ul`
  height: 100%;

  gap: 10px;
  display: flex;
  align-items: center;

  position: relative;
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
  flex: 1;
  padding-top: 62px;
  background-color: #f0f4f8;
`;
