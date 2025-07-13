// services/AIService.js
class AIService {
  static async analyzeDrawing(imageDataUrl) {
    try {
      console.log('🎯 Starting image analysis with Azure OpenAI...');
      
      // Check if we have Azure OpenAI configuration
      const endpoint = process.env.REACT_APP_AZURE_OPENAI_ENDPOINT;
      const apiKey = process.env.REACT_APP_AZURE_OPENAI_API_KEY;
      const deploymentName = process.env.REACT_APP_AZURE_OPENAI_DEPLOYMENT_NAME;
      
      if (!endpoint || !apiKey || !deploymentName) {
        throw new Error(`Azure OpenAI configuration missing:
        - Endpoint: ${endpoint ? 'Present' : 'Missing'}
        - API Key: ${apiKey ? 'Present' : 'Missing'}  
        - Deployment: ${deploymentName ? 'Present' : 'Missing'}
        
        Please check your .env file.`);
      }

      console.log('🚀 Calling Azure OpenAI API...');
      const response = await this.callAzureOpenAIAPI(imageDataUrl);
      console.log('✅ Azure OpenAI API successful');
      
      return {
        success: true,
        yaml: response.choices[0].message.content,
        analysis: 'Drawing analyzed successfully with Azure OpenAI GPT-4'
      };
      
    } catch (error) {
      console.error('❌ Azure OpenAI API failed:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async callAzureOpenAIAPI(imageDataUrl) {
    const endpoint = process.env.REACT_APP_AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.REACT_APP_AZURE_OPENAI_API_KEY;
    const deploymentName = process.env.REACT_APP_AZURE_OPENAI_DEPLOYMENT_NAME;
    const apiVersion = process.env.REACT_APP_AZURE_OPENAI_API_VERSION || '2024-04-01-preview';

    console.log('🔧 Azure OpenAI Configuration:');
    console.log('- Endpoint:', endpoint);
    console.log('- Deployment:', deploymentName);
    console.log('- API Version:', apiVersion);
    console.log('- API Key:', apiKey ? 'Present' : 'Missing');
    console.log('- Image size:', Math.round(imageDataUrl.length / 1024), 'KB');

    // Direct Azure OpenAI API call (no CORS proxy for now)
    const url = `${endpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=${apiVersion}`;
    
    console.log('📡 Making request to:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: this.getAnalysisPrompt()
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageDataUrl,
                  detail: 'high'
                }
              }
            ]
          }
        ],
        max_tokens: 4000,
        temperature: 0.1
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Azure OpenAI API Error Response:', errorText);
      throw new Error(`Azure OpenAI API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log('📋 Azure OpenAI Response received successfully');
    console.log('💰 Tokens used:', result.usage?.total_tokens || 'unknown');
    
    return result;
  }

  static getAnalysisPrompt() {
    return `You are a Kubernetes expert. Analyze this hand-drawn architecture diagram and generate production-ready Helm chart YAML.

INTERPRETATION RULES:
- Rectangles/Squares = Kubernetes Deployments or Pods
- Circles = Kubernetes Services
- Lines/Arrows = Service connections or data flow
- Text labels = Component names and configurations

GENERATE:
1. Complete Helm chart templates with proper metadata
2. Use {{ .Values.* }} templating for all configurable values
3. Include resource requests and limits
4. Add health checks (liveness/readiness probes)
5. Proper service selectors matching deployment labels
6. Include a values.yaml section as comments

REQUIREMENTS:
- Production-ready YAML following Helm best practices
- Proper indentation and formatting
- Meaningful default values
- Security best practices (non-root containers, resource limits)
- Include helpful comments explaining each resource

OUTPUT FORMAT:
Return only valid YAML content, starting with the Chart.yaml metadata, followed by template files separated by "---".

IMPORTANT: Analyze the actual drawing carefully. If you see rectangles, generate Deployments. If you see circles, generate Services. Use any text labels you can identify for naming components.`;
  }
}

export default AIService;