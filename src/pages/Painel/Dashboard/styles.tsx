import { Column } from "@ant-design/plots";
import styled from "styled-components";

export const DashboardContainer = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

export const ContainerCards = styled.div`
  gap: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  width: 100%;
  max-width: 1200px;
`;

export const InfoCard = styled.div`
  flex: 1 1 260px;
  max-width: 280px;
  min-height: 110px;
  padding: 20px;
  border-radius: 16px;

  background: linear-gradient(to bottom right, #ffffff, #f8f8f8);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }
`;

export const InfoTitle = styled.h3`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
  text-transform: uppercase;
`;

export const InfoValue = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #222;
`;

export const ContainerGraph = styled.div`
  width: 100%;

  gap: 50px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

export const ContainerGraphs = styled.div`
  width: 100%;
  max-width: 584px;

  /* gap: 5px; */
  display: flex;
  flex-flow: column;
`;

export const Graph = styled(Column)`
  & canvas {
    max-height: 500px;
  }

  width: 100%;
  max-width: 584px;
`;

export const GraphTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
  color: #333;
`;
