import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UtensilsCrossed, Droplet, Home, Menu as MenuIcon } from 'lucide-react';

import StockTable from './StockTable';
import StockChart from './StockChart';
import type { StockItem } from './stock.types';
import { getStockByCategoryRealtime, type Category } from './stock.service';

/* ---------- styles (SEM ALTERAÇÕES) ---------- */

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 100px);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : '#E8E8E8'};
  color: ${({ $active }) => ($active ? 'white' : '#333')};
`;

const MenuButton = styled(CategoryButton)`
  margin-left: auto;

  @media (min-width: 769px) {
    display: none;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const TableSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
`;

const ChartSection = styled.div`
  background: #f5f5f5;
  border-radius: 12px;
  padding: 1.5rem;
`;

/* ---------- COMPONENT ---------- */

export default function StockPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('alimentos');
  const [items, setItems] = useState<StockItem[]>([]);

  // Listener realtime por categoria
  useEffect(() => {
    const unsubscribe = getStockByCategoryRealtime(
      activeCategory,
      setItems
    );

    return () => unsubscribe();
  }, [activeCategory]);

  const lowStockItems = items.filter(item => item.nivel === 'Baixo');

  return (
    <PageContainer>
      <CategoryTabs>
        <CategoryButton
          $active={activeCategory === 'alimentos'}
          onClick={() => setActiveCategory('alimentos')}
        >
          <UtensilsCrossed />
          Alimentos
        </CategoryButton>

        <CategoryButton
          $active={activeCategory === 'higienePessoal'}
          onClick={() => setActiveCategory('higienePessoal')}
        >
          <Droplet />
          Higiene
        </CategoryButton>

        <CategoryButton
          $active={activeCategory === 'higieneCasa'}
          onClick={() => setActiveCategory('higieneCasa')}
        >
          <Home />
          Limpeza
        </CategoryButton>

        <MenuButton $active={false}>
          <MenuIcon />
        </MenuButton>
      </CategoryTabs>

      <ContentGrid>
        <TableSection>
          <StockTable items={items} />
        </TableSection>

        <ChartSection>
          <StockChart items={lowStockItems} />
        </ChartSection>
      </ContentGrid>
    </PageContainer>
  );
}
