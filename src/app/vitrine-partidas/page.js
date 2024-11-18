'use client';

import { Container, Row, Col, Card, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function VitrinePartidas() {
  const [partidas, setPartidas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const partidasFixas = [
      {
        id: 1,
        adversario: 'Vitória',
        local: 'Estádio Barradão, Salvador, BA',
        data: '09/11/2024',
        horario: '16h30',
        historico: 'Último jogo: Vitória 1 x 2 Corinthians. Nos últimos 5 confrontos: 3 vitórias do Corinthians, 1 empate, 1 vitória do Vitória.',
        analise: 'O Corinthians vem de uma sequência positiva contra o Vitória, com predominância de vitórias nos últimos confrontos.',
      },
      {
        id: 2,
        adversario: 'Cruzeiro',
        local: 'Neo Química Arena, São Paulo, SP',
        data: '20/11/2024',
        horario: '20h00',
        historico: 'Último jogo: Cruzeiro 0 x 1 Corinthians. Nos últimos 5 confrontos: 2 vitórias do Corinthians, 2 empates, 1 vitória do Cruzeiro.',
        analise: 'Os confrontos entre Corinthians e Cruzeiro têm sido equilibrados, com leve vantagem para o Corinthians nos últimos encontros.',
      },
      {
        id: 3,
        adversario: 'Vasco da Gama',
        local: 'Neo Química Arena, São Paulo, SP',
        data: '23/11/2024',
        horario: '20h00',
        historico: 'Último jogo: Vasco 1 x 1 Corinthians. Nos últimos 5 confrontos: 1 vitória do Corinthians, 3 empates, 1 vitória do Vasco.',
        analise: 'Os jogos entre Corinthians e Vasco têm sido marcados por equilíbrio, com vários empates recentes.',
      },
      {
        id: 4,
        adversario: 'Criciúma',
        local: 'Estádio Heriberto Hülse, Criciúma, SC',
        data: '30/11/2024',
        horario: '19h30',
        historico: 'Último jogo: Corinthians 2 x 0 Criciúma. Nos últimos 5 confrontos: 4 vitórias do Corinthians, 1 empate.',
        analise: 'O Corinthians tem mantido uma boa sequência de resultados contra o Criciúma, com predominância de vitórias.',
      },
      {
        id: 5,
        adversario: 'Bahia',
        local: 'Neo Química Arena, São Paulo, SP',
        data: '03/12/2024',
        horario: '20h00',
        historico: 'Último jogo: Bahia 0 x 1 Corinthians. Nos últimos 5 confrontos: 3 vitórias do Corinthians, 2 empates.',
        analise: 'O Corinthians tem se mostrado superior nos confrontos recentes contra o Bahia, mantendo uma sequência invicta.',
      },
      {
        id: 6,
        adversario: 'Grêmio',
        local: 'Arena do Grêmio, Porto Alegre, RS',
        data: '08/12/2024',
        horario: '16h00',
        historico: 'Último jogo: Corinthians 1 x 1 Grêmio. Nos últimos 5 confrontos: 2 vitórias do Corinthians, 2 empates, 1 vitória do Grêmio.',
        analise: 'Os confrontos entre Corinthians e Grêmio têm sido equilibrados, com leve vantagem para o Corinthians nos últimos encontros.',
      },
    ];

    const partidasAdicionais = (JSON.parse(localStorage.getItem('partidas')) || []).map((partida) => ({
      ...partida,
      data: new Date(partida.data).toLocaleDateString('pt-BR'),
    }));

    const todasPartidas = [...partidasFixas, ...partidasAdicionais];
    todasPartidas.sort((a, b) => new Date(a.data.split('/').reverse().join('-')) - new Date(b.data.split('/').reverse().join('-')));

    setPartidas(todasPartidas);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value.trim()) {
      const searchResults = partidas.filter(partida =>
        partida.adversario.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setSuggestions(searchResults);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="vitrine-page">

{/* Menu Superior */}

      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="mb-5">
        <Container>
          <Navbar.Brand href="/">Plataforma Coringão</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Início</Nav.Link>
              <Nav.Link href="/vitrine-jogadores">Jogadores</Nav.Link>
              <Nav.Link href="/vitrine-titulos">Títulos</Nav.Link>
              <Nav.Link href="/vitrine-partidas">Partidas</Nav.Link>
              <Nav.Link href="/vitrine-galeria">Galeria</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="O que você procura?"
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Button variant="outline-light">Buscar</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

<br/>
<br/>
 
{/* Sugestões de Busca */}

      {suggestions.length > 0 && (
        <Container className="suggestions-container">
          <ul className="suggestions-list">
            {suggestions.map((item, index) => (
              <li key={index}>{item.adversario}</li>
            ))}
          </ul>
        </Container>
      )}

      <Container className="py-5">
        <h1 className="text-center text-white mb-4">Próximas Partidas</h1>
        <Row>
          {partidas.map((partida) => (
            <Col md={4} className="mb-4" key={partida.id}>
              <Card className="h-100 shadow-sm bg-dark text-light">
                <Card.Body>
                  <Card.Title>Adversário: {partida.adversario}</Card.Title>
                  <Card.Subtitle className="mb-2">Local: {partida.local}</Card.Subtitle>
                  <Card.Text>Data: {partida.data} - Horário: {partida.horario}</Card.Text>
                  <Card.Text><strong>Histórico:</strong> {partida.historico}</Card.Text>
                  <Card.Text><strong>Análise:</strong> {partida.analise}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <style jsx>{`
        .vitrine-page {
          background-color: #000;
          color: #fff;
          min-height: 100vh;
        }
        .card-body {
          background-color: #333;
          color: #fff;
        }
        .card-title,
        .card-subtitle,
        .card-text {
          color: #fff;
        }
        .suggestions-container {
          background: #333;
          padding: 10px;
          margin-bottom: 20px;
        }
        .suggestions-list {
          list-style: none;
          padding: 0;
          color: white;
        }
        .suggestions-list li {
          padding: 5px 0;
          border-bottom: 1px solid #555;
        }
      `}</style>
    </div>
  );
}