import { Input } from "antd";
import styled from "styled-components";

export const ConfigurationPage = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

export const ConfigurationContainer = styled.div<{ heightValue: string }>`
  width: 100%;
  ${({ heightValue }) => (heightValue ? `height: ${heightValue}` : "")};
  max-width: 1000px;
  padding: 30px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 25px;

  & > h2 {
    font-size: 28px;
    font-weight: 500;
    color: #333;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f0f0f0;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

export const InputConfiguration = styled(Input)`
  flex: 1 1 45%;
  min-width: 250px;
  padding: 8px 12px;
`;
