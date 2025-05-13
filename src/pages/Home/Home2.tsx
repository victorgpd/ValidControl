import { Typography, Row, Col, Card, Divider } from "antd";
import styled from "styled-components";
import { CheckCircleOutlined, ApiOutlined, LineChartOutlined, TeamOutlined } from "@ant-design/icons";
import Screen from "../../components/Screen/Screen";

const { Title, Paragraph, Text } = Typography;

const Container = styled.div`
  padding: 40px 24px;
  padding-top: 64px;
  max-width: 1200px;
  margin: 0 auto;

  height: 100%;
`;

const IconBox = styled.div`
  font-size: 32px;
  color: #1890ff;
  margin-bottom: 16px;
`;

export default function Home() {
  return (
    <Screen>
      <Container>
        <Title level={2}>Sobre o ValidControl</Title>
        <Paragraph>
          O <strong>ValidControl</strong> é um sistema de gestão de validades de produtos voltado para empresas que precisam acompanhar prazos de validade de forma ágil e segura.
        </Paragraph>
        <Divider />
        <Title level={3}>Problemas que resolvemos</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card>
              <IconBox>
                <CheckCircleOutlined />
              </IconBox>
              <Title level={4}>Controle de vencimentos</Title>
              <Paragraph>Visualize rapidamente os produtos vencidos ou próximos da validade e tome decisões rápidas.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card>
              <IconBox>
                <LineChartOutlined />
              </IconBox>
              <Title level={4}>Relatórios gerenciais</Title>
              <Paragraph>Geração de relatórios detalhados com dados estatísticos sobre validades e produtos.</Paragraph>
            </Card>
          </Col>
        </Row>
        <Divider />
        <Title level={3}>Funcionalidades principais</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card>
              <IconBox>
                <ApiOutlined />
              </IconBox>
              <Title level={4}>Cadastro de produtos</Title>
              <Text>Simples, rápido e com alertas automáticos.</Text>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card>
              <IconBox>
                <CheckCircleOutlined />
              </IconBox>
              <Title level={4}>Controle de validade</Title>
              <Text>Filtros, alertas e monitoramento em tempo real.</Text>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card>
              <IconBox>
                <LineChartOutlined />
              </IconBox>
              <Title level={4}>Dashboard interativo</Title>
              <Text>Indicadores gráficos e estatísticas do sistema.</Text>
            </Card>
          </Col>
        </Row>
        <Divider />
        <Title level={3}>Tecnologias utilizadas</Title>
        <Paragraph>O projeto foi desenvolvido com as seguintes tecnologias:</Paragraph>
        <ul>
          <li>⚛️ React.js + Ant Design</li>
          <li>🎨 styled-components</li>
          <li>📦 API REST para comunicação backend</li>
          <li>📊 Gráficos interativos (ex: Recharts)</li>
        </ul>
        <Divider />
        <Title level={3}>Objetivos futuros</Title>
        <ul>
          <li>🔔 Notificações automáticas por e-mail e SMS</li>
          <li>📱 Versão mobile</li>
          <li>🔐 Controle de permissões por usuário</li>
        </ul>
        <Divider />
        <Title level={3}>Sobre o desenvolvedor</Title>
        <Card>
          <IconBox>
            <TeamOutlined />
          </IconBox>
          <Text>
            Este projeto foi desenvolvido como parte de uma iniciativa de automação e melhoria no controle de estoque e validades. O autor busca aplicar boas práticas de desenvolvimento e design
            moderno focado na experiência do usuário.
          </Text>
        </Card>
      </Container>
    </Screen>
  );
}
