'use client';

import { Container, Form, Button, Alert, Card, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    usuario: '',
    senha: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

// Simular um pequeno delay para UX

    setTimeout(() => {
      const credenciais = {
        usuario: 'admin',
        senha: 'corinthians'
      };

      if (formData.usuario === credenciais.usuario && formData.senha === credenciais.senha) {
        router.push('/dashboard');
      } else {
        setError('Usuário ou senha incorretos.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="admin-page">
      <Container className="py-5 d-flex flex-column align-items-center">

{/* Escudo do Corinthians */}

        <div className="mb-4">
          <Image
            src="https://cdn.meutimao.com.br/_upload/forumtopico/2022/05/26/escudo_2.jpg"
            alt="Escudo do Corinthians"
            width={500}
            height={500}
            className="img-fluid"
            priority
          />
        </div>

{/* Card de Login */}

        <Card className="login-card shadow-lg">
          <Card.Header className="text-center text-white bg-dark">
            <h2>Bem-vindo, Administrador!</h2>
            <p className="small">Entre para ter acesso ao painel de administração.</p>
          </Card.Header>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="usuario" className="mb-3">
                <Form.Label>Usuário</Form.Label>
                <Form.Control
                  type="text"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  required
                  placeholder="Nome de usuário"
                />
              </Form.Group>
              <Form.Group controlId="senha" className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                  placeholder="Senha"
                />
              </Form.Group>
              <div className="d-grid">
                <Button variant="dark" type="submit" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : 'Entrar'}
                </Button>
              </div>
            </Form>
          </Card.Body>
          <Card.Footer className="text-center text-white bg-dark">
            <p className="small">⚫⚪ Sistema de autenticação desenvolvido pelo bando de loucos! ⚪⚫</p>
          </Card.Footer>
        </Card>
        
{/* Footer */}
      
        <footer className="mt-5 pt-3 border-top">
          <p className="text-white">&copy; {new Date().getFullYear()} Plataforma Coringão. Todos os direitos reservados.</p>
        </footer>
        
      </Container>

      <style jsx>{`
        .admin-page {
          background-color: #000;
          color: #fff;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          border-radius: 10px;
          overflow: hidden;
        }

        .card-header, .card-footer {
          background-color: #1a1a1a !important;
        }

        .btn-dark {
          background-color: #000;
          border: none;
        }

        .btn-dark:hover {
          background-color: #333;
        }
      `}</style>
    </div>
  );
}