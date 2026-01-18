import styled from 'styled-components';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 3rem 2rem 1.5rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  p, a {
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.8;
    font-size: 0.95rem;
  }

  a {
    text-decoration: none;
    transition: color 0.3s;
    
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    justify-content: center;
  }

  svg {
    color: ${({ theme }) => theme.colors.secondary};
    flex-shrink: 0;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 1.5rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
`;

const MadeWithLove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  opacity: 0.9;

  svg {
    color: #ff6b6b;
    animation: heartbeat 1.5s ease-in-out infinite;
  }

  @keyframes heartbeat {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-3px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        {/* Sobre */}
        <FooterSection>
          <h3>Loja Social IPCA</h3>
          <p>
            Apoiamos estudantes do IPCA através da distribuição de bens essenciais,
            promovendo a solidariedade e o bem-estar da comunidade académica.
          </p>
          <SocialLinks>
            <SocialLink href="https://www.facebook.com/ipca.pt" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </SocialLink>
            <SocialLink href="https://www.instagram.com/ipca.pt" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </SocialLink>
            <SocialLink href="mailto:info@ipca.pt">
              <Mail size={20} />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        {/* Contactos */}
        <FooterSection>
          <h3>Contactos</h3>
          <ContactItem>
            <MapPin size={20} />
            <span>Campus do IPCA, Barcelos</span>
          </ContactItem>
          <ContactItem>
            <Phone size={20} />
            <a href="tel:+351253802500">+351 253 802 503</a>
          </ContactItem>
          <ContactItem>
            <Mail size={20} />
            <a href="mailto:lojasocial@ipca.pt">sas@ipca.pt</a>
          </ContactItem>
        </FooterSection>

        {/* Links Úteis */}
        <FooterSection>
          <h3>Links Úteis</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a href="https://www.ipca.pt" target="_blank" rel="noopener noreferrer">
              Portal IPCA
            </a>
            <a href="https://www.ipca.pt/pt/estudantes/" target="_blank" rel="noopener noreferrer">
              Serviços Académicos
            </a>
            <a href="https://www.ipca.pt/pt/institucional/sasd/" target="_blank" rel="noopener noreferrer">
              Serviços de Ação Social
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Página em desenvolvimento'); }}>
              Política de Privacidade
            </a>
          </div>
        </FooterSection>

        {/* Horário */}
        <FooterSection>
          <h3>Horário de Atendimento</h3>
          <p><h3>Presencial</h3></p>
          <p>
            <strong>Segunda, Quarta e Sexta Feira:</strong><br />
            10:30 - 12:30
          </p>
          <p style={{ marginTop: '1rem' }}>
            <strong>Terça Feira:</strong><br />
            16:30 - 18:30
          </p>
          <p style={{ marginTop: '1rem' }}>
            <strong>Quinta Feira:</strong><br />
            17:00 - 19:00
          </p>
          <p style={{ marginTop: '1rem' }} >
            <h3>Horário Telefónico</h3></p>
          <p>
            <strong>Segunda a Sexta Feira:</strong><br />
            14:30 - 16:30 
          </p>
        </FooterSection>

    
      </FooterContent>

      <FooterBottom>
        <p>© {currentYear} Loja Social IPCA. Todos os direitos reservados.</p>
        <MadeWithLove>
          Feito com <Heart size={16} fill="currentColor" /> por Projeto Aplicado – Grupo II
        </MadeWithLove>
      </FooterBottom>
    </FooterContainer>
  );
}