'use client';

import Pagina from "@/components/Pagina";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {
    const [partidas, setPartidas] = useState([]);

    useEffect(() => {
        const storedPartidas = JSON.parse(localStorage.getItem('partidas')) || [];
        const formattedPartidas = storedPartidas.map((item) => ({
            ...item,
            data: new Date(item.data).toLocaleDateString('pt-BR'),
        }));
        setPartidas(formattedPartidas);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = partidas.filter(item => item.id !== id);
            localStorage.setItem('partidas', JSON.stringify(dados));
            setPartidas(dados);
        }
    }

    return (
        <div className="admin-page">
            <br />
            <Pagina titulo="Partidas cadastradas">
                <Link href="/partidas/form" className="btn btn-primary mb-3">
                    <FaPlusCircle /> Nova
                </Link>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Data</th>
                            <th>Adversário</th>
                            <th>Local</th>
                        </tr>
                    </thead>
                    <tbody>
                        {partidas.map((item, i) => (
                            <tr key={item.id}>
                                <td>
                                    <Link href={`/partidas/form/${item.id}`}>
                                        <FaRegEdit title="Editar" className="text-primary" />
                                    </Link>
                                    <MdDelete
                                        title="Excluir"
                                        className="text-danger"
                                        onClick={() => excluir(item.id)}
                                    />
                                </td>
                                <td>{item.data}</td>
                                <td>{item.adversario}</td>
                                <td>{item.local}</td>
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