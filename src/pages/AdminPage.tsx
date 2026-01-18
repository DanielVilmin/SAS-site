import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LogOut } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import StockPage from '../features/stock/StockPage';
import DonatePage from '../features/donate/DonatePage';
import CampaignsPage from '../features/campaigns/CampaignsPage';

const AdminBanner = styled.div`
  background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
  color: #000;
  padding: 0.75rem 2rem;
  text-align: center;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
  }
`;

const BannerText = styled.div`
  flex: 1;
  text-align: center;
  
  strong {
    font-size: 1.05rem;
  }
`;

const LogoutButton = styled.button`
  background: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(0, 0, 0, 0.3);
  color: #000;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }
`;

export default function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'stock' | 'donate' | 'campaigns'>('stock');

  const handleLogout = () => {
    if (confirm('Tem certeza que deseja sair?')) {
      localStorage.removeItem('isAdminAuthenticated');
      navigate('/');
    }
  };

  return (
    <>
      <AdminBanner>
        <BannerText>
          🔐 <strong>Modo Administrador Ativo</strong> 
        </BannerText>
        <LogoutButton onClick={handleLogout}>
          <LogOut size={18} />
          Sair
        </LogoutButton>
      </AdminBanner>

      <Header
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        isAdmin={true}
        onLogin={() => {}}
        onLogout={handleLogout}
      />

      {activeTab === 'stock' && <StockPage />}
      {activeTab === 'donate' && <DonatePage isAdmin={true} />}
      {activeTab === 'campaigns' && <CampaignsPage isAdmin={true} />}

      {activeTab !== 'donate' && <Footer />}
    </>
  );
}