'use client';

import { Container, Row, Col, Card, Modal, Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function VitrineTitulos() {
  const [titulos, setTitulos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tituloSelecionado, setTituloSelecionado] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Títulos fixos de 2009 a 2020
    const titulosFixos = [
      {
        id: 1,
        titulo: 'Campeonato Paulista 2009',
        ano: 2009,
        descricao: 'Corinthians conquistou o Campeonato Paulista de 2009, vencendo o Palmeiras na final por 2 a 0.',
        destaques: 'Jorge Henrique, Ronaldo Fenômeno.',
        detalhes: 'A conquista foi marcada pela liderança de Ronaldo e a excelente campanha do Corinthians durante todo o torneio.',
      },
      {
        id: 2,
        titulo: 'Copa do Brasil 2009',
        ano: 2009,
        descricao: 'Corinthians derrotou o Internacional na final da Copa do Brasil de 2009 com uma vitória por 2 a 0.',
        destaques: 'Ronaldo Fenômeno, Jorge Henrique.',
        detalhes: 'A vitória consolidou a volta do Corinthians à elite do futebol brasileiro e a sequência de conquistas de 2009.',
      },
      {
        id: 3,
        titulo: 'Campeonato Paulista 2017',
        ano: 2017,
        descricao: 'Corinthians venceu o Campeonato Paulista de 2017, derrotando a Ponte Preta na final.',
        destaques: 'Jô, Fagner.',
        detalhes: 'Comandado por Carille, o Corinthians teve uma campanha invicta, ganhando o título de forma contundente.',
      },
      {
        id: 4,
        titulo: 'Copa Libertadores 2012',
        ano: 2012,
        descricao: 'O Corinthians conquistou sua primeira Copa Libertadores da história, vencendo o Boca Juniors na final.',
        destaques: 'Paulinho, Jorge Henrique, Emerson Sheik.',
        detalhes: 'Em uma campanha histórica, o Corinthians superou grandes equipes da América do Sul, com um desempenho espetacular.',
      },
      {
        id: 5,
        titulo: 'Mundial de Clubes 2012',
        ano: 2012,
        descricao: 'Corinthians se sagrou campeão mundial, derrotando o Chelsea por 1 a 0 no Japão.',
        destaques: 'Ralf, Paolo Guerrero.',
        detalhes: 'Com uma vitória marcante na final, o Corinthians conquistou o seu segundo título mundial, consolidando-se como um dos grandes clubes do futebol mundial.',
      },
      {
        id: 6,
        titulo: 'Campeonato Brasileiro 2015',
        ano: 2015,
        descricao: 'Corinthians se consagrou campeão do Campeonato Brasileiro de 2015.',
        destaques: 'Jadson, Renato Augusto.',
        detalhes: 'Sob a liderança de Tite, o Corinthians dominou o campeonato e conquistou o título com uma bela campanha.',
      },
      {
        id: 7,
        titulo: 'Mundial de Clubes',
        ano: 2000,
        descricao: 'Corinthians venceu o Campeonato Mundial de 2000, derrotando o Vasco na final.',
        destaques: 'Edilson Capetinha, Ricardinho.',
        detalhes: 'A equipe, que derrotou o Real Madrid no meio do caminho, venceu após final emocionante nas penalidades.',
      },
    ];

    const titulosAdicionais = JSON.parse(localStorage.getItem('titulos')) || [];
    const todosTitulos = [...titulosFixos, ...titulosAdicionais].sort((a, b) => a.ano - b.ano);
    setTitulos(todosTitulos);
  }, []);

  const handleShowDetails = (titulo) => {
    setTituloSelecionado(titulo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTituloSelecionado(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value.trim()) {
      const searchResults = titulos.filter(titulo =>
        titulo.titulo.toLowerCase().includes(event.target.value.toLowerCase())
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

<br />
<br />

{/* Sugestões de Busca */}

      {suggestions.length > 0 && (
        <Container className="suggestions-container">
          <ul className="suggestions-list">
            {suggestions.map((item, index) => (
              <li key={index}>{item.titulo}</li>
            ))}
          </ul>
        </Container>
      )}

      <Container className="py-5">
        <h1 className="text-center text-white mb-4">Títulos do Corinthians</h1>

{/* Linha do Tempo */}

        <div className="timeline">
          {titulos.map((titulo) => (
            <div key={titulo.id} className="timeline-item" onClick={() => handleShowDetails(titulo)}>
              <span className="timeline-year">{titulo.ano}</span>
              <div className="timeline-content">
                <h5>{titulo.titulo}</h5>
              </div>
            </div>
          ))}
        </div>

{/* Modal de Detalhes */}

        {tituloSelecionado && (
          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>{tituloSelecionado.titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Ano:</strong> {tituloSelecionado.ano}</p>
              <p><strong>Descrição:</strong> {tituloSelecionado.descricao}</p>
              <p><strong>Destaques:</strong> {tituloSelecionado.destaques}</p>
              <p><strong>Detalhes:</strong> {tituloSelecionado.detalhes}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Fechar</Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>

      <style jsx>{`
        .vitrine-page {
          background-color: #000;
          color: #fff;
          min-height: 100vh;
        }
        .timeline {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }
        .timeline-item {
          background-color: #1a1a1a;
          color: #fff;
          padding: 20px;
          border-radius: 10px;
          cursor: pointer;
          text-align: center;
          transition: transform 0.3s, background-color 0.3s;
        }
        .timeline-item:hover {
          transform: scale(1.05);
          background-color: #333;
        }
        .timeline-year {
          font-size: 24px;
          font-weight: bold;
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