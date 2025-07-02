import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-black py-12 border-t border-gray-800/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img src="/logo.svg" alt="Flow Logo" className="h-8" />
            </Link>
                         <p className="text-gray-400 text-sm">
               Flow is an advanced AI-powered code editor. Use AI agents on your codebase, checkpoint and visualize changes, and bring any model or host locally.
             </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://github.com/floweditor/flow" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12C2 16.419 4.865 20.166 8.84 21.49C9.34 21.581 9.52 21.272 9.52 21.008C9.52 20.768 9.512 20.058 9.508 19.192C6.726 19.79 6.14 17.81 6.14 17.81C5.684 16.629 5.029 16.32 5.029 16.32C4.121 15.681 5.098 15.693 5.098 15.693C6.101 15.764 6.63 16.746 6.63 16.746C7.521 18.27 8.97 17.858 9.54 17.6C9.631 16.97 9.889 16.558 10.175 16.327C7.955 16.094 5.62 15.276 5.62 11.454C5.62 10.339 6.01 9.428 6.65 8.716C6.548 8.466 6.205 7.538 6.75 6.158C6.75 6.158 7.587 5.892 9.497 7.189C10.292 6.97 11.15 6.86 12 6.856C12.85 6.86 13.707 6.97 14.503 7.189C16.412 5.892 17.248 6.158 17.248 6.158C17.794 7.538 17.451 8.466 17.35 8.716C17.99 9.428 18.38 10.339 18.38 11.454C18.38 15.286 16.042 16.091 13.815 16.32C14.172 16.604 14.492 17.169 14.492 18.034C14.492 19.275 14.478 20.681 14.478 21.008C14.478 21.274 14.655 21.585 15.165 21.489C19.135 20.163 22 16.418 22 12C22 6.477 17.523 2 12 2Z" fill="currentColor" />
                </svg>
              </a>
              <a href="https://discord.gg/RSNjgaugJs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" fill="currentColor" />
                </svg>
              </a>
              <a href="https://twitter.com/floweditorapp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/documentation" className="text-gray-400 hover:text-white text-sm">Documentation</Link></li>
              <li><a href="https://github.com/floweditor/flow" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm">GitHub</a></li>
              <li><a href="https://github.com/orgs/floweditor/projects/2" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm">Project Board</a></li>
              <li><Link to="/download" className="text-gray-400 hover:text-white text-sm">Download</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><a href="mailto:hello@floweditor.com" className="text-gray-400 hover:text-white text-sm">hello@floweditor.com</a></li>
              <li><a href="https://discord.gg/RSNjgaugJs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm">Discord Community</a></li>
              <li><a href="https://github.com/floweditor/flow/issues/new" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm">Report an Issue</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Flow. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-500 hover:text-white text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-white text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
