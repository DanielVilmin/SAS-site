import styled from 'styled-components';
import { Calendar, Edit, Trash2 } from 'lucide-react';
import type { Campaign } from './campaigns.types';

const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  background: #f0f0f0;
`;

const CampaignImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const Content = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const DateBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  line-height: 1.3;
`;

const Description = styled.p`
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
  flex: 1;
`;

const Actions = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => $show ? 'flex' : 'none'};
  gap: 0.75rem;
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 1px solid #e0e0e0;
`;

const Button = styled.button<{ $variant?: 'primary' | 'danger' }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  background: ${({ $variant, theme }) =>
    $variant === 'danger' ? '#dc3545' :
    $variant === 'primary' ? theme.colors.primary :
    '#6c757d'};
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    opacity: 0.9;
  }
  
  &:active {
    transform: translateY(0);
  }
`;

interface Props {
    campaign: Campaign;
    isAdmin?: boolean;
    onDelete?: (id: string) => void;
}

export default function CampaignCard({ campaign, isAdmin, onDelete }: Props) {
    const handleEdit = () => {
        alert(`Editar campanha: ${campaign.title}`);
        // TODO: Abrir modal de edição
    };

    const handleDelete = () => {
        if (confirm(`Tem certeza que deseja excluir a campanha "${campaign.title}"?`)) {
            if (onDelete) {
                onDelete(campaign.id);
            }
        }
    };

    return (
        <Card>
            <ImageContainer>
                <CampaignImage 
                    src={campaign.image} 
                    alt={campaign.title}
                    onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x250/005F3C/FFFFFF?text=IPCA+Voluntariado';
                    }}
                />
                <Badge>Voluntariado</Badge>
            </ImageContainer>
            
            <Content>
                <DateBadge>
                    <Calendar size={16} />
                    {campaign.date}
                </DateBadge>
                
                <Title>{campaign.title}</Title>
                
                <Description>{campaign.description}</Description>
                
                {/* Botões só aparecem para admin */}
                <Actions $show={isAdmin || false}>
                    <Button onClick={handleEdit}>
                        <Edit size={16} />
                        Editar
                    </Button>
                    <Button $variant="danger" onClick={handleDelete}>
                        <Trash2 size={16} />
                        Excluir
                    </Button>
                </Actions>
            </Content>
        </Card>
    );
}