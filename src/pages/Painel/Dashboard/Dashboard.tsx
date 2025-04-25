import useTitle from "../../../hooks/useTitle";
import Painel from "../../../components/Painel/Painel";

import { useEffect, useState } from "react";
import { WhereFilterOp } from "firebase/firestore";
import { useAppSelector } from "../../../hooks/store";
import { InformacoesType, ValidityType } from "../../../types/types";
import { useFetchDocumentsOnce } from "../../../hooks/useFetchDocumentsOnce";
import { ContainerCards, ContainerGraph, ContainerGraphs, DashboardContainer, Graph, GraphTitle, InfoCard, InfoTitle, InfoValue } from "./styles";

const Dashboard = () => {
  useTitle("Dashboard");

  const [info, setInfo] = useState<InformacoesType>({
    name: null,
    store: null,
    access: null,
    aVencer: null,
    vencidos: null,
    products: null,
    validitys: null,
    createdBy: null,
    createdAt: null,
  });

  const { user } = useAppSelector((state) => state.globalReducer);

  const conditions: { field: string; op: WhereFilterOp; value: string }[] = [
    {
      field: "access",
      op: "array-contains",
      value: user?.email || "",
    },
  ];

  const { document } = useFetchDocumentsOnce("lojas", conditions);

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

  useEffect(() => {
    if (document) {
      const date = new Date();

      const newData = [...data];
      const newVencidos = [...vencidosData];

      const aVencer = document.validitys.filter((validade: ValidityType) => {
        const diferenca = validade.date - date.getTime();
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));

        if (dias >= 0 && dias < 15) {
          newData[dias].frequency += 1;
          return true;
        }
        return false;
      });

      const vencidos = document.validitys.filter((validade: ValidityType) => {
        const diferenca = validade.date - date.getTime();
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
        name: document.name,
        store: document.store,
        access: document.access,
        products: document.products,
        validitys: document.validitys,
        createdBy: document.createdBy,
        createdAt: document.createdAt.toDate().toLocaleDateString("pt-BR"),
      });
    }
  }, [document]);

  return (
    <Painel>
      <DashboardContainer>
        <ContainerCards>
          {/* Cards de informações */}
          <InfoCard>
            <InfoTitle>Nome da loja:</InfoTitle>
            <InfoValue>{info.store}</InfoValue>
          </InfoCard>

          <InfoCard>
            <InfoTitle>Nome do criador:</InfoTitle>
            <InfoValue>{info.name}</InfoValue>
          </InfoCard>

          <InfoCard>
            <InfoTitle>Loja criada:</InfoTitle>
            <InfoValue>{info.createdAt}</InfoValue>
          </InfoCard>

          <InfoCard>
            <InfoTitle>Produtos Cadastrados:</InfoTitle>
            <InfoValue>
              {info.products?.length} {info.products?.length === 1 ? "produto" : "produtos"}
            </InfoValue>
          </InfoCard>

          <InfoCard>
            <InfoTitle>Validades Cadastradas:</InfoTitle>
            <InfoValue>
              {info.validitys?.length} {info.validitys?.length === 1 ? "validade" : "validades"}
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
              {info.access?.length} {info.access?.length === 1 ? "usuário" : "usuários"}
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
