'use client';

import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Carousel, ListGroup, Modal, ProgressBar } from 'react-bootstrap';
import { FaFutbol, FaTrophy, FaUsers, FaCalendarAlt, FaUserShield, FaCameraRetro } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [idolos, setIdolos] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const [noticiaSelecionada, setNoticiaSelecionada] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedIdolos = JSON.parse(localStorage.getItem('idolos')) || [];
    setIdolos(storedIdolos);

    const noticiasExemplo = [
      {
        id: 1,
        titulo: "Corinthians vence clássico contra a porcada e respira no campeonato!",
        resumo: "Em partida emocionante, o Corinthians derrotou o Palmeiras por 2 a 1 e se aproxima da zona de classificação.",
        detalhes: "Com gols de Rodrigo Garro e Yuri Alberto, o Timão venceu o clássico contra o Palmeiras. A torcida foi à loucura na Neo Química Arena!",
        data: "16/11/2024",
      },
      {
        id: 2,
        titulo: "Novo reforço chega ao Timão",
        resumo: "O atacante Memphis Depay é anunciado como o mais novo reforço do Corinthians.",
        detalhes: "Depay, jogador de renome internacional, assinou contrato com o Corinthians e promete fortalecer o ataque na próxima temporada.",
        data: "15/11/2024",
      },
      {
        id: 3,
        titulo: "Ingressos à venda para Corinthians x Grêmio",
        resumo: "Partida decisiva contra o Grêmio já tem ingressos disponíveis. Não perca!",
        detalhes: "A venda de ingressos para o jogo Corinthians x Grêmio começou hoje. A partida será realizada na Arena do Grêmio, em Porto Alegre.",
        data: "14/11/2024",
      },
    ];
    setNoticias(noticiasExemplo);
  }, []);

  const handleShowDetails = (noticia) => {
    setNoticiaSelecionada(noticia);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setNoticiaSelecionada(null);
    setShowModal(false);
  };

  return (
    <div className="home-page">

{/* Banner */}

      <div className="banner">
        <img src="/banner.png" alt="Banner Corinthians" className="img-fluid" />
      </div>

      <Container className="py-5 text-center">

{/* Escudo e Título */}

        <header className="mb-5">
          <Image
            src="https://cdn.meutimao.com.br/_upload/forumtopico/2022/05/26/escudo_2.jpg"
            alt="Escudo do Time"
            width={300}
            height={300}
            priority
            className="img-fluid"
          />
          <h1 className="display-4 mt-3 text-white">Bem-vindo à Plataforma Coringão!</h1>
          <p className="lead text-light">Plataforma feita por loucos, para o bando de loucos! Acompanhe tudo sobre o Corinthians. Plataforma atualizada por nossos administradores.</p>
        </header>

{/* Estatísticas do Time */}
<section className="mb-5">
  <h2 className="display-6 text-white">Estatísticas do Time</h2>

  <br />
  
  <Row className="text-center">
    {/* Card: Artilheiros */}
    <Col md={4} className="mb-4">
      <Card className="h-100 bg-dark text-light">
        <Card.Body>
          <Card.Title>Artilheiros</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item className="bg-dark text-light">
              <strong>1º - Yuri Alberto</strong> - 10 gols em 25 jogos
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark text-light">
              <strong>2º - Rodrigo Garro</strong> - 7 gols em 31 jogos
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark text-light">
              <strong>3º - Ángel Romero</strong> - 5 gols em 24 jogos
            </ListGroup.Item>
          </ListGroup>
          <Button variant="outline-light" className="mt-3">
            Ver Todos
          </Button>
        </Card.Body>
      </Card>
    </Col>

    {/* Card: Assistências */}
    <Col md={4} className="mb-4">
      <Card className="h-100 bg-dark text-light">
        <Card.Body>
          <Card.Title>Assistências</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item className="bg-dark text-light">
              <strong>1º - Rodrigo Garro</strong> - 8 assistências em 31 jogos
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark text-light">
              <strong>2º - Yuri Alberto</strong> - 4 assistências em 25 jogos
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark text-light">
              <strong>2º - Hugo</strong> - 4 assistências em 24 jogos
            </ListGroup.Item>
          </ListGroup>
          <Button variant="outline-light" className="mt-3">
            Ver Todos
          </Button>
        </Card.Body>
      </Card>
    </Col>

    {/* Card: Cartões */}
    <Col md={4} className="mb-4">
      <Card className="h-100 bg-dark text-light">
        <Card.Body>
          <Card.Title>Cartões</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item className="bg-dark text-light">
              <strong>1º - Cacá</strong> - 5 amarelos, 1 vermelho em 25 jogos
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark text-light">
              <strong>1º - Gustavo Henrique</strong> - 5 amarelos, 1 vermelho em 14 jogos
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark text-light">
              <strong>3º - Raniele</strong> - 7 amarelos em 28 jogos
            </ListGroup.Item>
          </ListGroup>
          <Button variant="outline-light" className="mt-3">
            Ver Todos
          </Button>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</section>


{/* Seções principais */}

        <Row className="text-center">
          <Col md={3} className="mb-4">
            <Card className="h-100 shadow-sm card-style">
              <Card.Body>
                <FaUsers size={50} className="icon-black mb-3" />
                <Card.Title>Nossos Jogadores</Card.Title>
                <Card.Text>Veja o elenco do Corinthians!</Card.Text>
                <Link href="/vitrine-jogadores" passHref>
                  <Button variant="dark">Conheça o Time</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="h-100 shadow-sm card-style">
              <Card.Body>
                <FaTrophy size={50} className="icon-black mb-3" />
                <Card.Title>Conquistas e Títulos</Card.Title>
                <Card.Text>Reviva as vitórias e conquistas que marcaram nossa história.</Card.Text>
                <Link href="/vitrine-titulos" passHref>
                  <Button variant="dark">Ver Títulos</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="h-100 shadow-sm card-style">
              <Card.Body>
                <FaCalendarAlt size={50} className="icon-black mb-3" />
                <Card.Title>Próximas Partidas</Card.Title>
                <Card.Text>Fique por dentro das próximas guerras do Coringão!</Card.Text>
                <Link href="/vitrine-partidas" passHref>
                  <Button variant="dark">Calendário</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="h-100 shadow-sm card-style">
              <Card.Body>
                <FaCameraRetro size={50} className="icon-black mb-3" />
                <Card.Title>Galeria</Card.Title>
                <Card.Text>Algumas imagens históricas do todo poderoso Timão!</Card.Text>
                <Link href="/vitrine-galeria" passHref>
                  <Button variant="dark">Ver Galeria</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

{/* Carrossel de Ídolos */}

        <section className="my-5">
          <h2 className="display-6 text-white">Ídolos do Time</h2>
          <p className="text-light">Conheça alguns dos jogadores que deixaram sua marca no coringão!</p>
          <Carousel controls indicators={false} interval={3000} className="carousel-container">
            {idolos.map((idolo) => (
              <Carousel.Item key={idolo.id}>
                <img
                  className="d-block mx-auto"
                  src={idolo.imagem || 'https://via.placeholder.com/400x300'}
                  alt={`Imagem de ${idolo.nome}`}
                  style={{ width: '400px', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div className="info-below-image">
                  <h3>{idolo.nome}</h3>
                  <p>Anos no Time: {idolo.anosNoTime}</p>
                  <p>Principais conquistas: {idolo.conquistas}</p>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </section>

{/* Widget de Últimas Notícias */}

        <section className="my-5">
          <h2 className="display-6 text-white">Últimas Notícias</h2>
          <ListGroup>
            {noticias.map((noticia) => (
              <ListGroup.Item
                key={noticia.id}
                className="bg-dark text-white"
                action
                onClick={() => handleShowDetails(noticia)}
              >
                <strong>{noticia.titulo}</strong> <br />
                <small>{noticia.data}</small>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </section>

{/* Modal de Notícias */}

        {noticiaSelecionada && (
          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>{noticiaSelecionada.titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Data:</strong> {noticiaSelecionada.data}</p>
              <p><strong>Resumo:</strong> {noticiaSelecionada.resumo}</p>
              <p><strong>Detalhes:</strong> {noticiaSelecionada.detalhes}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Fechar</Button>
            </Modal.Footer>
          </Modal>
        )}

{/* Botões */}

        <div className="mt-5 d-flex justify-content-center gap-3">
          <Link href="/contato" passHref>
            <Button variant="dark" size="lg">
              <FaFutbol className="me-2" /> Fale conosco
            </Button>
          </Link>
          <Link href="/admin" passHref>
            <Button variant="dark" size="lg">
              <FaUserShield className="me-2" /> Login de Administrador
            </Button>
          </Link>
        </div>

{/* Footer */}
      
        <footer className="mt-5 pt-3 border-top">
          <p className="text-white">&copy; {new Date().getFullYear()} Plataforma Coringão. Todos os direitos reservados.</p>
        </footer>
        
      </Container>

      <style jsx>{`
        .home-page {
          background-color: #000;
          color: #fff;
          min-height: 100vh;
        }

        .banner img {
          width: 100%;
          height: auto;
          max-height: 300px; /* Ajuste para reduzir o tamanho do banner */
          object-fit: contain; /* Mostra a imagem inteira */
        }

        .carousel-container {
          max-width: 500px;
          margin: 0 auto;
        }

        .info-below-image {
          text-align: center;
          margin-top: 10px;
          color: #fff;
        }

        .card-style {
          background-color: #fff;
        }

        .icon-black {
          color: #000;
        }

        .btn-dark {
          background-color: #000;
          color: #fff;
          border: none;
        }

        .btn-dark:hover {
          background-color: #333;
        }
      `}</style>
    </div>
  );
}