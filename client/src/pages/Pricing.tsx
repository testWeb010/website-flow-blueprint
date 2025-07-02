import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, X, ChevronDown, ArrowRight, Shield, Zap, Clock, Users, Star, Sparkles, Cpu, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [showComparison, setShowComparison] = useState(false);
  
  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const plans = [
    {
      name: "Basic",
      description: "For individual developers",
      monthlyPrice: "Free",
      yearlyPrice: "Free",
      savings: "Free Tier",
      features: [
        "Full Flow Editor Access",
        "AI Agent Integration",
        "Local Model Support",
        "Community Support",
        "GitHub Source Access",
        "Regular Updates"
      ],
      popular: false,
      color: "from-blue-400 to-blue-600",
      icon: <Shield className="w-6 h-6" />,
      cta: "Download Now"
    },
    {
      name: "Team",
      description: "For professional development teams",
      monthlyPrice: "$15",
      yearlyPrice: "$149", 
      savings: "Save $31",
      features: [
        "All Community Features",
        "Team Collaboration Tools",
        "Advanced AI Models",
        "Priority Support", 
        "Private Repository Access",
        "Custom Extensions",
        "Workflow Integrations",
        "Usage Analytics"
      ],
      popular: true,
      color: "from-pulse-400 to-pulse-600",
      icon: <Zap className="w-6 h-6" />,
      cta: "Get Started"
    },
    {
      name: "Enterprise",
      description: "Customized for large organizations",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      savings: "",
      features: [
        "All Team Features",
        "Enterprise Deployment",
        "Custom Development",
        "24/7 Dedicated Support",
        "SLA Guarantees",
        "On-site Training",
        "Custom Integrations",
        "Security Compliance"
      ],
      popular: false,
      color: "from-purple-400 to-purple-600",
      icon: <Users className="w-6 h-6" />,
      cta: "Contact Sales"
    }
  ];

  // Comparison table data
  const comparisonFeatures = [
    { name: "Flow Editor Access", personal: "✓", professional: "✓", enterprise: "✓" },
    { name: "AI Agent Integration", personal: "Basic", professional: "Advanced", enterprise: "Enterprise-grade" },
    { name: "Local Model Support", personal: "✓", professional: "✓", enterprise: "✓" },
    { name: "Team Collaboration", personal: "✕", professional: "✓", enterprise: "✓" },
    { name: "Custom Extensions", personal: "Limited", professional: "Full", enterprise: "Full + Custom" },
    { name: "Support Response Time", personal: "Community", professional: "24 hours", enterprise: "4 hours" },
    { name: "Custom Development", personal: "✕", professional: "Limited", enterprise: "Full Access" },
    { name: "Training Resources", personal: "Documentation", professional: "Webinars", enterprise: "On-site" },
    { name: "Usage Analytics", personal: "Basic", professional: "Advanced", enterprise: "Enterprise" },
    { name: "Security Compliance", personal: "Standard", professional: "Enhanced", enterprise: "Custom" },
  ];

  // FAQ data
  const faqs = [
    {
      question: "What makes Flow different from other code editors?",
      answer: "Flow is an advanced code editor that allows you to use AI agents on your codebase, checkpoint and visualize changes, and bring any model or host locally. Flow sends messages directly to providers without retaining your data, ensuring your privacy."
    },
    {
      question: "Can I upgrade my plan later?",
      answer: "Absolutely! You can upgrade from Community to Team or Enterprise at any time. When you upgrade, we'll prorate the remaining time on your current plan and apply it to your new plan."
    },
    {
      question: "Is Flow really free for individual use?",
      answer: "Yes! The Basic edition of Flow is completely free for individual use. You can download and use it without any cost."
    },
    {
      question: "What kind of support is included?",
      answer: "Basic users have access to documentation and community forums, Team plans receive priority email support with 24-hour response time, and Enterprise plans include dedicated support channels with guaranteed response times."
    },
    {
      question: "Can I customize Flow for my needs?",
      answer: "Our Team and Enterprise plans offer various levels of customization to meet your specific needs. Contact our support team to discuss your requirements."
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "Flow has transformed our development workflow. The AI agents help us write better code faster while maintaining our privacy standards.",
      author: "Sarah Chen",
      role: "Lead Developer, TechLabs",
      avatar: "/avatars/sarah.jpg"
    },
    {
      quote: "The Enterprise plan allowed us to deploy Flow across our entire engineering team with custom integrations for our security requirements.",
      author: "Michael Rodriguez",
      role: "CTO, Innovate Software",
      avatar: "/avatars/michael.jpg"
    },
    {
      quote: "Even the free Community version exceeded my expectations. Perfect for my open-source contributions and personal projects.",
      author: "Jamie Park",
      role: "Independent Developer",
      avatar: "/avatars/jamie.jpg"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-pulse-900/30 border border-pulse-500/20 text-pulse-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Transparent pricing, powerful features</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-display">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-400 to-blue-500">Flow</span> Plan
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Flexible pricing options for individuals, teams, and enterprises with advanced features and support.
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-dark-800/50 p-1 rounded-full flex items-center">
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === "monthly"
                    ? "bg-pulse-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-gray-200"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === "yearly"
                    ? "bg-pulse-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-gray-200"
                }`}
                onClick={() => setBillingCycle("yearly")}
              >
                Yearly <span className="text-xs opacity-80 ml-1">Save 20%</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <motion.div 
            className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                className={`relative glass-card border border-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                  plan.popular ? "lg:scale-105 z-10" : ""
                }`}
              >
                {/* Card Header with Gradient */}
                <div className={`bg-gradient-to-r ${plan.color} p-6 relative overflow-hidden`}>
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),rgba(255,255,255,0))]"></div>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        {plan.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    </div>
                    
                    {plan.popular && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium">
                        <Star className="w-3 h-3 mr-1 fill-white" />
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-white">
                        {billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                      </span>
                      {plan.name !== "Enterprise" && (
                        <span className="ml-2 text-sm text-white/70">
                          /{billingCycle === "monthly" ? "month" : "year"}
                        </span>
                      )}
                    </div>
                    {plan.savings && billingCycle === "yearly" && (
                      <p className="text-sm text-white/80 mt-1">{plan.savings}</p>
                    )}
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-6">
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="w-5 h-5 text-pulse-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center group ${
                    plan.popular
                      ? "bg-pulse-500 text-white hover:bg-pulse-600"
                      : "border border-gray-700 text-gray-300 hover:border-pulse-500 hover:text-pulse-400"
                  }`}>
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Compare All Features Button */}
          <div className="text-center mt-12">
            <button 
              onClick={() => setShowComparison(!showComparison)}
              className="inline-flex items-center text-pulse-400 hover:text-pulse-300 font-medium transition-colors"
            >
              {showComparison ? "Hide comparison" : "Compare all features"}
              <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${showComparison ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </section>
      
      {/* Comparison Table (Conditionally Rendered) */}
      {showComparison && (
        <motion.section 
          className="py-12 px-4 sm:px-6 lg:px-8 bg-dark-900/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Features Comparison</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Compare all features across our plans to find the perfect fit for your needs
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Feature</th>
                    <th className="py-4 px-4 text-center">
                      <span className="block text-white font-bold">Personal</span>
                    </th>
                    <th className="py-4 px-4 text-center bg-dark-800/50">
                      <span className="block text-pulse-400 font-bold">Professional</span>
                    </th>
                    <th className="py-4 px-4 text-center">
                      <span className="block text-white font-bold">Enterprise</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, i) => (
                    <tr key={i} className="border-t border-gray-800/50">
                      <td className="py-4 px-4 text-gray-300 font-medium">{feature.name}</td>
                      <td className="py-4 px-4 text-center text-gray-400">
                        {feature.personal === "✓" ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : feature.personal === "✕" ? (
                          <X className="w-5 h-5 text-gray-600 mx-auto" />
                        ) : (
                          feature.personal
                        )}
                      </td>
                      <td className="py-4 px-4 text-center text-gray-300 bg-dark-800/50">
                        {feature.professional === "✓" ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : feature.professional === "✕" ? (
                          <X className="w-5 h-5 text-gray-600 mx-auto" />
                        ) : (
                          feature.professional
                        )}
                      </td>
                      <td className="py-4 px-4 text-center text-gray-400">
                        {feature.enterprise === "✓" ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : feature.enterprise === "✕" ? (
                          <X className="w-5 h-5 text-gray-600 mx-auto" />
                        ) : (
                          feature.enterprise
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>
      )}
      
      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-6 text-white">
              See what our customers are saying about Flow
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="glass-card border border-gray-800/50 p-6 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-1 mb-4 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-300 mb-6">"{testimonial.quote}"</blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-dark-700 mr-3 flex items-center justify-center text-white font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">FAQs</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to know about Flow and our pricing plans
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-800/50 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-medium text-white">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`} 
                  />
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="p-6 pt-0 text-gray-400">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-pulse-900/50 to-blue-900/50 rounded-3xl p-10 md:p-16 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pulse-500/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pulse-500/30 to-transparent"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-pulse-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-pulse-900/30 border border-pulse-500/20 text-pulse-400 text-sm font-medium mb-6">
                <Cpu className="w-4 h-4 mr-2" />
                <span>Next Generation Development</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to experience the future of coding?
              </h2>
              
              <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
                Join thousands of developers, engineers, and companies already using Flow to enhance productivity and create better code.
              </p>
              
              <div className="text-center max-w-3xl mx-auto mb-8">
                <h2 className="text-3xl font-bold mb-4 text-white">Ready to get started?</h2>
                <p className="text-gray-400 mb-8">
                  Join thousands of developers and teams already using Flow to transform their coding workflow.
                </p>
                <Link to="/signup" className="button-primary inline-flex items-center">
                  <span>Get started with Flow</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Pricing;
