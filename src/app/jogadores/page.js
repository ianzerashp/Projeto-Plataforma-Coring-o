'use client';

import Pagina from "@/components/Pagina";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {
    const [jogadores, setJogadores] = useState([]);

    useEffect(() => {
        setJogadores(JSON.parse(localStorage.getItem('jogadores')) || []);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = jogadores.filter(item => item.id != id);
            localStorage.setItem('jogadores', JSON.stringify(dados));
            setJogadores(dados);
        }
    }

    return (
        <div className="jogadores-page">
            <br />
            <Pagina titulo="Jogadores cadastrados">
                <Link href="/jogadores/form" className="btn btn-primary mb-3">
                    <FaPlusCircle /> Novo
                </Link>

                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Posição</th>
                            <th>Número</th>
                            <th>Data de Nascimento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jogadores.map((item, i) => (
                            <tr key={item.id}>
                                <td>
                                    <Link href={`/jogadores/form/${item.id}`}>
                                        <FaRegEdit title="Editar" className="text-primary" />
                                    </Link>
                                    <MdDelete
                                        title="Excluir"
                                        className="text-danger"
                                        onClick={() => excluir(item.id)}
                                    />
                                </td>
                                <td>{item.nome}</td>
                                <td>{item.posicao}</td>
                                <td>{item.numero}</td>
                                <td>{item.data_nascimento}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Pagina>

            <style jsx>{`
                .jogadores-page {
                    background-color: #000;
                    color: #fff;
                    min-height: 100vh;
                    padding: 20px;
                }
            `}</style>
        </div>
    );
}