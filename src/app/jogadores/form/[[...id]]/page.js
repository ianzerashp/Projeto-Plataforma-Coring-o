'use client';

import Pagina from "@/components/Pagina";
import JogadorValidator from "@/validators/JogadorValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { mask } from "remask";
import { v4 } from "uuid";

export default function Page({ params }) {
    const route = useRouter();

    const jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];
    const dados = jogadores.find(item => item.id == params.id);
    const jogador = dados || { nome: '', posicao: '', numero: '', data_nascimento: '', imagem: '', descricao: '' };

    function salvar(dados) {
        if (jogador.id) {
            Object.assign(jogador, dados);
        } else {
            dados.id = v4();
            jogadores.push(dados);
        }

        localStorage.setItem('jogadores', JSON.stringify(jogadores));
        return route.push('/jogadores');
    }

    return (
        <div className="form-page">
            <br />
            <Pagina titulo="Cadastrar Jogador">
                <Formik
                    initialValues={jogador}
                    validationSchema={JogadorValidator}
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
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label className="text-dark">Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange}
                                    isInvalid={touched.nome && !!errors.nome}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nome}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="posicao">
                                <Form.Label className="text-dark">Posição</Form.Label>
                                <Form.Select
                                    name="posicao"
                                    value={values.posicao}
                                    onChange={handleChange}
                                    isInvalid={touched.posicao && !!errors.posicao}
                                >
                                    <option value=''>Selecione</option>
                                    <option value='Atacante'>Atacante</option>
                                    <option value='Lateral Esquerdo'>Lateral Esquerdo</option>
                                    <option value='Lateral Direito'>Lateral Direito</option>
                                    <option value='Meio-Campo'>Meio-campo</option>
                                    <option value='Zagueiro'>Zagueiro</option>
                                    <option value='Goleiro'>Goleiro</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.posicao}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="numero">
                                <Form.Label className="text-dark">Número</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="numero"
                                    value={values.numero}
                                    onChange={handleChange}
                                    isInvalid={touched.numero && !!errors.numero}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.numero}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="data_nascimento">
                                <Form.Label className="text-dark">Data de Nascimento</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="data_nascimento"
                                    value={values.data_nascimento}
                                    onChange={(value) => {
                                        setFieldValue('data_nascimento', mask(value.target.value, '99/99/9999'));
                                    }}
                                    isInvalid={touched.data_nascimento && !!errors.data_nascimento}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.data_nascimento}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="imagem">
                                <Form.Label className="text-dark">Link da Imagem</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="imagem"
                                    value={values.imagem}
                                    onChange={handleChange}
                                    placeholder="https://link-da-imagem.jpg"
                                    isInvalid={touched.imagem && !!errors.imagem}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.imagem}
                                </Form.Control.Feedback>
                            </Form.Group>
                            {/* Novo campo para descrição */}
                            <Form.Group className="mb-3" controlId="descricao">
                                <Form.Label className="text-dark">Descrição</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="descricao"
                                    value={values.descricao}
                                    onChange={handleChange}
                                    isInvalid={touched.descricao && !!errors.descricao}
                                    rows={3}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.descricao}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div className="text-center">
                                <Button onClick={handleSubmit} variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link href="/jogadores" className="btn btn-danger ms-2">
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