import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import styled from 'styled-components';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import logoIPCA from '../../img/ipca.pt.png';

const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, #003d26 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 450px;
  overflow: hidden;
`;

const Header = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  padding: 2rem;
  text-align: center;
`;

const LogoImage = styled.img`
  height: 80px;
  margin-bottom: 1rem;
  background: white;
  padding: 0.5rem;
  border-radius: 12px;
`;

const Title = styled.h1`
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.95rem;
  margin: 0;
  font-weight: 500;
`;

const Form = styled.form`
  padding: 2.5rem 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary}20;
  }

  &::placeholder {
    color: #999;
  }
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border-left: 4px solid #dc3545;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    background: #004a2f;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 95, 60, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Footer = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: #f8f9fa;
  color: #666;
  font-size: 0.85rem;
`;

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Autenticar com Firebase
      await signInWithEmailAndPassword(auth, email, password);
      
      // Salvar estado de autenticação
      localStorage.setItem('isAdminAuthenticated', 'true');
      
      // Redirecionar para admin
      navigate('/admin');
    } catch (err: any) {
      console.error('Erro de autenticação:', err);
      
      // Mensagens de erro amigáveis
      if (err.code === 'auth/invalid-credential') {
        setError('Email ou senha inválidos.');
      } else if (err.code === 'auth/user-not-found') {
        setError('Usuário não encontrado.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Senha incorreta.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Muitas tentativas. Tente novamente mais tarde.');
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
      
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Header>
          <LogoImage src={logoIPCA} alt="Logo IPCA" />
          <Title>Área Administrativa</Title>
          <Subtitle>Loja Social IPCA</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          {error && (
            <ErrorMessage>
              <AlertCircle size={16} />
              {error}
            </ErrorMessage>
          )}

          <FormGroup>
            <Label>
              <Mail />
              Email
            </Label>
            <Input
              type="email"
              placeholder="admin@ipca.pt"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              disabled={loading}
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <Lock />
              Senha
            </Label>
            <InputWrapper>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <TogglePasswordButton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </TogglePasswordButton>
            </InputWrapper>
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </SubmitButton>
        </Form>

        <Footer>
          Faça login com suas credenciais de administrador
        </Footer>
      </LoginCard>
    </LoginContainer>
  );
}