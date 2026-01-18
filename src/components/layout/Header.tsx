import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import styled from 'styled-components';
import logoIPCA from '../../img/ipca.pt.png';

interface Props {
    activeTab: string;
    onChangeTab: (tab: 'stock' | 'donate' | 'campaigns') => void;
    isAdmin: boolean;
    onLogin: () => void;
    onLogout: () => void;
}

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoImage = styled.img`
  height: 60px;
  width: auto;
  
  @media (max-width: 768px) {
    height: 45px;
  }
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  
  h1 {
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    line-height: 1.2;
    
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
  
  span {
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 0.85rem;
    font-weight: 500;
    
    @media (max-width: 768px) {
      font-size: 0.75rem;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavButton = styled.button<{ $active?: boolean }>`
  background: ${({ $active, theme }) => 
    $active ? theme.colors.secondary : 'transparent'};
  border: 2px solid ${({ $active, theme }) => 
    $active ? theme.colors.secondary : 'white'};
  color: ${({ $active, theme }) => 
    $active ? theme.colors.primary : 'white'};
  margin: 0 0.25rem;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: 2px solid white;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.colors.primary};
    padding: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    gap: 0.5rem;

    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

export default function Header({
    activeTab,
    onChangeTab,
    isAdmin,
    onLogin,
    onLogout
}: Props) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleTabChange = (tab: 'stock' | 'donate' | 'campaigns') => {
        onChangeTab(tab);
        setMobileMenuOpen(false);
    };

    return (
        <HeaderContainer>
            <HeaderContent>
                <LogoSection>
                    <LogoImage 
                        src={logoIPCA}
                        alt="Logo IPCA"
                    />
                    <BrandText>
                        <h1>Loja Social IPCA</h1>
                        <span>Solidariedade Académica</span>
                    </BrandText>
                </LogoSection>

                <Nav>
                    <NavButton 
                        $active={activeTab === 'stock'}
                        onClick={() => onChangeTab('stock')}
                    >
                        Stock
                    </NavButton>
                    <NavButton 
                        $active={activeTab === 'donate'}
                        onClick={() => onChangeTab('donate')}
                    >
                        Como Doar
                    </NavButton>
                    <NavButton 
                        $active={activeTab === 'campaigns'}
                        onClick={() => onChangeTab('campaigns')}
                    >
                        Campanhas
                    </NavButton>
                </Nav>

                <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </MobileMenuButton>
            </HeaderContent>

            <MobileMenu $isOpen={mobileMenuOpen}>
                <NavButton 
                    $active={activeTab === 'stock'}
                    onClick={() => handleTabChange('stock')}
                >
                    Stock
                </NavButton>
                <NavButton 
                    $active={activeTab === 'donate'}
                    onClick={() => handleTabChange('donate')}
                >
                    Como Doar
                </NavButton>
                <NavButton 
                    $active={activeTab === 'campaigns'}
                    onClick={() => handleTabChange('campaigns')}
                >
                    Campanhas
                </NavButton>
            </MobileMenu>
        </HeaderContainer>
    );
}