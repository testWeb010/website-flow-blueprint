import React from "react";

interface AiIdeSvgProps {
  className?: string;
}

const AiIdeSvg: React.FC<AiIdeSvgProps> = ({ className = "w-full h-auto" }) => {
  return (
    <svg
      viewBox="0 0 800 600"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background gradient */}
      <defs>
        <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="screen-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1F2937" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>
        <linearGradient id="code-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      
      {/* Main background */}
      <rect width="800" height="600" fill="url(#bg-gradient)" opacity="0.1" />
      
      {/* IDE Container */}
      <rect
        x="50"
        y="80"
        width="700"
        height="440"
        rx="20"
        fill="#1F2937"
        stroke="#374151"
        strokeWidth="2"
      />
      
      {/* Title bar */}
      <rect
        x="50"
        y="80"
        width="700"
        height="40"
        rx="20"
        fill="#374151"
      />
      
      {/* Window controls */}
      <circle cx="75" cy="100" r="6" fill="#EF4444" />
      <circle cx="95" cy="100" r="6" fill="#F59E0B" />
      <circle cx="115" cy="100" r="6" fill="#10B981" />
      
      {/* IDE Title */}
      <text x="400" y="105" textAnchor="middle" fill="#F3F4F6" fontSize="14" fontFamily="monospace">
        Flow AI IDE - Agentic Coding Assistant
      </text>
      
      {/* Sidebar */}
      <rect
        x="50"
        y="120"
        width="150"
        height="400"
        fill="#111827"
      />
      
      {/* Sidebar items */}
      <rect x="60" y="140" width="130" height="25" rx="5" fill="#374151" />
      <text x="70" y="157" fill="#9CA3AF" fontSize="12" fontFamily="monospace">📁 src/</text>
      
      <rect x="70" y="170" width="120" height="20" rx="3" fill="transparent" />
      <text x="80" y="183" fill="#D1D5DB" fontSize="11" fontFamily="monospace">⚛️ components/</text>
      
      <rect x="70" y="195" width="120" height="20" rx="3" fill="transparent" />
      <text x="80" y="208" fill="#D1D5DB" fontSize="11" fontFamily="monospace">🤖 ai-agents/</text>
      
      <rect x="70" y="220" width="120" height="20" rx="3" fill="transparent" />
      <text x="80" y="233" fill="#D1D5DB" fontSize="11" fontFamily="monospace">⚙️ flow-config/</text>
      
      {/* Main editor area */}
      <rect
        x="200"
        y="120"
        width="550"
        height="400"
        fill="url(#screen-gradient)"
      />
      
      {/* Tab bar */}
      <rect x="200" y="120" width="550" height="35" fill="#1F2937" />
      <rect x="210" y="125" width="120" height="25" rx="5" fill="#374151" />
      <text x="225" y="140" fill="#F3F4F6" fontSize="11" fontFamily="monospace">FlowAgent.ts</text>
      
      {/* Code editor content */}
      <g fontFamily="monospace" fontSize="12">
        {/* Line numbers */}
        <text x="215" y="175" fill="#6B7280">1</text>
        <text x="215" y="195" fill="#6B7280">2</text>
        <text x="215" y="215" fill="#6B7280">3</text>
        <text x="215" y="235" fill="#6B7280">4</text>
        <text x="215" y="255" fill="#6B7280">5</text>
        <text x="215" y="275" fill="#6B7280">6</text>
        <text x="215" y="295" fill="#6B7280">7</text>
        <text x="215" y="315" fill="#6B7280">8</text>
        
        {/* Code content */}
        <text x="240" y="175" fill="#10B981">import</text>
        <text x="280" y="175" fill="#F3F4F6">React from </text>
        <text x="350" y="175" fill="#FCD34D">'react';</text>
        
        <text x="240" y="195" fill="#10B981">import</text>
        <text x="280" y="195" fill="#F3F4F6">{'{ FlowAgent } from '}</text>
        <text x="380" y="195" fill="#FCD34D">'./flow-core';</text>
        
        <text x="240" y="235" fill="#10B981">const</text>
        <text x="280" y="235" fill="#60A5FA">FlowAI</text>
        <text x="320" y="235" fill="#F3F4F6">= () =&gt; &#123;</text>
        
        <text x="250" y="255" fill="#10B981">const</text>
        <text x="290" y="255" fill="#F3F4F6">[aiState, setAiState] = </text>
        <text x="450" y="255" fill="#EC4899">useState</text>
        <text x="510" y="255" fill="#F3F4F6">();</text>
        
        <text x="250" y="295" fill="#10B981">return</text>
        <text x="295" y="295" fill="#F3F4F6">(</text>
        
        <text x="260" y="315" fill="#F3F4F6">&lt;</text>
        <text x="275" y="315" fill="#60A5FA">div</text>
        <text x="300" y="315" fill="#F59E0B">className</text>
        <text x="360" y="315" fill="#F3F4F6">=</text>
        <text x="375" y="315" fill="#FCD34D">"flow-container"</text>
        <text x="480" y="315" fill="#F3F4F6">&gt;</text>
      </g>
      
      {/* AI Assistant panel */}
      <rect
        x="520"
        y="340"
        width="220"
        height="160"
        rx="10"
        fill="#1F2937"
        stroke="#3B82F6"
        strokeWidth="2"
      />
      
      <text x="630" y="360" textAnchor="middle" fill="#3B82F6" fontSize="12" fontWeight="bold">
        Flow AI Agent
      </text>
      
      {/* AI chat bubbles */}
      <rect x="530" y="370" width="180" height="20" rx="10" fill="#374151" />
      <text x="540" y="383" fill="#D1D5DB" fontSize="10">🤖 Code analysis complete</text>
      
      <rect x="550" y="395" width="160" height="20" rx="10" fill="#3B82F6" opacity="0.2" />
      <text x="560" y="408" fill="#3B82F6" fontSize="10">💡 Refactor suggestion</text>
      
      <rect x="530" y="420" width="140" height="20" rx="10" fill="#6366F1" opacity="0.2" />
      <text x="540" y="433" fill="#6366F1" fontSize="10">🚀 Apply changes</text>
      
      {/* Terminal section */}
      <rect
        x="200"
        y="450"
        width="300"
        height="70"
        fill="#000000"
        rx="5"
      />
      
      <text x="210" y="470" fill="#10B981" fontSize="11" fontFamily="monospace">
        ➜ flow-ai --analyze
      </text>
      <text x="210" y="485" fill="#60A5FA" fontSize="10" fontFamily="monospace">
        ⚡ Flow agent initializing...
      </text>
      <text x="210" y="500" fill="#3B82F6" fontSize="10" fontFamily="monospace">
        🤖 Codebase analysis complete
      </text>
      <text x="210" y="515" fill="#10B981" fontSize="10" fontFamily="monospace">
        ✅ Ready for intelligent coding
      </text>
      
      {/* Floating AI elements */}
      <circle cx="100" cy="50" r="20" fill="url(#code-gradient)" opacity="0.3" />
      <text x="100" y="55" textAnchor="middle" fill="#FFFFFF" fontSize="12">🧠</text>
      
      <circle cx="650" cy="40" r="15" fill="#6366F1" opacity="0.4" />
      <text x="650" y="45" textAnchor="middle" fill="#FFFFFF" fontSize="10">⚡</text>
      
      <circle cx="750" cy="70" r="18" fill="#3B82F6" opacity="0.3" />
      <text x="750" y="75" textAnchor="middle" fill="#FFFFFF" fontSize="11">🚀</text>
    </svg>
  );
};

export default AiIdeSvg;
