'use client';

import { Container, Form, Button, Alert, Modal, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

// Simular envio

    setTimeout(() => {
      if (!formData.nome || !formData.email || !formData.mensagem) {
        setError('Por favor, preencha todos os campos.');
        setLoading(false);
        return;
      }
      setError('');
      setLoading(false);
      setShowModal(true);
      setFormData({ nome: '', email: '', mensagem: '' });
    }, 1000);
  };

  return (
    <div className="contact-page">
      <Container className="py-5">

{/* Escudo do Corinthians */}

        <div className="text-center mb-4">
          <Image
            src="https://cdn.meutimao.com.br/_upload/forumtopico/2022/05/26/escudo_2.jpg"
            alt="Escudo do Corinthians"
            width={500}
            height={500}
            priority
            className="img-fluid"
          />
        </div>

        <h1 className="text-center text-white mb-4">Entre em Contato</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label className="text-white">Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite seu nome"
              required
            />
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label className="text-white">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu email"
              required
            />
          </Form.Group>

          <Form.Group controlId="message" className="mb-3">
            <Form.Label className="text-white">Mensagem</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              placeholder="Digite sua mensagem"
              required
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="light" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Enviar Mensagem'}
            </Button>
          </div>

          <div className="text-center mt-3">
            <Link href="/" passHref>
              <Button variant="secondary">Voltar para Página Inicial</Button>
            </Link>
          </div>
        </Form>
        
      </Container>

{/* Modal de Sucesso */}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Mensagem Enviada!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Obrigado por entrar em contato! Responderemos o mais breve possível.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .contact-page {
          background-color: #000;
          color: #fff;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .text-white {
          color: #fff;
        }
        .btn-light {
          background-color: #f8f9fa;
          color: #000;
        }
        .btn-light:hover {
          background-color: #e2e6ea;
        }
        .btn-secondary {
          background-color: #343a40;
          border: none;
        }
        .btn-secondary:hover {
          background-color: #495057;
        }
      `}</style>
    </div>
  );
}