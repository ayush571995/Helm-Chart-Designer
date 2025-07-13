# Helm Chart Designer

> **AI-Powered Visual Kubernetes Deployment Tool** - Transform sketches into production-ready Helm charts

[![GitHub stars](https://img.shields.io/github/stars/username/helm-chart-designer)](https://github.com/username/helm-chart-designer/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/username/helm-chart-designer)](https://github.com/username/helm-chart-designer/network)
[![GitHub issues](https://img.shields.io/github/issues/username/helm-chart-designer)](https://github.com/username/helm-chart-designer/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Keywords:** Kubernetes, Helm Charts, Azure OpenAI, Visual Programming, DevOps, Infrastructure as Code, Diagram to Code, AI Tools, React Canvas


> Transform sketches into Kubernetes deployments with AI

A visual tool that converts hand-drawn architecture diagrams into production-ready Helm charts using Azure OpenAI analysis.

## ✨ Features

- **Visual Drawing Interface** - Draw rectangles for deployments, circles for services
- **AI-Powered Analysis** - Azure OpenAI GPT-4 analyzes your drawings
- **Real-time YAML Generation** - Get production-ready Helm charts instantly
- **Built-in Validation** - Validate generated YAML syntax
- **Export Functionality** - Download generated charts as `.yaml` files
- **Undo/Redo Support** - Full history management for drawing operations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (recommended)
- Azure OpenAI account with GPT-4 Vision deployment
- Modern web browser with HTML5 Canvas support

### Installation

1. **Clone and install:**
   ```bash
   git clone <your-repo>
   cd helm-chart-designer
   npm install
   ```

2. **Configure Azure OpenAI:**
   
   Create `.env` file in project root:
   ```env
   REACT_APP_AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
   REACT_APP_AZURE_OPENAI_API_KEY=your_api_key_here
   REACT_APP_AZURE_OPENAI_DEPLOYMENT_NAME=your_gpt4_deployment_name
   REACT_APP_AZURE_OPENAI_API_VERSION=2024-04-01-preview
   ```

3. **Start the application:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🎨 How to Use

### 1. Draw Your Architecture
- **Rectangles** → Kubernetes Deployments/Pods
- **Circles** → Services
- **Lines** → Connections between components
- **Text** → Component names and labels
- **Colors** → Different environments or component types

### 2. Generate YAML
- Click **"Generate YAML from Drawing"**
- AI analyzes your drawing in real-time
- Production-ready Helm chart appears in right panel

### 3. Validate & Export
- Click **"Validate"** to check YAML syntax
- Click **"Download"** to save your Helm chart
- Edit the YAML directly if needed

## 📊 Example Workflow

**Draw this architecture:**
```
[Frontend] → (Load Balancer) → [API Server] → (Database Service) → [Database]
```

**Get this Helm chart:**
```yaml
apiVersion: v2
name: my-application
description: Generated from architecture drawing
version: 0.1.0

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "chart.fullname" . }}-frontend
spec:
  replicas: {{ .Values.frontend.replicas | default 3 }}
  # ... complete deployment configuration

---
apiVersion: v1
kind: Service
metadata:
  name: {{ include "chart.fullname" . }}-loadbalancer
spec:
  type: {{ .Values.loadbalancer.type | default "LoadBalancer" }}
  # ... complete service configuration
```

## 🏗️ Project Structure

```
src/
├── components/          # React UI components
│   ├── ToolBar.js      # Drawing tools and controls
│   ├── DrawingCanvas.js # Main canvas interface
│   ├── YAMLPanel.js    # YAML display and validation
│   └── index.js        # Component exports
├── services/           # Business logic layer
│   ├── CanvasService.js # Canvas operations
│   ├── AIService.js    # Azure OpenAI integration
│   ├── YAMLTemplateService.js # YAML generation
│   ├── FileService.js  # File operations
│   └── index.js        # Service exports
├── hooks/              # Custom React hooks
│   ├── useCanvas.js    # Canvas state management
│   └── index.js        # Hook exports
├── constants/          # Type definitions
│   ├── toolTypes.js    # Tool and component types
│   └── index.js        # Constant exports
├── App.js             # Main React app
└── HelmChartDesigner.js # Core application component
```

## ⚙️ Configuration

### Azure OpenAI Setup

1. **Create Azure OpenAI Resource:**
   - Go to Azure Portal
   - Create new OpenAI resource
   - Deploy GPT-4 Vision model

2. **Get Configuration Values:**
   - **Endpoint**: From resource overview
   - **API Key**: From Keys and Endpoint section
   - **Deployment Name**: From Model deployments page
   - **API Version**: Use `2024-04-01-preview`

3. **Update .env File:**
   ```env
   REACT_APP_AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
   REACT_APP_AZURE_OPENAI_API_KEY=your_32_char_api_key
   REACT_APP_AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4-vision
   REACT_APP_AZURE_OPENAI_API_VERSION=2024-04-01-preview
   ```

### Tailwind CSS Configuration

**tailwind.config.js:**
```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 🔧 Development

### Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run test suite
npm run eject      # Eject from Create React App
```

### Adding New Drawing Tools

1. **Define tool type** in `constants/toolTypes.js`:
   ```javascript
   export const TOOL_TYPES = {
     // ... existing tools
     ARROW: 'arrow'
   };
   ```

2. **Add tool logic** in `services/CanvasService.js`:
   ```javascript
   static drawArrow(ctx, startPos, endPos, color) {
     // Arrow drawing implementation
   }
   ```

3. **Update UI** in `components/ToolBar.js`:
   ```javascript
   const tools = [
     // ... existing tools
     { id: TOOL_TYPES.ARROW, icon: ArrowRight, label: 'Arrow' }
   ];
   ```

### Customizing YAML Templates

Edit `services/YAMLTemplateService.js` to modify generated templates:

```javascript
static generateCustomResource() {
  return `apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ include "chart.fullname" . }}-config
data:
  config.yaml: |
    # Custom configuration
  `;
}
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload `build` folder to Netlify
3. Set environment variables in Netlify dashboard

### Environment Variables for Production

Set these in your hosting platform:
```
REACT_APP_AZURE_OPENAI_ENDPOINT
REACT_APP_AZURE_OPENAI_API_KEY
REACT_APP_AZURE_OPENAI_DEPLOYMENT_NAME
REACT_APP_AZURE_OPENAI_API_VERSION
```

## 🐛 Troubleshooting

### Common Issues

**Environment Variables Not Loading:**
```bash
# Ensure .env is in project root (same level as package.json)
# Restart development server after changes
npm start
```

**Canvas Memory Issues:**
```javascript
// Reduce canvas size in CanvasService.js
canvas.width = 400;  // Instead of 600
canvas.height = 300; // Instead of 400
```

**Azure OpenAI CORS Errors:**
```javascript
// If you get CORS errors, you may need a backend proxy
// Consider deploying a simple Express.js proxy server
```

**Drawing Not Generating YAML:**
- Ensure you've drawn something on the canvas
- Check browser console for error messages
- Verify Azure OpenAI configuration in .env

### Debug Mode

Add debug logging to troubleshoot issues:

```javascript
// In HelmChartDesigner.js
const handleGenerateYAML = async () => {
  console.log('🔍 Environment check:');
  console.log('Endpoint:', process.env.REACT_APP_AZURE_OPENAI_ENDPOINT);
  console.log('API Key:', process.env.REACT_APP_AZURE_OPENAI_API_KEY ? 'Present' : 'Missing');
  // ... rest of function
};
```

## 💰 Cost Considerations

### Azure OpenAI Pricing

- **GPT-4 Vision**: ~$0.01-0.03 per image analysis
- **Token usage**: Varies based on generated YAML length
- **Rate limits**: Check Azure OpenAI quotas

### Cost Optimization

- Use smaller canvas sizes for faster uploads
- Implement client-side caching for repeated analyses
- Set usage alerts in Azure portal

## 🔐 Security Best Practices

### API Key Security

- Never commit `.env` files to version control
- Use environment variables in production
- Rotate API keys regularly
- Set up usage quotas and alerts

### Browser Security

- API calls are made directly from browser to Azure
- Consider implementing a backend proxy for production
- Validate all user inputs

## 🤝 Contributing

### Development Setup

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Install dependencies: `npm install`
4. Make your changes
5. Test thoroughly
6. Commit: `git commit -m 'Add amazing feature'`
7. Push: `git push origin feature/amazing-feature`
8. Open Pull Request

### Code Style

- Use ESLint and Prettier
- Follow React best practices
- Add JSDoc comments for complex functions
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Microsoft Azure** for OpenAI services
- **OpenAI** for GPT-4 Vision capabilities
- **Lucide** for beautiful icons
- **Tailwind CSS** for styling system
- **React** team for the framework

---

**Built with ❤️ for the Kubernetes community**

Feel free to fork, contribute, and make this tool even better!

🌟 [Star on GitHub](https://github.com/your-username/helm-chart-designer) | 🐛 [Report Bug](https://github.com/your-username/helm-chart-designer/issues) | 💡 [Request Feature](https://github.com/your-username/helm-chart-designer/issues)
