// services/CanvasService.js
class CanvasService {
  static initializeCanvas(canvas, initialColor = '#000000') {
    const ctx = canvas.getContext('2d');
    // Use smaller canvas size to reduce memory usage
    canvas.width = 600;
    canvas.height = 400;
    
    ctx.strokeStyle = initialColor;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    return ctx;
  }

  static getMousePosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  static drawRectangle(ctx, startPos, endPos, color) {
    const width = endPos.x - startPos.x;
    const height = endPos.y - startPos.y;
    
    ctx.strokeStyle = color;
    ctx.strokeRect(startPos.x, startPos.y, width, height);
  }

  static drawCircle(ctx, centerPos, endPos, color) {
    const radius = Math.sqrt(
      Math.pow(endPos.x - centerPos.x, 2) + 
      Math.pow(endPos.y - centerPos.y, 2)
    );
    
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(centerPos.x, centerPos.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  static drawText(ctx, position, text, color) {
    ctx.font = '16px Arial';
    ctx.fillStyle = color;
    ctx.fillText(text, position.x, position.y);
  }

  static exportToImage(canvas) {
    return canvas.toDataURL('image/png');
  }
}

export default CanvasService;