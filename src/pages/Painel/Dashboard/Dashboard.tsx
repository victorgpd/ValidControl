import useTitle from "../../../hooks/useTitle";
import Painel from "../../../components/Painel/Painel";

import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { ValidityType } from "../../../types/types";
import { useAppSelector } from "../../../hooks/store";
import { CardContent, ContainerCards, ContainerGraph, ContainerGraphs, DashboardContainer, Graph, GraphTitle, IconCircle, InfoCard, InfoLabel, InfoValue, TextGroup } from "./styles";
import { AppstoreFilled, CalendarFilled, ClockCircleOutlined, CloseCircleFilled, ShopOutlined, UsergroupAddOutlined, UserOutlined, WarningFilled } from "@ant-design/icons";

const Dashboard = () => {
  useTitle("Dashboard");

  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  const { loja } = useAppSelector((state) => state.globalReducer);

  const [data, setData] = useState(
    months.map((month) => ({
      month,
      frequency: 0,
      type: "A vencer",
    }))
  );

  const config = {
    data,
    xField: "month",
    yField: "frequency",
    colorField: "type",
    group: true,
    style: {
      inset: 5,
    },
  };

  function formatDate(date: string | Timestamp | null | undefined) {
    if (!date) return "";

    if (typeof date === "string") {
      return new Date(date).toLocaleDateString("pt-BR");
    }
    const localDate = new Date(date + "T00:00:00"); // Adiciona um horário para evitar problemas de fuso horário
    return localDate.toLocaleDateString("pt-BR");
  }

  useEffect(() => {
    if (loja?.validitys) {
      const now = new Date();

      const dataGrouped: { month: string; frequency: number; type: string }[] = [];

      months.forEach((month) => {
        dataGrouped.push({ month, frequency: 0, type: "A vencer" });
        dataGrouped.push({ month, frequency: 0, type: "Vencido" });
      });

      loja.validitys.forEach((validade: ValidityType) => {
        if (!validade.date) return;

        const date = new Date(validade.date + "T00:00:00");
        if (isNaN(date.getTime())) return;

        const month = months[date.getMonth()];

        if (date > now) {
          const item = dataGrouped.find((d) => d.month === month && d.type === "A vencer");
          if (item) item.frequency += 1;
        } else if (date.toDateString() === now.toDateString()) {
          const item = dataGrouped.find((d) => d.month === month && d.type === "A vencer");
          if (item) item.frequency += 1;
        } else {
          const item = dataGrouped.find((d) => d.month === month && d.type === "Vencido");
          if (item) item.frequency += 1;
        }
      });

      setData(dataGrouped);
    }
  }, [loja]);

  return (
    <Painel title="Dashboard">
      <DashboardContainer>
        <ContainerCards>
          <InfoCard>
            <CardContent>
              <IconCircle bg="#E9D5FF" color="#7C3AED">
                <ShopOutlined />
              </IconCircle>
              <TextGroup>
                <InfoValue>{loja?.store}</InfoValue>
                <InfoLabel>Nome da loja</InfoLabel>
              </TextGroup>
            </CardContent>
          </InfoCard>

          <InfoCard>
            <CardContent>
              <IconCircle bg="#C7D2FE" color="#4F46E5">
                <UserOutlined />
              </IconCircle>
              <TextGroup>
                <InfoValue>{loja?.name}</InfoValue>
                <InfoLabel>Criador</InfoLabel>
              </TextGroup>
            </CardContent>
          </InfoCard>

          <InfoCard>
            <CardContent>
              <IconCircle bg="#BFDBFE" color="#2563EB">
                <ClockCircleOutlined />
              </IconCircle>
              <TextGroup>
                <InfoValue>{formatDate(loja?.createdAt)}</InfoValue>
                <InfoLabel>Criada em</InfoLabel>
              </TextGroup>
            </CardContent>
          </InfoCard>

          <InfoCard>
            <CardContent>
              <IconCircle bg="#DDD6FE" color="#7C3AED">
                <AppstoreFilled />
              </IconCircle>
              <TextGroup>
                <InfoValue>{loja?.products?.length}</InfoValue>
                <InfoLabel>Produtos</InfoLabel>
              </TextGroup>
            </CardContent>
          </InfoCard>

          <InfoCard>
            <CardContent>
              <IconCircle bg="#BFDBFE" color="#2563EB">
                <CalendarFilled />
              </IconCircle>
              <TextGroup>
                <InfoValue>{loja?.validitys?.length}</InfoValue>
                <InfoLabel>Validades</InfoLabel>
              </TextGroup>
            </CardContent>
          </InfoCard>

          <InfoCard>
            <CardContent>
              <IconCircle bg="#FDE68A" color="#F59E0B">
                <WarningFilled />
              </IconCircle>
              <TextGroup>
                <InfoValue>{loja?.aVencer?.length}</InfoValue>
                <InfoLabel>A vencer</InfoLabel>
              </TextGroup>
            </CardContent>
          </InfoCard>

          <InfoCard>
            <CardContent>
              <IconCircle bg="#FCA5A5" color="#EF4444">
                <CloseCircleFilled />
              </IconCircle>
              <TextGroup>
                <InfoValue>{loja?.vencidos?.length}</InfoValue>
                <InfoLabel>Vencidos</InfoLabel>
              </TextGroup>
            </CardContent>
          </InfoCard>

          <InfoCard>
            <CardContent>
              <IconCircle bg="#BBF7D0" color="#10B981">
                <UsergroupAddOutlined />
              </IconCircle>
              <TextGroup>
                <InfoValue>{loja?.access?.length}</InfoValue>
                <InfoLabel>Usuários</InfoLabel>
              </TextGroup>
            </CardContent>
          </InfoCard>
        </ContainerCards>

        <ContainerGraph>
          <ContainerGraphs>
            <GraphTitle>Distribuição de validades</GraphTitle>
            <Graph {...config} />
          </ContainerGraphs>
        </ContainerGraph>
      </DashboardContainer>
    </Painel>
  );
};

export default Dashboard;
