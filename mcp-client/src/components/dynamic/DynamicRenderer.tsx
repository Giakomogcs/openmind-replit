import React, { Suspense } from 'react';
import { ComponentSchema } from '../../types';
import { TextComponent } from './TextComponent';
import { CardComponent } from './CardComponent';
import { TableComponent } from './TableComponent';
import { ChartComponent } from './ChartComponent';
import { FormComponent } from './FormComponent';
import { GridComponent } from './GridComponent';
import { Loader } from 'lucide-react';

interface DynamicRendererProps {
  schema: ComponentSchema;
}

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
    <Loader className="spinner" size={32} style={{ animation: 'spin 1s linear infinite' }} />
  </div>
);

const UnknownComponent: React.FC<{ type: string }> = ({ type }) => (
  <div
    style={{
      padding: '20px',
      background: '#fff3cd',
      border: '1px solid #ffeaa7',
      borderRadius: '8px',
      color: '#856404',
    }}
  >
    <strong>Componente desconhecido:</strong> {type}
  </div>
);

export const DynamicRenderer: React.FC<DynamicRendererProps> = ({ schema }) => {
  if (!schema) {
    return null;
  }

  const renderComponent = () => {
    const { type, props = {}, children = [] } = schema;

    switch (type) {
      case 'text':
        return <TextComponent content={props.content || ''} style={props.style} />;

      case 'card':
        return (
          <CardComponent
            title={props.title || ''}
            value={props.value || ''}
            icon={props.icon}
            trend={props.trend}
            description={props.description}
          />
        );

      case 'table':
        return (
          <TableComponent
            title={props.title}
            columns={props.columns || []}
            data={props.data || []}
            searchable={props.searchable}
            sortable={props.sortable}
          />
        );

      case 'chart':
        return (
          <ChartComponent
            title={props.title}
            data={props.data || []}
            chartType={props.chartType}
            xKey={props.xKey}
            yKey={props.yKey}
            colors={props.colors}
          />
        );

      case 'form':
        return (
          <FormComponent
            title={props.title}
            fields={props.fields || []}
            submitLabel={props.submitLabel}
            onSubmit={props.onSubmit}
          />
        );

      case 'grid':
        return (
          <GridComponent
            columns={props.columns}
            gap={props.gap}
            responsive={props.responsive}
            children={children}
          />
        );

      case 'tabs':
        return (
          <div style={{ padding: '20px' }}>
            <p>Componente Tabs em desenvolvimento</p>
          </div>
        );

      case 'list':
        return (
          <div style={{ padding: '20px' }}>
            <p>Componente List em desenvolvimento</p>
          </div>
        );

      case 'custom':
        return <UnknownComponent type="custom" />;

      default:
        return <UnknownComponent type={type} />;
    }
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      {renderComponent()}
    </Suspense>
  );
};
