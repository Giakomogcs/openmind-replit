import React from 'react';

interface TextComponentProps {
  content: string;
  style?: React.CSSProperties;
}

export const TextComponent: React.FC<TextComponentProps> = ({ content, style }) => {
  return (
    <div style={{ padding: '20px', lineHeight: '1.6', ...style }}>
      {content.split('\n').map((line, index) => (
        <p key={index} style={{ margin: '8px 0' }}>
          {line}
        </p>
      ))}
    </div>
  );
};
