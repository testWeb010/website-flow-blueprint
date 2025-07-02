import React, { useRef } from "react";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  gradient: string;
  backgroundImage?: string;
}

const testimonials: TestimonialProps[] = [{
  content: "Flow transformed our development process, handling repetitive tasks while our team focuses on innovation. 30% increase in productivity within three months.",
  author: "Sarah Chen",
  role: "VP of Engineering, Axion Software",
  gradient: "from-blue-700 via-indigo-800 to-purple-900",
  backgroundImage: "/background-section1.png"
}, {
  content: "Implementing Flow in our development teams reduced technical debt by 40% while improving code quality. The AI capabilities are remarkable.",
  author: "Michael Rodriguez",
  role: "CTO, GlobalTech",
  gradient: "from-indigo-900 via-purple-800 to-blue-500",
  backgroundImage: "/background-section2.png"
}, {
  content: "Flow adapted to our coding standards faster than any tool we've used. It's like having another developer who never gets tired and maintains perfect consistency.",
  author: "Dr. Amara Patel",
  role: "Lead Engineer, TechAdvance Research",
  gradient: "from-purple-800 via-blue-700 to-indigo-500",
  backgroundImage: "/background-section3.png"
}, {
  content: "As a mid-size business, we never thought advanced AI coding tools would be accessible to us. Flow changed that equation entirely with its versatility and ease of deployment.",
  author: "Jason Lee",
  role: "CEO, Innovative Solutions Inc.",
  gradient: "from-blue-600 via-indigo-500 to-purple-600",
  backgroundImage: "/background-section1.png"
}];

const TestimonialCard = ({
  content,
  author,
  role,
  backgroundImage = "/background-section1.png"
}: TestimonialProps) => {
  return <div className="bg-cover bg-center rounded-lg p-8 h-full flex flex-col justify-between text-white transform transition-transform duration-300 hover:-translate-y-2 relative overflow-hidden" style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${backgroundImage}')`
  }}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-black z-10"></div>
      
      <div className="relative z-0">
        <p className="text-xl mb-8 font-medium leading-relaxed pr-20">{`"${content}"`}</p>
        <div>
          <h4 className="font-semibold text-xl">{author}</h4>
          <p className="text-white/80">{role}</p>
        </div>
      </div>
    </div>;
};

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return <section className="py-12 bg-black relative" id="testimonials" ref={sectionRef}> {/* Reduced from py-20 */}
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="flex items-center gap-4 mb-6">
          <div className="pulse-chip">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">04</span>
            <span>Testimonials</span>
          </div>
        </div>
        
        <h2 className="text-5xl font-display font-bold mb-12 text-left text-white">What others say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => <TestimonialCard key={index} content={testimonial.content} author={testimonial.author} role={testimonial.role} gradient={testimonial.gradient} backgroundImage={testimonial.backgroundImage} />)}
        </div>
      </div>
    </section>;
};

export default Testimonials;
