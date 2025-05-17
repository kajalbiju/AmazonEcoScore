import React from 'react';

interface CertificationBadgeProps {
  name: string;
  icon: string;
  description: string;
}

const CertificationBadge: React.FC<CertificationBadgeProps> = ({ name, icon, description }) => {
  return (
    <div className="flex items-center p-2 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
      <img src={icon} alt={name} className="w-8 h-8 mr-2" />
      <div>
        <h4 className="text-sm font-semibold text-green-800">{name}</h4>
        <p className="text-xs text-green-600">{description}</p>
      </div>
    </div>
  );
};

export default CertificationBadge; 