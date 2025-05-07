import { Input } from "antd";
import styled from "styled-components";

export const ConfigurationPage = styled.div`
  width: 100%;
  padding: 30px;

  gap: 30px;
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const ConfigurationContainer = styled.div<{ heightValue: string }>`
  width: 100%;
  max-width: 800px;
  padding: 40px 30px;
  border-radius: 16px;

  background-color: #ffffff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

  gap: 30px;
  display: flex;
  flex-direction: column;

  ${({ heightValue }) => (heightValue ? `height: ${heightValue}` : "")};

  & > h2 {
    font-size: 26px;
    font-weight: 600;
    color: #222;
    text-align: center;
    margin-bottom: 20px;
  }
`;

export const ProfileSection = styled.div`
  position: relative;

  gap: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const ImageContainer = styled.label`
  width: 120px;
  height: 120px;
  border-radius: 50%;

  position: relative;
  overflow: hidden;
  background-color: #e9ecef;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const InputsContainer = styled.div`
  width: 100%;

  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const InputContainer = styled.div`
  width: 100%;

  gap: 6px;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  color: #555;
  font-size: 14px;
  font-weight: 600;
`;

export const InputConfiguration = styled(Input)`
  padding: 10px 14px;
  border-radius: 8px;
`;

export const ButtonContainer = styled.div`
  width: 100%;

  gap: 20px;
  display: flex;
`;
