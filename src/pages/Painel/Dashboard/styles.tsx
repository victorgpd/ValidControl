import { Column } from "@ant-design/plots";
import styled from "styled-components";

export const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;

  gap: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContainerCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 1600px;
`;

export const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 20px 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  }
`;

export const CardContent = styled.div`
  gap: 16px;
  display: flex;
  align-items: center;
`;

export const IconCircle = styled.div<{ bg: string; color: string }>`
  background-color: ${({ bg }) => bg};
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  font-size: 20px;
  flex-shrink: 0;
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoLabel = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
`;

export const InfoValue = styled.span`
  margin-bottom: 5px;
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
`;

export const InfoTitle = styled.h3`
  font-size: 0.73rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.6px;
`;

export const IconWrapper = styled.span<{ bg: string; color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 10px;
  font-size: 20px;
  margin-left: 12px;
  border-radius: 10px;

  color: ${({ color }) => color};
  background-color: ${({ bg }) => bg};
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const ContainerGraph = styled.div`
  width: 100%;
  padding: 24px;
  max-width: 1600px;
  max-height: 550px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  display: flex;
  justify-content: center;
`;

export const ContainerGraphs = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

export const Graph = styled(Column)`
  width: 100%;

  & canvas {
    max-height: 500px;
  }
`;

export const GraphTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
`;
