import useTitle from "../../../hooks/useTitle";
import Painel from "../../../components/Painel/Painel";

import { useEffect, useState } from "react";
import { ValidityType } from "../../../types/types";
import { useAppSelector } from "../../../hooks/store";
import { ContainerCards, ContainerGraph, ContainerGraphs, DashboardContainer, Graph, GraphTitle, InfoCard, InfoTitle, InfoValue } from "./styles";
import { Timestamp } from "firebase/firestore";

const Dashboard = () => {
  useTitle("Dashboard");

  const { loja } = useAppSelector((state) => state.globalReducer);

  const [info, setInfo] = useState<{ aVencer: ValidityType[] | null; vencidos: ValidityType[] | null }>({
    aVencer: null,
    vencidos: null,
  });

  const [data, setData] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      day: `${i + 1}`,
      frequency: 0,
    }))
  );
  const [vencidosData, setVencidosData] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      day: `${i + 1}`,
      frequency: 0,
    }))
  );

  const config = {
    data,
    xField: "day",
    yField: "frequency",
    onReady: (params: {
      chart: {
        _container: HTMLElement;
        on: (eventName: string, callback: () => void, once?: boolean) => void;
        emit: (eventName: string, payload: { data: { data: (typeof data)[number] }; offsetY: number }) => void;
      };
    }) => {
      try {
        const { height } = params.chart._container.getBoundingClientRect();
        const tooltipItem = data[Math.floor(Math.random() * data.length)];
        params.chart.on(
          "afterrender",
          () => {
            params.chart.emit("tooltip:show", {
              data: {
                data: tooltipItem,
              },
              offsetY: height / 2 - 60,
            });
          },
          true
        );
      } catch (e) {
        console.error(e);
      }
    },
  };

  const configVencidos = {
    data: vencidosData,
    xField: "day",
    yField: "frequency",
    onReady: (params: {
      chart: {
        _container: HTMLElement;
        on: (eventName: string, callback: () => void, once?: boolean) => void;
        emit: (eventName: string, payload: { data: { data: (typeof data)[number] }; offsetY: number }) => void;
      };
    }) => {
      try {
        const { height } = params.chart._container.getBoundingClientRect();
        const tooltipItem = vencidosData[Math.floor(Math.random() * vencidosData.length)];
        params.chart.on(
          "afterrender",
          () => {
            params.chart.emit("tooltip:show", {
              data: {
                data: tooltipItem,
              },
              offsetY: height / 2 - 60,
            });
          },
          true
        );
      } catch (e) {
        console.error(e);
      }
    },
  };

  function formatDate(date: string | Timestamp | null | undefined) {
    if (!date) return "Indisponível";

    if (typeof date === "string") {
      return new Date(date).toLocaleDateString("pt-BR");
    }
    const localDate = new Date(date + "T00:00:00"); // Adiciona um horário para evitar problemas de fuso horário
    return localDate.toLocaleDateString("pt-BR");
  }

  useEffect(() => {
    if (loja?.validitys) {
      const date = new Date();

      const newData = Array.from({ length: 15 }, (_, i) => ({
        day: `${i + 1}`,
        frequency: 0,
      }));
      const newVencidos = Array.from({ length: 15 }, (_, i) => ({
        day: `${i + 1}`,
        frequency: 0,
      }));

      const aVencer = loja.validitys.filter((validade: ValidityType) => {
        const dataValidity = new Date(validade.date + "T00:00:00"); // Adiciona um horário para evitar problemas de fuso horário

        const diferenca = dataValidity.getTime() - date.getTime();
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));

        if (dias >= 0 && dias < 15) {
          newData[dias].frequency += 1;
          return true;
        }
        return false;
      });

      const vencidos = loja.validitys.filter((validade: ValidityType) => {
        const dataValidity = new Date(validade.date + "T00:00:00"); // Adiciona um horário para evitar problemas de fuso horário

        const diferenca = dataValidity.getTime() - date.getTime();
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const index = Math.abs(dias) - 1;
        if (dias < 0 && index < 15) {
          newVencidos[index].frequency += 1;
          return true;
        }
        return false;
      });

      setData(newData);
      setVencidosData(newVencidos);

      setInfo({
        aVencer,
        vencidos,
      });
    }
  }, [loja]);

  return (
    <Painel>
      <DashboardContainer>
        <ContainerCards>
          {/* Cards de informações */}
          <InfoCard>
            <InfoTitle>Nome da loja:</InfoTitle>
            <InfoValue>{loja?.store}</InfoValue>
          </InfoCard>

          <InfoCard>
            <InfoTitle>Nome do criador:</InfoTitle>
            <InfoValue>{loja?.name}</InfoValue>
          </InfoCard>

          <InfoCard>
            <InfoTitle>Loja criada:</InfoTitle>
            <InfoValue>{formatDate(loja?.createdAt)}</InfoValue>
          </InfoCard>

          <InfoCard>
            <InfoTitle>Produtos Cadastrados:</InfoTitle>
            <InfoValue>
              {loja?.products?.length} {loja?.products?.length === 1 ? "produto" : "produtos"}
            </InfoValue>
          </InfoCard>

          <InfoCard>
            <InfoTitle>Validades Cadastradas:</InfoTitle>
            <InfoValue>
              {loja?.validitys?.length} {loja?.validitys?.length === 1 ? "validade" : "validades"}
            </InfoValue>
          </InfoCard>

          <InfoCard>
            <InfoTitle>A vencer:</InfoTitle>
            <InfoValue>
              {info.aVencer?.length} {info.aVencer?.length === 1 ? "produto" : "produtos"} a vencer
            </InfoValue>
          </InfoCard>

          <InfoCard>
            <InfoTitle>Vencidos:</InfoTitle>
            <InfoValue>
              {info.vencidos?.length} {info.vencidos?.length === 1 ? "produto vencido" : "produtos vencidos"}
            </InfoValue>
          </InfoCard>

          <InfoCard>
            <InfoTitle>Usuários da loja:</InfoTitle>
            <InfoValue>
              {loja?.access?.length} {loja?.access?.length === 1 ? "usuário" : "usuários"}
            </InfoValue>
          </InfoCard>
        </ContainerCards>

        <ContainerGraph>
          <ContainerGraphs>
            <GraphTitle>Produtos a Vencer nos Próximos 15 Dias</GraphTitle>
            <Graph {...config} />
          </ContainerGraphs>
          <ContainerGraphs>
            <GraphTitle>Produtos Vencidos nos Últimos 15 Dias</GraphTitle>
            <Graph {...configVencidos} />
          </ContainerGraphs>
        </ContainerGraph>
      </DashboardContainer>
    </Painel>
  );
};

export default Dashboard;
