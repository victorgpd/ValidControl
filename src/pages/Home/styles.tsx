import styled from "styled-components";

export const HomePage = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;

  gap: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #f4f7fb; /* Fundo mais suave para a página */
`;

export const Container = styled.div`
  padding: 40px 24px;
  padding-top: 64px;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  background-color: #fff; /* Fundo branco para a área de conteúdo */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const IconBox = styled.div`
  font-size: 32px;
  color: #1890ff;
  margin-bottom: 16px;
`;

export const Card = styled.div`
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const Title = styled.h2`
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
`;

export const Paragraph = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
`;

export const Text = styled.span`
  font-size: 14px;
  color: #777;
`;

export const Divider = styled.div`
  margin: 24px 0;
  border-top: 2px solid #f0f0f0;
`;

export const ItemList = styled.li`
  list-style: none;
`;
