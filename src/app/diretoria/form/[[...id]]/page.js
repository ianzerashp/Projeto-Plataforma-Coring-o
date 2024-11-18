'use client';

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import DiretoriaValidator from "@/validators/DiretoriaValidator";
import { mask } from "remask";

export default function Page({ params }) {
    const route = useRouter();
    const diretoria = JSON.parse(localStorage.getItem('diretoria')) || [];
    const dados = diretoria.find(item => item.id == params.id);
    const membro = dados || { nome: '', cargo: '', telefone: '', email: '', cpf: '', rg: '' };

    function salvar(dados) {
        if (membro.id) {
            Object.assign(membro, dados);
        } else {
            dados.id = v4();
            diretoria.push(dados);
        }

        localStorage.setItem('diretoria', JSON.stringify(diretoria));
        return route.push('/diretoria');
    }

    return (
        <div className="form-page">
            <br />
            <Pagina titulo="Cadastrar Membro da Diretoria">
                <Formik
                    initialValues={membro}
                    validationSchema={DiretoriaValidator}
                    onSubmit={values => salvar(values)}
                >
                    {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
                        <Form className="bg-white p-4 rounded">
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label className="text-dark">Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange}
                                    isInvalid={touched.nome && errors.nome}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nome}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="cargo">
                                <Form.Label className="text-dark">Cargo</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cargo"
                                    value={values.cargo}
                                    onChange={handleChange}
                                    isInvalid={touched.cargo && errors.cargo}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.cargo}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="telefone">
                                <Form.Label className="text-dark">Telefone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefone"
                                    value={values.telefone}
                                    onChange={(e) =>
                                        setFieldValue('telefone', mask(e.target.value, ['(99) 9999-9999', '(99) 9 9999-9999']))
                                    }
                                    isInvalid={touched.telefone && errors.telefone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.telefone}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label className="text-dark">E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={touched.email && errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="cpf">
                                <Form.Label className="text-dark">CPF</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cpf"
                                    value={values.cpf}
                                    onChange={(e) =>
                                        setFieldValue('cpf', mask(e.target.value, ['999.999.999-99']))
                                    }
                                    isInvalid={touched.cpf && errors.cpf}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.cpf}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="rg">
                                <Form.Label className="text-dark">Registro Geral (RG)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="rg"
                                    value={values.rg}
                                    onChange={(e) =>
                                        setFieldValue('rg', mask(e.target.value, ['9.999.999']))
                                    }
                                    isInvalid={touched.rg && errors.rg}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.rg}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div className="text-center">
                                <Button onClick={handleSubmit} variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link href="/diretoria" className="btn btn-danger ms-2">
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