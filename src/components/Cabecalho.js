import { Navbar, Container, Nav } from "react-bootstrap";

export default function Cabecalho() {
    return (
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
    );
}