import Screen from "../../components/Screen/Screen";
import { Container, HomePage, IconBox, ItemList } from "./styles";
import { Typography, Row, Col, Card, Divider } from "antd";
import { CheckCircleOutlined, ApiOutlined, LineChartOutlined, TeamOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

export default function Home() {
  return (
    <Screen>
      <HomePage>
        {/* Seção Principal */}
        <Container>
          <Title level={2}>Bem-vindo ao ValidControl</Title>
          <Paragraph>
            O <strong>ValidControl</strong> é um sistema de gestão de validades de produtos, desenvolvido para empresas que buscam acompanhar prazos de validade de maneira eficiente e segura.
          </Paragraph>
          <Divider />

          {/* Problemas Resolvidos */}
          <Title level={3}>Problemas que resolvemos</Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card hoverable>
                <IconBox>
                  <CheckCircleOutlined />
                </IconBox>
                <Title level={4}>Controle de vencimentos</Title>
                <Paragraph>Visualize rapidamente os produtos vencidos ou próximos da validade e tome decisões rápidas.</Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card hoverable>
                <IconBox>
                  <LineChartOutlined />
                </IconBox>
                <Title level={4}>Relatórios gerenciais</Title>
                <Paragraph>Geração de relatórios detalhados com dados estatísticos sobre validades e produtos.</Paragraph>
              </Card>
            </Col>
          </Row>

          <Divider />

          {/* Funcionalidades Principais */}
          <Title level={3}>Funcionalidades principais</Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card hoverable>
                <IconBox>
                  <ApiOutlined />
                </IconBox>
                <Title level={4}>Cadastro de produtos</Title>
                <Text>Simples, rápido e com alertas automáticos.</Text>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card hoverable>
                <IconBox>
                  <CheckCircleOutlined />
                </IconBox>
                <Title level={4}>Controle de validade</Title>
                <Text>Filtros, alertas e monitoramento em tempo real.</Text>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card hoverable>
                <IconBox>
                  <LineChartOutlined />
                </IconBox>
                <Title level={4}>Dashboard interativo</Title>
                <Text>Indicadores gráficos e estatísticas do sistema.</Text>
              </Card>
            </Col>
          </Row>

          <Divider />

          {/* Tecnologias utilizadas */}
          <Title level={3}>Tecnologias utilizadas</Title>
          <Paragraph>O projeto foi desenvolvido com as seguintes tecnologias:</Paragraph>
          <ul>
            <ItemList>⚛️ React.js + Ant Design</ItemList>
            <ItemList>🎨 styled-components</ItemList>
            <ItemList>📦 API REST para comunicação backend</ItemList>
            <ItemList>📊 Gráficos interativos</ItemList>
          </ul>

          <Divider />

          {/* Objetivos Futuros */}
          <Title level={3}>Objetivos futuros</Title>
          <ul>
            <ItemList>🔔 Notificações automáticas por e-mail e SMS</ItemList>
            <ItemList>🔐 Controle de permissões por usuário</ItemList>
          </ul>

          <Divider />

          {/* Sobre o desenvolvedor */}
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
      </HomePage>
    </Screen>
  );
}
