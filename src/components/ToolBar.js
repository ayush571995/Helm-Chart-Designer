// components/ToolBar.js
import React from 'react';
import { Pen, Square, Circle, Type, Trash2, Save, Undo, Redo } from 'lucide-react';
import { TOOL_TYPES } from '../constants';

const ToolBar = ({ 
  currentTool, 
  onToolChange, 
  currentColor, 
  onColorChange, 
  onClear, 
  onUndo, 
  onRedo, 
  onSave, 
  canUndo, 
  canRedo 
}) => {
  const tools = [
    { id: TOOL_TYPES.PEN, icon: Pen, label: 'Pen', tooltip: 'Freehand drawing' },
    { id: TOOL_TYPES.RECTANGLE, icon: Square, label: 'Rectangle', tooltip: 'Draw rectangles (Deployments)' },
    { id: TOOL_TYPES.CIRCLE, icon: Circle, label: 'Circle', tooltip: 'Draw circles (Services)' },
    { id: TOOL_TYPES.TEXT, icon: Type, label: 'Text', tooltip: 'Add text labels' },
  ];

  const colors = ['#000000', '#2563eb', '#dc2626', '#16a34a', '#ca8a04', '#9333ea', '#c2410c'];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4">Drawing Tools</h2>
      
      {/* Tool Selection */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Tools</h3>
        <div className="grid grid-cols-2 gap-2">
          {tools.map(tool => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => onToolChange(tool.id)}
                title={tool.tooltip}
                className={`flex items-center justify-center p-3 rounded-lg border transition-colors ${
                  currentTool === tool.id 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                }`}
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Palette */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Colors</h3>
        <div className="grid grid-cols-4 gap-2">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className={`w-10 h-10 rounded-lg border-2 transition-transform hover:scale-105 ${
                currentColor === color ? 'border-gray-800 ring-2 ring-gray-300' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* History Controls */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">History</h3>
        <div className="flex gap-2">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="flex-1 flex items-center justify-center gap-1 bg-gray-500 text-white px-3 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
          >
            <Undo size={14} />
            Undo
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="flex-1 flex items-center justify-center gap-1 bg-gray-500 text-white px-3 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
          >
            <Redo size={14} />
            Redo
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 mt-auto">
        <button
          onClick={onSave}
          className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          <Save size={16} />
          Save Drawing
        </button>
        
        <button
          onClick={onClear}
          className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          <Trash2 size={16} />
          Clear Canvas
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
        <h4 className="font-medium mb-2 text-blue-900">Quick Guide:</h4>
        <ul className="text-blue-800 space-y-1 text-xs">
          <li>• Rectangles → Deployments/Pods</li>
          <li>• Circles → Services</li>
          <li>• Lines → Connections</li>
          <li>• Text → Component labels</li>
          <li>• Use different colors for clarity</li>
        </ul>
      </div>
    </div>
  );
};

export default ToolBar;