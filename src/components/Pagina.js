import Cabecalho from "./Cabecalho";
import { Container } from "react-bootstrap";

export default function Pagina({ titulo, children }) {
    return (
        <>
            <Cabecalho />
            <Container className="mt-4 p-4" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
                <h1 className="mb-3" style={{ color: "#333" }}>{titulo}</h1>
                <hr />
                {children}
            </Container>
        </>
    );
}