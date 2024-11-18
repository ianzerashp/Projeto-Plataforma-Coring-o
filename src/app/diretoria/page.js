'use client';

import Pagina from "@/components/Pagina";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {
    const [diretoria, setDiretoria] = useState([]);

    useEffect(() => {
        setDiretoria(JSON.parse(localStorage.getItem('diretoria')) || []);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = diretoria.filter(item => item.id !== id);
            localStorage.setItem('diretoria', JSON.stringify(dados));
            setDiretoria(dados);
        }
    }

    return (
        <div className="admin-page">
            <br />
            <Pagina titulo="Diretoria">
                <Link href="/diretoria/form" className="btn btn-primary mb-3">
                    <FaPlusCircle /> Novo
                </Link>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Cargo</th>
                            <th>Telefone</th>
                            <th>E-mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {diretoria.map((item, i) => (
                            <tr key={item.id}>
                                <td>
                                    <Link href={`/diretoria/form/${item.id}`}>
                                        <FaRegEdit title="Editar" className="text-primary" />
                                    </Link>
                                    <MdDelete
                                        title="Excluir"
                                        className="text-danger ms-2"
                                        onClick={() => excluir(item.id)}
                                    />
                                </td>
                                <td>{item.nome}</td>
                                <td>{item.cargo}</td>
                                <td>{item.telefone}</td>
                                <td>{item.email}</td>
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