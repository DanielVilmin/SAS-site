import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Plus } from 'lucide-react';
import CampaignCard from './CampaignCard';
import CampaignModal from './CampaignModal';
import { getCampaignsRealtime, addCampaign, deleteCampaign } from './campaigns.service';
import type { Campaign } from './campaigns.types';

const PageContainer = styled.div`
  background: #F0F2F5;
  min-height: calc(100vh - 100px);
  padding: 3rem 2rem;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const CampaignsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const EmptyState = styled.div`
  background: white;
  border-radius: 12px;
  padding: 4rem 2rem;
  text-align: center;
  color: #666;
  font-size: 1.2rem;
`;

const LoadingState = styled(EmptyState)`
  color: ${({ theme }) => theme.colors.primary};
`;

interface Props {
    isAdmin: boolean;
}

export default function CampaignsPage({ isAdmin }: Props) {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    // Carregar campanhas em tempo real do Firebase
    useEffect(() => {
        const unsubscribe = getCampaignsRealtime((data) => {
            setCampaigns(data);
            setLoading(false);
        });

        // Cleanup
        return () => unsubscribe();
    }, []);

    const handleAddCampaign = async (data: {
        title: string;
        date: string;
        description: string;
        image: string;
    }) => {
        try {
            await addCampaign(data);
            setShowModal(false);
            alert('Campanha criada com sucesso!');
        } catch (error) {
            console.error('Erro ao criar campanha:', error);
            alert('Erro ao criar campanha. Tente novamente.');
        }
    };

    const handleDeleteCampaign = async (id: string) => {
        try {
            await deleteCampaign(id);
            alert('Campanha excluída com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir campanha:', error);
            alert('Erro ao excluir campanha. Tente novamente.');
        }
    };

    return (
        <PageContainer>
            <ContentWrapper>
                <Header>
                    <Title>Campanhas de Voluntariado</Title>
                    {isAdmin && (
                        <AddButton onClick={() => setShowModal(true)}>
                            <Plus size={20} />
                            Nova Campanha
                        </AddButton>
                    )}
                </Header>

                {loading ? (
                    <LoadingState>
                        Carregando campanhas...
                    </LoadingState>
                ) : campaigns.length === 0 ? (
                    <EmptyState>
                        Nenhuma campanha disponível no momento.
                    </EmptyState>
                ) : (
                    <CampaignsGrid>
                        {campaigns.map(campaign => (
                            <CampaignCard 
                                key={campaign.id} 
                                campaign={campaign}
                                isAdmin={isAdmin}
                                onDelete={handleDeleteCampaign}
                            />
                        ))}
                    </CampaignsGrid>
                )}
            </ContentWrapper>

            {showModal && (
                <CampaignModal
                    onClose={() => setShowModal(false)}
                    onSubmit={handleAddCampaign}
                />
            )}
        </PageContainer>
    );
}