import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase';
import type { StockItem } from './stock.types';

export type Category = 'alimentos' | 'higienePessoal' | 'higieneCasa';

// Mapeamento frontend → Firestore
const categoryMap: Record<Category, string> = {
  alimentos: '0',
  higienePessoal: '1',
  higieneCasa: '2'
};

// Calcula o nível de stock no frontend
function calcularNivel(quantidade: number): StockItem['nivel'] {
  if (quantidade >= 100) return 'Bom';
  if (quantidade >= 30) return 'Médio';
  return 'Baixo';
}

// Listener realtime por categoria
export function getStockByCategoryRealtime(
  category: Category,
  callback: (items: StockItem[]) => void
) {
  const categoryId = categoryMap[category];

  const typeCollectionRef = collection(
    db,
    'categories',
    categoryId,
    'type'
  );

  return onSnapshot(typeCollectionRef, snapshot => {
    const items: StockItem[] = snapshot.docs.map(doc => {
      const data = doc.data();

      const quantidade = typeof data.quantity === 'number' ? data.quantity : 0;

      return {
        id: doc.id,
        produto: data.name,
        quantidade,
        nivel: calcularNivel(quantidade)
      };
    });

    callback(items);
  });
}
