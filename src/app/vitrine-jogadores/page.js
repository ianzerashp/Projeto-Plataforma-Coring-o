'use client';

import { Container, Carousel, Button, Card, Row, Col, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function VitrineJogadores() {
  const [jogadores, setJogadores] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const jogadoresFixos = [
    {
      nome: 'Hugo Souza',
      idade: 24,
      posicao: 'Goleiro',
      descricao: 'Goleiro promissor, com grandes defesas e reflexos.',
      imagem: 'https://s2-ge.glbimg.com/8x_2PpMm7e9RimVf38hfDBCmmqQ=/0x0:2316x3088/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2024/w/E/8deJv5RHuquNpIepbNNg/gubybjcxmaaueup.jpg',
    },
    {
      nome: 'Matheuzinho',
      idade: 23,
      posicao: 'Lateral Direito',
      descricao: 'Jogador veloz, bom em assistências e na marcação.',
      imagem: 'https://s2-ge.glbimg.com/fzMOm12d6HBN_ZRQOewezRaUI9M=/0x0:4491x2994/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2024/L/J/pyc48sSyCSa1SyoSB8Gw/rib7779.jpg',
    },
    {
      nome: 'André Ramalho',
      idade: 29,
      posicao: 'Zagueiro',
      descricao: 'Zagueiro experiente, muito forte no jogo aéreo.',
      imagem: 'https://conteudo.imguol.com.br/c/esporte/64/2024/08/04/andre-ramalho-do-corinthians-1722808046809_v2_1x1.jpg',
    },
    {
      nome: 'Cacá',
      idade: 22,
      posicao: 'Zagueiro',
      descricao: 'Jovem zagueiro, com boa saída de bola e forte.',
      imagem: 'https://www.meutimao.com.br/fotos-do-corinthians/w941/2024/10/17/caca_comemorando_gol_do_corinthians_contra_o_19hr.jpg',
    },
    {
      nome: 'Matheus Bidu',
      idade: 25,
      posicao: 'Lateral Esquerdo',
      descricao: 'Lateral ofensivo, ótimo no apoio ao ataque.',
      imagem: 'https://ds-images.bolavip.com/news/image?src=https%3A%2F%2Fimages.bolavip.com%2Fwebp%2Fbr%2Ffull%2FBBR_20240814_BBR_918794_AGIF24080800262538-scaled-e1723636621735.webp&width=470&height=352',
    },
    {
      nome: 'Igor Coronado',
      idade: 27,
      posicao: 'Meia',
      descricao: 'Meia criativo, com boa visão de jogo e bons passes.',
      imagem: 'https://cdn.meutimao.com.br/_upload/jogador/igor-caique-coronado-no-corinthians_7_corinthians.jpg',
    },
    {
      nome: 'Raniele',
      idade: 26,
      posicao: 'Volante',
      descricao: 'Volante de contenção, excelente na marcação.',
      imagem: 'https://identidadecorinthiana.com/wp-content/uploads/2024/03/Raniele-Corinthians-Entrevista-1280x720.webp',
    },
    {
      nome: 'Rodrigo Garro',
      idade: 28,
      posicao: 'Atacante',
      descricao: 'Atacante rápido, habilidoso, ótimo finalizador.',
      imagem: 'https://placar.com.br/wp-content/uploads/2024/07/GRr_XuwXcAAgW83-1.jpg',
    },
    {
      nome: 'Ángel Romero',
      idade: 32,
      posicao: 'Atacante',
      descricao: 'Nosso garotinho desespero, já ajudou demais.',
      imagem: 'https://cdn.meutimao.com.br/_upload/noticia/2024/09/22/angel-romero-comemora-gol-do-corinthians-contra-nu941w.jpg',
    },
    {
      nome: 'Yuri Alberto',
      idade: 26,
      posicao: 'Atacante',
      descricao: 'Centroavante, bom no jogo aéreo e na finalização.',
      imagem: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/07/yuri-alberto-corinthians.jpeg?w=1000',
    },
    {
      nome: 'Memphis Depay',
      idade: 30,
      posicao: 'Atacante',
      descricao: 'Atacante de extrema habilidade e finalizador preciso.',
      imagem: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/10/depay-gol-corinthians-athletico-pr-e1729212643352.jpeg?w=1200&h=1200&crop=1',
    },
  ];

  function calcularIdade(dataNascimento) {
    const [dia, mes, ano] = dataNascimento.split('/').map(Number);
    const hoje = new Date();
    const aniversario = new Date(ano, mes - 1, dia);
    let idade = hoje.getFullYear() - aniversario.getFullYear();
    if (hoje < new Date(hoje.getFullYear(), aniversario.getMonth(), aniversario.getDate())) {
      idade--;
    }
    return idade;
  }

  useEffect(() => {
    const storedJogadores = JSON.parse(localStorage.getItem('jogadores')) || [];
    const jogadoresComIdade = storedJogadores.map(jogador => ({
      ...jogador,
      idade: jogador.data_nascimento ? calcularIdade(jogador.data_nascimento) : 'N/A',
    }));
    setJogadores(jogadoresComIdade);
  }, []);

  const handleCarouselClick = () => {
    setIsPaused(!isPaused);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value.trim()) {
      const searchResults = [...jogadoresFixos, ...jogadores].filter(jogador =>
        jogador.nome.toLowerCase().includes(event.target.value.toLowerCase())
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
<br />

{/* Sugestões de Busca */}

      {suggestions.length > 0 && (
        <Container className="suggestions-container">
          <ul className="suggestions-list">
            {suggestions.map((item, index) => (
              <li key={index}>{item.nome}</li>
            ))}
          </ul>
        </Container>
      )}
        <br />
      <Container className="py-5">
        <h1 className="text-center mb-4 titulo-branco">Elenco</h1>

{/* Carrossel de Jogadores */}

        <Carousel
          pause={isPaused ? 'hover' : false}
          controls
          indicators
          interval={isPaused ? null : 3000}
          className="carousel-container"
        >
          {[...jogadoresFixos, ...jogadores].map((jogador, index) => (
            <Carousel.Item key={jogador.id || `jogador-${index}`} onClick={handleCarouselClick}>
              <img
                className="d-block mx-auto"
                src={jogador.imagem || 'https://via.placeholder.com/400x300'}
                alt={`Imagem do ${jogador.nome}`}
                style={{ width: '400px', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <Carousel.Caption>
                <h3>{jogador.nome}</h3>
                <p>Posição: {jogador.posicao}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

<br />
<br />

{/* Cards Detalhados de Jogadores */}

        <Row className="mt-5">
          {[...jogadoresFixos, ...jogadores].map((jogador, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card className="bg-dark text-white">
                <Card.Img
                  variant="top"
                  src={jogador.imagem}
                  alt={`Imagem de ${jogador.nome}`}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <Card.Body className="card-body">
                  <Card.Title>{jogador.nome}</Card.Title>
                  <Card.Text><b>Idade:</b> {jogador.idade || 'N/A'}</Card.Text>
                  <Card.Text>{jogador.descricao}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <style jsx>{`
        .vitrine-page {
          background-color: #000;
          min-height: 100vh;
          color: white;
        }

        .titulo-branco {
          color: white;
        }

        .carousel-container {
          max-width: 100%;
        }

        .card-body {
          background-color: rgba(0, 0, 0, 0.7);
        }

        .card {
          border-radius: 10px;
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