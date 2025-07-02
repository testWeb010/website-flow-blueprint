
export interface DocSection {
  id: string;
  title: string;
  description?: string;
  content: string;
  subsections?: DocSection[];
}

export interface DocCategory {
  id: string;
  title: string;
  icon?: string;
  sections: DocSection[];
}

export const documentationCategories: DocCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: "🚀",
    sections: [
      {
        id: "installation",
        title: "Installation",
        description: "How to install and set up Flow",
        content: "Installation content will be loaded here...",
      },
      {
        id: "quick-start",
        title: "Quick Start Guide",
        description: "Get up and running in 5 minutes",
        content: "Quick start content will be loaded here...",
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
        description: "Leverage powerful AI for coding",
        content: "AI agents content will be loaded here...",
      },
      {
        id: "code-visualization",
        title: "Code Visualization",
        description: "Visualize your code changes",
        content: "Code visualization content will be loaded here...",
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
        description: "Customize Flow to your needs",
        content: "Customization content will be loaded here...",
      },
      {
        id: "integrations",
        title: "Integrations",
        description: "Connect with your favorite tools",
        content: "Integrations content will be loaded here...",
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
        description: "Complete REST API documentation",
        content: "REST API content will be loaded here...",
      },
      {
        id: "sdk",
        title: "SDK Reference",
        description: "SDK methods and examples",
        content: "SDK content will be loaded here...",
      }
    ]
  }
];
