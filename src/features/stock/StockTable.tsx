import type { StockItem } from './stock.types';
import styled from 'styled-components';

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  
  th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    font-size: 1rem;
    
    &:nth-child(2) {
      text-align: center;
    }
    
    &:nth-child(3) {
      text-align: center;
    }
  }
`;

const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid #E0E0E0;
    
    &:nth-child(even) {
      background: #F9F9F9;
    }
    
    &:hover {
      background: #F0F0F0;
    }
  }
  
  td {
    padding: 1rem;
    font-size: 0.95rem;
    
    &:nth-child(2) {
      text-align: center;
      font-weight: 600;
    }
    
    &:nth-child(3) {
      text-align: center;
    }
  }
`;

const StatusBadge = styled.span<{ $nivel: string }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  color: ${({ $nivel }) =>
    $nivel === 'Bom' ? '#28a745' :
    $nivel === 'Médio' ? '#ffc107' :
    '#dc3545'};
  background: ${({ $nivel }) =>
    $nivel === 'Bom' ? '#d4edda' :
    $nivel === 'Médio' ? '#fff3cd' :
    '#f8d7da'};
`;

export default function StockTable({ items }: { items: StockItem[] }) {
    return (
        <TableWrapper>
            <Table>
                <TableHeader>
                    <tr>
                        <th>Produtos</th>
                        <th>Quantidade</th>
                        <th>Nível de stock</th>
                    </tr>
                </TableHeader>
                <TableBody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.produto}</td>
                            <td>{item.quantidade}</td>
                            <td>
                                <StatusBadge $nivel={item.nivel}>
                                    {item.nivel}
                                </StatusBadge>
                            </td>
                        </tr>
                    ))}
                </TableBody>
            </Table>
        </TableWrapper>
    );
}