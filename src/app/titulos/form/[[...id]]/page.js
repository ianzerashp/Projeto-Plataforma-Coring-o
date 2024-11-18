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
import TituloValidator from "@/validators/TituloValidator"; // Importação do validator

export default function Page({ params }) {
    const route = useRouter();
    const titulos = JSON.parse(localStorage.getItem('titulos')) || [];
    const dados = titulos.find(item => item.id == params.id);
    const titulo = dados || {
        titulo: '',
        ano: '',
        descricao: '',
        destaques: '',
        detalhes: ''
    };

    function salvar(dados) {
        if (titulo.id) {
            Object.assign(titulo, dados);
        } else {
            dados.id = v4();
            titulos.push(dados);
        }

        localStorage.setItem('titulos', JSON.stringify(titulos));
        return route.push('/titulos');
    }

    return (
        <div className="form-page">
            <br />
            <Pagina titulo="Adicionar Título">
                <Formik
                    initialValues={titulo}
                    validationSchema={TituloValidator} // Validação com Yup
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
                            <Form.Group className="mb-3" controlId="titulo">
                                <Form.Label className="text-dark">Título</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="titulo"
                                    value={values.titulo}
                                    onChange={handleChange('titulo')}
                                    isInvalid={touched.titulo && errors.titulo}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.titulo}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="ano">
                                <Form.Label className="text-dark">Ano</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="ano"
                                    value={values.ano}
                                    onChange={(e) =>
                                        setFieldValue('ano', mask(e.target.value, ['9999']))
                                    }
                                    placeholder="Ex.: 1998"
                                    isInvalid={touched.ano && errors.ano}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.ano}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="descricao">
                                <Form.Label className="text-dark">Descrição</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="descricao"
                                    value={values.descricao}
                                    onChange={handleChange('descricao')}
                                    isInvalid={touched.descricao && errors.descricao}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.descricao}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="destaques">
                                <Form.Label className="text-dark">Destaques</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="destaques"
                                    value={values.destaques}
                                    onChange={handleChange('destaques')}
                                    isInvalid={touched.destaques && errors.destaques}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.destaques}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="detalhes">
                                <Form.Label className="text-dark">Detalhes</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="detalhes"
                                    value={values.detalhes}
                                    onChange={handleChange('detalhes')}
                                    isInvalid={touched.detalhes && errors.detalhes}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.detalhes}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div className="text-center">
                                <Button onClick={handleSubmit} variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link
                                    href="/titulos"
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