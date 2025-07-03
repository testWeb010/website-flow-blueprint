
import express from 'express';

const router = express.Router();

// Mock documentation data structure (you'll replace this with your actual 5000 lines of content)
const documentationData = {
  categories: [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: "🚀",
      sections: [
        {
          id: "installation",
          title: "Installation",
          description: "How to install and set up Flow"
        },
        {
          id: "quick-start",
          title: "Quick Start Guide", 
          description: "Get up and running in 5 minutes"
        }
      ]
    },
    {
      id: "features",
      title: "Core Features",
      icon: "⚡",
      sections: [
        {
          id: "ai-agents",
          title: "AI Agents",
          description: "Leverage powerful AI for coding"
        },
        {
          id: "code-visualization", 
          title: "Code Visualization",
          description: "Visualize your code changes"
        }
      ]
    },
    {
      id: "advanced",
      title: "Advanced Usage",
      icon: "🔧",
      sections: [
        {
          id: "customization",
          title: "Customization",
          description: "Customize Flow to your needs"
        },
        {
          id: "integrations",
          title: "Integrations", 
          description: "Connect with your favorite tools"
        }
      ]
    },
    {
      id: "api",
      title: "API Reference",
      icon: "📚",
      sections: [
        {
          id: "rest-api",
          title: "REST API",
          description: "Complete REST API documentation"
        },
        {
          id: "sdk",
          title: "SDK Reference",
          description: "SDK methods and examples"
        }
      ]
    }
  ]
};

// Detailed content for each section (this is where you'll put your 5000 lines of content)
const sectionContent = {
  "installation": `# Installation

## Prerequisites
- Node.js 18+ 
- npm or yarn

## Quick Install
\`\`\`bash
npm install flow-app
\`\`\`

## Detailed Installation Steps
1. Download the installer
2. Run the setup wizard
3. Configure your environment
4. Verify the installation

[Rest of your detailed installation content...]`,

  "quick-start": `# Quick Start Guide

Get up and running with Flow in just 5 minutes!

## Step 1: Create a New Project
\`\`\`bash
flow create my-project
\`\`\`

## Step 2: Start Development Server
\`\`\`bash
cd my-project
flow dev
\`\`\`

[Rest of your quick start content...]`,

  "ai-agents": `# AI Agents

Flow's AI agents help you write better code faster.

## Overview
AI agents are powerful assistants that can:
- Generate code snippets
- Review your code
- Suggest improvements
- Debug issues

[Rest of your AI agents content...]`,

  "code-visualization": `# Code Visualization

Visualize your code changes and understand your codebase better.

## Features
- Interactive code graphs
- Dependency visualization
- Change tracking
- Performance metrics

[Rest of your code visualization content...]`,

  "customization": `# Customization

Customize Flow to match your workflow and preferences.

## Configuration Options
- Theme customization
- Keyboard shortcuts
- Plugin management
- Workspace settings

[Rest of your customization content...]`,

  "integrations": `# Integrations

Connect Flow with your favorite development tools.

## Supported Integrations
- GitHub
- GitLab
- Jira
- Slack
- VS Code

[Rest of your integrations content...]`,

  "rest-api": `# REST API

Complete REST API documentation for Flow.

## Authentication
All API requests require authentication using API keys.

## Endpoints

### GET /api/projects
Get all projects

### POST /api/projects
Create a new project

[Rest of your REST API content...]`,

  "sdk": `# SDK Reference

SDK methods and examples for integrating with Flow.

## Installation
\`\`\`bash
npm install flow-sdk
\`\`\`

## Basic Usage
\`\`\`javascript
import Flow from 'flow-sdk';

const flow = new Flow({
  apiKey: 'your-api-key'
});
\`\`\`

[Rest of your SDK content...]`
};

// Get all documentation categories (lightweight)
router.get('/categories', (req, res) => {
  res.json(documentationData.categories);
});

// Get specific section content (heavy content loaded on demand)
router.get('/section/:sectionId', (req, res) => {
  const { sectionId } = req.params;
  
  const content = sectionContent[sectionId];
  if (!content) {
    return res.status(404).json({ error: 'Section not found' });
  }
  
  res.json({
    id: sectionId,
    content: content
  });
});

// Search documentation
router.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.json({ results: [] });
  }
  
  const results = [];
  const searchTerm = q.toLowerCase();
  
  // Search through section content
  Object.entries(sectionContent).forEach(([sectionId, content]) => {
    if (content.toLowerCase().includes(searchTerm)) {
      const section = documentationData.categories
        .flatMap(cat => cat.sections)
        .find(sec => sec.id === sectionId);
      
      if (section) {
        results.push({
          ...section,
          excerpt: content.substring(0, 200) + '...'
        });
      }
    }
  });
  
  res.json({ results });
});

export default router;
