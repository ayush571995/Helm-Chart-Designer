// services/YAMLTemplateService.js
class YAMLTemplateService {
  static generateBasicHelmChart() {
    return `# Generated Helm Chart Templates
# Analysis: Detected deployment and service components

apiVersion: v2
name: generated-application
description: A Helm chart generated from architectural drawing
type: application
version: 0.1.0
appVersion: "1.0"

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "generated-application.fullname" . }}-app
  labels:
    {{- include "generated-application.labels" . | nindent 4 }}
spec:
  replicas: {{ .Values.app.replicaCount | default 3 }}
  selector:
    matchLabels:
      {{- include "generated-application.selectorLabels" . | nindent 6 }}
      component: app
  template:
    metadata:
      labels:
        {{- include "generated-application.selectorLabels" . | nindent 8 }}
        component: app
    spec:
      containers:
      - name: app
        image: "{{ .Values.app.image.repository }}:{{ .Values.app.image.tag | default .Chart.AppVersion }}"
        imagePullPolicy: {{ .Values.app.image.pullPolicy | default "IfNotPresent" }}
        ports:
        - name: http
          containerPort: {{ .Values.app.service.targetPort | default 8080 }}
          protocol: TCP
        livenessProbe:
          httpGet:
            path: {{ .Values.app.healthCheck.path | default "/health" }}
            port: http
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: {{ .Values.app.healthCheck.path | default "/ready" }}
            port: http
          initialDelaySeconds: 5
          periodSeconds: 5
        resources:
          {{- toYaml .Values.app.resources | nindent 10 }}
        env:
        {{- range $key, $value := .Values.app.env }}
        - name: {{ $key }}
          value: {{ $value | quote }}
        {{- end }}

---
apiVersion: v1
kind: Service
metadata:
  name: {{ include "generated-application.fullname" . }}-service
  labels:
    {{- include "generated-application.labels" . | nindent 4 }}
spec:
  type: {{ .Values.app.service.type | default "ClusterIP" }}
  ports:
  - port: {{ .Values.app.service.port | default 80 }}
    targetPort: http
    protocol: TCP
    name: http
  selector:
    {{- include "generated-application.selectorLabels" . | nindent 4 }}
    component: app

---
# Default values.yaml structure
# Copy this to your values.yaml file:
#
# app:
#   replicaCount: 3
#   image:
#     repository: nginx
#     tag: "1.21"
#     pullPolicy: IfNotPresent
#   service:
#     type: ClusterIP
#     port: 80
#     targetPort: 8080
#   resources:
#     limits:
#       cpu: 500m
#       memory: 512Mi
#     requests:
#       cpu: 250m
#       memory: 256Mi
#   env:
#     NODE_ENV: production
#   healthCheck:
#     path: /health`;
  }

  static validateYAML(yamlContent) {
    try {
      const lines = yamlContent.split('\n');
      const issues = [];

      // Basic validation checks
      if (!yamlContent.includes('apiVersion:')) {
        issues.push('Missing apiVersion field');
      }
      if (!yamlContent.includes('kind:')) {
        issues.push('Missing kind field');
      }
      if (!yamlContent.includes('metadata:')) {
        issues.push('Missing metadata field');
      }

      // Helm-specific validation
      if (!yamlContent.includes('{{') || !yamlContent.includes('}}')) {
        issues.push('No Helm templating detected - consider adding {{ .Values.* }} syntax');
      }

      return {
        isValid: issues.length === 0,
        issues,
        summary: issues.length === 0 ? 'YAML structure is valid' : `Found ${issues.length} issue(s)`
      };
    } catch (error) {
      return {
        isValid: false,
        issues: [error.message],
        summary: 'YAML parsing failed'
      };
    }
  }
}

export default YAMLTemplateService;