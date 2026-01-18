import styled from 'styled-components';
import logoLojaSocial from '../../img/ipca.pt.png';

const DonateContainer = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
`;

const LogoBox = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const LogoImage = styled.img`
  height: 100px;
  width: auto;
  
  @media (max-width: 768px) {
    height: 80px;
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 3px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    text-align: center;
    letter-spacing: 2px;
  }
`;

const ContactCard = styled.div`
  background: white;
  padding: 3rem 5rem;
  border-radius: 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  max-width: 650px;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 2.5rem 2rem;
    max-width: 90%;
  }
`;

const ContactTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.2rem;
  margin: 0 0 2.5rem 0;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.3rem;
  line-height: 1.8;
  margin: 0;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 1.15rem;
  }
`;

const StrongText = styled.span`
  font-weight: 700;
`;

const LinkText = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  font-weight: 600;
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 0.7;
  }
`;

interface Props {
  isAdmin: boolean;
}

export default function DonatePage({ isAdmin }: Props) {
  return (
    <DonateContainer>
      <LogoSection>
        <LogoBox>
          <LogoImage src={logoLojaSocial} alt="Logo Loja Social" />
        </LogoBox>
        
      </LogoSection>

      <ContactCard>
        <ContactTitle>Contactos:</ContactTitle>
        <ContactInfo>
          <InfoText>
            <StrongText>Serviço de Ação Social</StrongText>
          </InfoText>
          <InfoText>Campus IPCA</InfoText>
          <InfoText style={{ marginTop: '1.5rem' }}>
            <StrongText>Telefone: </StrongText>
            <LinkText href="tel:+351253802503">+351 253 802 503</LinkText>
          </InfoText>
          <InfoText style={{ marginTop: '0.5rem' }}>
            <StrongText>E-mail Geral : </StrongText>
            <LinkText href="mailto:sas@ipca.pt">sas@ipca.pt</LinkText>
          </InfoText>
        </ContactInfo>
      </ContactCard>
    </DonateContainer>
  );
}