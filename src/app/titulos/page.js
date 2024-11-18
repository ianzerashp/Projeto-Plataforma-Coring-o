'use client';

import Pagina from "@/components/Pagina";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {
    const [titulos, setTitulos] = useState([]);

    useEffect(() => {
        setTitulos(JSON.parse(localStorage.getItem('titulos')) || []);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = titulos.filter(item => item.id !== id);
            localStorage.setItem('titulos', JSON.stringify(dados));
            setTitulos(dados);
        }
    }

    return (
        <div className="admin-page">
            <br />
            <Pagina titulo="Títulos cadastrados">
                <Link href="/titulos/form" className="btn btn-primary mb-3">
                    <FaPlusCircle /> Novo
                </Link>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Título</th>
                            <th>Ano</th>
                            <th>Descrição</th>
                            <th>Destaques</th>
                            <th>Detalhes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {titulos.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <Link href={`/titulos/form/${item.id}`}>
                                        <FaRegEdit title="Editar" className="text-primary" />
                                    </Link>
                                    <MdDelete
                                        title="Excluir"
                                        className="text-danger"
                                        onClick={() => excluir(item.id)}
                                    />
                                </td>
                                <td>{item.titulo}</td>
                                <td>{item.ano}</td>
                                <td>{item.descricao}</td>
                                <td>{item.destaques}</td>
                                <td>{item.detalhes}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Pagina>

            <style jsx>{`
                .admin-page {
                    background-color: #000;
                    color: #fff;
                    min-height: 100vh;
                    padding: 20px;
                }
            `}</style>
        </div>
    );
}