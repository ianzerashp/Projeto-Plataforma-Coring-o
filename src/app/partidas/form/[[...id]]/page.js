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
import PartidaValidator from "@/validators/PartidaValidator"; // Importando o validator

export default function Page({ params }) {
    const route = useRouter();
    const partidas = JSON.parse(localStorage.getItem('partidas')) || [];
    const dados = partidas.find(item => item.id == params.id);
    const partida = dados || { data: '', adversario: '', local: '', horario: '', historico: '', analise: '' };

    function salvar(dados) {
        if (partida.id) {
            Object.assign(partida, dados);
        } else {
            dados.id = v4();
            partidas.push(dados);
        }

        localStorage.setItem('partidas', JSON.stringify(partidas));
        return route.push('/partidas');
    }

    return (
        <div className="form-page">
            <br />
            <Pagina titulo="Cadastrar Partida">
                <Formik
                    initialValues={partida}
                    validationSchema={PartidaValidator} // Integrando o validator
                    onSubmit={values => salvar(values)}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        errors,
                        touched,
                    }) => (
                        <Form className="bg-white p-4 rounded">
                            <Form.Group className="mb-3" controlId="data">
                                <Form.Label className="text-dark">Data</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="data"
                                    value={values.data}
                                    onChange={handleChange('data')}
                                    isInvalid={touched.data && errors.data}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.data}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="adversario">
                                <Form.Label className="text-dark">Adversário</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="adversario"
                                    value={values.adversario}
                                    onChange={handleChange('adversario')}
                                    isInvalid={touched.adversario && errors.adversario}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.adversario}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="local">
                                <Form.Label className="text-dark">Local</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="local"
                                    value={values.local}
                                    onChange={handleChange('local')}
                                    isInvalid={touched.local && errors.local}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.local}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="horario">
                                <Form.Label className="text-dark">Horário</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="horario"
                                    value={values.horario}
                                    onChange={(e) =>
                                        setFieldValue('horario', mask(e.target.value, ['99h99']))
                                    }
                                    placeholder="Ex.: 20h00"
                                    isInvalid={touched.horario && errors.horario}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.horario}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="historico">
                                <Form.Label className="text-dark">Histórico de Confrontos</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="historico"
                                    value={values.historico}
                                    onChange={handleChange('historico')}
                                    placeholder="Descreva o histórico entre os times"
                                    isInvalid={touched.historico && errors.historico}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.historico}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="analise">
                                <Form.Label className="text-dark">Análise da Partida</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="analise"
                                    value={values.analise}
                                    onChange={handleChange('analise')}
                                    placeholder="Descreva a análise ou previsão para o jogo"
                                    isInvalid={touched.analise && errors.analise}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.analise}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div className="text-center">
                                <Button onClick={handleSubmit} variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link
                                    href="/partidas"
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