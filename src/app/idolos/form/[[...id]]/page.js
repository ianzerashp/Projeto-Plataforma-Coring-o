'use client';

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import { mask } from "remask";

export default function Page({ params }) {

    const route = useRouter();
    const idolos = JSON.parse(localStorage.getItem('idolos')) || [];
    const dados = idolos.find(item => item.id == params.id);
    const idolo = dados || { nome: '', posicao: '', anosNoTime: '', conquistas: '', imagem: '' };

    function salvar(dados) {
        if (idolo.id) {
            Object.assign(idolo, dados);
        } else {
            dados.id = v4();
            idolos.push(dados);
        }

        localStorage.setItem('idolos', JSON.stringify(idolos));
        return route.push('/idolos');
    }

    return (
        <div className="form-page">
            <br />
            <Pagina titulo="Ídolo">
                <Formik
                    initialValues={idolo}
                    onSubmit={values => salvar(values)}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                    }) => (
                        <Form className="bg-white p-4 rounded">
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label className="text-dark">Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange('nome')}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="posicao">
                                <Form.Label className="text-dark">Posição</Form.Label>
                                <Form.Select
                                    name="posicao"
                                    value={values.posicao}
                                    onChange={handleChange('posicao')}
                                >
                                    <option value=''>Selecione</option>
                                    <option value='Atacante'>Atacante</option>
                                    <option value='Lateral Esquerdo'>Lateral Esquerdo</option>
                                    <option value='Lateral Direito'>Lateral Direito</option>
                                    <option value='Meio-Campo'>Meio-campo</option>
                                    <option value='Zagueiro'>Zagueiro</option>
                                    <option value='Goleiro'>Goleiro</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="anosNoTime">
                                <Form.Label className="text-dark">Anos no Time</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="anosNoTime"
                                    value={values.anosNoTime}
                                    onChange={(e) =>
                                        setFieldValue('anosNoTime', mask(e.target.value, ['99']))
                                    }
                                    placeholder="Ex.: 05"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="conquistas">
                                <Form.Label className="text-dark">Principais Conquistas</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="conquistas"
                                    value={values.conquistas}
                                    onChange={handleChange('conquistas')}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="imagem">
                                <Form.Label className="text-dark">Link da Imagem</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="imagem"
                                    value={values.imagem}
                                    onChange={handleChange}
                                    placeholder="https://link-da-imagem.jpg"
                                />
                            </Form.Group>
                            <div className="text-center">
                                <Button onClick={handleSubmit} variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link
                                    href="/idolos"
                                    className="btn btn-danger ms-2"
                                >
                                    <MdOutlineArrowBack /> Voltar
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Pagina>
            <style jsx>{`
                .form-page {
                    background-color: #000;
                    color: #fff;
                    min-height: 100vh;
                    padding-top: 20px;
                }
                .text-dark {
                    color: #000 !important;
                }
            `}</style>
        </div>
    );
}