// HelmChartDesigner.js (Main App Component)
import React, { useState, useRef } from 'react';
import { ToolBar, DrawingCanvas, YAMLPanel } from './components';
import { useCanvas } from './hooks';
import { AIService, YAMLTemplateService, FileService, CanvasService } from './services';
import { TOOL_TYPES } from './constants';

const HelmChartDesigner = () => {
  const [currentTool, setCurrentTool] = useState(TOOL_TYPES.PEN);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [generatedYAML, setGeneratedYAML] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const canvasRef = useRef(null);
  const [saveToHistoryFn, setSaveToHistoryFn] = useState(null);
  const canvasHook = useCanvas(canvasRef);

  const handleGenerateYAML = async () => {
    
    if (!canvasRef.current) {
      alert('Canvas not found! Draw something first.');
      setIsGenerating(false);
      return;
    }
    
    setIsGenerating(true);
    setValidationResult(null);
    
    try {
      console.log('Generating YAML from drawing...');
      const imageData = CanvasService.exportToImage(canvasRef.current);
      const result = await AIService.analyzeDrawing(imageData);
      
      if (result.success) {
        setGeneratedYAML(result.yaml);
        setValidationResult({ isValid: true, summary: 'YAML generated successfully!' });
      } else {
        setValidationResult({ 
          isValid: false, 
          summary: 'Generation failed',
          issues: [result.error] 
        });
      }
    } catch (error) {
      setValidationResult({ 
        isValid: false, 
        summary: 'Generation failed',
        issues: [error.message] 
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleValidateYAML = () => {
    if (!generatedYAML) {
      setValidationResult({ 
        isValid: false, 
        summary: 'No YAML to validate',
        issues: ['Please generate YAML first'] 
      });
      return;
    }
    
    const validation = YAMLTemplateService.validateYAML(generatedYAML);
    setValidationResult(validation);
  };

  const handleDownloadYAML = () => {
    if (generatedYAML) {
      FileService.downloadYAML(generatedYAML);
    }
  };

  const handleSaveDrawing = () => {
    if (canvasRef.current) {
      FileService.saveDrawing(canvasRef.current, {
        tool: currentTool,
        color: currentColor
      });
      alert('Drawing saved locally!');
    }
  };

  const handleClearCanvas = () => {
    if (window.confirm('Are you sure you want to clear the canvas? This action cannot be undone.')) {
      canvasHook.clearCanvas();
      setGeneratedYAML('');
      setValidationResult(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <ToolBar
        currentTool={currentTool}
        onToolChange={setCurrentTool}
        currentColor={currentColor}
        onColorChange={setCurrentColor}
        onClear={handleClearCanvas}
        onUndo={canvasHook.undo}
        onRedo={canvasHook.redo}
        onSave={handleSaveDrawing}
        canUndo={canvasHook.canUndo}
        canRedo={canvasHook.canRedo}
      />
      
      <DrawingCanvas
        currentTool={currentTool}
        currentColor={currentColor}
        onSaveToHistory={setSaveToHistoryFn}
        ref={canvasRef}
      />
      
      <YAMLPanel
        yaml={generatedYAML}
        onYAMLChange={setGeneratedYAML}
        onGenerate={handleGenerateYAML}
        onDownload={handleDownloadYAML}
        onValidate={handleValidateYAML}
        isGenerating={isGenerating}
        validationResult={validationResult}
      />
    </div>
  );
};

export default HelmChartDesigner;