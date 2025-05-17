import React, { useState } from 'react';
import { Upload, Scan, X } from 'lucide-react';
import { PackagingAnalysis } from '../../types';

interface PackagingAnalyzerProps {
  onAnalyze: (imageFile: File) => Promise<PackagingAnalysis>;
}

const PackagingAnalyzer: React.FC<PackagingAnalyzerProps> = ({ onAnalyze }) => {
  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<PackagingAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };
  
  const handleFiles = (file: File) => {
    if (file.type.startsWith('image/')) {
      setImage(URL.createObjectURL(file));
      analyzeImage(file);
    }
  };
  
  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true);
    try {
      const result = await onAnalyze(file);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing image:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const resetAnalyzer = () => {
    setImage(null);
    setAnalysis(null);
  };
  
  const getBadgeColor = (rating: string) => {
    switch(rating) {
      case 'A+': return 'bg-green-500';
      case 'A': return 'bg-green-400';
      case 'B+': return 'bg-green-300';
      case 'B': return 'bg-yellow-400';
      case 'C': return 'bg-orange-400';
      case 'D': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };
  
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Packaging Analyzer</h2>
      
      {!image ? (
        <div 
          className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
            dragActive 
              ? 'border-green-500 bg-green-50 dark:bg-green-900/10' 
              : 'border-gray-300 dark:border-gray-700'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center">
            <Upload className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
              Drag and drop a packaging image here, or click to select a file
            </p>
            <label className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors cursor-pointer">
              Upload Image
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleChange} 
              />
            </label>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 relative">
            <button 
              onClick={resetAnalyzer}
              className="absolute top-2 right-2 p-1 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            <img 
              src={image} 
              alt="Uploaded packaging" 
              className="w-full h-auto rounded-lg"
            />
          </div>
          
          <div className="md:w-1/2">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-pulse flex space-x-2 items-center mb-4">
                  <Scan className="h-6 w-6 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-300">Analyzing packaging...</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full animate-progress" style={{ width: '75%' }}></div>
                </div>
              </div>
            ) : analysis ? (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Analysis Results</h3>
                  <div className={`${getBadgeColor(analysis.rating)} text-white font-bold px-2 py-1 rounded-md`}>
                    {analysis.rating}
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Material Type</p>
                  <p className="font-medium text-gray-800 dark:text-white">{analysis.material}</p>
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Recyclability</p>
                  <p className={`font-medium ${analysis.recyclable ? 'text-green-500' : 'text-red-500'}`}>
                    {analysis.recyclable ? 'Recyclable' : 'Not Recyclable'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Improvement Suggestions</p>
                  <ul className="space-y-2">
                    {analysis.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="inline-block h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-500 text-xs flex items-center justify-center mr-2 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagingAnalyzer;