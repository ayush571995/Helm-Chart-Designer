// components/YAMLPanel.js
import React from 'react';
import { Settings, Play, Download, Loader } from 'lucide-react';

const YAMLPanel = ({ 
  yaml, 
  onYAMLChange, 
  onGenerate, 
  onDownload, 
  onValidate, 
  isGenerating, 
  validationResult 
}) => {
  
  const handleButtonClick = () => {
  console.log('Generating YAML...');
  if (onGenerate) {
    onGenerate();
  } else {
    alert('onGenerate function is missing!');
  }
};

  return (
    <div className="w-96 bg-white border-l border-gray-200 p-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Generated YAML</h2>
        <div className="flex gap-2">
          <button
            onClick={onValidate}
            className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-colors"
            disabled={!yaml}
          >
            <Play size={14} />
            Validate
          </button>
          <button
            onClick={onDownload}
            className="flex items-center gap-1 bg-gray-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-600 transition-colors"
            disabled={!yaml}
          >
            <Download size={14} />
            Download
          </button>
        </div>
      </div>

      <button
        onClick={handleButtonClick}
        disabled={isGenerating}
        className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors mb-4"
      >
        {isGenerating ? <Loader className="animate-spin" size={16} /> : <Settings size={16} />}
        {isGenerating ? 'Analyzing Drawing...' : 'Generate YAML from Drawing'}
      </button>

      {validationResult && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          validationResult.isValid 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          <div className="font-medium mb-1">{validationResult.summary}</div>
          {validationResult.issues && validationResult.issues.length > 0 && (
            <ul className="text-xs space-y-1 mt-2">
              {validationResult.issues.map((issue, index) => (
                <li key={index}>• {issue}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="flex-1">
        <textarea
          value={yaml}
          onChange={(e) => onYAMLChange(e.target.value)}
          className="w-full h-full font-mono text-sm border border-gray-300 rounded-lg p-3 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Generated Helm chart YAML will appear here after analyzing your drawing..."
        />
      </div>
    </div>
  );
};

export default YAMLPanel;