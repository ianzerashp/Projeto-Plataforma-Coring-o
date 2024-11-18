'use client';

import Pagina from "@/components/Pagina";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {
    const [idolos, setIdolos] = useState([]);

    useEffect(() => {
        setIdolos(JSON.parse(localStorage.getItem('idolos')) || []);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = idolos.filter(item => item.id !== id);
            localStorage.setItem('idolos', JSON.stringify(dados));
            setIdolos(dados);
        }
    }

    return (
        <div className="admin-page">
            <br />
            <Pagina titulo="Ídolos">
                <Link href="/idolos/form" className="btn btn-primary mb-3">
                    <FaPlusCircle /> Novo
                </Link>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Posição</th>
                            <th>Anos no time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {idolos.map((item, i) => (
                            <tr key={item.id}>
                                <td>
                                    <Link href={`/idolos/form/${item.id}`}>
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
                                <td>{item.anosNoTime}</td>
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