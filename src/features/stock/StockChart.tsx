import styled from 'styled-components';
import type { StockItem } from './stock.types';

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ChartTitle = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const BarsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 350px;
  padding: 2rem 1rem 1rem;
  gap: 1.5rem;
  background: white;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    height: 300px;
    gap: 1rem;
    padding: 1.5rem 0.5rem 1rem;
  }
`;

const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  height: 100%;
  min-width: 80px;
  max-width: 150px;
  
  @media (max-width: 768px) {
    min-width: 60px;
  }
`;

const Bar = styled.div<{ $height: number }>`
  width: 100%;
  height: ${({ $height }) => Math.max($height, 5)}%;
  min-height: 40px;
  background: linear-gradient(180deg, #FF6B6B 0%, #FF4444 100%);
  border-radius: 8px 8px 0 0;
  transition: all 0.3s ease;
  box-shadow: 0 -2px 8px rgba(255, 68, 68, 0.3);
  position: relative;
  
  &:hover {
    background: linear-gradient(180deg, #FF5252 0%, #FF3333 100%);
    transform: scaleY(1.02);
    box-shadow: 0 -4px 12px rgba(255, 68, 68, 0.5);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 8px 8px 0 0;
  }
`;

const BarLabel = styled.div`
  margin-top: 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  color: #333;
  word-break: break-word;
  line-height: 1.3;
  max-width: 100%;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #999;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  padding: 2rem;
`;

interface StockChartProps {
  items: StockItem[];
}

export default function StockChart({ items }: StockChartProps) {
    // Pegar apenas os primeiros 6 itens com estoque baixo
    const displayItems = items.slice(0, 6);
    
    console.log('Itens para o gráfico:', displayItems); // Debug
    
    // Se não houver itens, mostrar mensagem
    if (displayItems.length === 0) {
        return (
            <ChartContainer>
                <ChartTitle>
                    Produtos com stock em baixa quantidade:
                </ChartTitle>
                <EmptyState>
                    ✅ Nenhum produto com stock baixo
                </EmptyState>
            </ChartContainer>
        );
    }
    
    // Encontrar a quantidade máxima para normalizar as alturas
    const maxQuantity = Math.max(...displayItems.map(item => item.quantidade));
    
    return (
        <ChartContainer>
            <ChartTitle>
                Produtos com stock em baixa quantidade:
            </ChartTitle>
            
            <BarsContainer>
                {displayItems.map(item => {
                    // Calcular altura proporcional (entre 20% e 100%)
                    const heightPercentage = Math.max(
                        (item.quantidade / maxQuantity) * 100,
                        20
                    );
                    
                    return (
                        <BarWrapper key={item.id}>
                            <Bar 
                                $height={heightPercentage}
                                title={`${item.produto}: ${item.quantidade} unidades`}
                            />
                            <BarLabel>{item.produto}</BarLabel>
                        </BarWrapper>
                    );
                })}
            </BarsContainer>
        </ChartContainer>
    );
}
