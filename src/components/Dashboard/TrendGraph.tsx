import React, { useEffect, useRef } from 'react';
import { UserProfile } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface TrendGraphProps {
  profile: UserProfile;
}

const TrendGraph: React.FC<TrendGraphProps> = ({ profile }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    const padding = 40;
    const graphWidth = width - (padding * 2);
    const graphHeight = height - (padding * 2);
    
    // Set colors based on theme
    const textColor = theme === 'dark' ? '#e5e7eb' : '#4b5563';
    const gridColor = theme === 'dark' ? 'rgba(107, 114, 128, 0.2)' : 'rgba(229, 231, 235, 0.8)';
    const ecoScoreColor = '#34D399';
    const carbonSavedColor = '#60A5FA';
    
    // Draw grid
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (graphHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    
    // Month labels and vertical grid lines
    ctx.fillStyle = textColor;
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    const monthlyData = profile.monthlyImpact;
    const segmentWidth = graphWidth / (monthlyData.length - 1);
    
    monthlyData.forEach((data, index) => {
      const x = padding + segmentWidth * index;
      
      // Vertical grid lines
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
      
      // Month labels
      ctx.fillText(data.month, x, height - padding / 2);
    });
    
    // Draw axes labels
    ctx.textAlign = 'right';
    ctx.fillText('10', padding - 10, padding);
    ctx.fillText('0', padding - 10, height - padding);
    
    ctx.save();
    ctx.translate(padding / 2, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('EcoScore & CO₂ Saved', 0, 0);
    ctx.restore();
    
    // Draw EcoScore line
    ctx.strokeStyle = ecoScoreColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    monthlyData.forEach((data, index) => {
      const x = padding + segmentWidth * index;
      const y = padding + graphHeight - (graphHeight * data.ecoScore / 10);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Draw Carbon Saved line
    ctx.strokeStyle = carbonSavedColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const maxCarbonSaved = Math.max(...monthlyData.map(d => d.carbonSaved));
    
    monthlyData.forEach((data, index) => {
      const x = padding + segmentWidth * index;
      const y = padding + graphHeight - (graphHeight * data.carbonSaved / maxCarbonSaved);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Draw legend
    ctx.fillStyle = textColor;
    ctx.textAlign = 'left';
    ctx.font = '14px Arial';
    
    // EcoScore legend
    ctx.fillStyle = ecoScoreColor;
    ctx.fillRect(width - padding - 120, padding, 12, 12);
    ctx.fillStyle = textColor;
    ctx.fillText('EcoScore', width - padding - 100, padding + 10);
    
    // Carbon Saved legend
    ctx.fillStyle = carbonSavedColor;
    ctx.fillRect(width - padding - 120, padding + 20, 12, 12);
    ctx.fillStyle = textColor;
    ctx.fillText('CO₂ Saved', width - padding - 100, padding + 30);
    
  }, [profile, theme]);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Monthly Impact Trends</h2>
      <div className="mt-4 relative">
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={400} 
          className="w-full h-64"
        ></canvas>
      </div>
    </div>
  );
};

export default TrendGraph;