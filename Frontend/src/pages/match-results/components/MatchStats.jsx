import React from 'react';
import Icon from '../../../components/AppIcon';

const MatchStats = ({ totalMatches, highConfidenceMatches, averageScore }) => {
  const stats = [
    {
      icon: 'Users',
      label: 'Total Matches',
      value: totalMatches,
      color: 'text-primary'
    },
    {
      icon: 'Star',
      label: 'High Confidence',
      value: highConfidenceMatches,
      color: 'text-success'
    },
    {
      icon: 'TrendingUp',
      label: 'Average Score',
      value: `${averageScore}%`,
      color: 'text-warning'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats?.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg shadow-elevation-1 p-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div>
              <p className="text-sm text-text-secondary">{stat?.label}</p>
              <p className="text-xl font-semibold text-text-primary">{stat?.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchStats;