import styled from "styled-components";

export const RegisterPage = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RegisterContainer = styled.div`
  width: 100%;
  max-width: 795px;
  height: 100%;
  max-height: 276px;

  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
  }

  @media (max-width: 900px) {
    max-width: 380px;
    max-height: 560px;
    flex-flow: column;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  max-width: 415px;
  height: 100%;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const RegisterContent = styled.div`
  width: 100%;
  max-width: 380px;
  height: 100%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const RegisterTitle = styled.h2`
  font-size: 24px;
  color: #333;
  text-align: center;
`;

export const RegisterForm = styled.form`
  width: 100%;

  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
