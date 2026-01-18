export interface StockItem {
    id: string;
    produto: string;
    quantidade: number;
    nivel: 'Bom' | 'Médio' | 'Baixo';
}