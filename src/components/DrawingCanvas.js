// components/DrawingCanvas.js
import React, { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { CanvasService } from '../services';
import { TOOL_TYPES } from '../constants';


// To this:
const DrawingCanvas = forwardRef(({ currentTool, currentColor, onSaveToHistory }, ref) => {
  const canvasRef = useRef(null);
  useImperativeHandle(ref, () => canvasRef.current);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState(null);

  // Simple throttled save function to prevent excessive history saves
  const throttledSave = useCallback(() => {
    if (onSaveToHistory) {
      setTimeout(() => onSaveToHistory(), 100);
    }
  }, [onSaveToHistory]);

  useEffect(() => {
    if (canvasRef.current) {
      CanvasService.initializeCanvas(canvasRef.current, currentColor);
      throttledSave();
    }
  }, [currentColor, throttledSave]);

  const handleMouseDown = useCallback((e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = CanvasService.getMousePosition(canvas, e);
    
    setIsDrawing(true);
    setStartPos(pos);
    
    if (currentTool === TOOL_TYPES.PEN) {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    } else if (currentTool === TOOL_TYPES.TEXT) {
      const text = prompt('Enter text:');
      if (text) {
        CanvasService.drawText(ctx, pos, text, currentColor);
        throttledSave();
      }
      setIsDrawing(false);
    }
  }, [currentTool, currentColor, throttledSave]);

  const handleMouseMove = useCallback((e) => {
    if (!isDrawing || currentTool === TOOL_TYPES.TEXT) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = CanvasService.getMousePosition(canvas, e);
    
    if (currentTool === TOOL_TYPES.PEN) {
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = 2;
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  }, [isDrawing, currentTool, currentColor]);

  const handleMouseUp = useCallback((e) => {
    if (!isDrawing || !startPos) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const endPos = CanvasService.getMousePosition(canvas, e);
    
    if (currentTool === TOOL_TYPES.RECTANGLE) {
      CanvasService.drawRectangle(ctx, startPos, endPos, currentColor);
    } else if (currentTool === TOOL_TYPES.CIRCLE) {
      CanvasService.drawCircle(ctx, startPos, endPos, currentColor);
    }
    
    setIsDrawing(false);
    setStartPos(null);
    throttledSave();
  }, [isDrawing, startPos, currentTool, currentColor, throttledSave]);

  return (
    <div className="flex-1 p-6">
      <div className="h-full bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Architecture Canvas</h2>
          <div className="text-sm text-gray-500">
            Current tool: <span className="font-medium capitalize">{currentTool}</span>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          className="border border-gray-300 rounded-lg cursor-crosshair shadow-inner"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
    </div>
  );
});

export default DrawingCanvas;