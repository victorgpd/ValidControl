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
        <section id="home">
          <Container>
            <Title level={2}>Bem-vindo ao ValidControl</Title>
            <Paragraph>
              O <strong>ValidControl</strong> é um sistema de gestão de validades de produtos, desenvolvido para empresas que buscam acompanhar prazos de validade de maneira eficiente e segura. Ele
              fornece uma interface fácil de usar, com recursos poderosos para automatizar e otimizar a gestão de estoque.
            </Paragraph>
          </Container>
        </section>
        
        <Divider />

        {/* Seção: Problemas Resolvidos */}
        <section id="problems">
          <Container>
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
          </Container>
        </section>

        <Divider />

        {/* Seção: Funcionalidades Principais */}
        <section id="features">
          <Container>
            <Title level={3}>Funcionalidades principais</Title>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <Card hoverable>
                  <IconBox>
                    <ApiOutlined />
                  </IconBox>
                  <Title level={4}>Cadastro de produtos</Title>
                  <Text>Simples, rápido e com informações detalhadas.</Text>
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
          </Container>
        </section>

        <Divider />

        {/* Seção: Tecnologias Utilizadas */}
        <section id="technologies">
          <Container>
            <Title level={3}>Tecnologias utilizadas</Title>
            <Paragraph>O projeto foi desenvolvido com as seguintes tecnologias:</Paragraph>
            <ul>
              <ItemList>⚛️ React.js + Ant Design</ItemList>
              <ItemList>🎨 styled-components</ItemList>
              <ItemList>📦 API REST para comunicação backend</ItemList>
              <ItemList>🔗 Conexão com Firebase</ItemList>
              <ItemList>📊 Gráficos interativos</ItemList>
            </ul>
          </Container>
        </section>

        <Divider />

        {/* Seção: Objetivos Futuros */}
        <section id="future-goals">
          <Container>
            <Title level={3}>Objetivos futuros</Title>
            <ul>
              <ItemList>🔔 Notificações automáticas por e-mail e SMS</ItemList>
              <ItemList>🔐 Controle de permissões por usuário</ItemList>
            </ul>
          </Container>
        </section>

        <Divider />

        {/* Seção: Sobre o Projeto */}
        <section id="about">
          <Container>
            <Title level={3}>Sobre o ValidControl e o desenvolvedor</Title>
            <Card>
              <IconBox>
                <TeamOutlined />
              </IconBox>
              <Text>
                O <strong>ValidControl</strong> é um sistema de gestão de validades de produtos, desenvolvido para empresas que buscam otimizar e automatizar o controle de estoque. Com uma interface
                fácil de usar e recursos poderosos, ele permite monitorar prazos de validade e gerar relatórios detalhados para facilitar a tomada de decisões. O projeto foi desenvolvido com
                tecnologias modernas como React.js, Ant Design e Firebase, garantindo uma experiência rápida, segura e intuitiva.
              </Text>

              <br />
              <br />

              <Text>
                Este projeto foi desenvolvido por um desenvolvedor apaixonado por automação e melhoria de processos. O autor, que está sempre buscando aplicar boas práticas de desenvolvimento e design
                moderno, focou em criar uma experiência de usuário fluida e intuitiva. Com experiência em tecnologias como React, Ant Design, styled-components, e integração com Firebase, o objetivo é
                oferecer uma solução eficiente e prática para a gestão de validades de produtos e controle de estoque.
              </Text>
            </Card>
          </Container>
        </section>
      </HomePage>
    </Screen>
  );
}
