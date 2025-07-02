import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Building2, Shield, Users, Zap, BarChart3, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Enterprise = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 md:pt-32 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Flow Enterprise <br className="hidden md:block" />
              <span className="text-pulse-500">for Development Teams</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Secure AI-powered development, custom integrations, and advanced collaboration tools
              for engineering teams of all sizes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-pulse-500 hover:bg-pulse-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Contact Sales
                <ArrowRight size={18} />
              </Link>
              <Link 
                to="/demo" 
                className="bg-transparent border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white py-3 px-6 rounded-xl font-medium transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Request Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Enterprise Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything your development team needs to maximize productivity and security with Flow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              >
                <div className="bg-pulse-500/10 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="text-pulse-500" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Compare Plans</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Find the perfect plan for your organization's needs.
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Features</th>
                  <th className="py-4 px-4 text-gray-400 font-medium">Basic</th>
                  <th className="py-4 px-4 text-gray-400 font-medium">Team</th>
                  <th className="py-4 px-4 text-white font-bold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, index) => (
                  <tr key={index} className="border-b border-gray-800/50">
                    <td className="py-4 px-4 text-white font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      {row.standard ? <Check size={18} className="mx-auto text-green-500" /> : <span className="text-gray-600">—</span>}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {row.business ? <Check size={18} className="mx-auto text-green-500" /> : <span className="text-gray-600">—</span>}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {row.enterprise ? <Check size={18} className="mx-auto text-green-500" /> : <span className="text-gray-600">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <motion.div 
          className="max-w-4xl mx-auto bg-gradient-to-br from-pulse-900/50 to-purple-900/30 rounded-3xl p-8 md:p-12 border border-pulse-800/50 backdrop-blur-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Contact our sales team to learn more about Flow Enterprise and how we can enhance your development workflow.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-pulse-500 hover:bg-pulse-600 text-white py-3 px-8 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              Contact Sales
              <ArrowRight size={18} />
            </Link>
            <Link 
              to="/demo" 
              className="bg-white/10 hover:bg-white/20 text-white py-3 px-8 rounded-xl font-medium transition-colors duration-300 flex items-center justify-center gap-2"
            >
              Schedule Demo
            </Link>
          </div>
        </motion.div>
      </section>
      
      <Footer />
    </div>
  );
};

// Features data
const features = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Private model integration, secure data handling, and compliance with your organization's security requirements."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Advanced collaboration tools for development teams with role-based permissions and access controls."
  },
  {
    icon: Zap,
    title: "Custom AI Models",
    description: "Integrate your own AI models and fine-tune them for your specific development needs and codebases."
  },
  {
    icon: BarChart3,
    title: "Development Analytics",
    description: "Detailed insights and reporting on code quality, productivity, and AI usage across your organization."
  },
  {
    icon: Building2,
    title: "Custom Integrations",
    description: "Seamlessly integrate Flow with your existing development tools, CI/CD pipelines, and workflows."
  },
  {
    icon: Lock,
    title: "Dedicated Support",
    description: "Priority support with guaranteed response times and dedicated account management."
  }
];

// Table data
const tableRows = [
  { feature: "Flow Editor Access", standard: true, business: true, enterprise: true },
  { feature: "AI Agent Integration", standard: true, business: true, enterprise: true },
  { feature: "Local Model Support", standard: true, business: true, enterprise: true },
  { feature: "Team Collaboration", standard: false, business: true, enterprise: true },
  { feature: "Private Repository Access", standard: false, business: true, enterprise: true },
  { feature: "Custom AI Models", standard: false, business: false, enterprise: true },
  { feature: "Development Analytics", standard: false, business: false, enterprise: true },
  { feature: "Dedicated Support", standard: false, business: false, enterprise: true },
  { feature: "SLA Guarantees", standard: false, business: false, enterprise: true },
  { feature: "Custom Integrations", standard: false, business: false, enterprise: true }
];

export default Enterprise;
