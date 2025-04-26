import { Button, Input } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 15px;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;

  gap: 16px;
  display: flex;
  flex-direction: column;
`;

export const ContainerInput = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: bold;
  color: #333;
`;

export const ContainerInputButton = styled.div`
  gap: 5px;

  display: flex;
  align-items: center;
`;

export const InputNew = styled((props) => <Input {...props} />)``;

export const ButtonNew = styled(Button)``;
