import React from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, Database } from 'lucide-react';
import './CardComponent.css';

interface CardComponentProps {
  title: string;
  value: string | number;
  icon?: string;
  trend?: string;
  description?: string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  users: Users,
  'dollar-sign': DollarSign,
  activity: Activity,
  database: Database,
};

export const CardComponent: React.FC<CardComponentProps> = ({
  title,
  value,
  icon,
  trend,
  description,
}) => {
  const IconComponent = icon && iconMap[icon] ? iconMap[icon] : Activity;
  const isPositiveTrend = trend && trend.includes('+');

  return (
    <div className="card-component">
      <div className="card-header">
        <div className="card-icon">
          <IconComponent size={24} />
        </div>
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-body">
        <div className="card-value">{value}</div>
        {trend && (
          <div className={`card-trend ${isPositiveTrend ? 'positive' : 'negative'}`}>
            {isPositiveTrend ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{trend}</span>
          </div>
        )}
        {description && <p className="card-description">{description}</p>}
      </div>
    </div>
  );
};
