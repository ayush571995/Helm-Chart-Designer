// services/FileService.js
import CanvasService from './CanvasService';

class FileService {
  static downloadYAML(content, filename = 'helm-chart.yaml') {
    const blob = new Blob([content], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static saveDrawing(canvas, metadata = {}) {
    const imageData = CanvasService.exportToImage(canvas);
    const drawingData = {
      image: imageData,
      timestamp: new Date().toISOString(),
      metadata
    };
    
    localStorage.setItem('helm-chart-drawing', JSON.stringify(drawingData));
    return drawingData;
  }

  static loadDrawing() {
    try {
      const saved = localStorage.getItem('helm-chart-drawing');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to load saved drawing:', error);
      return null;
    }
  }
}

export default FileService;