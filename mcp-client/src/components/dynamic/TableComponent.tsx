import React, { useState } from 'react';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import './TableComponent.css';

interface TableComponentProps {
  title?: string;
  columns: string[];
  data: any[][];
  searchable?: boolean;
  sortable?: boolean;
}

export const TableComponent: React.FC<TableComponentProps> = ({
  title,
  columns,
  data,
  searchable,
  sortable,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredData = searchable
    ? data.filter((row) =>
        row.some((cell) =>
          cell?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;

  const sortedData = sortColumn !== null && sortable
    ? [...filteredData].sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        
        if (aVal === bVal) return 0;
        if (sortDirection === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      })
    : filteredData;

  const handleSort = (columnIndex: number) => {
    if (!sortable) return;
    
    if (sortColumn === columnIndex) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnIndex);
      setSortDirection('asc');
    }
  };

  return (
    <div className="table-component">
      {title && <h3 className="table-title">{title}</h3>}
      
      {searchable && (
        <div className="table-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  onClick={() => handleSort(index)}
                  className={sortable ? 'sortable' : ''}
                >
                  <div className="th-content">
                    {column}
                    {sortable && sortColumn === index && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedData.length === 0 && (
        <div className="table-empty">Nenhum resultado encontrado</div>
      )}
    </div>
  );
};
