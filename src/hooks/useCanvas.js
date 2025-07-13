// hooks/useCanvas.js
import { useState, useCallback } from 'react';

const useCanvas = (canvasRef) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const MAX_HISTORY_SIZE = 10; // Limit history to prevent memory issues

  const saveToHistory = useCallback(() => {
    if (!canvasRef.current) return;
    
    try {
      const canvas = canvasRef.current;
      // Store as data URL instead of ImageData to save memory
      const dataUrl = canvas.toDataURL('image/png', 0.5); // Reduced quality to save space
      
      const newHistory = history.slice(Math.max(0, history.length - MAX_HISTORY_SIZE + 1));
      newHistory.push(dataUrl);
      
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    } catch (error) {
      console.warn('Failed to save to history:', error);
    }
  }, [history]);

  const restoreFromHistory = useCallback((dataUrl) => {
    if (!canvasRef.current || !dataUrl) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    
    img.src = dataUrl;
  }, []);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      restoreFromHistory(history[newIndex]);
    }
  }, [history, historyIndex, restoreFromHistory]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      restoreFromHistory(history[newIndex]);
    }
  }, [history, historyIndex, restoreFromHistory]);

  const clearCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add a small delay before saving to history to ensure canvas is cleared
    setTimeout(() => saveToHistory(), 10);
  }, [saveToHistory]);

  return {
    isDrawing,
    setIsDrawing,
    saveToHistory,
    undo,
    redo,
    clearCanvas,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1
  };
};

export default useCanvas;