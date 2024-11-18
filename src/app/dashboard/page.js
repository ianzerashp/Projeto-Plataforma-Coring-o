'use client';

//Removi o import da página, depois verificar, se bugar talvez pode ser isso

import { useEffect, useState } from "react";
import { Card, Row, Col, ListGroup, Navbar, Nav, Container } from "react-bootstrap";

export default function Dashboard() {
    const [jogadores, setJogadores] = useState([]);
    const [diretoria, setDiretoria] = useState([]);
    const [titulos, setTitulos] = useState([]);
    const [partidas, setPartidas] = useState([]);

    useEffect(() => {
        setJogadores(JSON.parse(localStorage.getItem('jogadores')) || []);
        setDiretoria(JSON.parse(localStorage.getItem('diretoria')) || []);
        setTitulos(JSON.parse(localStorage.getItem('titulos')) || []);

// Partidas fixas até o final de 2024

    const partidasFixas = [
            
        {
            id: 1,
            adversario: 'Cruzeiro',
            local: 'Neo Química Arena, São Paulo, SP',
            data: '20/11/2024',
            horario: '11h00',
        },
        {
            id: 2,
            adversario: 'Vasco da Gama',
            local: 'Neo Química Arena, São Paulo, SP',
            data: '24/11/2024',
            horario: '16h00',
        },
        {
            id: 3,
            adversario: 'Criciúma',
            local: 'Estádio Heriberto Hülse, Criciúma, SC',
            data: '30/11/2024',
            horario: '19h30',
        },
        {
            id: 4,
            adversario: 'Bahia',
            local: 'Neo Química Arena, São Paulo, SP',
            data: '04/12/2024',
            horario: '20h00',
        },
        {
            id: 5,
            adversario: 'Grêmio',
            local: 'Arena do Grêmio, Porto Alegre, RS',
            data: '08/12/2024',
            horario: '16h00',
        },
    ];

// Recupera partidas adicionais do localStorage

    const partidasAdicionais = (JSON.parse(localStorage.getItem('partidas')) || []).map((partida) => ({
        ...partida,
        data: new Date(partida.data).toLocaleDateString('pt-BR'),
    }));

// Combina as partidas fixas com as adicionais

    const todasPartidas = [...partidasFixas, ...partidasAdicionais];

// Ordena as partidas por data

    todasPartidas.sort((a, b) => new Date(a.data.split('/').reverse().join('-')) - new Date(b.data.split('/').reverse().join('-')));

// Define as próximas partidas (limite de 5)

    setPartidas(todasPartidas.slice(0, 5));
}, []);

    return (
        <div className="dashboard-page">

{/* Menu Superior */}

        <Navbar bg="light" variant="light" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand href="/dashboard" className="text-dark"><b>Painel de administração</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/dashboard" className="text-dark">Dashboard</Nav.Link>
                        <Nav.Link href="/jogadores" className="text-dark">Jogadores</Nav.Link>
                        <Nav.Link href="/diretoria" className="text-dark">Diretoria</Nav.Link>
                        <Nav.Link href="/titulos" className="text-dark">Títulos</Nav.Link>
                        <Nav.Link href="/partidas" className="text-dark">Partidas</Nav.Link>
                        <Nav.Link href="/idolos" className="text-dark">Ídolos</Nav.Link>
                        <Nav.Link href="/" className="text-dark">Retornar para a página inicial</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

{/* Conteúdo da Página */}

        <Container className="pt-5 mt-5">
            <h1 className="text-white text-center mb-4">Dashboard</h1>
            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Header>Total de Jogadores Cadastrados</Card.Header>
                        <Card.Body>
                            <Card.Title>{jogadores.length + 11} </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header>Membros da Diretoria Cadastrados</Card.Header>
                        <Card.Body>
                            <Card.Title>{diretoria.length}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header>Total de Títulos Cadastrados</Card.Header>
                        <Card.Body>
                            <Card.Title>{titulos.length + 7}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header>Total de Partidas Cadastradas</Card.Header>
                        <Card.Body>
                            <Card.Title>{partidas.length}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h5 className="text-white">Próximas Partidas</h5>
                    <ListGroup>
                        {partidas.map((partida, index) => (
                            <ListGroup.Item key={index}>
                                {partida.data} - {partida.adversario} ({partida.local})
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col>
                    <h5 className="text-white">Últimos Títulos Conquistados</h5>
                    <ListGroup>
                        {titulos.slice(-5).map((titulo, index) => (
                            <ListGroup.Item key={index}>
                                {titulo.titulo} - {titulo.ano}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>

    <style jsx>{`
        .dashboard-page {
            background-color: #000;
            color: #fff;
            min-height: 100vh;
        }
        .card, .list-group-item {
            background-color: #1a1a1a;
            color: #fff;
        }
        .card-header {
            background-color: #1a1a1a;
                color: #fff;
            }
        `}</style>
    </div>
    );
}