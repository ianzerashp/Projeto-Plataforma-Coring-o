'use client';

import { Container, Row, Col, Card, Navbar, Nav, Form, FormControl, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';

export default function Galeria() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  const imagensFixas = [
    {
      src: 'https://api.meutimao.com.br/img/arena-corinthians/mosaico-na-arena-corinthians-tu-es-orgulho.jpg',
      descricao: 'Arena Corinthians em dia de jogo com mosaico "Tu és orgulho"',
    },
    {
      src: 'https://cdn.meutimao.com.br/_upload/historia/titulos-conquistados/campeonato_brasileiro_2015.jpg',
      descricao: 'Comemoração do título do Brasileirão com a torcida',
    },
    {
      src: 'https://www.meutimao.com.br/fotos-do-corinthians/w941/2023/05/14/gavioes_da_fiel_marcou_presenca_novamente_nas_im3r.jpg',
      descricao: 'A apaixonada Fiel torcida corinthiana',
    },
    {
      src: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/07/corinthians-libertadores-2012-e1720108028700.jpg',
      descricao: 'Corinthians conquistando a Libertadores em 2012',
    },
    {
      src: 'https://i.ytimg.com/vi/5xFI4AJ-lIs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDzbKZEzXXDG02GoAv8bgO7Cc-B_A',
      descricao: 'A icônica camisa do Corinthians ao longo dos anos',
    },
    {
      src: 'https://cdn.meutimao.com.br/_upload/historia/fatos-marcantes/a_historia_dos_escudos_corinthianos.jpg',
      descricao: 'Os escudos do Corinthians pela história',
    },
    {
        src: 'https://pbs.twimg.com/media/F9fOuUnXkAAPksX?format=jpg&name=medium',
        descricao: 'Corinthians invade o Japão com mais de 40 mil torcedores',
    },
    {
        src: 'https://static.corinthians.com.br/uploads/1608038346421b3ac5c24ee992edd6087611c60dbb.png',
        descricao: 'Corinthians comemora o título mundial de 2012',
    },
    {
        src: 'https://cdn.oantagonista.com/uploads/2024/02/Corinthians-pode-romper-com-Libra-e-acertar-com-Forte-Brasil.jpg',
        descricao: 'Bandeirão do Corinthians',
    },
    {
        src: 'https://conteudo.imguol.com.br/c/esporte/6a/2024/09/01/torcida-do-corinthians-antes-de-jogo-contra-flamengo-faz-festa-com-mosaico-relativo-ao-aniversario-de-114-anos-do-clube-1725219928567_v2_450x450.jpg',
        descricao: 'Mosaico 3D da Gaviões da Fiel',
    },
    {
        src: 'https://classic.exame.com/wp-content/uploads/2020/09/corinthians-1.jpg?quality=70&strip=info&w=680',
        descricao: 'Nossa casa',
    },
    {
        src: 'https://static.corinthians.com.br/uploads/41bcfd9ab658ebaac1661f58080aad6b.jpg',
        descricao: 'A presença da Fiel torcida no estádio',
    },    
    
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value.trim()) {
      const searchResults = imagensFixas.filter(imagem =>
        imagem.descricao.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setSuggestions(searchResults);
    } else {
      setSuggestions([]);
    }
  };

  const handleImageClick = (imagem) => {
    setImagemSelecionada(imagem);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setImagemSelecionada(null);
  };

  return (
    <div className="galeria-page">

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
              <li key={index}>{item.descricao}</li>
            ))}
          </ul>
        </Container>
      )}

      <Container className="py-5">
        <h1 className="text-center text-white mb-4">Galeria</h1>
        <Row>
          {imagensFixas.map((imagem, index) => (
            <Col md={4} className="mb-4" key={index}>
              <Card
                className="h-100 shadow-sm bg-dark text-light clickable-card"
                onClick={() => handleImageClick(imagem)}
              >
                <img
                  src={imagem.src}
                  alt={imagem.descricao}
                  style={{
                    objectFit: 'cover',
                    height: '200px',
                    width: '100%',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                  }}
                />
                <Card.Body>
                  <Card.Text>{imagem.descricao}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
      </Container>

{/* Modal para Expandir Imagem */}

      {imagemSelecionada && (
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          centered
          dialogClassName="expanded-modal"
        >
          <Modal.Body className="p-0">
            <img
              src={imagemSelecionada.src}
              alt={imagemSelecionada.descricao}
              className="expanded-image"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <style jsx>{`
        .galeria-page {
          background-color: #000;
          color: #fff;
          min-height: 100vh;
        }
        .clickable-card {
          cursor: pointer;
          transition: transform 0.2s;
        }
        .clickable-card:hover {
          transform: scale(1.05);
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
        .expanded-modal .modal-dialog {
          max-width: 95%;
          margin: auto;
        }
        .expanded-modal .modal-content {
          background-color: rgba(0, 0, 0, 0.9);
          border: none;
        }
        .expanded-image {
          width: 100%;
          height: auto;
          max-height: 90vh;
          object-fit: contain;
        }
        .expanded-modal .modal-backdrop {
          background-color: rgba(0, 0, 0, 0.9);
        }
      `}</style>
    </div>
  );
}