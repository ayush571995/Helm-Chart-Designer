# Helm Chart Designer

> Transform sketches into Kubernetes deployments

A visual tool that converts hand-drawn architecture diagrams into production-ready Helm charts using AI analysis.

## What it does

Draw your Kubernetes architecture on a canvas → AI analyzes the drawing → Get production-ready Helm chart YAML.

## Getting started

### Prerequisites

- Node.js 16+
- A modern web browser

### Installation

```bash
git clone <your-repo>
cd helm-chart-designer
npm install
npm start
```

Open `http://localhost:3000` in your browser.

## How to use

1. **Draw**: Use rectangles for deployments, circles for services
2. **Label**: Add text to name your components
3. **Generate**: Click "Generate YAML" to create Helm charts
4. **Download**: Save your generated YAML files

### Drawing conventions

| Shape | Kubernetes Resource |
|-------|-------------------|
| Rectangle | Deployment/Pod |
| Circle | Service |
| Line | Connection |
| Text | Component name |

## Example

**Draw this:**
```
[Web App] → (Load Balancer) → [API Server] → (Database)
```

**Get this:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  # ... rest of the deployment
---
apiVersion: v1
kind: Service
metadata:
  name: load-balancer
# ... rest of the service
```

## Project structure

```
src/
├── components/     # UI components
├── services/       # Business logic
├── hooks/         # React hooks
└── constants/     # Type definitions
```

## Configuration

Create `.env` file:

```env
REACT_APP_CLAUDE_API_KEY=your_api_key
```

## Features

- **Visual drawing interface** with multiple tools
- **AI-powered analysis** using Claude
- **Real-time YAML generation**
- **Built-in validation**
- **Export functionality**
- **Undo/redo support**

## Tech stack

- React 18
- Canvas API
- Claude AI
- Tailwind CSS
- Lucide icons

## Development

```bash
npm start      # Development server
npm run build  # Production build
npm test       # Run tests
```

## Contributing

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Troubleshooting

**Canvas not loading?**
- Check browser console for errors
- Ensure browser supports HTML5 Canvas

**AI generation failing?**
- Verify Claude API key in `.env`
- Check network connectivity

**Memory issues?**
- Canvas size is optimized but can be reduced further in `CanvasService.js`

## Roadmap

- [ ] More drawing tools
- [ ] Template library
- [ ] Kubernetes deployment
- [ ] Collaboration features

---

Made for the Kubernetes community