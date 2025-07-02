import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Search, 
  ArrowRight, 
  Book, 
  Code, 
  Zap, 
  Settings, 
  ChevronRight, 
  ChevronDown, 
  Home, 
  FileText, 
  Terminal, 
  Shield, 
  Cpu, 
  Layers, 
  HelpCircle,
  Copy,
  Check,
  Users,
  ArrowLeft,
  Server
} from "lucide-react";
import { cn } from "@/lib/utils";

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("quick-start");
  const [activeTopic, setActiveTopic] = useState("setup-guide");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["quick-start"]);
  const [copied, setCopied] = useState(false);
  
  // Toggle category expansion
  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter(c => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };
  
  // Set active section and topic
  const setActive = (section: string, topic: string) => {
    setActiveSection(section);
    setActiveTopic(topic);
    
    // Ensure the category is expanded
    if (!expandedCategories.includes(section)) {
      setExpandedCategories([...expandedCategories, section]);
    }
    
    // Scroll to top on mobile
    if (window.innerWidth < 1024) {
      window.scrollTo(0, 0);
    }
  };
  
  // Copy code function
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Navigation structure
  const navigation = [
    {
      id: "quick-start",
      name: "Quick Start",
      icon: <Zap className="w-5 h-5" />,
      topics: [
        { id: "setup-guide", name: "Installation Guide" },
        { id: "user-interface", name: "User Interface" },
        { id: "basic-features", name: "Basic Features" },
        { id: "keyboard-shortcuts", name: "Keyboard Shortcuts" }
      ]
    },
    {
      id: "ai-features",
      name: "AI Features",
      icon: <Cpu className="w-5 h-5" />,
      topics: [
        { id: "ai-agents", name: "AI Agents" },
        { id: "code-completion", name: "Code Completion" },
        { id: "code-explanation", name: "Code Explanation" },
        { id: "model-configuration", name: "Model Configuration" }
      ]
    },
    {
      id: "editor-features",
      name: "Editor Features",
      icon: <Code className="w-5 h-5" />,
      topics: [
        { id: "code-navigation", name: "Code Navigation" },
        { id: "version-control", name: "Version Control" },
        { id: "extensions", name: "Extensions" },
        { id: "customization", name: "Customization" }
      ]
    },
    {
      id: "guides",
      name: "Guides",
      icon: <Book className="w-5 h-5" />,
      topics: [
        { id: "project-setup", name: "Project Setup" },
        { id: "debugging", name: "Debugging" },
        { id: "collaboration", name: "Collaboration" },
        { id: "performance", name: "Performance Tips" }
      ]
    },
    {
      id: "configuration",
      name: "Configuration",
      icon: <Settings className="w-5 h-5" />,
      topics: [
        { id: "settings", name: "Settings Overview" },
        { id: "themes", name: "Themes" },
        { id: "keybindings", name: "Keybindings" },
        { id: "advanced-settings", name: "Advanced Settings" }
      ]
    },
    {
      id: "security",
      name: "Security",
      icon: <Shield className="w-5 h-5" />,
      topics: [
        { id: "data-privacy", name: "Data Privacy" },
        { id: "model-hosting", name: "Model Hosting" },
        { id: "permissions", name: "Permissions" },
        { id: "enterprise-security", name: "Enterprise Security" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-20 lg:pt-24">
        {/* Mobile search bar */}
        <div className="lg:hidden px-4 py-4 border-b border-gray-800/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search documentation..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-800/50 border border-gray-800/50 text-gray-200 rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-pulse-500 transition-all duration-300"
            />
          </div>
        </div>
        
        {/* Mobile navigation dropdown */}
        <div className="lg:hidden px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              {navigation.find(cat => cat.id === activeSection)?.icon}
              <span className="font-medium text-white">{navigation.find(cat => cat.id === activeSection)?.name}</span>
            </div>
            <button
              onClick={() => toggleCategory(activeSection)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {expandedCategories.includes(activeSection) ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>
          
          {expandedCategories.includes(activeSection) && (
            <div className="bg-dark-800/50 rounded-lg p-2 mb-4">
              {navigation.find(cat => cat.id === activeSection)?.topics.map((topic) => (
                <a
                  key={topic.id}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(activeSection, topic.id);
                  }}
                  className={cn(
                    "block px-3 py-2 text-sm rounded-lg transition-colors",
                    activeTopic === topic.id
                      ? "bg-pulse-500/20 text-pulse-400 font-medium"
                      : "text-gray-400 hover:text-gray-200"
                  )}
                >
                  {topic.name}
                </a>
              ))}
            </div>
          )}
          
          <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide">
            {navigation.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActive(category.id, category.topics[0].id);
                  toggleCategory(category.id);
                }}
                className={cn(
                  "flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  activeSection === category.id
                    ? "bg-pulse-500/20 text-pulse-400"
                    : "bg-dark-800/50 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="whitespace-nowrap">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 pb-20">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Sidebar - Desktop only */}
            <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
              <div className="sticky top-24">
                {/* Desktop search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Search documentation..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-dark-800/50 border border-gray-800/50 text-gray-200 rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-pulse-500 transition-all duration-300"
                  />
                </div>
                
                {/* Desktop navigation */}
                <nav className="space-y-1">
                  {navigation.map((category) => (
                    <div key={category.id} className="mb-4">
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className={cn(
                          "flex items-center justify-between w-full px-3 py-2 text-left rounded-lg transition-colors",
                          activeSection === category.id
                            ? "bg-dark-800/80 text-white"
                            : "text-gray-400 hover:text-gray-200"
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-gray-400">{category.icon}</div>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        {expandedCategories.includes(category.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                      
                      {expandedCategories.includes(category.id) && (
                        <div className="mt-1 ml-6 space-y-1">
                          {category.topics.map((topic) => (
                            <a
                              key={topic.id}
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setActive(category.id, topic.id);
                              }}
                              className={cn(
                                "block px-3 py-2 text-sm rounded-lg transition-colors",
                                activeSection === category.id && activeTopic === topic.id
                                  ? "bg-pulse-500/20 text-pulse-400 font-medium"
                                  : "text-gray-400 hover:text-gray-200"
                              )}
                            >
                              {topic.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>
            
            {/* Main content */}
            <main className="lg:col-span-9 xl:col-span-10">
              <div className="prose prose-invert max-w-none">
                <h1 className="text-3xl font-bold text-white mb-6">
                  {navigation.find(cat => cat.id === activeSection)?.topics.find(t => t.id === activeTopic)?.name}
                </h1>
                
                {activeSection === "quick-start" && activeTopic === "setup-guide" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Installation Guide</span>
                      </div>
                      <p>
                        This guide will walk you through installing Flow on your system and getting started with this AI-powered code editor.
                        Flow is a standalone editor forked from VS Code that integrates powerful AI capabilities while maintaining privacy and flexibility.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="system-requirements">System Requirements</h2>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Windows 10/11, macOS 10.15+, or Linux with GLIBC 2.28+</li>
                      <li>64-bit processor architecture</li>
                      <li>4GB RAM minimum (8GB+ recommended)</li>
                      <li>1GB available disk space</li>
                      <li>Internet connection for cloud AI features (optional for local models)</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="download">1. Download Flow</h2>
                    <p>
                      Visit the official Flow website at <a href="https://floweditor.com" className="text-pulse-400 hover:text-pulse-300">floweditor.com</a> and download the installer for your operating system:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li><strong>Windows:</strong> Download the .exe installer</li>
                      <li><strong>macOS:</strong> Download the .dmg file</li>
                      <li><strong>Linux:</strong> Download the appropriate package for your distribution (.deb, .rpm, or .AppImage)</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-amber-400 mb-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="font-medium">Note</span>
                      </div>
                      <p className="text-gray-300">
                        Flow is regularly updated with new features and improvements. We recommend enabling automatic updates to ensure you always have the latest version.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="installation">2. Installing Flow</h2>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Windows</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Double-click the downloaded installer (.exe file)</li>
                      <li>If prompted by User Account Control, click "Yes" to allow the installer to make changes</li>
                      <li>Follow the on-screen instructions in the installation wizard</li>
                      <li>Choose your installation location or use the default</li>
                      <li>Select additional options like creating desktop shortcuts if desired</li>
                      <li>Click "Install" to begin the installation process</li>
                    </ol>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">macOS</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Open the downloaded .dmg file</li>
                      <li>Drag the Flow icon to the Applications folder</li>
                      <li>If you encounter a security warning when first launching Flow, right-click (or Control-click) on the app icon and select "Open"</li>
                      <li>Click "Open" in the security dialog to confirm you want to open the application</li>
                    </ol>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Linux</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>For Debian/Ubuntu (.deb package):
                        <div className="bg-dark-900/50 rounded-md p-3 my-2 relative">
                          <button 
                            onClick={() => copyToClipboard("sudo apt install ./flow_x.x.x_amd64.deb")}
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            aria-label="Copy code"
                          >
                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                          </button>
                          <code className="text-sm text-gray-300">sudo apt install ./flow_x.x.x_amd64.deb</code>
                        </div>
                      </li>
                      <li>For Red Hat/Fedora (.rpm package):
                        <div className="bg-dark-900/50 rounded-md p-3 my-2 relative">
                          <button 
                            onClick={() => copyToClipboard("sudo dnf install ./flow-x.x.x.x86_64.rpm")}
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            aria-label="Copy code"
                          >
                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                          </button>
                          <code className="text-sm text-gray-300">sudo dnf install ./flow-x.x.x.x86_64.rpm</code>
                        </div>
                      </li>
                      <li>For AppImage:
                        <div className="bg-dark-900/50 rounded-md p-3 my-2 relative">
                          <button 
                            onClick={() => copyToClipboard("chmod +x Flow-x.x.x.AppImage\n./Flow-x.x.x.AppImage")}
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            aria-label="Copy code"
                          >
                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                          </button>
                          <code className="text-sm text-gray-300">chmod +x Flow-x.x.x.AppImage<br/>./Flow-x.x.x.AppImage</code>
                        </div>
                      </li>
                    </ol>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="first-launch">3. First Launch</h2>
                    <p>
                      When you first launch Flow, you'll be guided through a quick setup process:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 mt-4">
                      <li>Select your preferred UI theme (light or dark)</li>
                      <li>Choose whether to enable telemetry (optional)</li>
                      <li>Set up AI features (you can configure AI models later)</li>
                      <li>Sign in or create an account (optional)</li>
                    </ol>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="configuring-ai">4. Configuring AI Models</h2>
                    <p>
                      Flow supports a wide range of AI models, both cloud-based and local. You can configure your preferred models in the Settings panel:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 mt-4">
                      <li>Click on the Settings icon in the sidebar or press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+,</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+,</kbd> on macOS)</li>
                      <li>Navigate to the "AI" section</li>
                      <li>Configure your preferred AI providers and models</li>
                    </ol>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Cloud AI Providers</h3>
                    <p>
                      Flow supports multiple cloud AI providers. To use them, you'll need to provide your own API keys:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li><strong>OpenAI</strong> - GPT-4.1, GPT-4.1-mini, GPT-4.1-nano, and more</li>
                      <li><strong>Anthropic</strong> - Claude Opus 4.0, Claude Sonnet 4.0, and other Claude models</li>
                      <li><strong>Google</strong> - Gemini models</li>
                      <li><strong>Mistral</strong> - Mistral Large, Medium, and other models</li>
                      <li><strong>Groq</strong> - Fast inference for various models</li>
                      <li><strong>OpenRouter</strong> - Access to multiple models through a single API</li>
                      <li><strong>Other providers</strong> - DeepSeek, xAI, and more</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Local AI Models</h3>
                    <p>
                      Flow can connect to locally hosted models for complete privacy:
                    </p>
                    <ul className="list-disc pl-6 space-y-4 mt-2">
                      <li>
                        <strong>Ollama</strong>
                        <p className="mt-1">Install Ollama from <a href="https://ollama.ai" className="text-pulse-400 hover:text-pulse-300">ollama.ai</a> and run it locally. Flow automatically connects to Ollama at the default endpoint: <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">http://127.0.0.1:11434</code></p>
                      </li>
                      <li>
                        <strong>LM Studio</strong>
                        <p className="mt-1">Install LM Studio from <a href="https://lmstudio.ai" className="text-pulse-400 hover:text-pulse-300">lmstudio.ai</a> and start the local server. Flow connects to LM Studio at: <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">http://localhost:1234</code></p>
                      </li>
                      <li>
                        <strong>vLLM</strong>
                        <p className="mt-1">Set up vLLM and run it locally. Flow connects to vLLM at: <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">http://localhost:8000</code></p>
                      </li>
                      <li>
                        <strong>Custom OpenAI-compatible endpoints</strong>
                        <p className="mt-1">Connect to any OpenAI-compatible API by configuring the endpoint URL and optional API key</p>
                      </li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        For the best experience with local models, we recommend using models optimized for coding tasks. Flow will automatically detect available models from your local providers.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">5. Next Steps</h2>
                    <p>
                      Now that you have Flow installed and configured, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Explore the <a href="#" onClick={(e) => {e.preventDefault(); setActive("quick-start", "user-interface")}} className="text-pulse-400 hover:text-pulse-300">User Interface</a> to get familiar with Flow's layout</li>
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("quick-start", "basic-features")}} className="text-pulse-400 hover:text-pulse-300">Basic Features</a> for code editing</li>
                      <li>Discover <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "ai-agents")}} className="text-pulse-400 hover:text-pulse-300">AI Agents</a> to boost your productivity</li>
                      <li>Customize <a href="#" onClick={(e) => {e.preventDefault(); setActive("quick-start", "keyboard-shortcuts")}} className="text-pulse-400 hover:text-pulse-300">Keyboard Shortcuts</a> to match your workflow</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === "quick-start" && activeTopic === "user-interface" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Layers className="w-4 h-4" />
                        <span className="font-medium">User Interface</span>
                      </div>
                      <p>
                        Flow's interface is designed to provide a seamless coding experience with integrated AI capabilities.
                        This guide will help you understand the main components of the Flow interface and how to navigate them efficiently.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="interface-overview">Interface Overview</h2>
                    <p>
                      Flow's interface consists of several key components that work together to provide a powerful coding environment:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li><strong>Activity Bar</strong> - The vertical bar on the far left with icons for different views</li>
                      <li><strong>Side Bar</strong> - The panel that opens from the activity bar, showing file explorer, search, etc.</li>
                      <li><strong>Editor Area</strong> - The main coding area where you edit files</li>
                      <li><strong>AI Sidebar</strong> - The panel for interacting with Flow's AI capabilities</li>
                      <li><strong>Status Bar</strong> - The information bar at the bottom of the window</li>
                      <li><strong>Panel</strong> - The area at the bottom for terminal, output, and problems</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="activity-bar">Activity Bar</h2>
                    <p>
                      The Activity Bar is located on the far left side of the window and contains icons for different views:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li><strong>Explorer</strong> - Browse and manage files and folders in your workspace</li>
                      <li><strong>Search</strong> - Search across all files in your workspace</li>
                      <li><strong>Source Control</strong> - Manage git repositories and version control</li>
                      <li><strong>Run and Debug</strong> - Run and debug your applications</li>
                      <li><strong>Extensions</strong> - Browse and manage extensions</li>
                      <li><strong>Flow AI</strong> - Access Flow's AI features and chat interface</li>
                    </ul>
                    <p className="mt-4">
                      Click on any icon to open its corresponding view in the Side Bar. You can also rearrange icons by dragging them.
                    </p>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="side-bar">Side Bar</h2>
                    <p>
                      The Side Bar displays different views based on what you select in the Activity Bar:
                    </p>
                    <ul className="list-disc pl-6 space-y-4 mt-4">
                      <li>
                        <strong>Explorer View</strong>
                        <p className="mt-1">Shows your project files and folders. Right-click for context actions like creating new files, renaming, or deleting.</p>
                      </li>
                      <li>
                        <strong>Search View</strong>
                        <p className="mt-1">Allows you to search across your entire workspace with support for regular expressions and filters.</p>
                      </li>
                      <li>
                        <strong>Source Control View</strong>
                        <p className="mt-1">Manage git operations like committing changes, creating branches, and viewing diffs.</p>
                      </li>
                      <li>
                        <strong>Flow AI View</strong>
                        <p className="mt-1">Interact with Flow's AI capabilities, including chat, code completion, and explanation features.</p>
                      </li>
                    </ul>
                    <p className="mt-4">
                      You can resize the Side Bar by dragging its edge, or hide it completely by clicking the active icon in the Activity Bar.
                    </p>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="editor-area">Editor Area</h2>
                    <p>
                      The Editor Area is where you write and edit code:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li><strong>Tabs</strong> - Each open file appears as a tab at the top of the editor area</li>
                      <li><strong>Editor Groups</strong> - You can split the editor to work with multiple files side by side</li>
                      <li><strong>Minimap</strong> - A condensed preview of your code on the right side (can be toggled)</li>
                      <li><strong>Breadcrumbs</strong> - Navigation path showing file location and code structure</li>
                      <li><strong>Inline AI Suggestions</strong> - Code completions that appear as you type</li>
                    </ul>
                    <p className="mt-4">
                      To split the editor, drag a tab to the side, top, or bottom edge of the editor area. You can also use the keyboard shortcut <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+\</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+\</kbd> on macOS).
                    </p>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        You can use Zen Mode by pressing <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+K Z</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+K Z</kbd> on macOS) to hide all UI elements except the editor for distraction-free coding.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="ai-sidebar">Flow AI Sidebar</h2>
                    <p>
                      The Flow AI Sidebar is a unique feature that provides access to AI-powered capabilities:
                    </p>
                    <ul className="list-disc pl-6 space-y-4 mt-4">
                      <li>
                        <strong>Chat Interface</strong>
                        <p className="mt-1">Interact with AI models through a chat-like interface. Ask questions about your code or request explanations.</p>
                      </li>
                      <li>
                        <strong>Model Selection</strong>
                        <p className="mt-1">Choose from different AI models based on your needs and preferences.</p>
                      </li>
                      <li>
                        <strong>Context Controls</strong>
                        <p className="mt-1">Control what code context is sent to the AI model for more accurate responses.</p>
                      </li>
                      <li>
                        <strong>History</strong>
                        <p className="mt-1">Access previous conversations with the AI assistant.</p>
                      </li>
                    </ul>
                    <p className="mt-4">
                      You can open the AI Sidebar by clicking the Flow icon in the Activity Bar or by using the keyboard shortcut <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+L</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+Shift+L</kbd> on macOS).
                    </p>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="command-palette">Command Palette</h2>
                    <p>
                      The Command Palette provides quick access to all of Flow's commands:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Open it with <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+P</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+Shift+P</kbd> on macOS)</li>
                      <li>Type to search for commands, files, or settings</li>
                      <li>Access AI features directly through commands like "Flow: New Chat" or "Flow: Explain Code"</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="status-bar">Status Bar</h2>
                    <p>
                      The Status Bar at the bottom of the window shows useful information:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li><strong>Left Side</strong> - Project information, git branch, and errors/warnings</li>
                      <li><strong>Right Side</strong> - File information, encoding, line endings, and language mode</li>
                      <li><strong>AI Status</strong> - Indicators for active AI features and model status</li>
                    </ul>
                    <p className="mt-4">
                      Many items in the status bar are clickable and provide quick access to related settings or actions.
                    </p>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="panel">Panel</h2>
                    <p>
                      The Panel at the bottom of the window contains several useful tools:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li><strong>Terminal</strong> - Integrated terminal for running commands</li>
                      <li><strong>Output</strong> - Shows output from various tasks and extensions</li>
                      <li><strong>Problems</strong> - Lists errors and warnings in your code</li>
                      <li><strong>Debug Console</strong> - Interactive console for debugging</li>
                    </ul>
                    <p className="mt-4">
                      Toggle the panel with <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+J</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+J</kbd> on macOS).
                    </p>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="customizing-ui">Customizing the Interface</h2>
                    <p>
                      Flow's interface is highly customizable:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Change themes via the Command Palette with "Preferences: Color Theme"</li>
                      <li>Customize the layout by dragging and dropping panels</li>
                      <li>Hide or show UI elements through the View menu</li>
                      <li>Adjust settings like font size, family, and ligatures in Settings</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-amber-400 mb-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="font-medium">Note</span>
                      </div>
                      <p className="text-gray-300">
                        Flow inherits many UI customization features from VS Code, so most VS Code themes and layout preferences will work in Flow as well.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">Next Steps</h2>
                    <p>
                      Now that you're familiar with Flow's interface, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("quick-start", "basic-features")}} className="text-pulse-400 hover:text-pulse-300">Basic Features</a> for code editing</li>
                      <li>Explore <a href="#" onClick={(e) => {e.preventDefault(); setActive("quick-start", "keyboard-shortcuts")}} className="text-pulse-400 hover:text-pulse-300">Keyboard Shortcuts</a> to work more efficiently</li>
                      <li>Discover <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "ai-agents")}} className="text-pulse-400 hover:text-pulse-300">AI Agents</a> to boost your productivity</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === "quick-start" && activeTopic === "basic-features" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Code className="w-4 h-4" />
                        <span className="font-medium">Basic Features</span>
                      </div>
                      <p>
                        Flow provides a comprehensive set of features for efficient code editing and file management.
                        This guide covers the essential features you'll use in your daily development workflow.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="file-management">File Management</h2>
                    <p>
                      Flow makes it easy to work with files and folders in your projects:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Creating Files and Folders</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use the Explorer view in the sidebar to navigate your project structure</li>
                      <li>Right-click in the Explorer to create new files or folders</li>
                      <li>Use the "New File" button at the top of the Explorer</li>
                      <li>Use keyboard shortcuts: <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+N</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+N</kbd> on macOS) for new file</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Opening Files</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Click on files in the Explorer to open them</li>
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+P</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+P</kbd> on macOS) to quickly open files by name</li>
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Tab</kbd> to switch between recently opened files</li>
                      <li>Drag files to rearrange tabs or create split views</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Saving Files</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+S</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+S</kbd> on macOS) to save the current file</li>
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+S</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+Shift+S</kbd> on macOS) for "Save As"</li>
                      <li>Enable Auto Save in File → Auto Save or set a delay in settings</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        Flow automatically saves your editor layout, open files, and cursor positions between sessions, so you can pick up right where you left off.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="code-editing">Code Editing</h2>
                    <p>
                      Flow provides powerful editing features to help you write code efficiently:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Selection and Navigation</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Double-click to select a word</li>
                      <li>Triple-click to select a line</li>
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Alt+Click</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Option+Click</kbd> on macOS) for column selection</li>
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+G</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+G</kbd> on macOS) to go to a specific line number</li>
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Home</kbd>/<kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+End</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+↑</kbd>/<kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+↓</kbd> on macOS) to navigate to the beginning/end of file</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Multiple Cursors</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Alt+Click</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Option+Click</kbd> on macOS) to place multiple cursors</li>
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+D</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+D</kbd> on macOS) to select next occurrence of current selection</li>
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+L</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+Shift+L</kbd> on macOS) to select all occurrences of current selection</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Code Formatting</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Shift+Alt+F</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Shift+Option+F</kbd> on macOS) to format the entire document</li>
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+K Ctrl+F</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+K ⌘+F</kbd> on macOS) to format the selected text</li>
                      <li>Enable "Format On Save" in settings for automatic formatting</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Code Folding</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Click the fold icons in the gutter to collapse/expand code blocks</li>
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+[</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+Option+[</kbd> on macOS) to fold the current region</li>
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+]</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+Option+]</kbd> on macOS) to unfold the current region</li>
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+K Ctrl+0</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+K ⌘+0</kbd> on macOS) to fold all regions</li>
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+K Ctrl+J</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+K ⌘+J</kbd> on macOS) to unfold all regions</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="search-replace">Search and Replace</h2>
                    <p>
                      Flow offers powerful search and replace capabilities:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">In-File Search</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+F</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+F</kbd> on macOS) to search within the current file</li>
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">F3</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+G</kbd> on macOS) to find the next occurrence</li>
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Shift+F3</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+Shift+G</kbd> on macOS) to find the previous occurrence</li>
                      <li>Enable regex, case-sensitive, or whole word search options</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">In-File Replace</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+H</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+Option+F</kbd> on macOS) to open the replace dialog</li>
                      <li>Enter search and replace terms</li>
                      <li>Use "Replace" to replace the current match or "Replace All" for all matches</li>
                      <li>Use regex capture groups in replacement patterns</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Global Search</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+F</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+Shift+F</kbd> on macOS) to search across all files</li>
                      <li>Filter results by file type, folder, or exclude patterns</li>
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+H</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+Shift+H</kbd> on macOS) for global replace</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="terminal">Integrated Terminal</h2>
                    <p>
                      Flow includes a powerful integrated terminal:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Open with <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+`</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Control+`</kbd> on macOS)</li>
                      <li>Run commands directly in your project directory</li>
                      <li>Create multiple terminal instances with the + button</li>
                      <li>Split terminals horizontally or vertically</li>
                      <li>Configure default shell in settings</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-amber-400 mb-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="font-medium">Note</span>
                      </div>
                      <p className="text-gray-300">
                        Flow's terminal supports AI assistance. You can ask the AI for help with terminal commands or explain command output directly within the terminal.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="extensions">Extensions</h2>
                    <p>
                      Flow supports a wide range of extensions to enhance your development experience:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Access the Extensions view from the Activity Bar</li>
                      <li>Search for extensions by name, category, or popularity</li>
                      <li>Install, disable, or uninstall extensions with a single click</li>
                      <li>Configure extension settings in the Settings panel</li>
                    </ul>
                    <p className="mt-4">
                      Flow is compatible with most VS Code extensions, giving you access to thousands of tools and enhancements for different languages and frameworks.
                    </p>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">Next Steps</h2>
                    <p>
                      Now that you're familiar with Flow's basic features, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("quick-start", "keyboard-shortcuts")}} className="text-pulse-400 hover:text-pulse-300">Keyboard Shortcuts</a> to work more efficiently</li>
                      <li>Explore <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "ai-agents")}} className="text-pulse-400 hover:text-pulse-300">AI Agents</a> to boost your productivity</li>
                      <li>Discover <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "code-completion")}} className="text-pulse-400 hover:text-pulse-300">Code Completion</a> features powered by AI</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === "quick-start" && activeTopic === "keyboard-shortcuts" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Keyboard Shortcuts</span>
                      </div>
                      <p>
                        Flow provides a wide range of keyboard shortcuts to help you work more efficiently.
                        This guide covers the most useful shortcuts for common tasks.
                      </p>
                    </div>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-amber-400 mb-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="font-medium">Note</span>
                      </div>
                      <p className="text-gray-300">
                        Keyboard shortcuts are shown in Windows/Linux format. For macOS, replace <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl</kbd> with <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘</kbd>, <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Alt</kbd> with <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Option</kbd>, and <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Shift</kbd> remains the same.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="ai-shortcuts">AI Features</h2>
                    <p className="mb-4">
                      Flow provides special shortcuts for accessing its AI capabilities:
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-dark-800/50 border-b border-gray-800/50">
                            <th className="px-4 py-2 text-left text-gray-300">Action</th>
                            <th className="px-4 py-2 text-left text-gray-300">Shortcut</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                          <tr>
                            <td className="px-4 py-2">Open Flow AI Sidebar</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+L</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Start a New Chat</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+L</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Explain Selected Code</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+L</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Quick Edit (Modify Selected Code)</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+K</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Accept AI Suggestion</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Tab</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Dismiss AI Suggestion</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Esc</kbd></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="general-shortcuts">General</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-dark-800/50 border-b border-gray-800/50">
                            <th className="px-4 py-2 text-left text-gray-300">Action</th>
                            <th className="px-4 py-2 text-left text-gray-300">Shortcut</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                          <tr>
                            <td className="px-4 py-2">Show Command Palette</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+P</kbd> or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">F1</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Quick Open File</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+P</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">New File</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+N</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Save File</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+S</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Save As</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+S</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Close File</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+W</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Open Settings</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+,</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Toggle Sidebar</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+B</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Toggle Panel (Terminal)</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+J</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Zen Mode</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+K Z</kbd></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="editing-shortcuts">Editing</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-dark-800/50 border-b border-gray-800/50">
                            <th className="px-4 py-2 text-left text-gray-300">Action</th>
                            <th className="px-4 py-2 text-left text-gray-300">Shortcut</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                          <tr>
                            <td className="px-4 py-2">Cut Line</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+X</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Copy Line</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+C</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Move Line Up</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Alt+↑</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Move Line Down</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Alt+↓</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Copy Line Up</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Shift+Alt+↑</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Copy Line Down</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Shift+Alt+↓</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Delete Line</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+K</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Insert Line Below</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Enter</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Insert Line Above</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+Enter</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Jump to Matching Bracket</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+\</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Indent Line</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Tab</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Outdent Line</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Shift+Tab</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Add Cursor Above</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Alt+↑</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Add Cursor Below</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Alt+↓</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Select Next Match</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+D</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Select All Matches</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+L</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Format Document</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Shift+Alt+F</kbd></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="search-shortcuts">Search</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-dark-800/50 border-b border-gray-800/50">
                            <th className="px-4 py-2 text-left text-gray-300">Action</th>
                            <th className="px-4 py-2 text-left text-gray-300">Shortcut</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                          <tr>
                            <td className="px-4 py-2">Find</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+F</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Replace</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+H</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Find Next</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">F3</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Find Previous</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Shift+F3</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Find in Files</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+F</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Replace in Files</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+H</kbd></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="navigation-shortcuts">Navigation</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-dark-800/50 border-b border-gray-800/50">
                            <th className="px-4 py-2 text-left text-gray-300">Action</th>
                            <th className="px-4 py-2 text-left text-gray-300">Shortcut</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                          <tr>
                            <td className="px-4 py-2">Go to Line</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+G</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Go to File</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+P</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Go to Symbol</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+O</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Go to Definition</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">F12</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Go to References</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Shift+F12</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Go Back</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Alt+←</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Go Forward</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Alt+→</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Switch Editor</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Tab</kbd></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="editor-management">Editor Management</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-dark-800/50 border-b border-gray-800/50">
                            <th className="px-4 py-2 text-left text-gray-300">Action</th>
                            <th className="px-4 py-2 text-left text-gray-300">Shortcut</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                          <tr>
                            <td className="px-4 py-2">Split Editor</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+\</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Focus First Editor Group</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+1</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Focus Second Editor Group</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+2</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Focus Third Editor Group</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+3</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Move Editor to First Group</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Alt+1</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Move Editor to Second Group</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Alt+2</kbd></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Move Editor to Third Group</td>
                            <td className="px-4 py-2"><kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Alt+3</kbd></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="customizing-shortcuts">Customizing Shortcuts</h2>
                    <p>
                      Flow allows you to customize keyboard shortcuts to match your preferences:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 mt-4">
                      <li>Open the Command Palette with <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+P</kbd></li>
                      <li>Type "Preferences: Keyboard Shortcuts" and select it</li>
                      <li>Search for the command you want to customize</li>
                      <li>Click on the pencil icon next to the command</li>
                      <li>Press the key combination you want to assign</li>
                      <li>Press Enter to save the new shortcut</li>
                    </ol>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        You can also directly edit your keyboard shortcuts in JSON format by clicking the "Open Keyboard Shortcuts (JSON)" button in the top-right corner of the Keyboard Shortcuts editor.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">Next Steps</h2>
                    <p>
                      Now that you're familiar with Flow's keyboard shortcuts, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Explore <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "ai-agents")}} className="text-pulse-400 hover:text-pulse-300">AI Agents</a> to boost your productivity</li>
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "code-completion")}} className="text-pulse-400 hover:text-pulse-300">Code Completion</a> features</li>
                      <li>Discover <a href="#" onClick={(e) => {e.preventDefault(); setActive("editor-features", "code-navigation")}} className="text-pulse-400 hover:text-pulse-300">Code Navigation</a> techniques</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === "ai-features" && activeTopic === "ai-agents" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Cpu className="w-4 h-4" />
                        <span className="font-medium">AI Agents</span>
                      </div>
                      <p>
                        Flow integrates powerful AI agents that can assist you with coding tasks, answer questions, and help you understand your codebase.
                        This guide explains how to use Flow's AI agents effectively.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="ai-sidebar">Flow AI Sidebar</h2>
                    <p>
                      The primary way to interact with Flow's AI agents is through the AI Sidebar:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Open the AI Sidebar by clicking the Flow icon in the Activity Bar</li>
                      <li>Alternatively, use the keyboard shortcut <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+L</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+Shift+L</kbd> on macOS)</li>
                      <li>Type your questions or instructions in the input box at the bottom of the sidebar</li>
                      <li>Press Enter to send your message to the AI agent</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="chat-modes">Chat Modes</h2>
                    <p>
                      Flow's AI sidebar supports different chat modes for different types of interactions:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Normal Mode</h3>
                    <p>
                      The default chat mode for general questions and discussions about your code:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Ask questions about programming concepts</li>
                      <li>Get explanations of code snippets</li>
                      <li>Request examples or best practices</li>
                      <li>Discuss architectural decisions</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Agent Mode</h3>
                    <p>
                      A more powerful mode that allows the AI to perform actions on your behalf:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Modify code based on your instructions</li>
                      <li>Search through your codebase</li>
                      <li>Create new files or refactor existing ones</li>
                      <li>Run terminal commands (with your approval)</li>
                    </ul>
                    <p className="mt-2">
                      Agent mode is particularly useful for complex tasks that require multiple steps or accessing different parts of your codebase.
                    </p>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-amber-400 mb-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="font-medium">Note</span>
                      </div>
                      <p className="text-gray-300">
                        In Agent mode, Flow will always ask for your confirmation before executing any commands that modify your files or system.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="context-awareness">Context Awareness</h2>
                    <p>
                      Flow's AI agents are context-aware, meaning they can understand and reference your code:
                    </p>
                    <ul className="list-disc pl-6 space-y-4 mt-4">
                      <li>
                        <strong>Current File Context</strong>
                        <p className="mt-1">The AI automatically has access to the currently open file, allowing it to provide relevant suggestions and answers.</p>
                      </li>
                      <li>
                        <strong>Selection Context</strong>
                        <p className="mt-1">When you select specific code before interacting with the AI, it will focus on that selection.</p>
                      </li>
                      <li>
                        <strong>Project Context</strong>
                        <p className="mt-1">In Agent mode, the AI can access other files in your project to provide more comprehensive assistance.</p>
                      </li>
                      <li>
                        <strong>Conversation History</strong>
                        <p className="mt-1">The AI remembers previous messages in the current conversation, allowing for follow-up questions and refinements.</p>
                      </li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="code-actions">Code Actions</h2>
                    <p>
                      Flow's AI agents can perform various actions on your code:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Explain Code</h3>
                    <p>
                      Get an explanation of selected code or the current file:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Select the code you want to understand</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+L</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+L</kbd> on macOS)</li>
                      <li>Alternatively, right-click and select "Explain with Flow"</li>
                      <li>The AI will provide a detailed explanation of the selected code</li>
                    </ol>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Edit Code</h3>
                    <p>
                      Have the AI modify your code based on instructions:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Select the code you want to modify</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+K</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+K</kbd> on macOS)</li>
                      <li>Enter your instructions for how the code should be changed</li>
                      <li>Review the AI's proposed changes</li>
                      <li>Click "Apply" to accept the changes or "Discard" to reject them</li>
                    </ol>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Generate Code</h3>
                    <p>
                      Ask the AI to generate new code from scratch:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Open the AI Sidebar</li>
                      <li>Describe the code you want to generate (e.g., "Create a React component for a user profile")</li>
                      <li>The AI will generate the code and provide an explanation</li>
                      <li>You can copy the code or ask the AI to create a new file with it</li>
                    </ol>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="fast-apply">Fast Apply vs. Slow Apply</h2>
                    <p>
                      Flow offers two modes for applying code changes:
                    </p>
                    <ul className="list-disc pl-6 space-y-4 mt-4">
                      <li>
                        <strong>Fast Apply</strong>
                        <p className="mt-1">Uses search and replace to quickly apply changes, even in large files. This is the default mode and works well for most changes.</p>
                      </li>
                      <li>
                        <strong>Slow Apply</strong>
                        <p className="mt-1">Rewrites the entire file when making changes. This is more reliable for complex changes but can be slower for large files.</p>
                      </li>
                    </ul>
                    <p className="mt-2">
                      You can toggle between these modes in the Flow settings under "AI" → "Enable Fast Apply".
                    </p>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="effective-prompting">Effective Prompting</h2>
                    <p>
                      To get the best results from Flow's AI agents, follow these prompting best practices:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li><strong>Be specific</strong> - Clearly state what you want the AI to do</li>
                      <li><strong>Provide context</strong> - Include relevant information about your project or requirements</li>
                      <li><strong>Use step-by-step instructions</strong> - Break down complex tasks into smaller steps</li>
                      <li><strong>Ask for iterations</strong> - If the first response isn't perfect, ask for refinements</li>
                      <li><strong>Specify constraints</strong> - Mention any limitations or requirements the solution must meet</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        When asking the AI to generate or modify code, specify the programming language, framework, and any specific patterns or conventions you want it to follow.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="model-selection">Model Selection</h2>
                    <p>
                      Flow allows you to choose from different AI models for different tasks:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>More powerful models provide better code understanding and generation but may be slower</li>
                      <li>Smaller models are faster but may have more limitations</li>
                      <li>You can configure different models for different features (chat, code completion, etc.)</li>
                    </ul>
                    <p className="mt-2">
                      To change the model:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Click on the model name in the AI sidebar</li>
                      <li>Select a different model from the dropdown</li>
                      <li>Your choice will be remembered for future sessions</li>
                    </ol>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="privacy">Privacy Considerations</h2>
                    <p>
                      Flow is designed with privacy in mind:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Your code and conversations are sent directly to the AI provider without being stored by Flow</li>
                      <li>You can use local models for complete privacy (see <a href="#" onClick={(e) => {e.preventDefault(); setActive("security", "model-hosting")}} className="text-pulse-400 hover:text-pulse-300">Model Hosting</a>)</li>
                      <li>Flow allows you to control exactly what context is sent to the AI</li>
                      <li>You can exclude sensitive files or directories from AI context</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">Next Steps</h2>
                    <p>
                      Now that you understand Flow's AI agents, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "code-completion")}} className="text-pulse-400 hover:text-pulse-300">Code Completion</a> features</li>
                      <li>Explore <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "code-explanation")}} className="text-pulse-400 hover:text-pulse-300">Code Explanation</a> capabilities</li>
                      <li>Configure <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "model-configuration")}} className="text-pulse-400 hover:text-pulse-300">Model Settings</a> for your specific needs</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === "ai-features" && activeTopic === "code-completion" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Cpu className="w-4 h-4" />
                        <span className="font-medium">Code Completion</span>
                      </div>
                      <p>
                        Flow provides powerful AI-powered code completion capabilities that help you write code faster and with fewer errors.
                        This guide explains how to use and configure Flow's code completion features.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="inline-suggestions">Inline Suggestions</h2>
                    <p>
                      Flow offers inline code suggestions as you type:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Suggestions appear in a lighter color as you type</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Tab</kbd> to accept the entire suggestion</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Right Arrow</kbd> to accept one word at a time</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Esc</kbd> to dismiss the suggestion</li>
                      <li>Continue typing to ignore the suggestion</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        Flow's AI can complete entire functions, classes, or blocks of code. If you start typing a function signature or comment describing what you want to do, the AI will often suggest the complete implementation.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="context-aware">Context-Aware Completion</h2>
                    <p>
                      Flow's code completion is context-aware, meaning it understands your codebase:
                    </p>
                    <ul className="list-disc pl-6 space-y-4 mt-4">
                      <li>
                        <strong>File Context</strong>
                        <p className="mt-1">The AI analyzes the current file to provide relevant suggestions based on variables, functions, and imports you've already defined.</p>
                      </li>
                      <li>
                        <strong>Project Context</strong>
                        <p className="mt-1">The AI can reference other files in your project to suggest appropriate imports, function calls, and API usage.</p>
                      </li>
                      <li>
                        <strong>Type Awareness</strong>
                        <p className="mt-1">In typed languages like TypeScript, Flow understands types and suggests appropriate methods and properties.</p>
                      </li>
                      <li>
                        <strong>Comment-to-Code</strong>
                        <p className="mt-1">Write a comment describing what you want to do, and Flow can suggest the implementation.</p>
                      </li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="enabling-completion">Enabling and Configuring</h2>
                    <p>
                      Flow's code completion can be enabled and configured in settings:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Open Settings (<kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+,</kbd> or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+,</kbd> on macOS)</li>
                      <li>Navigate to "AI" → "Code Completion"</li>
                      <li>Enable or disable "Show Inline Suggestions"</li>
                      <li>Configure the model used for code completion</li>
                      <li>Adjust other settings like delay and trigger characters</li>
                    </ol>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Language-Specific Settings</h3>
                    <p>
                      You can configure different settings for different programming languages:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>In Settings, click on "Edit in settings.json"</li>
                      <li>Add language-specific settings under <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">[language]</code> sections</li>
                      <li>For example, to enable more aggressive completion for JavaScript:</li>
                    </ol>
                    <div className="bg-dark-900/50 rounded-md p-3 my-4 relative">
                      <button 
                        onClick={() => copyToClipboard('{\n  "[javascript]": {\n    "flow.autocomplete.enabled": true,\n    "flow.autocomplete.threshold": "low"\n  }\n}')}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                        aria-label="Copy code"
                      >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                      <code className="text-sm text-gray-300">
                        {`{\n  "[javascript]": {\n    "flow.autocomplete.enabled": true,\n    "flow.autocomplete.threshold": "low"\n  }\n}`}
                      </code>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="multi-line">Multi-Line Completion</h2>
                    <p>
                      Flow can suggest multiple lines of code at once:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Start typing a function signature, loop, or conditional statement</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Enter</kbd> at the end of the line</li>
                      <li>Flow will suggest the implementation of the function or block</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Tab</kbd> to accept the entire block</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="fill-in-middle">Fill-in-Middle Completion</h2>
                    <p>
                      Flow supports "fill-in-middle" (FIM) completion, which allows the AI to complete code between two points:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Write the beginning of your code (e.g., function signature)</li>
                      <li>Write the end of your code (e.g., return statement)</li>
                      <li>Place your cursor between these two parts</li>
                      <li>Flow will suggest code that connects the beginning and end</li>
                    </ol>
                    <p className="mt-2">
                      This is particularly useful for implementing functions when you know the input and output but need help with the implementation.
                    </p>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="models">AI Models for Completion</h2>
                    <p>
                      Flow supports different AI models for code completion:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li><strong>Cloud Models</strong> - Models like GPT-4, Claude, and others provide powerful completion capabilities</li>
                      <li><strong>Local Models</strong> - Models running on your machine offer privacy and work offline</li>
                      <li><strong>Specialized Models</strong> - Some models are specifically trained for code completion and perform better for this task</li>
                    </ul>
                    <p className="mt-2">
                      You can select which model to use for code completion in the Flow settings under "AI" → "Code Completion" → "Model".
                    </p>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="performance">Performance Considerations</h2>
                    <p>
                      To optimize code completion performance:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li><strong>Use local models</strong> for faster response times</li>
                      <li><strong>Adjust the delay</strong> setting to control how quickly suggestions appear</li>
                      <li><strong>Consider file size</strong> - very large files may slow down completion</li>
                      <li><strong>Limit project context</strong> in settings if you experience slowdowns</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-amber-400 mb-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="font-medium">Note</span>
                      </div>
                      <p className="text-gray-300">
                        If you're working with a large codebase, you may want to configure which files and directories are included in the AI's context to improve performance.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="customization">Customizing Completion Behavior</h2>
                    <p>
                      Flow allows you to customize code completion behavior:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li><strong>Trigger Characters</strong> - Configure which characters trigger completion suggestions</li>
                      <li><strong>Acceptance Criteria</strong> - Adjust how aggressively Flow suggests completions</li>
                      <li><strong>Formatting</strong> - Control whether completions follow your code style settings</li>
                      <li><strong>Context Size</strong> - Configure how much of your codebase is used for context</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">Next Steps</h2>
                    <p>
                      Now that you understand Flow's code completion features, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Explore <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "code-explanation")}} className="text-pulse-400 hover:text-pulse-300">Code Explanation</a> capabilities</li>
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "model-configuration")}} className="text-pulse-400 hover:text-pulse-300">Model Configuration</a> for optimal performance</li>
                      <li>Discover <a href="#" onClick={(e) => {e.preventDefault(); setActive("editor-features", "customization")}} className="text-pulse-400 hover:text-pulse-300">Customization</a> options for your workflow</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === "ai-features" && activeTopic === "code-explanation" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Cpu className="w-4 h-4" />
                        <span className="font-medium">Code Explanation</span>
                      </div>
                      <p>
                        Flow's AI can help you understand code by providing clear explanations of how it works.
                        This guide covers how to use Flow's code explanation features to better understand your codebase.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="explain-selection">Explaining Selected Code</h2>
                    <p>
                      The quickest way to get an explanation of code is to use the Explain command:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Select the code you want to understand</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+L</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+L</kbd> on macOS)</li>
                      <li>Alternatively, right-click and select "Explain with Flow"</li>
                      <li>The AI will provide an explanation in the sidebar</li>
                    </ol>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        You can select specific parts of complex functions to get more focused explanations. This is especially useful for understanding particular algorithms or logic flows.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="explanation-types">Types of Explanations</h2>
                    <p>
                      Flow can provide different types of explanations based on your needs:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Basic Explanation</h3>
                    <p>
                      A straightforward explanation of what the code does:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Select code and press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+L</kbd></li>
                      <li>The AI will explain the code's purpose and functionality</li>
                      <li>This is useful for quickly understanding unfamiliar code</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Detailed Explanation</h3>
                    <p>
                      For more in-depth understanding:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Open the AI sidebar and type "Explain this code in detail: [paste code]"</li>
                      <li>Ask for specific aspects like "Explain the time complexity" or "Explain the design pattern used"</li>
                      <li>The AI will provide a more comprehensive explanation</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Step-by-Step Explanation</h3>
                    <p>
                      For complex algorithms or functions:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Open the AI sidebar and ask "Explain this code step by step: [paste code]"</li>
                      <li>The AI will break down the execution flow line by line</li>
                      <li>This is particularly useful for understanding complex control flows or algorithms</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="context-aware-explanation">Context-Aware Explanations</h2>
                    <p>
                      Flow's explanations take into account the broader context of your code:
                    </p>
                    <ul className="list-disc pl-6 space-y-4 mt-4">
                      <li>
                        <strong>File Context</strong>
                        <p className="mt-1">The AI considers other parts of the current file when explaining code, including imported modules, defined variables, and related functions.</p>
                      </li>
                      <li>
                        <strong>Project Context</strong>
                        <p className="mt-1">In Agent mode, the AI can reference other files in your project to provide more accurate explanations of how components interact.</p>
                      </li>
                      <li>
                        <strong>Language Context</strong>
                        <p className="mt-1">The AI understands language-specific features and idioms, providing explanations that are relevant to the programming language you're using.</p>
                      </li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="explaining-functions">Explaining Functions and Classes</h2>
                    <p>
                      To get explanations of specific code structures:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Function Explanation</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Click anywhere inside a function</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+L</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+L</kbd> on macOS)</li>
                      <li>Flow will automatically select and explain the entire function</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Class Explanation</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Click anywhere inside a class definition</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+L</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+L</kbd> on macOS)</li>
                      <li>Flow will explain the class's purpose, properties, and methods</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Method Explanation</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Click inside a specific method within a class</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+L</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+L</kbd> on macOS)</li>
                      <li>Flow will explain that method in the context of its class</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="explaining-errors">Explaining Errors and Warnings</h2>
                    <p>
                      Flow can help you understand and fix errors in your code:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Select the code containing an error or warning</li>
                      <li>Open the AI sidebar and ask "What's wrong with this code?" or "How do I fix this error?"</li>
                      <li>The AI will explain the error and suggest possible fixes</li>
                    </ol>
                    <p className="mt-2">
                      You can also hover over an error squiggle in your code and click "Explain with Flow" in the hover popup.
                    </p>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="asking-questions">Asking Specific Questions</h2>
                    <p>
                      You can ask specific questions about your code in the AI sidebar:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>"What does this regex pattern match?"</li>
                      <li>"Why is this function using a recursive approach?"</li>
                      <li>"How does this sorting algorithm work?"</li>
                      <li>"What's the difference between these two implementations?"</li>
                      <li>"Is there a more efficient way to write this?"</li>
                    </ul>
                    <p className="mt-2">
                      For the best results, select the relevant code first, then ask your question in the AI sidebar.
                    </p>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="explaining-diffs">Explaining Code Changes</h2>
                    <p>
                      Flow can explain the differences between code versions:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Open a diff view in Flow (e.g., by viewing git changes)</li>
                      <li>Select the changed code</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+L</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+L</kbd> on macOS)</li>
                      <li>Flow will explain what changed and why it matters</li>
                    </ol>
                    <p className="mt-2">
                      This is particularly useful for code reviews or understanding changes made by other developers.
                    </p>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-amber-400 mb-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="font-medium">Note</span>
                      </div>
                      <p className="text-gray-300">
                        When explaining code changes, Flow considers both the old and new versions to provide context about what was modified and the likely reasoning behind the changes.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="model-selection">Choosing the Right Model</h2>
                    <p>
                      Different AI models have different strengths for code explanation:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li><strong>Larger models</strong> (like GPT-4, Claude Opus) provide more detailed and accurate explanations</li>
                      <li><strong>Specialized coding models</strong> (like Codestral) are optimized for understanding code patterns</li>
                      <li><strong>Local models</strong> can provide faster explanations for simpler code</li>
                    </ul>
                    <p className="mt-2">
                      You can select which model to use for code explanations in the Flow settings under "AI" → "Model Configuration".
                    </p>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">Next Steps</h2>
                    <p>
                      Now that you understand Flow's code explanation features, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Configure <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "model-configuration")}} className="text-pulse-400 hover:text-pulse-300">Model Settings</a> for optimal explanations</li>
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("editor-features", "code-navigation")}} className="text-pulse-400 hover:text-pulse-300">Code Navigation</a> to explore your codebase</li>
                      <li>Explore <a href="#" onClick={(e) => {e.preventDefault(); setActive("security", "data-privacy")}} className="text-pulse-400 hover:text-pulse-300">Data Privacy</a> settings for sensitive code</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === "ai-features" && activeTopic === "model-configuration" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Cpu className="w-4 h-4" />
                        <span className="font-medium">Model Configuration</span>
                      </div>
                      <p>
                        Flow supports a wide range of AI models from different providers, both cloud-based and local.
                        This guide explains how to configure and optimize AI models for your specific needs.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="supported-providers">Supported AI Providers</h2>
                    <p>
                      Flow integrates with multiple AI providers:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Cloud Providers</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>OpenAI</strong> - GPT-4.1, GPT-4.1-mini, GPT-4.1-nano, and more</li>
                      <li><strong>Anthropic</strong> - Claude Opus 4.0, Claude Sonnet 4.0, and other Claude models</li>
                      <li><strong>Google</strong> - Gemini models (2.5 Pro, 2.0 Flash, etc.)</li>
                      <li><strong>Mistral</strong> - Mistral Large, Medium, Codestral, and other models</li>
                      <li><strong>xAI</strong> - Grok models</li>
                      <li><strong>DeepSeek</strong> - DeepSeek Chat, DeepSeek Reasoner</li>
                      <li><strong>Groq</strong> - Fast inference for various models</li>
                      <li><strong>OpenRouter</strong> - Access to multiple models through a single API</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Local Providers</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Ollama</strong> - Run open-source models locally</li>
                      <li><strong>LM Studio</strong> - Local model interface with many options</li>
                      <li><strong>vLLM</strong> - High-performance inference server</li>
                      <li><strong>Custom OpenAI-compatible endpoints</strong> - Connect to any OpenAI-compatible API</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="accessing-settings">Accessing Model Settings</h2>
                    <p>
                      You can configure AI models in Flow through several methods:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>
                        <strong>Settings Panel</strong>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                          <li>Open Settings (<kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+,</kbd> or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+,</kbd> on macOS)</li>
                          <li>Navigate to the "AI" section</li>
                        </ul>
                      </li>
                      <li>
                        <strong>AI Sidebar</strong>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                          <li>Open the AI sidebar</li>
                          <li>Click the settings icon in the top-right corner</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Command Palette</strong>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                          <li>Open the Command Palette (<kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+P</kbd> or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+Shift+P</kbd> on macOS)</li>
                          <li>Type "Flow: Open AI Settings"</li>
                        </ul>
                      </li>
                    </ol>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="cloud-setup">Setting Up Cloud Providers</h2>
                    <p>
                      To use cloud AI providers, you'll need to configure your API keys:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Adding API Keys</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Open Flow Settings</li>
                      <li>Navigate to "AI" → "Providers"</li>
                      <li>Select the provider you want to configure (e.g., OpenAI, Anthropic)</li>
                      <li>Enter your API key in the appropriate field</li>
                      <li>Click "Save" to store your API key securely</li>
                    </ol>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-amber-400 mb-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="font-medium">Security Note</span>
                      </div>
                      <p className="text-gray-300">
                        API keys are stored securely in your system's credential storage. They are never sent to Flow's servers or shared with any third party except the AI provider you're configuring.
                      </p>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Selecting Models</h3>
                    <p>
                      After configuring a provider, you can select which models to use:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>In the AI settings, navigate to the "Models" section</li>
                      <li>For each feature (Chat, Code Completion, etc.), select your preferred model</li>
                      <li>You can set different models for different features based on your needs</li>
                    </ol>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="local-setup">Setting Up Local Models</h2>
                    <p>
                      Flow supports several options for running AI models locally:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Ollama</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Install Ollama from <a href="https://ollama.ai" className="text-pulse-400 hover:text-pulse-300">ollama.ai</a></li>
                      <li>Start the Ollama service on your machine</li>
                      <li>Pull your desired models using the Ollama CLI (e.g., <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">ollama pull codellama</code>)</li>
                      <li>In Flow Settings, navigate to "AI" → "Providers" → "Ollama"</li>
                      <li>Verify the endpoint (default is <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">http://127.0.0.1:11434</code>)</li>
                      <li>Click "Refresh Models" to detect available models</li>
                    </ol>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">LM Studio</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Install LM Studio from <a href="https://lmstudio.ai" className="text-pulse-400 hover:text-pulse-300">lmstudio.ai</a></li>
                      <li>Download and set up your preferred models in LM Studio</li>
                      <li>Start the local server in LM Studio</li>
                      <li>In Flow Settings, navigate to "AI" → "Providers" → "LM Studio"</li>
                      <li>Verify the endpoint (default is <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">http://localhost:1234</code>)</li>
                      <li>Click "Refresh Models" to detect available models</li>
                    </ol>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">vLLM</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Install vLLM according to the <a href="https://docs.vllm.ai/en/latest/getting_started/installation.html" className="text-pulse-400 hover:text-pulse-300">official documentation</a></li>
                      <li>Start a vLLM server with your chosen model</li>
                      <li>In Flow Settings, navigate to "AI" → "Providers" → "vLLM"</li>
                      <li>Configure the endpoint (default is <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">http://localhost:8000</code>)</li>
                      <li>Click "Refresh Models" to detect available models</li>
                    </ol>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Custom OpenAI-Compatible Endpoints</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Set up any OpenAI-compatible API server</li>
                      <li>In Flow Settings, navigate to "AI" → "Providers" → "OpenAI Compatible"</li>
                      <li>Enter the endpoint URL</li>
                      <li>Provide an API key if required</li>
                      <li>Configure any additional headers as needed</li>
                    </ol>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="feature-specific">Feature-Specific Model Configuration</h2>
                    <p>
                      Flow allows you to configure different models for different features:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Chat</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>For general chat and code discussions, larger models like GPT-4 or Claude Opus provide the best results</li>
                      <li>For faster responses with slightly lower quality, models like GPT-4-mini or Claude Sonnet work well</li>
                      <li>Local models can be used for basic queries and when privacy is a priority</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Code Completion</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Specialized coding models like Codestral or CodeLlama often perform best for completion</li>
                      <li>Smaller, faster models are preferable for real-time suggestions</li>
                      <li>Local models can provide lower latency for simple completions</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Code Explanation</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Larger models with strong reasoning capabilities provide the most accurate explanations</li>
                      <li>Models with specialized coding knowledge can better explain complex patterns</li>
                      <li>Consider the language/framework when choosing a model (some are better at specific languages)</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="advanced-settings">Advanced Model Settings</h2>
                    <p>
                      Flow provides advanced settings to fine-tune AI behavior:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Temperature</h3>
                    <p>
                      Controls the randomness of model outputs:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Lower values</strong> (0.0-0.3) - More deterministic, focused responses</li>
                      <li><strong>Medium values</strong> (0.4-0.7) - Balanced creativity and precision</li>
                      <li><strong>Higher values</strong> (0.8-1.0) - More creative, varied responses</li>
                    </ul>
                    <p className="mt-2">
                      For code-related tasks, lower temperatures typically yield better results.
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Context Window</h3>
                    <p>
                      Configure how much context is sent to the model:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Adjust the maximum number of tokens for context</li>
                      <li>Configure which files and directories are included in context</li>
                      <li>Set priorities for different types of context (current file, open files, project files)</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">System Instructions</h3>
                    <p>
                      Customize the AI's behavior with system instructions:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Add custom instructions for specific coding styles or practices</li>
                      <li>Configure language-specific preferences</li>
                      <li>Set project-specific guidelines for the AI to follow</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        For team projects, you can share model configurations by adding them to your project's settings files, ensuring consistent AI behavior across the team.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="performance-optimization">Performance Optimization</h2>
                    <p>
                      Tips for optimizing AI model performance in Flow:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li><strong>Use local models</strong> for faster response times when working offline or with simple tasks</li>
                      <li><strong>Limit context window size</strong> to reduce token usage and improve response times</li>
                      <li><strong>Configure model-specific settings</strong> based on your hardware capabilities</li>
                      <li><strong>Use specialized models</strong> for specific tasks rather than general-purpose models</li>
                      <li><strong>Enable model caching</strong> for frequently used queries</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">Next Steps</h2>
                    <p>
                      Now that you understand Flow's model configuration options, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Explore <a href="#" onClick={(e) => {e.preventDefault(); setActive("security", "data-privacy")}} className="text-pulse-400 hover:text-pulse-300">Data Privacy</a> settings for sensitive code</li>
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("security", "model-hosting")}} className="text-pulse-400 hover:text-pulse-300">Model Hosting</a> options for enterprise environments</li>
                      <li>Configure <a href="#" onClick={(e) => {e.preventDefault(); setActive("configuration", "advanced-settings")}} className="text-pulse-400 hover:text-pulse-300">Advanced Settings</a> for your specific workflow</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === "editor-features" && activeTopic === "code-navigation" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Code className="w-4 h-4" />
                        <span className="font-medium">Code Navigation</span>
                      </div>
                      <p>
                        Flow provides powerful tools for navigating your codebase efficiently.
                        This guide covers the features that help you move through your code quickly and precisely.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="file-navigation">File Navigation</h2>
                    <p>
                      Navigate between files quickly with these features:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Quick Open</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+P</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+P</kbd> on macOS) to open the Quick Open dialog</li>
                      <li>Start typing the name of a file to filter the list</li>
                      <li>Use arrow keys to navigate the results and Enter to open the selected file</li>
                      <li>Add <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">:</code> followed by a line number to jump to a specific line (e.g., <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">app.js:42</code>)</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Recent Files</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Tab</kbd> to open the recently used files list</li>
                      <li>Continue holding <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl</kbd> and press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Tab</kbd> to cycle through the list</li>
                      <li>Release to open the selected file</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Explorer View</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Open the Explorer view by clicking the Explorer icon in the Activity Bar</li>
                      <li>Use arrow keys to navigate the file tree</li>
                      <li>Press Enter to open a file</li>
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+↑</kbd> and <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+↓</kbd> to navigate without expanding folders</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        You can type <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">@</code> in the Quick Open dialog to search for symbols within the current file, or <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">#</code> to search for symbols across your entire workspace.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="symbol-navigation">Symbol Navigation</h2>
                    <p>
                      Jump directly to specific symbols in your code:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Go to Symbol in File</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+O</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+Shift+O</kbd> on macOS)</li>
                      <li>Type to filter symbols (functions, classes, methods, etc.) in the current file</li>
                      <li>Press Enter to jump to the selected symbol</li>
                      <li>Use <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">:</code> to group symbols by category</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Go to Symbol in Workspace</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+T</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+T</kbd> on macOS)</li>
                      <li>Type to search for symbols across all files in your workspace</li>
                      <li>Press Enter to jump to the selected symbol</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Breadcrumbs</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Flow displays breadcrumbs at the top of the editor showing the current file's path and symbol hierarchy</li>
                      <li>Click on any part of the breadcrumbs to navigate to that location</li>
                      <li>Click the dropdown arrow to see a list of siblings at that level</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="code-jumping">Code Jumping</h2>
                    <p>
                      Navigate within and between related code:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Go to Definition</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Place your cursor on a symbol (variable, function, class, etc.)</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">F12</kbd> to jump to its definition</li>
                      <li>Alternatively, hold <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘</kbd> on macOS) and click on the symbol</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Go to References</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Place your cursor on a symbol</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Shift+F12</kbd> to find all references to that symbol</li>
                      <li>The references will appear in the References panel</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Peek Definition</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Place your cursor on a symbol</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Alt+F12</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Option+F12</kbd> on macOS)</li>
                      <li>The definition will appear in an inline editor without leaving the current file</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Navigation History</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Alt+←</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Control+Minus</kbd> on macOS) to navigate back to previous locations</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Alt+→</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Control+Shift+Minus</kbd> on macOS) to navigate forward</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="outline-view">Outline View</h2>
                    <p>
                      Get a structural overview of your current file:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Click the Outline tab in the Explorer view</li>
                      <li>See a hierarchical view of symbols in the current file</li>
                      <li>Click any symbol to jump to its location</li>
                      <li>Use the filter box to find specific symbols quickly</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="ai-assisted-navigation">AI-Assisted Navigation</h2>
                    <p>
                      Flow's AI capabilities enhance code navigation:
                    </p>
                    <ul className="list-disc pl-6 space-y-4 mt-4">
                      <li>
                        <strong>Natural Language Search</strong>
                        <p className="mt-1">Open the AI sidebar and ask questions like "Where is the user authentication implemented?" or "Find the code that handles file uploads."</p>
                      </li>
                      <li>
                        <strong>Symbol Understanding</strong>
                        <p className="mt-1">The AI can help you understand complex code structures and relationships between different parts of your codebase.</p>
                      </li>
                      <li>
                        <strong>Context-Aware Navigation</strong>
                        <p className="mt-1">Ask the AI to help you find related code across multiple files based on functionality rather than just symbol names.</p>
                      </li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-amber-400 mb-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="font-medium">Note</span>
                      </div>
                      <p className="text-gray-300">
                        AI-assisted navigation works best when you've configured Flow with access to your entire codebase. Make sure your workspace is properly set up for the best results.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="customizing-navigation">Customizing Navigation</h2>
                    <p>
                      Tailor Flow's navigation features to your workflow:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Configure keyboard shortcuts for navigation commands in the Keyboard Shortcuts editor</li>
                      <li>Adjust the Explorer view layout in Settings</li>
                      <li>Configure symbol search behavior for your preferred languages</li>
                      <li>Set up workspace-specific navigation settings in <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">.vscode/settings.json</code></li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">Next Steps</h2>
                    <p>
                      Now that you understand Flow's code navigation features, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("editor-features", "version-control")}} className="text-pulse-400 hover:text-pulse-300">Version Control</a> integration</li>
                      <li>Explore <a href="#" onClick={(e) => {e.preventDefault(); setActive("editor-features", "extensions")}} className="text-pulse-400 hover:text-pulse-300">Extensions</a> that enhance navigation</li>
                      <li>Discover <a href="#" onClick={(e) => {e.preventDefault(); setActive("editor-features", "customization")}} className="text-pulse-400 hover:text-pulse-300">Customization</a> options for your workflow</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === "editor-features" && activeTopic === "version-control" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Code className="w-4 h-4" />
                        <span className="font-medium">Version Control</span>
                      </div>
                      <p>
                        Flow includes powerful built-in version control capabilities, with first-class support for Git.
                        This guide covers how to use Flow's version control features to manage your code effectively.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="git-integration">Git Integration</h2>
                    <p>
                      Flow automatically detects Git repositories and provides integrated tools for common Git operations:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Source Control View</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Click the Source Control icon in the Activity Bar (or press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+G</kbd>)</li>
                      <li>View all changes in your working directory</li>
                      <li>Files are grouped by their status: Modified, Added, Deleted, etc.</li>
                      <li>Click on a file to see a diff view comparing changes</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Status Bar Indicators</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>The current branch name is displayed in the status bar</li>
                      <li>Indicators show the number of incoming and outgoing changes</li>
                      <li>Click on the branch name to switch branches or perform other Git operations</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        Flow's Source Control view works with multiple repositories in a single workspace. Each repository will appear as a separate section in the Source Control view.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="basic-operations">Basic Git Operations</h2>
                    <p>
                      Perform common Git operations directly from Flow:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Staging Changes</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>In the Source Control view, click the + icon next to a file to stage changes</li>
                      <li>Click the + icon at the top of the Changes section to stage all changes</li>
                      <li>Use the - icon to unstage changes</li>
                      <li>Stage specific parts of a file by opening the diff view and using the + icon next to specific hunks</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Committing Changes</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Enter a commit message in the text box at the top of the Source Control view</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Enter</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+Enter</kbd> on macOS) to commit staged changes</li>
                      <li>Use the checkmark icon to commit all staged changes</li>
                      <li>Enable "Smart Commit" in settings to automatically stage all changes when committing</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Pushing and Pulling</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Click the "..." menu in the Source Control view</li>
                      <li>Select "Pull" to fetch and merge changes from the remote repository</li>
                      <li>Select "Push" to send your commits to the remote repository</li>
                      <li>Use the sync icon in the status bar to both pull and push in one operation</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Branching</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Click on the branch name in the status bar</li>
                      <li>Select "Create new branch..." to create a new branch</li>
                      <li>Select an existing branch name to switch to that branch</li>
                      <li>Use the "..." menu in the Source Control view for additional branch operations</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="viewing-history">Viewing History</h2>
                    <p>
                      Explore your project's history:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Git Log</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Click the "..." menu in the Source Control view</li>
                      <li>Select "View History" to see the commit history of the current branch</li>
                      <li>Click on a commit to see detailed information and changes</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">File History</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Right-click a file in the Explorer view</li>
                      <li>Select "View File History" to see all commits that modified the file</li>
                      <li>Click on a commit to see how the file changed in that commit</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Line History</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Select one or more lines in a file</li>
                      <li>Right-click and select "View Line History"</li>
                      <li>See all commits that modified the selected lines</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="resolving-conflicts">Resolving Conflicts</h2>
                    <p>
                      Flow provides tools to help resolve merge conflicts:
                    </p>
                    <ul className="list-disc pl-6 space-y-4 mt-4">
                      <li>
                        <strong>Conflict Editor</strong>
                        <p className="mt-1">When a conflict occurs, Flow opens a special editor with "Accept Current Change", "Accept Incoming Change", "Accept Both Changes", and "Compare Changes" options.</p>
                      </li>
                      <li>
                        <strong>Inline Actions</strong>
                        <p className="mt-1">Click on the colored conflict markers in the editor gutter to see inline actions for resolving conflicts.</p>
                      </li>
                      <li>
                        <strong>Three-way Merge</strong>
                        <p className="mt-1">Flow supports three-way merge views showing the current version, incoming version, and base version side by side.</p>
                      </li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="ai-assisted-version-control">AI-Assisted Version Control</h2>
                    <p>
                      Flow's AI capabilities enhance version control workflows:
                    </p>
                    <ul className="list-disc pl-6 space-y-4 mt-4">
                      <li>
                        <strong>Smart Commit Messages</strong>
                        <p className="mt-1">Ask the AI to generate meaningful commit messages based on your changes by typing "Generate commit message" in the AI sidebar.</p>
                      </li>
                      <li>
                        <strong>Conflict Resolution</strong>
                        <p className="mt-1">Get AI assistance with resolving merge conflicts by selecting the conflict and asking the AI to help understand and resolve it.</p>
                      </li>
                      <li>
                        <strong>Change Explanation</strong>
                        <p className="mt-1">Select changes in the diff view and ask the AI to explain what the changes do and why they might have been made.</p>
                      </li>
                      <li>
                        <strong>Code Review</strong>
                        <p className="mt-1">Ask the AI to review your changes before committing, providing suggestions for improvements or identifying potential issues.</p>
                      </li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-amber-400 mb-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="font-medium">Note</span>
                      </div>
                      <p className="text-gray-300">
                        When using AI for version control tasks, ensure you review the AI's suggestions carefully, especially for commit messages and conflict resolutions, to maintain the integrity of your repository.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="advanced-features">Advanced Features</h2>
                    <p>
                      Flow includes several advanced Git features:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Git Blame</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Right-click in the editor gutter and select "Toggle Git Blame"</li>
                      <li>See who last modified each line of code and in which commit</li>
                      <li>Click on a blame annotation to see the full commit details</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Stashing</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use the "..." menu in the Source Control view to stash changes</li>
                      <li>Apply, pop, or drop stashes as needed</li>
                      <li>Create named stashes for better organization</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Submodules</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Flow automatically detects and displays Git submodules</li>
                      <li>Perform submodule operations from the Source Control view</li>
                      <li>Update submodules individually or all at once</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="git-settings">Git Settings</h2>
                    <p>
                      Customize Flow's Git integration:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Open Settings (<kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+,</kbd> or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+,</kbd> on macOS)</li>
                      <li>Search for "git" to see all Git-related settings</li>
                      <li>Configure autofetch, commit signing, default clone directory, and more</li>
                      <li>Set up Git hooks for custom workflows</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">Next Steps</h2>
                    <p>
                      Now that you understand Flow's version control features, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("editor-features", "extensions")}} className="text-pulse-400 hover:text-pulse-300">Extensions</a> that enhance Git functionality</li>
                      <li>Explore <a href="#" onClick={(e) => {e.preventDefault(); setActive("guides", "collaboration")}} className="text-pulse-400 hover:text-pulse-300">Collaboration</a> features for team development</li>
                      <li>Configure <a href="#" onClick={(e) => {e.preventDefault(); setActive("configuration", "advanced-settings")}} className="text-pulse-400 hover:text-pulse-300">Advanced Settings</a> for your Git workflow</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === "editor-features" && activeTopic === "extensions" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Code className="w-4 h-4" />
                        <span className="font-medium">Extensions</span>
                      </div>
                      <p>
                        Flow supports a wide range of extensions that can enhance and customize your development experience.
                        This guide covers how to find, install, and manage extensions in Flow.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="extensions-overview">Extensions Overview</h2>
                    <p>
                      Extensions add new features and capabilities to Flow:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Language support for additional programming languages</li>
                      <li>Themes to customize Flow's appearance</li>
                      <li>Debuggers for various languages and frameworks</li>
                      <li>Tools for specific frameworks and libraries</li>
                      <li>Code snippets and templates</li>
                      <li>Productivity enhancements and utilities</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-amber-400 mb-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="font-medium">Note</span>
                      </div>
                      <p className="text-gray-300">
                        Flow is compatible with most VS Code extensions, giving you access to thousands of extensions from the VS Code ecosystem.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="extensions-view">Extensions View</h2>
                    <p>
                      The Extensions view is your hub for managing extensions:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Click the Extensions icon in the Activity Bar (or press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+X</kbd>)</li>
                      <li>Use the search box to find extensions by name, category, or keyword</li>
                      <li>Browse featured, popular, and recommended extensions</li>
                      <li>View installed extensions and available updates</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="installing-extensions">Installing Extensions</h2>
                    <p>
                      There are several ways to install extensions in Flow:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">From the Extensions View</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Open the Extensions view</li>
                      <li>Search for an extension</li>
                      <li>Click the "Install" button next to the extension</li>
                      <li>Wait for the installation to complete</li>
                    </ol>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">From the Command Palette</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Open the Command Palette (<kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+P</kbd> or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+Shift+P</kbd> on macOS)</li>
                      <li>Type "Extensions: Install Extensions" and press Enter</li>
                      <li>Search for and install the desired extension</li>
                    </ol>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">From a VSIX File</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Download a .vsix extension file</li>
                      <li>Open the Extensions view</li>
                      <li>Click the "..." menu and select "Install from VSIX..."</li>
                      <li>Browse to and select the .vsix file</li>
                    </ol>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        You can also install extensions directly from the command line using the Flow CLI: <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">flow --install-extension publisher.extension-name</code>
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="managing-extensions">Managing Extensions</h2>
                    <p>
                      Flow provides tools to manage your installed extensions:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Enabling and Disabling</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Click the gear icon next to an extension and select "Disable" or "Enable"</li>
                      <li>Disable extensions globally or just for the current workspace</li>
                      <li>Disabled extensions remain installed but inactive</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Updating</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Flow automatically checks for extension updates</li>
                      <li>A notification appears when updates are available</li>
                      <li>Click the refresh icon in the Extensions view to update all extensions</li>
                      <li>Click the update button next to a specific extension to update just that one</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Uninstalling</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Click the gear icon next to an extension and select "Uninstall"</li>
                      <li>Confirm the uninstallation when prompted</li>
                      <li>Flow may need to restart after uninstalling certain extensions</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="extension-settings">Extension Settings</h2>
                    <p>
                      Most extensions provide customizable settings:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Open Settings (<kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+,</kbd> or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+,</kbd> on macOS)</li>
                      <li>Search for the extension name to see its available settings</li>
                      <li>Adjust settings to customize the extension's behavior</li>
                      <li>Some extensions add their own sections to the Settings panel</li>
                    </ol>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="recommended-extensions">Recommended Extensions</h2>
                    <p>
                      Flow works well with many extensions. Here are some popular categories:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Language Support</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Python</strong> - Provides IntelliSense, linting, debugging, and more for Python</li>
                      <li><strong>JavaScript and TypeScript</strong> - Enhanced language features beyond the built-in support</li>
                      <li><strong>Rust</strong> - Rust language support with IntelliSense and debugging</li>
                      <li><strong>Go</strong> - Comprehensive support for the Go programming language</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Frameworks and Libraries</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>React</strong> - Snippets, IntelliSense, and navigation for React projects</li>
                      <li><strong>Vue</strong> - Language features for Vue.js development</li>
                      <li><strong>Angular</strong> - Tools for Angular development</li>
                      <li><strong>Docker</strong> - Support for Docker containers and Dockerfiles</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Productivity Tools</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>GitLens</strong> - Enhanced Git capabilities and repository visualization</li>
                      <li><strong>Prettier</strong> - Code formatter for many languages</li>
                      <li><strong>ESLint</strong> - Integrates ESLint JavaScript linting into Flow</li>
                      <li><strong>Path Intellisense</strong> - Autocompletes filenames in import statements</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Themes</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Material Theme</strong> - Material Design-inspired themes</li>
                      <li><strong>Night Owl</strong> - A theme optimized for night coding</li>
                      <li><strong>Dracula</strong> - A dark theme for Flow and many other apps</li>
                      <li><strong>GitHub Theme</strong> - GitHub's VS Code themes</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="workspace-recommendations">Workspace Recommendations</h2>
                    <p>
                      You can create extension recommendations for your project:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Create a <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">.vscode</code> folder in your project root</li>
                      <li>Add an <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">extensions.json</code> file with recommended extensions</li>
                      <li>Team members will be prompted to install these extensions when they open the project</li>
                    </ol>
                    <div className="bg-dark-900/50 rounded-md p-3 my-4 relative">
                      <button 
                        onClick={() => copyToClipboard('{\n  "recommendations": [\n    "dbaeumer.vscode-eslint",\n    "esbenp.prettier-vscode",\n    "ms-python.python"\n  ]\n}')}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                        aria-label="Copy code"
                      >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                      <code className="text-sm text-gray-300">
                        {`{\n  "recommendations": [\n    "dbaeumer.vscode-eslint",\n    "esbenp.prettier-vscode",\n    "ms-python.python"\n  ]\n}`}
                      </code>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="ai-extension-integration">AI Integration with Extensions</h2>
                    <p>
                      Flow's AI capabilities can enhance your experience with extensions:
                    </p>
                    <ul className="list-disc pl-6 space-y-4 mt-4">
                      <li>
                        <strong>Extension Recommendations</strong>
                        <p className="mt-1">Ask the AI for extension recommendations based on your project type or specific needs.</p>
                      </li>
                      <li>
                        <strong>Extension Configuration</strong>
                        <p className="mt-1">Get help configuring complex extension settings by asking the AI for guidance.</p>
                      </li>
                      <li>
                        <strong>Troubleshooting</strong>
                        <p className="mt-1">If an extension isn't working as expected, ask the AI to help diagnose and resolve the issue.</p>
                      </li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-amber-400 mb-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="font-medium">Note</span>
                      </div>
                      <p className="text-gray-300">
                        Some extensions may affect Flow's performance, especially if you have many installed. If you notice slowdowns, try disabling extensions you're not actively using.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">Next Steps</h2>
                    <p>
                      Now that you understand Flow's extension system, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Explore <a href="#" onClick={(e) => {e.preventDefault(); setActive("editor-features", "customization")}} className="text-pulse-400 hover:text-pulse-300">Customization</a> options for your workflow</li>
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("guides", "project-setup")}} className="text-pulse-400 hover:text-pulse-300">Project Setup</a> best practices</li>
                      <li>Discover <a href="#" onClick={(e) => {e.preventDefault(); setActive("guides", "debugging")}} className="text-pulse-400 hover:text-pulse-300">Debugging</a> with language-specific extensions</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === "editor-features" && activeTopic === "customization" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Code className="w-4 h-4" />
                        <span className="font-medium">Customization</span>
                      </div>
                      <p>
                        Flow is highly customizable, allowing you to tailor the editor to your preferences and workflow.
                        This guide covers the various ways you can personalize Flow to create your ideal development environment.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="settings-overview">Settings Overview</h2>
                    <p>
                      Flow's settings system allows you to configure virtually every aspect of the editor:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Accessing Settings</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Open the Settings UI with <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+,</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+,</kbd> on macOS)</li>
                      <li>Access the JSON settings file directly with <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+P</kbd> → "Preferences: Open Settings (JSON)"</li>
                      <li>Use the search bar to quickly find specific settings</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Settings Scopes</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>User Settings</strong> - Apply globally to all Flow instances</li>
                      <li><strong>Workspace Settings</strong> - Apply only to the current workspace</li>
                      <li><strong>Folder Settings</strong> - Apply to specific folders in a multi-root workspace</li>
                      <li>Workspace and folder settings override user settings when both are defined</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        Workspace settings are stored in a <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">.vscode/settings.json</code> file in your project root. You can check this file into version control to share settings with your team.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="appearance">Appearance Customization</h2>
                    <p>
                      Personalize Flow's look and feel:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Color Themes</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Change the color theme with <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+K Ctrl+T</kbd> or via Settings → "Workbench: Color Theme"</li>
                      <li>Flow includes several built-in themes (Dark, Light, High Contrast)</li>
                      <li>Install additional themes from the Extensions view</li>
                      <li>Create custom themes by extending existing ones</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">File Icon Themes</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Change file icons via Settings → "Workbench: File Icon Theme"</li>
                      <li>Flow includes a default icon set</li>
                      <li>Install additional icon themes from the Extensions view</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Font Customization</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Change the font family, size, weight, and ligatures in Settings</li>
                      <li>Configure different fonts for the editor, terminal, and UI</li>
                      <li>Enable font ligatures for programming fonts that support them</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Layout Customization</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Adjust the sidebar position (left/right) in Settings</li>
                      <li>Show/hide various UI elements like the Activity Bar, Status Bar, etc.</li>
                      <li>Configure panel placement (bottom/right) for terminal and output views</li>
                      <li>Enable Zen Mode (<kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+K Z</kbd>) for a distraction-free environment</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">Next Steps</h2>
                    <p>
                      Now that you understand Flow's customization options, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Explore <a href="#" onClick={(e) => {e.preventDefault(); setActive("guides", "project-setup")}} className="text-pulse-400 hover:text-pulse-300">Project Setup</a> best practices</li>
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("editor-features", "extensions")}} className="text-pulse-400 hover:text-pulse-300">Extensions</a> that add new features</li>
                      <li>Configure <a href="#" onClick={(e) => {e.preventDefault(); setActive("security", "data-privacy")}} className="text-pulse-400 hover:text-pulse-300">Data Privacy</a> settings for sensitive projects</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === "guides" && activeTopic === "project-setup" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Book className="w-4 h-4" />
                        <span className="font-medium">Project Setup</span>
                      </div>
                      <p>
                        Setting up your projects correctly in Flow can significantly improve your development experience.
                        This guide covers best practices for project organization and configuration.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="opening-projects">Opening Projects</h2>
                    <p>
                      There are several ways to open projects in Flow:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Opening Folders</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Click "File &gt; Open Folder" or press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+K Ctrl+O</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+O</kbd> on macOS)</li>
                      <li>Select the root folder of your project</li>
                      <li>Flow will load the entire folder structure as a workspace</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Opening Workspaces</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Click "File &gt; Open Workspace from File" to open a saved workspace</li>
                      <li>Workspaces can contain multiple folders from different locations</li>
                      <li>Workspace settings are stored in a <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">.code-workspace</code> file</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Recent Projects</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Click "File &gt; Open Recent" to see recently opened folders and workspaces</li>
                      <li>Pin frequently used projects to the top of the list</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="workspace-organization">Workspace Organization</h2>
                    <p>
                      Effectively organize your workspace for better productivity:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Multi-root Workspaces</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Add multiple folders to a workspace with "File &gt; Add Folder to Workspace"</li>
                      <li>Useful for working with multiple related projects simultaneously</li>
                      <li>Each folder can have its own settings and configuration</li>
                      <li>Save the multi-root setup with "File &gt; Save Workspace As..."</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Working with Files</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use the Explorer view to navigate your project structure</li>
                      <li>Create new files and folders with the context menu or keyboard shortcuts</li>
                      <li>Drag and drop to reorganize files and folders</li>
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+P</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+P</kbd> on macOS) for quick file navigation</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        Use the "Explorer: Focus on Folders View" command to quickly navigate to the folder tree, then use keyboard navigation to move around efficiently.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="project-configuration">Project Configuration</h2>
                    <p>
                      Configure your project with these key files:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">The .vscode Folder</h3>
                    <p>
                      Create a <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">.vscode</code> folder in your project root to store project-specific settings:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">settings.json</code> - Project-specific settings that override user settings</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">launch.json</code> - Debugging configurations</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">tasks.json</code> - Task definitions for building, testing, etc.</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">extensions.json</code> - Recommended extensions for the project</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Workspace Settings</h3>
                    <p>
                      Common workspace settings to consider:
                    </p>
                    <div className="bg-dark-900/50 rounded-md p-3 my-4 relative">
                      <button 
                        onClick={() => copyToClipboard('{\n  "editor.tabSize": 2,\n  "editor.insertSpaces": true,\n  "editor.formatOnSave": true,\n  "files.exclude": {\n    "**/.git": true,\n    "**/node_modules": true\n  },\n  "search.exclude": {\n    "**/dist": true,\n    "**/build": true\n  }\n}')}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                        aria-label="Copy code"
                      >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                      <code className="text-sm text-gray-300">
                        {`{\n  "editor.tabSize": 2,\n  "editor.insertSpaces": true,\n  "editor.formatOnSave": true,\n  "files.exclude": {\n    "**/.git": true,\n    "**/node_modules": true\n  },\n  "search.exclude": {\n    "**/dist": true,\n    "**/build": true\n  }\n}`}
                      </code>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Language-specific Settings</h3>
                    <p>
                      Configure settings for specific languages:
                    </p>
                    <div className="bg-dark-900/50 rounded-md p-3 my-4 relative">
                      <button 
                        onClick={() => copyToClipboard('{\n  "[javascript]": {\n    "editor.defaultFormatter": "esbenp.prettier-vscode",\n    "editor.formatOnSave": true\n  },\n  "[python]": {\n    "editor.formatOnSave": true,\n    "editor.defaultFormatter": "ms-python.python"\n  }\n}')}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                        aria-label="Copy code"
                      >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                      <code className="text-sm text-gray-300">
                        {`{\n  "[javascript]": {\n    "editor.defaultFormatter": "esbenp.prettier-vscode",\n    "editor.formatOnSave": true\n  },\n  "[python]": {\n    "editor.formatOnSave": true,\n    "editor.defaultFormatter": "ms-python.python"\n  }\n}`}
                      </code>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="file-patterns">File Patterns and Exclusions</h2>
                    <p>
                      Optimize performance by configuring which files Flow should include or exclude:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Files to Exclude</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Configure <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">files.exclude</code> to hide files from the Explorer view</li>
                      <li>Use <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">search.exclude</code> to exclude files from search results</li>
                      <li>Set up <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">files.watcherExclude</code> to improve performance by excluding files from being watched for changes</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Using .gitignore</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Flow automatically respects <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">.gitignore</code> files in your project</li>
                      <li>Files ignored by Git are also excluded from search results by default</li>
                      <li>This behavior can be configured in settings</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="project-tasks">Project Tasks</h2>
                    <p>
                      Set up common development tasks:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Tasks Configuration</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Create a <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">tasks.json</code> file in the <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">.vscode</code> folder</li>
                      <li>Define tasks for building, testing, linting, etc.</li>
                      <li>Run tasks with <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+B</kbd> or from the Command Palette</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Example Tasks</h3>
                    <div className="bg-dark-900/50 rounded-md p-3 my-4 relative">
                      <button 
                        onClick={() => copyToClipboard('{\n  "version": "2.0.0",\n  "tasks": [\n    {\n      "label": "Build",\n      "type": "npm",\n      "script": "build",\n      "group": {\n        "kind": "build",\n        "isDefault": true\n      }\n    },\n    {\n      "label": "Test",\n      "type": "npm",\n      "script": "test",\n      "group": {\n        "kind": "test",\n        "isDefault": true\n      }\n    }\n  ]\n}')}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                        aria-label="Copy code"
                      >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                      <code className="text-sm text-gray-300">
                        {`{\n  "version": "2.0.0",\n  "tasks": [\n    {\n      "label": "Build",\n      "type": "npm",\n      "script": "build",\n      "group": {\n        "kind": "build",\n        "isDefault": true\n      }\n    },\n    {\n      "label": "Test",\n      "type": "npm",\n      "script": "test",\n      "group": {\n        "kind": "test",\n        "isDefault": true\n      }\n    }\n  ]\n}`}
                      </code>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="ai-assisted-setup">AI-Assisted Project Setup</h2>
                    <p>
                      Flow's AI capabilities can help with project setup:
                    </p>
                    <ul className="list-disc pl-6 space-y-4 mt-4">
                      <li>
                        <strong>Project Initialization</strong>
                        <p className="mt-1">Ask the AI to generate starter files and configuration for your project type.</p>
                      </li>
                      <li>
                        <strong>Configuration Assistance</strong>
                        <p className="mt-1">Get help creating optimal settings for your specific project needs.</p>
                      </li>
                      <li>
                        <strong>Task Automation</strong>
                        <p className="mt-1">Ask the AI to create task definitions for common operations in your project.</p>
                      </li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-amber-400 mb-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="font-medium">Note</span>
                      </div>
                      <p className="text-gray-300">
                        When using AI to generate project configuration, always review the generated files to ensure they match your project's specific requirements.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">Next Steps</h2>
                    <p>
                      Now that you've set up your project, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("guides", "debugging")}} className="text-pulse-400 hover:text-pulse-300">Debugging</a> your code</li>
                      <li>Set up <a href="#" onClick={(e) => {e.preventDefault(); setActive("guides", "collaboration")}} className="text-pulse-400 hover:text-pulse-300">Collaboration</a> features for team development</li>
                      <li>Explore <a href="#" onClick={(e) => {e.preventDefault(); setActive("editor-features", "extensions")}} className="text-pulse-400 hover:text-pulse-300">Extensions</a> to enhance your workflow</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === "guides" && activeTopic === "debugging" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Book className="w-4 h-4" />
                        <span className="font-medium">Debugging</span>
                      </div>
                      <p>
                        Flow provides powerful debugging capabilities to help you find and fix issues in your code.
                        This guide covers how to set up and use the debugger effectively across different languages and frameworks.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="debugging-basics">Debugging Basics</h2>
                    <p>
                      Flow's debugging interface provides everything you need to inspect your running code:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Starting a Debug Session</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Click the Run and Debug icon in the Activity Bar (or press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+D</kbd>)</li>
                      <li>Click the "Run and Debug" button and select a debug configuration</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">F5</kbd> to start debugging with the current configuration</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+F5</kbd> to run without debugging</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Debug Controls</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Continue/Pause</strong> (<kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">F5</kbd>) - Resume or pause execution</li>
                      <li><strong>Step Over</strong> (<kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">F10</kbd>) - Execute the current line and move to the next line</li>
                      <li><strong>Step Into</strong> (<kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">F11</kbd>) - Step into a function call</li>
                      <li><strong>Step Out</strong> (<kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Shift+F11</kbd>) - Run the rest of the current function and return to the caller</li>
                      <li><strong>Restart</strong> (<kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+F5</kbd>) - Stop and restart the debugging session</li>
                      <li><strong>Stop</strong> (<kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Shift+F5</kbd>) - End the debugging session</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Breakpoints</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Click in the gutter (left margin) of the editor to set a breakpoint</li>
                      <li>Right-click a breakpoint to set conditions or hit counts</li>
                      <li>Use <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">F9</kbd> to toggle a breakpoint at the current line</li>
                      <li>Use the Breakpoints view to see all breakpoints and enable/disable them</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        Use logpoints (breakpoints that log messages to the console without stopping execution) by right-clicking the gutter and selecting "Add Logpoint". Enter a message in curly braces to evaluate expressions, e.g., "Current value: " followed by your variable name in curly braces.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="debug-configurations">Debug Configurations</h2>
                    <p>
                      Set up debugging for your specific project:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Creating a Configuration</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Click the Run and Debug view</li>
                      <li>Click "create a launch.json file"</li>
                      <li>Select your environment (Node.js, Python, etc.)</li>
                      <li>Flow will create a <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">launch.json</code> file in the <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">.vscode</code> folder</li>
                      <li>Customize the configuration as needed</li>
                    </ol>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Configuration Types</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Launch</strong> - Start a new instance of your application</li>
                      <li><strong>Attach</strong> - Connect to an already running process</li>
                      <li><strong>Compound</strong> - Run multiple configurations together (e.g., client and server)</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Example Configurations</h3>
                    
                    <h4 className="text-lg font-medium text-white mt-4 mb-2">Node.js</h4>
                    <div className="bg-dark-900/50 rounded-md p-3 my-4 relative">
                      <button 
                        onClick={() => copyToClipboard('{\n  "version": "0.2.0",\n  "configurations": [\n    {\n      "type": "node",\n      "request": "launch",\n      "name": "Launch Program",\n      "skipFiles": ["<node_internals>/**"],\n      "program": "${workspaceFolder}/index.js"\n    }\n  ]\n}')}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                        aria-label="Copy code"
                      >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                      <code className="text-sm text-gray-300">
                        {`{\n  "version": "0.2.0",\n  "configurations": [\n    {\n      "type": "node",\n      "request": "launch",\n      "name": "Launch Program",\n      "skipFiles": ["<node_internals>/**"],\n      "program": "\${workspaceFolder}/index.js"\n    }\n  ]\n}`}
                      </code>
                    </div>
                    
                    <h4 className="text-lg font-medium text-white mt-4 mb-2">Python</h4>
                    <div className="bg-dark-900/50 rounded-md p-3 my-4 relative">
                      <button 
                        onClick={() => copyToClipboard('{\n  "version": "0.2.0",\n  "configurations": [\n    {\n      "name": "Python: Current File",\n      "type": "python",\n      "request": "launch",\n      "program": "${file}",\n      "console": "integratedTerminal"\n    }\n  ]\n}')}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                        aria-label="Copy code"
                      >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                      <code className="text-sm text-gray-300">
                        {`{\n  "version": "0.2.0",\n  "configurations": [\n    {\n      "name": "Python: Current File",\n      "type": "python",\n      "request": "launch",\n      "program": "\${file}",\n      "console": "integratedTerminal"\n    }\n  ]\n}`}
                      </code>
                    </div>
                    
                    <h4 className="text-lg font-medium text-white mt-4 mb-2">Web Application</h4>
                    <div className="bg-dark-900/50 rounded-md p-3 my-4 relative">
                      <button 
                        onClick={() => copyToClipboard('{\n  "version": "0.2.0",\n  "configurations": [\n    {\n      "type": "chrome",\n      "request": "launch",\n      "name": "Launch Chrome",\n      "url": "http://localhost:3000",\n      "webRoot": "${workspaceFolder}"\n    }\n  ]\n}')}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                        aria-label="Copy code"
                      >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                      <code className="text-sm text-gray-300">
                        {`{\n  "version": "0.2.0",\n  "configurations": [\n    {\n      "type": "chrome",\n      "request": "launch",\n      "name": "Launch Chrome",\n      "url": "http://localhost:3000",\n      "webRoot": "\${workspaceFolder}"\n    }\n  ]\n}`}
                      </code>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="inspecting-variables">Inspecting Variables</h2>
                    <p>
                      Examine the state of your application during debugging:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Variables View</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>The Variables view shows local, global, and closure variables</li>
                      <li>Expand objects to see their properties</li>
                      <li>Right-click variables for additional options</li>
                      <li>Hover over variables in the editor to see their current values</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Watch Expressions</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Add expressions to the Watch view to monitor their values</li>
                      <li>Click the + button in the Watch view to add a new expression</li>
                      <li>Expressions can include variables, properties, and function calls</li>
                      <li>Values update automatically as you step through code</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Debug Console</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use the Debug Console to evaluate expressions in the current context</li>
                      <li>Type expressions at the prompt and press Enter</li>
                      <li>View console.log output and other program messages</li>
                      <li>Access command history with the up and down arrow keys</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="advanced-debugging">Advanced Debugging</h2>
                    <p>
                      Leverage Flow's more powerful debugging features:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Conditional Breakpoints</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Right-click a breakpoint in the gutter</li>
                      <li>Select "Edit Breakpoint" and enter a condition</li>
                      <li>The breakpoint will only trigger when the condition evaluates to true</li>
                      <li>Example: <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">index {'>'} 5 && user.isAdmin</code></li>
                    </ol>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Function Breakpoints</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Click the + button in the Breakpoints view</li>
                      <li>Enter a function name to break when the function is called</li>
                      <li>Works across files without needing to locate the function definition</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Data Breakpoints</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Break when a variable's value changes</li>
                      <li>Right-click a variable in the Variables view</li>
                      <li>Select "Break on Value Change"</li>
                      <li>Particularly useful for tracking down unexpected changes</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Call Stack</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>The Call Stack view shows the execution path to the current point</li>
                      <li>Click on stack frames to navigate to different levels</li>
                      <li>Variables view updates to show variables in the selected stack frame</li>
                      <li>Use this to understand how your program reached a particular state</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="language-specific-debugging">Language-Specific Debugging</h2>
                    <p>
                      Flow supports debugging for many languages and frameworks:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">JavaScript and TypeScript</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Built-in support for Node.js debugging</li>
                      <li>Browser debugging with the Chrome Debugger extension</li>
                      <li>Debug frameworks like React, Vue, and Angular</li>
                      <li>Source maps for debugging transpiled code</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Python</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Install the Python extension for debugging support</li>
                      <li>Debug scripts, modules, and Django/Flask applications</li>
                      <li>Remote debugging for code running on different machines</li>
                      <li>Integrated with pytest and unittest frameworks</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Java</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use the Java Extension Pack for debugging</li>
                      <li>Debug standalone applications and web applications</li>
                      <li>Hot code replacement during debugging</li>
                      <li>Integrated with Maven, Gradle, and Spring Boot</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">C/C++</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Install the C/C++ extension for debugging support</li>
                      <li>Configure GDB or LLDB as the debugger backend</li>
                      <li>Set up complex launch configurations for different targets</li>
                      <li>Memory inspection and register viewing</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="ai-assisted-debugging">AI-Assisted Debugging</h2>
                    <p>
                      Flow's AI capabilities can help with debugging:
                    </p>
                    <ul className="list-disc pl-6 space-y-4 mt-4">
                      <li>
                        <strong>Error Analysis</strong>
                        <p className="mt-1">Select an error message and ask the AI to explain it and suggest potential fixes.</p>
                      </li>
                      <li>
                        <strong>Bug Detection</strong>
                        <p className="mt-1">The AI can help identify potential issues in your code before you run it.</p>
                      </li>
                      <li>
                        <strong>Runtime State Analysis</strong>
                        <p className="mt-1">During debugging, ask the AI to analyze the current state and explain what might be causing unexpected behavior.</p>
                      </li>
                      <li>
                        <strong>Test Case Generation</strong>
                        <p className="mt-1">Request the AI to generate test cases that might trigger the bug you're investigating.</p>
                      </li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-amber-400 mb-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="font-medium">Note</span>
                      </div>
                      <p className="text-gray-300">
                        When using AI for debugging assistance, provide as much context as possible about the issue you're experiencing. Include error messages, expected behavior, and relevant code snippets.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="debugging-tips">Debugging Tips and Best Practices</h2>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Start with a clear hypothesis about what might be causing the issue</li>
                      <li>Use the simplest test case that reproduces the problem</li>
                      <li>Add logging at key points to track program flow</li>
                      <li>Check variable values early and often</li>
                      <li>Use conditional breakpoints to focus on specific scenarios</li>
                      <li>Remember to remove or disable breakpoints when no longer needed</li>
                      <li>For performance issues, use the built-in profiling tools</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">Next Steps</h2>
                    <p>
                      Now that you understand Flow's debugging capabilities, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("guides", "collaboration")}} className="text-pulse-400 hover:text-pulse-300">Collaboration</a> features for team debugging</li>
                      <li>Explore <a href="#" onClick={(e) => {e.preventDefault(); setActive("guides", "performance")}} className="text-pulse-400 hover:text-pulse-300">Performance Tips</a> for optimizing your workflow</li>
                      <li>Configure <a href="#" onClick={(e) => {e.preventDefault(); setActive("configuration", "advanced-settings")}} className="text-pulse-400 hover:text-pulse-300">Advanced Settings</a> for your debugging environment</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === "security" && activeTopic === "data-privacy" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Shield className="w-4 h-4" />
                        <span className="font-medium">Data Privacy</span>
                      </div>
                      <p>
                        Flow is designed with privacy in mind, especially when it comes to AI features.
                        This guide explains how Flow handles your data and how you can configure privacy settings.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="privacy-overview">Privacy Overview</h2>
                    <p>
                      Flow's approach to data privacy focuses on:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Transparency about what data is collected and how it's used</li>
                      <li>Control over what code is shared with AI services</li>
                      <li>Options for using local AI models that keep data on your machine</li>
                      <li>Configurable settings to match your privacy requirements</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="ai-data-handling">AI Data Handling</h2>
                    <p>
                      When using Flow's AI features, it's important to understand how your code is processed:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Cloud-based AI Models</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>When using cloud AI services, portions of your code may be sent to external servers</li>
                      <li>Data is transmitted over encrypted connections</li>
                      <li>Flow only sends the minimum context needed for the AI to provide useful responses</li>
                      <li>You can configure exactly what files and folders are excluded from AI analysis</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Local AI Models</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Local models process all data on your machine without sending it to external servers</li>
                      <li>These models may have lower performance or fewer capabilities than cloud models</li>
                      <li>Flow supports various local model formats and configurations</li>
                      <li>Local models are ideal for sensitive codebases or restricted environments</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-amber-400 mb-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="font-medium">Note</span>
                      </div>
                      <p className="text-gray-300">
                        Even when using cloud-based models, your code is not stored permanently unless explicitly configured for training purposes. Most providers delete data after processing.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="configuring-privacy">Configuring Privacy Settings</h2>
                    <p>
                      Flow provides several ways to control what data is shared:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Exclusion Patterns</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Configure patterns for files and folders that should never be sent to AI services</li>
                      <li>Flow automatically excludes common sensitive files like <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">.env</code>, credentials, and key files</li>
                      <li>Add custom patterns based on your project's specific needs</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">AI Service Selection</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Choose which AI provider to use for different features</li>
                      <li>Select between cloud-based and local models</li>
                      <li>Configure different providers for different workspaces or projects</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Telemetry Settings</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Control what usage data is collected by Flow</li>
                      <li>Opt out of telemetry entirely if desired</li>
                      <li>Manage crash reporting and performance data collection</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="workspace-trust">Workspace Trust</h2>
                    <p>
                      Flow's Workspace Trust feature helps protect you from potentially malicious code:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>When opening a workspace for the first time, Flow asks if you trust the code</li>
                      <li>Untrusted workspaces run with restricted capabilities to prevent security risks</li>
                      <li>Configure which features are available in untrusted workspaces</li>
                      <li>Manage your list of trusted workspaces in settings</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="sensitive-data-protection">Sensitive Data Protection</h2>
                    <p>
                      Best practices for keeping sensitive data secure:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Environment Variables</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Store sensitive values like API keys and passwords in <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">.env</code> files</li>
                      <li>Add <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">.env</code> to your <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">.gitignore</code> file</li>
                      <li>Flow automatically excludes <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">.env</code> files from AI processing</li>
                      <li>Use environment variable references in your code instead of hardcoded secrets</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Gitignore Integration</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Files ignored by Git are also excluded from AI processing by default</li>
                      <li>This behavior ensures consistency between version control privacy and AI privacy</li>
                      <li>You can configure this behavior in settings if needed</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        Create a <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">.aiignore</code> file in your project root to specify patterns that should be excluded from AI processing but still included in version control.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="compliance-considerations">Compliance Considerations</h2>
                    <p>
                      Important information for users with specific compliance requirements:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li><strong>GDPR</strong> - Flow's data handling practices are designed with GDPR principles in mind</li>
                      <li><strong>HIPAA</strong> - For healthcare applications, consider using local AI models exclusively</li>
                      <li><strong>Financial Regulations</strong> - Configure appropriate exclusion patterns for sensitive financial data</li>
                      <li><strong>Internal Policies</strong> - Flow can be configured to comply with most organizational data policies</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">Next Steps</h2>
                    <p>
                      Now that you understand Flow's data privacy features, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Configure <a href="#" onClick={(e) => {e.preventDefault(); setActive("security", "model-hosting")}} className="text-pulse-400 hover:text-pulse-300">Model Hosting</a> options</li>
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("security", "permissions")}} className="text-pulse-400 hover:text-pulse-300">Permissions</a> management</li>
                      <li>Explore <a href="#" onClick={(e) => {e.preventDefault(); setActive("security", "enterprise-security")}} className="text-pulse-400 hover:text-pulse-300">Enterprise Security</a> features</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === "guides" && activeTopic === "performance" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Performance Tips</span>
                      </div>
                      <p>
                        Flow is designed to be fast and responsive, but there are ways to optimize its performance even further.
                        This guide covers techniques for improving startup time, responsiveness, and resource usage.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="startup-optimization">Startup Optimization</h2>
                    <p>
                      Improve Flow's startup time with these strategies:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Extension Management</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Disable or uninstall extensions you rarely use</li>
                      <li>Use workspace-specific extensions when possible</li>
                      <li>Check the startup impact of extensions in the Extensions view</li>
                      <li>Consider using extension packs that bundle related extensions</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Workspace Settings</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Configure <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">files.watcherExclude</code> to ignore large directories</li>
                      <li>Use <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">search.exclude</code> to exclude build outputs, dependencies, and generated files</li>
                      <li>Adjust <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">files.exclude</code> to hide files you don't need to see</li>
                      <li>Consider splitting very large workspaces into multiple smaller ones</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">AI Model Selection</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Choose appropriate AI models based on your machine's capabilities</li>
                      <li>For lower-end machines, use smaller or cloud-based models</li>
                      <li>Configure AI features to activate only when explicitly requested</li>
                      <li>Adjust model parameters for better performance on your hardware</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        Use the <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">--disable-extensions</code> command-line flag when opening Flow for a specific task that doesn't require extensions. This significantly improves startup time.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="editor-performance">Editor Performance</h2>
                    <p>
                      Keep the editor responsive while working:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">File Size Considerations</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Flow performs best with files under 5MB in size</li>
                      <li>For very large files, consider using the Large File Editor mode</li>
                      <li>Split large files into smaller, more manageable modules when possible</li>
                      <li>Use the <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">editor.largeFileOptimizations</code> setting to tune performance</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Visual Features</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Disable the minimap for large files via <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">editor.minimap.enabled</code></li>
                      <li>Reduce word wrap for improved scrolling performance</li>
                      <li>Consider disabling line numbers for very large files</li>
                      <li>Adjust <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">editor.scrollBeyondLastLine</code> to false for faster scrolling</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Language Features</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Configure language-specific settings for optimal performance</li>
                      <li>Adjust auto-completion sensitivity and delay</li>
                      <li>Tune linting and validation frequency</li>
                      <li>Consider disabling some language features for very large files</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="ai-performance">AI Performance Optimization</h2>
                    <p>
                      Optimize Flow's AI features for better performance:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Model Configuration</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Select model size based on your hardware capabilities</li>
                      <li>For local models, ensure sufficient RAM is available</li>
                      <li>Consider using quantized models for better performance on consumer hardware</li>
                      <li>Balance between model size and quality based on your needs</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Context Management</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Limit the context window size for better performance</li>
                      <li>Use workspace-specific context settings for different projects</li>
                      <li>Configure which files are included in the AI context</li>
                      <li>Clear the AI context cache periodically if performance degrades</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Suggestion Behavior</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Adjust when and how inline suggestions appear</li>
                      <li>Configure delay before suggestions are triggered</li>
                      <li>Set appropriate suggestion length limits</li>
                      <li>Disable automatic suggestions for performance-critical tasks</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-amber-400 mb-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="font-medium">Note</span>
                      </div>
                      <p className="text-gray-300">
                        If you're experiencing performance issues with AI features, try switching to a smaller model or adjusting the temperature and max tokens settings. Lower temperature values and token limits generally result in faster responses.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="large-projects">Working with Large Projects</h2>
                    <p>
                      Strategies for maintaining performance in large codebases:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Workspace Organization</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use multi-root workspaces to separate large projects into manageable parts</li>
                      <li>Consider workspace-specific settings for different project components</li>
                      <li>Organize files to minimize the need for global searches</li>
                      <li>Use workspace trust settings to improve security and performance</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Search Optimization</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">search.exclude</code> to ignore build outputs, dependencies, and generated files</li>
                      <li>Prefer symbol search over full-text search when possible</li>
                      <li>Use scoped searches to focus on specific directories</li>
                      <li>Create custom search patterns for frequently used queries</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Git Performance</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Configure <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">git.enabled</code> and <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">git.autorefresh</code> settings for large repositories</li>
                      <li>Use <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">git.ignoreLimitWarning</code> for repositories with many changes</li>
                      <li>Consider disabling some Git features for very large repositories</li>
                      <li>Use Git LFS for large binary files</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="memory-management">Memory Management</h2>
                    <p>
                      Optimize Flow's memory usage:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Restart Flow periodically during long sessions to clear memory</li>
                      <li>Close unused editors to free up resources</li>
                      <li>Monitor memory usage with Task Manager or Activity Monitor</li>
                      <li>Consider increasing available memory if using large AI models</li>
                      <li>Use the <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">--max-memory</code> command-line argument to limit memory usage</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="performance-troubleshooting">Troubleshooting Performance Issues</h2>
                    <p>
                      If you experience performance problems:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 mt-4">
                      <li>Start Flow with the <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">--disable-extensions</code> flag to check if an extension is causing the issue</li>
                      <li>Enable <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">Developer: Startup Performance</code> to identify slow-loading components</li>
                      <li>Check CPU and memory usage to identify resource constraints</li>
                      <li>Review your workspace settings for potential performance impacts</li>
                      <li>Update Flow to the latest version for performance improvements</li>
                      <li>Ask the AI assistant for performance optimization suggestions specific to your project</li>
                    </ol>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">Next Steps</h2>
                    <p>
                      Now that you understand how to optimize Flow's performance, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Configure <a href="#" onClick={(e) => {e.preventDefault(); setActive("configuration", "settings")}} className="text-pulse-400 hover:text-pulse-300">Settings</a> for your specific needs</li>
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "model-configuration")}} className="text-pulse-400 hover:text-pulse-300">Model Configuration</a> for AI optimization</li>
                      <li>Explore <a href="#" onClick={(e) => {e.preventDefault(); setActive("configuration", "advanced-settings")}} className="text-pulse-400 hover:text-pulse-300">Advanced Settings</a> for fine-tuning</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === "configuration" && activeTopic === "settings" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Settings className="w-4 h-4" />
                        <span className="font-medium">Settings Overview</span>
                      </div>
                      <p>
                        Flow offers extensive configuration options to customize your development environment.
                        This guide explains how to access, modify, and manage settings effectively.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="settings-basics">Settings Basics</h2>
                    <p>
                      Understanding how Flow's settings system works:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Accessing Settings</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Open the Settings UI with <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+,</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+,</kbd> on macOS)</li>
                      <li>Access the Command Palette with <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+P</kbd> and search for settings commands</li>
                      <li>Edit settings directly in JSON format with "Preferences: Open Settings (JSON)"</li>
                      <li>Use the search bar to quickly find specific settings</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Settings Hierarchy</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Default Settings</strong> - Built-in defaults that apply to all installations</li>
                      <li><strong>User Settings</strong> - Your personal settings that override defaults</li>
                      <li><strong>Workspace Settings</strong> - Project-specific settings stored in <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">.vscode/settings.json</code></li>
                      <li><strong>Folder Settings</strong> - Settings for specific folders in multi-root workspaces</li>
                      <li>More specific settings (workspace/folder) override more general ones (user/default)</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Settings UI</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>The Settings UI is divided into User and Workspace tabs</li>
                      <li>Settings are organized into categories for easy navigation</li>
                      <li>Modified settings are highlighted for visibility</li>
                      <li>Hover over settings to see detailed descriptions</li>
                      <li>Use the search bar to filter settings across all categories</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        You can quickly toggle between the Settings UI and JSON view by clicking the "Open Settings (JSON)" icon in the top-right corner of the Settings UI.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="common-settings">Common Settings</h2>
                    <p>
                      Frequently configured settings categories:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Editor Settings</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">editor.fontSize</code> - Set the font size for the editor</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">editor.fontFamily</code> - Configure the font used in the editor</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">editor.tabSize</code> - Set the number of spaces a tab is equal to</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">editor.insertSpaces</code> - Use spaces instead of tabs</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">editor.wordWrap</code> - Control line wrapping behavior</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">editor.minimap.enabled</code> - Show or hide the code minimap</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Workbench Settings</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">workbench.colorTheme</code> - Set the color theme</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">workbench.iconTheme</code> - Choose the file icon theme</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">workbench.sideBar.location</code> - Position the sidebar on the left or right</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">workbench.editor.enablePreview</code> - Control preview behavior when opening files</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">workbench.startupEditor</code> - What to show when Flow starts</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Files Settings</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">files.autoSave</code> - Configure automatic file saving</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">files.exclude</code> - Hide files/folders from the Explorer</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">files.associations</code> - Associate file extensions with languages</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">files.encoding</code> - Default file encoding</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">files.eol</code> - Default end of line character</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">AI Settings</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">flow.ai.provider</code> - Select the AI provider to use</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">flow.ai.model</code> - Choose the AI model for code assistance</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">flow.ai.inlineSuggestions.enabled</code> - Enable/disable inline code suggestions</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">flow.ai.contextSize</code> - Set the context window size for AI operations</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">flow.ai.exclude</code> - Patterns for files to exclude from AI analysis</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="language-specific-settings">Language-specific Settings</h2>
                    <p>
                      Configure settings for specific programming languages:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Creating Language-specific Settings</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>In the Settings UI, click on the language dropdown at the top right</li>
                      <li>Select the language you want to configure</li>
                      <li>Modify settings that will apply only to that language</li>
                      <li>In JSON, use the language identifier in square brackets: <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">"[javascript]": {}</code></li>
                    </ol>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Common Language Settings</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">editor.tabSize</code> - Different languages often use different tab sizes</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">editor.formatOnSave</code> - Enable/disable formatting when saving files</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">editor.defaultFormatter</code> - Select the formatter extension to use</li>
                      <li><code className="bg-dark-700 px-2 py-0.5 rounded text-sm">editor.codeActionsOnSave</code> - Configure automatic actions on save</li>
                    </ul>
                    
                    <div className="bg-dark-900/50 rounded-md p-3 my-4 relative">
                      <button 
                        onClick={() => copyToClipboard('{\n  "[javascript]": {\n    "editor.tabSize": 2,\n    "editor.formatOnSave": true,\n    "editor.defaultFormatter": "esbenp.prettier-vscode"\n  },\n  "[python]": {\n    "editor.tabSize": 4,\n    "editor.formatOnSave": true,\n    "editor.defaultFormatter": "ms-python.python"\n  }\n}')}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                        aria-label="Copy code"
                      >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                      <code className="text-sm text-gray-300">
                        {`{\n  "[javascript]": {\n    "editor.tabSize": 2,\n    "editor.formatOnSave": true,\n    "editor.defaultFormatter": "esbenp.prettier-vscode"\n  },\n  "[python]": {\n    "editor.tabSize": 4,\n    "editor.formatOnSave": true,\n    "editor.defaultFormatter": "ms-python.python"\n  }\n}`}
                      </code>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="sharing-settings">Sharing Settings</h2>
                    <p>
                      Share your configuration with team members or across devices:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Workspace Settings</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Store project-specific settings in <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">.vscode/settings.json</code></li>
                      <li>Commit this file to version control to share with team members</li>
                      <li>Include only project-relevant settings, not personal preferences</li>
                      <li>Document any critical settings in your project README</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Settings Sync</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Enable Settings Sync to synchronize settings across devices</li>
                      <li>Access Settings Sync from the Accounts menu in the Activity Bar</li>
                      <li>Choose which settings to sync (preferences, keybindings, extensions, etc.)</li>
                      <li>Sign in with your account to enable synchronization</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Manual Export/Import</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use "Preferences: Export Settings" from the Command Palette</li>
                      <li>Save the exported JSON file for backup or sharing</li>
                      <li>Import settings with "Preferences: Import Settings"</li>
                      <li>Useful for transferring settings without cloud synchronization</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="troubleshooting-settings">Troubleshooting Settings</h2>
                    <p>
                      Resolve common settings-related issues:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Use "Preferences: Open Default Settings" to check original values</li>
                      <li>Try "Developer: Inspect Editor Tokens and Scopes" to debug language-specific settings</li>
                      <li>Check for syntax errors in your settings.json file</li>
                      <li>Use "Developer: Reload Window" to apply changes that aren't taking effect</li>
                      <li>Reset settings to defaults if you encounter persistent problems</li>
                      <li>Ask the AI assistant to help identify conflicting or incorrect settings</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">Next Steps</h2>
                    <p>
                      Now that you understand Flow's settings system, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Explore <a href="#" onClick={(e) => {e.preventDefault(); setActive("configuration", "themes")}} className="text-pulse-400 hover:text-pulse-300">Themes</a> to customize Flow's appearance</li>
                      <li>Configure <a href="#" onClick={(e) => {e.preventDefault(); setActive("configuration", "keybindings")}} className="text-pulse-400 hover:text-pulse-300">Keybindings</a> for your workflow</li>
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("configuration", "advanced-settings")}} className="text-pulse-400 hover:text-pulse-300">Advanced Settings</a> for power users</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === "guides" && activeTopic === "collaboration" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">Collaboration</span>
                      </div>
                      <p>
                        Flow provides powerful tools for collaborative coding, enabling teams to work together efficiently.
                        This guide covers real-time collaboration, sharing sessions, and AI-assisted team workflows.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="live-collaboration">Live Collaboration</h2>
                    <p>
                      Work together in real-time with Flow's collaborative editing features:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Starting a Collaboration Session</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Open the Command Palette with <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+P</kbd></li>
                      <li>Search for "Flow: Start Collaboration Session"</li>
                      <li>Choose between creating a new session or joining an existing one</li>
                      <li>For a new session, you'll receive a shareable link</li>
                      <li>To join, paste the session link or enter the session ID</li>
                    </ol>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Session Management</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>View all participants in the Collaboration panel</li>
                      <li>Set permissions for participants (read-only or edit access)</li>
                      <li>Follow another participant's cursor by clicking their name</li>
                      <li>End the session from the Collaboration panel menu</li>
                      <li>Save session history for future reference</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        Use the "Follow Mode" to automatically track another participant's cursor and viewport. This is especially useful during pair programming or code reviews.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="collaborative-features">Collaborative Features</h2>
                    <p>
                      Key features that enhance team collaboration:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Shared Terminal</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Share terminal sessions with collaborators</li>
                      <li>Control who can execute commands</li>
                      <li>View command history and outputs together</li>
                      <li>Use terminal sharing for debugging and demonstrations</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Shared Debugging</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Debug together with synchronized breakpoints</li>
                      <li>View shared call stacks and variables</li>
                      <li>Collaboratively step through code execution</li>
                      <li>Discuss findings in the integrated chat</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Chat and Comments</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use the built-in chat for real-time discussions</li>
                      <li>Add inline comments to specific code sections</li>
                      <li>Tag team members in comments for attention</li>
                      <li>Create threaded discussions on code blocks</li>
                      <li>Share code snippets directly in the chat</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="ai-assisted-collaboration">AI-Assisted Collaboration</h2>
                    <p>
                      Leverage Flow's AI capabilities for better team workflows:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Shared AI Context</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>AI assistant has access to the shared session context</li>
                      <li>Ask for explanations that all participants can see</li>
                      <li>Generate code suggestions visible to the entire team</li>
                      <li>Use AI to document code collaboratively</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Code Reviews</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Request AI-assisted code reviews during collaboration</li>
                      <li>Highlight potential issues for team discussion</li>
                      <li>Get improvement suggestions visible to all participants</li>
                      <li>Use AI to explain complex code to team members</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Meeting Summaries</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Generate AI summaries of collaboration sessions</li>
                      <li>Capture key decisions and action items</li>
                      <li>Document code changes and their rationale</li>
                      <li>Share summaries with team members who missed the session</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-amber-400 mb-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="font-medium">Note</span>
                      </div>
                      <p className="text-gray-300">
                        AI-assisted features in collaboration sessions respect privacy settings. Team members can control what information is shared with the AI and what remains private.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="asynchronous-collaboration">Asynchronous Collaboration</h2>
                    <p>
                      Collaborate effectively across different time zones:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Session Recording</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Record collaboration sessions for team members who can't attend</li>
                      <li>Capture code changes, discussions, and decisions</li>
                      <li>Playback sessions at any time</li>
                      <li>Add comments to recorded sessions</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Code Snapshots</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Create snapshots of the codebase at important points</li>
                      <li>Share snapshots with team members for review</li>
                      <li>Compare snapshots to track progress</li>
                      <li>Annotate snapshots with explanations</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Handoff Notes</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Create AI-assisted handoff notes for team members</li>
                      <li>Document current status and next steps</li>
                      <li>Highlight areas that need attention</li>
                      <li>Link notes to specific code sections</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="best-practices">Collaboration Best Practices</h2>
                    <p>
                      Tips for effective team collaboration in Flow:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Establish clear roles during collaboration sessions</li>
                      <li>Use the chat for discussions to avoid interrupting coding</li>
                      <li>Create workspace-specific settings for consistent experiences</li>
                      <li>Leverage AI for explaining complex code to new team members</li>
                      <li>Document key decisions in comments or session summaries</li>
                      <li>Use "Focus Mode" when needed to temporarily work independently</li>
                      <li>Schedule regular synchronization points for distributed teams</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="troubleshooting">Troubleshooting Collaboration Issues</h2>
                    <p>
                      Common issues and their solutions:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Connection problems: Check network settings and firewalls</li>
                      <li>Synchronization issues: Try reconnecting to the session</li>
                      <li>Permission errors: Verify participant access levels</li>
                      <li>Performance degradation: Limit the number of open files</li>
                      <li>Chat not working: Ensure all participants have the latest version</li>
                      <li>Ask the AI assistant for help with specific collaboration issues</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">Next Steps</h2>
                    <p>
                      Now that you understand Flow's collaboration features, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "pair-programming")}} className="text-pulse-400 hover:text-pulse-300">AI Pair Programming</a></li>
                      <li>Explore <a href="#" onClick={(e) => {e.preventDefault(); setActive("guides", "version-control")}} className="text-pulse-400 hover:text-pulse-300">Version Control</a> for team workflows</li>
                      <li>Configure <a href="#" onClick={(e) => {e.preventDefault(); setActive("configuration", "settings")}} className="text-pulse-400 hover:text-pulse-300">Settings</a> for optimal collaboration</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === "ai-features" && activeTopic === "model-hosting" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Server className="w-4 h-4" />
                        <span className="font-medium">Model Hosting</span>
                      </div>
                      <p>
                        Flow supports multiple options for hosting AI models, from local deployment to cloud services.
                        This guide explains the different hosting options and how to configure them for your needs.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="hosting-options">Model Hosting Options</h2>
                    <p>
                      Flow offers several ways to host and access AI models:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Local Hosting</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Run models directly on your machine</li>
                      <li>No internet connection required after initial setup</li>
                      <li>Complete privacy with no data leaving your device</li>
                      <li>Requires sufficient hardware resources</li>
                      <li>Supports various model formats and quantization levels</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Cloud Services</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Access models hosted on Flow's cloud infrastructure</li>
                      <li>No local hardware requirements</li>
                      <li>Always up-to-date with the latest models</li>
                      <li>Requires internet connection</li>
                      <li>Various subscription tiers available</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Self-hosted Server</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Host models on your own server infrastructure</li>
                      <li>Control over model deployment and updates</li>
                      <li>Can be used in air-gapped environments</li>
                      <li>Requires server setup and maintenance</li>
                      <li>Suitable for enterprise environments</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Hybrid Approach</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use local models for common tasks</li>
                      <li>Fall back to cloud services for more complex operations</li>
                      <li>Balance between performance and resource usage</li>
                      <li>Configurable thresholds for when to use each option</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        For the best experience, match your hosting option to your specific needs. If you work with sensitive data, local hosting might be preferable. If you need the most powerful models without hardware constraints, cloud services are ideal.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="local-model-setup">Setting Up Local Models</h2>
                    <p>
                      Configure Flow to use models hosted on your machine:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Hardware Requirements</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Minimum:</strong> 16GB RAM, modern CPU with AVX2 support</li>
                      <li><strong>Recommended:</strong> 32GB+ RAM, modern GPU with 8GB+ VRAM</li>
                      <li><strong>High Performance:</strong> 64GB+ RAM, NVIDIA GPU with 16GB+ VRAM</li>
                      <li>SSD storage with at least 10GB free space for model files</li>
                      <li>Active cooling recommended for extended usage</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Installation Steps</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Open Flow and navigate to Settings</li>
                      <li>Select "AI Features" → "Model Hosting"</li>
                      <li>Choose "Local Hosting" option</li>
                      <li>Select the models you want to download</li>
                      <li>Wait for the download and installation to complete</li>
                      <li>Configure model parameters (context size, temperature, etc.)</li>
                    </ol>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Model Management</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>View installed models in the Model Manager</li>
                      <li>Update models when new versions are available</li>
                      <li>Remove unused models to free up space</li>
                      <li>Import custom models from local files</li>
                      <li>Export model configurations to share with team members</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="cloud-model-setup">Configuring Cloud Models</h2>
                    <p>
                      Set up Flow to use cloud-hosted models:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Account Setup</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Create or sign in to your Flow account</li>
                      <li>Select a subscription plan that fits your needs</li>
                      <li>Generate an API key from the account dashboard</li>
                      <li>In Flow, go to Settings → "AI Features" → "Model Hosting"</li>
                      <li>Select "Cloud Hosting" and enter your API key</li>
                      <li>Choose which cloud models to enable</li>
                    </ol>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Connection Settings</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Configure connection timeout and retry settings</li>
                      <li>Set up proxy settings if required by your network</li>
                      <li>Enable connection status indicators in the status bar</li>
                      <li>Configure fallback behavior for connection issues</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Usage Monitoring</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Track API usage and quota in the Flow dashboard</li>
                      <li>Set up usage alerts to avoid unexpected costs</li>
                      <li>View detailed usage statistics by project</li>
                      <li>Export usage reports for billing purposes</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-amber-400 mb-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="font-medium">Note</span>
                      </div>
                      <p className="text-gray-300">
                        Cloud-hosted models process your code on secure servers. Review the privacy policy to understand how your data is handled, and consider using local models for sensitive projects.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="self-hosted-setup">Self-hosted Server Setup</h2>
                    <p>
                      Deploy models on your own infrastructure:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Server Requirements</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Linux server with Docker support</li>
                      <li>Minimum 32GB RAM, recommended 64GB+</li>
                      <li>GPU with 16GB+ VRAM for optimal performance</li>
                      <li>100GB+ storage space for model files</li>
                      <li>High-bandwidth network connection</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Deployment Steps</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Download the Flow Model Server package</li>
                      <li>Configure the server settings in <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">config.yaml</code></li>
                      <li>Start the server using Docker or the provided scripts</li>
                      <li>Generate an API key for secure access</li>
                      <li>In Flow, configure the connection to your server</li>
                      <li>Test the connection and adjust settings as needed</li>
                    </ol>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Advanced Configuration</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Set up load balancing for multiple users</li>
                      <li>Configure automatic scaling based on demand</li>
                      <li>Implement authentication and access controls</li>
                      <li>Set up monitoring and alerting</li>
                      <li>Configure backup and recovery procedures</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="model-selection">Choosing the Right Models</h2>
                    <p>
                      Guidelines for selecting models based on your needs:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Code Completion Models</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Small models (1-3B parameters):</strong> Fast, low resource usage, basic completions</li>
                      <li><strong>Medium models (7-13B parameters):</strong> Good balance of quality and performance</li>
                      <li><strong>Large models (30B+ parameters):</strong> Highest quality, requires significant resources</li>
                      <li>Consider language-specific models for specialized development</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Chat and Documentation Models</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>General-purpose models:</strong> Good for varied questions and explanations</li>
                      <li><strong>Specialized models:</strong> Optimized for specific programming languages or frameworks</li>
                      <li>Consider models with extended context windows for complex discussions</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Quantization Options</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Full precision (FP16/32):</strong> Highest quality, highest resource usage</li>
                      <li><strong>8-bit quantization:</strong> Good balance of quality and efficiency</li>
                      <li><strong>4-bit quantization:</strong> Fastest, lowest resource usage, some quality reduction</li>
                      <li>Test different quantization levels to find the right balance for your hardware</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="troubleshooting">Troubleshooting Model Issues</h2>
                    <p>
                      Common problems and their solutions:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li><strong>Out of memory errors:</strong> Try a smaller model or higher quantization level</li>
                      <li><strong>Slow responses:</strong> Check hardware utilization, consider GPU acceleration</li>
                      <li><strong>Connection failures:</strong> Verify network settings and API keys</li>
                      <li><strong>Model crashes:</strong> Update to the latest version, check for hardware compatibility</li>
                      <li><strong>Poor quality output:</strong> Try adjusting temperature and sampling parameters</li>
                      <li>Use the built-in diagnostics tool to identify performance bottlenecks</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">Next Steps</h2>
                    <p>
                      Now that you understand model hosting options, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Explore <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "model-configuration")}} className="text-pulse-400 hover:text-pulse-300">Model Configuration</a> settings</li>
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "prompt-engineering")}} className="text-pulse-400 hover:text-pulse-300">Prompt Engineering</a> techniques</li>
                      <li>Review <a href="#" onClick={(e) => {e.preventDefault(); setActive("guides", "data-privacy")}} className="text-pulse-400 hover:text-pulse-300">Data Privacy</a> considerations</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === "guides" && activeTopic === "enterprise-security" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Shield className="w-4 h-4" />
                        <span className="font-medium">Enterprise Security</span>
                      </div>
                      <p>
                        Flow provides robust security features for enterprise environments, ensuring that your code and data remain protected.
                        This guide covers security configurations, compliance features, and best practices for enterprise deployments.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="security-overview">Security Overview</h2>
                    <p>
                      Flow's enterprise security architecture:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Security Layers</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Application Security:</strong> Secure coding practices and regular security audits</li>
                      <li><strong>Data Security:</strong> Encryption for data at rest and in transit</li>
                      <li><strong>Network Security:</strong> Secure communication protocols and firewall configurations</li>
                      <li><strong>Authentication:</strong> Multi-factor authentication and SSO integration</li>
                      <li><strong>Authorization:</strong> Role-based access controls and permission management</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Compliance Certifications</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>SOC 2 Type II compliance for cloud services</li>
                      <li>GDPR compliance for handling personal data</li>
                      <li>HIPAA compliance for healthcare environments</li>
                      <li>ISO 27001 certification for information security management</li>
                      <li>Regular third-party security assessments and penetration testing</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-amber-400 mb-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="font-medium">Note</span>
                      </div>
                      <p className="text-gray-300">
                        Enterprise security features are available in Flow Enterprise Edition. Contact the Flow sales team for licensing information and deployment options.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="authentication-authorization">Authentication & Authorization</h2>
                    <p>
                      Secure access control for enterprise environments:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Authentication Methods</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Single Sign-On (SSO):</strong> Integration with SAML 2.0 providers</li>
                      <li><strong>Multi-Factor Authentication (MFA):</strong> Support for TOTP and security keys</li>
                      <li><strong>Directory Integration:</strong> Connect with Active Directory or LDAP</li>
                      <li><strong>OAuth 2.0:</strong> Support for standard OAuth flows</li>
                      <li><strong>Custom Authentication:</strong> API for custom authentication providers</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Authorization Controls</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Role-Based Access Control (RBAC):</strong> Define user roles and permissions</li>
                      <li><strong>Project-Level Permissions:</strong> Control access to specific codebases</li>
                      <li><strong>Feature Access:</strong> Restrict access to specific Flow features</li>
                      <li><strong>API Access Control:</strong> Manage API keys and permissions</li>
                      <li><strong>Audit Logging:</strong> Track access and permission changes</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Configuration Steps</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Access the Enterprise Admin Portal</li>
                      <li>Navigate to Security → Authentication</li>
                      <li>Configure your preferred authentication providers</li>
                      <li>Set up user roles and permissions</li>
                      <li>Define access policies for teams and projects</li>
                      <li>Enable audit logging for security monitoring</li>
                    </ol>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="data-protection">Data Protection</h2>
                    <p>
                      Safeguarding sensitive code and data:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Encryption</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Data at Rest:</strong> AES-256 encryption for stored data</li>
                      <li><strong>Data in Transit:</strong> TLS 1.3 for all network communications</li>
                      <li><strong>End-to-End Encryption:</strong> Available for sensitive projects</li>
                      <li><strong>Key Management:</strong> Secure key storage and rotation</li>
                      <li><strong>Customer-Managed Keys:</strong> Option to use your own encryption keys</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Data Isolation</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Tenant Isolation:</strong> Separate data storage for each organization</li>
                      <li><strong>Network Isolation:</strong> Dedicated network resources</li>
                      <li><strong>Process Isolation:</strong> Containerized execution environments</li>
                      <li><strong>Private Cloud:</strong> Dedicated infrastructure options</li>
                      <li><strong>On-Premises:</strong> Deploy Flow entirely within your network</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Data Governance</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Data Classification:</strong> Tag and manage sensitive information</li>
                      <li><strong>Data Loss Prevention:</strong> Prevent unauthorized data exfiltration</li>
                      <li><strong>Retention Policies:</strong> Configure data lifecycle management</li>
                      <li><strong>Data Residency:</strong> Control where your data is stored</li>
                      <li><strong>Compliance Reporting:</strong> Generate reports for regulatory requirements</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="ai-security">AI Security Controls</h2>
                    <p>
                      Secure use of AI features in enterprise environments:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Data Privacy Controls</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Data Sharing Controls:</strong> Configure what data is shared with AI models</li>
                      <li><strong>Private Models:</strong> Deploy AI models that don't send data externally</li>
                      <li><strong>Context Restrictions:</strong> Limit what files the AI can access</li>
                      <li><strong>PII Detection:</strong> Automatically detect and redact sensitive information</li>
                      <li><strong>Audit Trail:</strong> Track all AI interactions for compliance</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Model Governance</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Approved Models:</strong> Restrict which AI models can be used</li>
                      <li><strong>Model Verification:</strong> Validate model integrity before deployment</li>
                      <li><strong>Version Control:</strong> Track and manage model versions</li>
                      <li><strong>Usage Policies:</strong> Define how AI features can be used</li>
                      <li><strong>Output Filtering:</strong> Scan AI outputs for security concerns</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        For highly regulated industries, consider using the air-gapped deployment option with local AI models. This ensures no code or data ever leaves your secure environment.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="network-security">Network Security</h2>
                    <p>
                      Protecting network communications:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Network Controls</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>IP Restrictions:</strong> Limit access to specific IP ranges</li>
                      <li><strong>VPN Integration:</strong> Require VPN connection for access</li>
                      <li><strong>Private Endpoints:</strong> Connect via private network links</li>
                      <li><strong>Network Isolation:</strong> Separate traffic from other tenants</li>
                      <li><strong>DDoS Protection:</strong> Built-in protection against attacks</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Firewall Configuration</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Allowlist Domains:</strong> Specify allowed external domains</li>
                      <li><strong>Port Restrictions:</strong> Limit open ports and services</li>
                      <li><strong>Traffic Filtering:</strong> Inspect and filter network traffic</li>
                      <li><strong>Web Application Firewall:</strong> Protect against common attacks</li>
                      <li><strong>API Gateway:</strong> Secure access to Flow APIs</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="compliance-auditing">Compliance & Auditing</h2>
                    <p>
                      Meeting regulatory requirements:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Audit Logging</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Comprehensive Logs:</strong> Track user actions, system events, and security incidents</li>
                      <li><strong>Tamper-Proof Storage:</strong> Immutable log storage</li>
                      <li><strong>Log Retention:</strong> Configurable retention periods</li>
                      <li><strong>Log Forwarding:</strong> Integration with SIEM systems</li>
                      <li><strong>Real-time Alerts:</strong> Notifications for security events</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Compliance Reporting</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Compliance Dashboard:</strong> Monitor compliance status</li>
                      <li><strong>Pre-built Reports:</strong> Templates for common regulations</li>
                      <li><strong>Custom Reports:</strong> Create reports for specific requirements</li>
                      <li><strong>Evidence Collection:</strong> Gather compliance evidence</li>
                      <li><strong>Automated Assessments:</strong> Regular security posture checks</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="deployment-options">Secure Deployment Options</h2>
                    <p>
                      Flexible deployment models for enterprise security:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li><strong>Cloud (SaaS):</strong> Fully managed service with enterprise security controls</li>
                      <li><strong>Private Cloud:</strong> Dedicated cloud resources for your organization</li>
                      <li><strong>On-Premises:</strong> Deploy within your own data center</li>
                      <li><strong>Hybrid:</strong> Combine on-premises and cloud components</li>
                      <li><strong>Air-Gapped:</strong> Completely isolated deployment with no external connections</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="best-practices">Enterprise Security Best Practices</h2>
                    <p>
                      Recommendations for securing your Flow deployment:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Enforce multi-factor authentication for all users</li>
                      <li>Implement the principle of least privilege for access controls</li>
                      <li>Regularly review and rotate access credentials</li>
                      <li>Configure network security to restrict access to trusted networks</li>
                      <li>Use data classification to identify and protect sensitive information</li>
                      <li>Maintain up-to-date security patches and updates</li>
                      <li>Conduct regular security assessments and penetration testing</li>
                      <li>Train users on security best practices and awareness</li>
                      <li>Develop and test an incident response plan</li>
                      <li>Regularly back up configuration and critical data</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">Next Steps</h2>
                    <p>
                      Now that you understand Flow's enterprise security features, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Contact the <a href="#" onClick={(e) => {e.preventDefault(); window.open('https://flow.org/contact-sales', '_blank')}} className="text-pulse-400 hover:text-pulse-300">Flow sales team</a> for Enterprise Edition information</li>
                      <li>Review <a href="#" onClick={(e) => {e.preventDefault(); setActive("guides", "data-privacy")}} className="text-pulse-400 hover:text-pulse-300">Data Privacy</a> documentation</li>
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "model-hosting")}} className="text-pulse-400 hover:text-pulse-300">Model Hosting</a> options for secure AI deployment</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === "ai-features" && activeTopic === "ai-agents" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Cpu className="w-4 h-4" />
                        <span className="font-medium">AI Agents</span>
                      </div>
                      <p>
                        Flow's AI Agents are intelligent assistants that help you write, understand, and refactor code.
                        This guide explains how to interact with AI Agents and leverage their capabilities to enhance your workflow.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="agent-overview">AI Agent Overview</h2>
                    <p>
                      Flow provides several specialized AI Agents to assist with different aspects of development:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Types of AI Agents</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Code Assistant</strong> - Helps write, complete, and refactor code</li>
                      <li><strong>Explainer</strong> - Provides explanations of code functionality and concepts</li>
                      <li><strong>Debugger</strong> - Assists with finding and fixing bugs</li>
                      <li><strong>Architect</strong> - Offers guidance on code structure and system design</li>
                      <li><strong>Reviewer</strong> - Analyzes code for improvements and potential issues</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Agent Capabilities</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Understand natural language requests and questions</li>
                      <li>Generate code based on descriptions or requirements</li>
                      <li>Analyze existing code to provide insights and improvements</li>
                      <li>Learn from your codebase and preferences over time</li>
                      <li>Adapt to different programming languages and frameworks</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        You can customize how AI Agents work by configuring their behavior in Settings → AI Features → Agent Behavior. Adjust parameters like verbosity, risk tolerance, and coding style to match your preferences.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="interacting-with-agents">Interacting with AI Agents</h2>
                    <p>
                      There are multiple ways to interact with Flow's AI Agents:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Chat Interface</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Open the AI chat panel with <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+A</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+Shift+A</kbd> on macOS)</li>
                      <li>Type your question or request in natural language</li>
                      <li>Agents can see your current file and workspace context</li>
                      <li>Continue the conversation with follow-up questions</li>
                      <li>Use code blocks in your messages for specific code references</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Inline Assistance</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Select code and right-click to access contextual AI actions</li>
                      <li>Use quick actions like "Explain", "Refactor", or "Optimize"</li>
                      <li>Receive inline suggestions as you type</li>
                      <li>Accept suggestions with <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Tab</kbd> or ignore them by continuing to type</li>
                      <li>Customize suggestion behavior in Settings</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Command Palette</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Open the Command Palette with <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Shift+P</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+Shift+P</kbd> on macOS)</li>
                      <li>Type "AI:" to see available AI Agent commands</li>
                      <li>Use commands like "AI: Generate Tests", "AI: Document Code", etc.</li>
                      <li>Create custom AI commands for frequently used actions</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="effective-prompting">Effective Prompting</h2>
                    <p>
                      Get better results from AI Agents with these prompting techniques:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Be Specific</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Include relevant details about what you're trying to accomplish</li>
                      <li>Specify programming language, framework, or library versions</li>
                      <li>Mention any constraints or requirements</li>
                      <li>Provide examples when possible</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Use Context</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Reference specific files or functions in your codebase</li>
                      <li>Explain how the code fits into your larger project</li>
                      <li>Mention relevant business logic or domain knowledge</li>
                      <li>Provide error messages or logs when debugging</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Iterative Refinement</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Start with a general request and refine based on the response</li>
                      <li>Ask follow-up questions to get more details</li>
                      <li>Provide feedback to help the agent understand your needs better</li>
                      <li>Break complex tasks into smaller steps</li>
                    </ul>
                    
                    <div className="bg-dark-900/50 rounded-md p-3 my-4 relative">
                      <div className="mb-2 font-medium text-white">Example: Good Prompt</div>
                      <p className="text-gray-300 italic">
                        "Create a React component that displays a paginated list of users. The component should fetch data from an API endpoint, show loading states, handle errors, and allow filtering by name. We're using React 18 with TypeScript and the Axios library for API calls."
                      </p>
                    </div>
                    
                    <div className="bg-dark-900/50 rounded-md p-3 my-4 relative">
                      <div className="mb-2 font-medium text-white">Example: Less Effective Prompt</div>
                      <p className="text-gray-300 italic">
                        "Make me a user list component."
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="agent-memory">Agent Memory and Context</h2>
                    <p>
                      Understanding how AI Agents maintain context:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Session Memory</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Agents remember the conversation history within a session</li>
                      <li>You can reference previous questions and answers</li>
                      <li>The context window has limits - very long conversations may lose earlier context</li>
                      <li>Use "Clear Conversation" to start fresh when changing topics</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Workspace Awareness</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Agents can access and understand your workspace files</li>
                      <li>They can analyze project structure and dependencies</li>
                      <li>Configure which files are included in the AI context</li>
                      <li>Exclude sensitive or irrelevant files for better performance</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Persistent Memory</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Teach agents about project-specific concepts or conventions</li>
                      <li>Use "Remember this for future reference" to store important information</li>
                      <li>Agents learn your coding style and preferences over time</li>
                      <li>Reset learned preferences in Settings if needed</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-amber-400 mb-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="font-medium">Note</span>
                      </div>
                      <p className="text-gray-300">
                        For privacy reasons, you can configure exactly what information is shared with AI Agents. Go to Settings → AI Features → Privacy to customize these settings.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="specialized-agents">Specialized Agent Capabilities</h2>
                    <p>
                      Detailed look at what each specialized agent can do:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Code Assistant</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Generate new code based on descriptions</li>
                      <li>Complete partially written code</li>
                      <li>Convert code between programming languages</li>
                      <li>Implement specific algorithms or patterns</li>
                      <li>Generate unit tests for existing code</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Explainer</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Break down complex code into simpler concepts</li>
                      <li>Explain how specific functions or algorithms work</li>
                      <li>Clarify language-specific features or syntax</li>
                      <li>Provide examples to illustrate concepts</li>
                      <li>Answer questions about libraries and frameworks</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Debugger</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Analyze error messages and suggest fixes</li>
                      <li>Identify potential bugs in code</li>
                      <li>Explain why certain behaviors are occurring</li>
                      <li>Suggest debugging strategies</li>
                      <li>Help trace through execution flow</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Architect</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Suggest code organization and structure</li>
                      <li>Recommend design patterns for specific problems</li>
                      <li>Help plan system architecture</li>
                      <li>Identify potential scalability or performance issues</li>
                      <li>Provide guidance on best practices</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Reviewer</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Identify code smells and anti-patterns</li>
                      <li>Suggest performance optimizations</li>
                      <li>Check for security vulnerabilities</li>
                      <li>Ensure code follows best practices</li>
                      <li>Provide constructive feedback for improvements</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="limitations">Understanding AI Agent Limitations</h2>
                    <p>
                      Being aware of what AI Agents can and cannot do:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Agents may not always have knowledge of the very latest libraries or language features</li>
                      <li>They might occasionally generate code with errors or misunderstand complex requirements</li>
                      <li>Understanding of very large codebases may be limited by context window size</li>
                      <li>They cannot execute code or interact with external systems directly</li>
                      <li>Agents work best when given clear, specific instructions</li>
                      <li>Always review and test AI-generated code before using it in production</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">Next Steps</h2>
                    <p>
                      Now that you understand Flow's AI Agents, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Explore <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "code-completion")}} className="text-pulse-400 hover:text-pulse-300">Code Completion</a> features</li>
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "model-configuration")}} className="text-pulse-400 hover:text-pulse-300">Model Configuration</a> options</li>
                      <li>Review <a href="#" onClick={(e) => {e.preventDefault(); setActive("security", "data-privacy")}} className="text-pulse-400 hover:text-pulse-300">Data Privacy</a> settings</li>
                    </ul>
                  </div>
                )}
                
                {activeSection === "ai-features" && activeTopic === "code-completion" && (
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-dark-800/50 border border-gray-800/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-pulse-400 mb-2">
                        <Cpu className="w-4 h-4" />
                        <span className="font-medium">Code Completion</span>
                      </div>
                      <p>
                        Flow's AI-powered code completion helps you write code faster and with fewer errors.
                        This guide explains how to use and configure the code completion features.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="completion-basics">Code Completion Basics</h2>
                    <p>
                      Flow offers several levels of code completion:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Types of Completions</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Inline Suggestions</strong> - Real-time code suggestions as you type</li>
                      <li><strong>Context-Aware Completions</strong> - Suggestions based on surrounding code</li>
                      <li><strong>Full Line Completions</strong> - Complete line suggestions</li>
                      <li><strong>Block Completions</strong> - Suggestions for entire code blocks or functions</li>
                      <li><strong>Natural Language to Code</strong> - Generate code from comments</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Using Code Completion</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Inline suggestions appear automatically as you type</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Tab</kbd> to accept a suggestion</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Escape</kbd> to dismiss a suggestion</li>
                      <li>Use arrow keys to navigate through multiple suggestions</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Alt+]</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Option+]</kbd> on macOS) to see the next suggestion</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-pulse-400 mb-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-medium">Pro Tip</span>
                      </div>
                      <p className="text-gray-300">
                        Write a comment describing what you want to do, then press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Enter</kbd> (or <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">⌘+Enter</kbd> on macOS) to generate code based on your description.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="completion-features">Advanced Completion Features</h2>
                    <p>
                      Flow's code completion offers several advanced capabilities:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Multi-line Completion</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Flow can suggest multiple lines of code at once</li>
                      <li>Useful for completing functions, loops, and conditional blocks</li>
                      <li>Press <kbd className="bg-dark-700 px-2 py-0.5 rounded text-sm">Ctrl+Enter</kbd> at the end of a line to trigger</li>
                      <li>Accept or modify parts of the suggestion as needed</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Function Completion</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Type a function signature or comment and Flow will implement the body</li>
                      <li>Works with various programming languages and paradigms</li>
                      <li>Generates appropriate error handling and edge cases</li>
                      <li>Adapts to your coding style and patterns</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Test Generation</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Automatically generate unit tests for your functions</li>
                      <li>Write a function and type "test" or "describe" to trigger test suggestions</li>
                      <li>Supports popular testing frameworks like Jest, Mocha, and PyTest</li>
                      <li>Generates tests with appropriate assertions and edge cases</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Documentation Generation</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Type <code className="bg-dark-700 px-2 py-0.5 rounded text-sm">/**</code> above a function to generate JSDoc/DocString</li>
                      <li>Automatically documents parameters, return values, and exceptions</li>
                      <li>Adapts to documentation styles in your codebase</li>
                      <li>Supports multiple documentation formats across languages</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="configuring-completion">Configuring Code Completion</h2>
                    <p>
                      Customize code completion to match your preferences:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">General Settings</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Enable/disable AI code completion in Settings → AI Features → Code Completion</li>
                      <li>Adjust suggestion frequency with the "Suggestion Threshold" setting</li>
                      <li>Configure delay before suggestions appear</li>
                      <li>Set maximum suggestion length</li>
                      <li>Choose between automatic and manual triggering</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Language-specific Settings</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Configure different completion behaviors for each language</li>
                      <li>Enable/disable specific completion features per language</li>
                      <li>Adjust suggestion aggressiveness for different file types</li>
                      <li>Set up custom triggers for specific languages</li>
                    </ul>
                    
                    <div className="bg-dark-900/50 rounded-md p-3 my-4 relative">
                      <div className="mb-2 font-medium text-white">Example: Language-specific Settings</div>
                      <code className="text-sm text-gray-300">
                        {"{\n  \"[javascript]\": {\n    \"flow.autocomplete.enabled\": true,\n    \"flow.autocomplete.threshold\": \"low\"\n  }\n}"}
                      </code>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Model Selection</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Choose which AI model powers your code completions</li>
                      <li>Select between different model sizes based on your needs</li>
                      <li>Balance between speed and quality</li>
                      <li>Configure local vs. cloud models</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="completion-context">Understanding Completion Context</h2>
                    <p>
                      How Flow's code completion understands your code:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">File Context</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Flow analyzes the current file to understand structure and patterns</li>
                      <li>Considers imports, variable definitions, and function signatures</li>
                      <li>Recognizes code patterns and style conventions</li>
                      <li>Adapts suggestions to match your coding style</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Project Context</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Analyzes related files in your project</li>
                      <li>Understands project-specific APIs and patterns</li>
                      <li>Recognizes custom types, classes, and functions</li>
                      <li>Considers project dependencies and frameworks</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Language Context</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Aware of language-specific syntax and idioms</li>
                      <li>Understands standard libraries and common patterns</li>
                      <li>Supports multiple programming paradigms</li>
                      <li>Adapts to language versions and features</li>
                    </ul>
                    
                    <div className="bg-dark-800/80 border border-gray-800/50 rounded-lg p-4 my-6">
                      <div className="flex items-center space-x-2 text-amber-400 mb-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="font-medium">Note</span>
                      </div>
                      <p className="text-gray-300">
                        For the best code completion experience, ensure your project has proper type definitions and documentation. This helps Flow understand your code structure more accurately.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="training-the-ai">Training the AI</h2>
                    <p>
                      Improve code completion quality over time:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Accepting and Rejecting Suggestions</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Accepting suggestions helps the AI learn your preferences</li>
                      <li>Rejecting suggestions provides negative feedback</li>
                      <li>Editing suggestions teaches the AI about your modifications</li>
                      <li>The AI adapts to your coding style over time</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Explicit Feedback</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use the feedback buttons in the suggestion UI</li>
                      <li>Rate suggestions as helpful or not helpful</li>
                      <li>Provide specific feedback on why a suggestion wasn't useful</li>
                      <li>Help improve the AI for your specific use cases</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Project-Specific Training</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Flow learns from your project's code patterns</li>
                      <li>Adapts to project-specific naming conventions</li>
                      <li>Understands custom APIs and frameworks</li>
                      <li>Improves suggestions based on project context</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="best-practices">Best Practices</h2>
                    <p>
                      Get the most out of Flow's code completion:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Write descriptive variable and function names to improve context</li>
                      <li>Use comments to guide code generation for complex logic</li>
                      <li>Start with a clear function signature before requesting implementation</li>
                      <li>For complex algorithms, describe the approach in a comment</li>
                      <li>Review and test AI-generated code before using it in production</li>
                      <li>Use type annotations when available to improve suggestion accuracy</li>
                      <li>Provide feedback to help the AI learn your preferences</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="troubleshooting">Troubleshooting</h2>
                    <p>
                      Common issues and solutions:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li><strong>Irrelevant suggestions:</strong> Check your context window settings and try providing more context</li>
                      <li><strong>No suggestions appearing:</strong> Verify that code completion is enabled for your language</li>
                      <li><strong>Slow suggestions:</strong> Consider using a smaller model or adjusting performance settings</li>
                      <li><strong>Incorrect syntax:</strong> Ensure your project has proper language support and type definitions</li>
                      <li><strong>Outdated API usage:</strong> Update your model or provide feedback about the incorrect API</li>
                      <li><strong>Reset learned preferences:</strong> Use Settings → AI Features → Reset Learned Preferences</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" id="next-steps">Next Steps</h2>
                    <p>
                      Now that you understand Flow's code completion features, you can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Learn about <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "code-explanation")}} className="text-pulse-400 hover:text-pulse-300">Code Explanation</a> capabilities</li>
                      <li>Configure <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "model-configuration")}} className="text-pulse-400 hover:text-pulse-300">Model Settings</a> for optimal performance</li>
                      <li>Explore <a href="#" onClick={(e) => {e.preventDefault(); setActive("ai-features", "ai-agents")}} className="text-pulse-400 hover:text-pulse-300">AI Agents</a> for more advanced assistance</li>
                    </ul>
                  </div>
                )}
                
                {/* Additional content sections will be added here */}
                
              </div>
            </main>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Documentation;
