import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, Sparkles, Droplets, Shield, Heart, Leaf, Star, Phone, Mail, MapPin, Package, ChevronDown, FlaskConical, Workflow, Factory, FileCheck2, Handshake } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { MessageCircle } from "lucide-react";
import './App.css';

export default function SafediXWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const phoneNumber = '1234567890'; // Replace with your WhatsApp number (country code + number)
  const message = 'Hello! I would like to connect with you.'; // Optional pre-filled message
  
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [counts, setCounts] = useState({
    years: 0,
    customers: 0,
    germRemoval: 0,
    quality: 0
  });
  const [isVisible, setIsVisible] = useState({});
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function validateForm(form) {
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    // 👤 Name validation
    const nameRegex = /^[A-Z][a-z]{1,}(?:\s[A-Z][a-z]{1,})+$/;
    if (!nameRegex.test(name)) {
      return "Please enter a proper full name (Eg: Fardin Unnen)";
    }

    // 📞 Phone validation (India)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return "Please enter a valid 10-digit phone number";
    }

    // 💬 Message length validation
    if (message.length < 20) {
      return "Message should be at least 20 characters long";
    }

    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const form = e.target;
    const validationError = validateForm(form);

    if (validationError) {
      setError(validationError);
      return;
    }

    const response = await fetch("https://formspree.io/f/mlgdvdpv", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });

    if (response.ok) {
      setSuccess("Thanks! We’ll get back to you soon.");
      form.reset();
    } else {
      setError("Something went wrong. Please try again.");
    }
  }

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target === statsRef.current) {
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const targets = { years: 15, customers: 20, germRemoval: 20, quality: 100 };
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCounts({
        years: Math.floor(targets.years * progress),
        customers: Math.floor(targets.customers * progress),
        germRemoval: Math.floor(targets.germRemoval * progress),
        quality: Math.floor(targets.quality * progress)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const features = [
    {
      icon: <Workflow className="w-12 h-12" />,
      title: "End-to-End Execution, Simplified",
      description: "BharatNest manages the complete product lifecycle—from ideation and formulation to packaging, manufacturing, logistics, and market launch—allowing you to focus on growth while we handle the operational complexity."
    },
    {
      icon: <FlaskConical className="w-12 h-12" />,
      title: "Strong R&D Capability",
      description: "With in-house food product research and development, we specialize in new product formulation, continuous improvement, and innovation-driven solutions aligned with market and regulatory needs."
    },
    {
      icon: <Factory className="w-12 h-12" />,
      title: "Global Certified Manufacturing Network",
      description: "We work with audited and internationally compliant manufacturing partners across multiple countries, ensuring consistent quality, scalability, and export-ready production standards."
    },
    {
      icon: <Package className="w-12 h-12" />,
      title: "Branding & Packaging Expertise",
      description: "Our team delivers professional private-label branding and packaging designs that are visually compelling, shelf-ready, and optimized for modern retail and global markets."
    },
    {
      icon: <FileCheck2 className="w-12 h-12" />,
      title: "Regulatory & Compliance Support",
      description: "BharatNest provides country-specific certification guidance, export documentation assistance, and quality system support to ensure smooth and compliant market entry."
    },
    {
      icon: <Handshake className="w-12 h-12" />,
      title: "Trusted Private-Label Partner",
      description: "More than a sourcing company, BharatNest acts as a strategic partner—helping brands build, scale, and launch products with confidence across global markets."
    }
  ];

  const benefits = [
    "No investment required in manufacturing infrastructure",
    "Reduced time-to-market",
    "Lower operational and compliance burden",
    "Professional packaging supporting premium positioning",
    "Scalable capacity across multiple manufacturers",
    "Dedicated project and supply-chain coordination"
  ];

  const products = [
    {
      name: "Beverages",
    },
    {
      name: "Instant drink and food mixes",
    },
    {
      name: "Snacks",
    },
    {
      name: "Staples and grocery products",
    },
    {
      name: "Personal care products",
    },
    {
      name: "Home care & cleaning products",
    },
    {
      name: "Packaging products",
    },
    {
      name: "Consumer goods",
    }
  ];

  const faqs = [
    {
      question: "What services does BharatNest Industries Pvt. Ltd. provide?",
      answer: "BharatNest Industries Pvt. Ltd. offers end-to-end ODM (Original Design Manufacturing) and OEM (Original Equipment Manufacturing) solutions across food and non-food categories. Our services include product development, sourcing, branding and packaging, regulatory compliance, quality control, and supply-chain coordination."
    },
    {
      question: "Does BharatNest own manufacturing facilities?",
      answer: "No. BharatNest operates through a global network of audited and certified manufacturing partners. This asset-light model allows us to provide flexible, scalable, and cost-efficient manufacturing solutions while maintaining strict quality and compliance standards."
    },
    {
      question: "Which product categories do you support?",
      answer: (
        <>
          <p>We support both food and non-food categories, including:</p>

          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>Food:</strong> Beverages, premixes, instant mixes, snacks,
              staples, and FMCG products
            </li>
            <li>
              <strong>Non-Food:</strong> Personal care, home care, consumer goods,
              packaging products, and industrial supplies
            </li>
          </ul>
        </>
      )
    },

    {
      question: "What is the difference between ODM and OEM services?",
      answer: (
        <>
          <p>
            We offer both <strong>ODM (Original Design Manufacturing)</strong> and{" "}
            <strong>OEM (Original Equipment Manufacturing)</strong> solutions:
          </p>

          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>
              <strong>ODM:</strong> We conceptualize, formulate, design, and deliver
              ready-to-market products under the client’s brand.
            </li>
            <li>
              <strong>OEM:</strong> We manufacture products based on the client’s
              existing specifications and technical requirements through our
              certified partner factories.
            </li>
          </ul>
        </>
      )
    },

    {
      question: "How does BharatNest ensure quality and regulatory compliance?",
      answer: (
        <>
          <p>
            We ensure consistent quality and compliance through a structured,
            multi-layered approach:
          </p>

          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>
              Collaboration with <strong>audited and certified manufacturing partners</strong>
            </li>
            <li>
              <strong>Quality control</strong> and lab testing coordination
            </li>
            <li>
              Support for <strong>FSSAI and statutory registrations</strong>
            </li>
            <li>
              <strong>Country-specific regulatory</strong> and export documentation
            </li>
          </ul>
        </>
      )
    },

    {
      question: "Who can partner with BharatNest Industries Pvt. Ltd.?",
      answer: (
        <>
          <p>
            We work with a wide range of organizations across industries and scales,
            including:
          </p>

          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>
              <strong>Brand owners</strong> and private-label companies
            </li>
            <li>
              <strong>Startups</strong> and emerging businesses
            </li>
            <li>
              <strong>Retailers</strong> and distributor networks
            </li>
            <li>
              <strong>Hospitality groups</strong> and institutional buyers
            </li>
            <li>
              <strong>Exporters</strong> and trading companies
            </li>
          </ul>
        </>
      )
    }

  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-50px) rotate(180deg); }
        }
        .float-animation {
            animation: float 20s infinite;
        }
        .float-delay-1 {
            animation-delay: 0s;
        }
        .float-delay-2 {
            animation-delay: 5s;
        }
        .float-delay-3 {
            animation-delay: 10s;
        }
        @keyframes glow {
            0%, 100% { filter: drop-shadow(0 0 20px rgba(20, 184, 166, 0.5)); }
            50% { filter: drop-shadow(0 0 40px rgba(251, 146, 60, 0.8)); }
        }
        .glow-animation {
            animation: glow 3s ease-in-out infinite;
        }
        .shine-effect::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s;
        }
        .shine-effect:hover::before {
            left: 100%;
        `}
      </style>


      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            {/* Logo */}
            <div className="shrink-0">
              <div className="flex items-center gap-0">
                {/* Logo Image */}
                <img
                  src="/BharatNest.png"
                  alt="BharatNest Logo"
                  className="h-20 w-20 object-contain"
                />

                {/* Brand Text */}
                <div className="flex flex-col leading-tight">
                  <div className="text-xl font-extrabold tracking-tight text-gray-900">
                    BharatNest
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    Industries Pvt. Ltd.
                  </div>
                </div>
              </div>
            </div>


            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-teal-600 transition-all font-medium hover:scale-105">Home</a>
              <a href="#features" className="text-gray-700 hover:text-teal-600 transition-all font-medium hover:scale-105">Features</a>
              <a href="#products" className="text-gray-700 hover:text-teal-600 transition-all font-medium hover:scale-105">Products</a>
              <a href="#benefits" className="text-gray-700 hover:text-teal-600 transition-all font-medium hover:scale-105">Benefits</a>
              <a href="#faq" className="text-gray-700 hover:text-teal-600 transition-all font-medium hover:scale-105">FAQ</a>
              <a href="#contact" className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl font-medium hover:scale-105">
                Contact Us
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-900 hover:text-teal-600 transition-colors p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="py-4 space-y-3 border-t border-gray-100">
              <a
                href="#home"
                className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#features"
                className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#products"
                className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Products
              </a>
              <a
                href="#benefits"
                className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Benefits
              </a>
              <a
                href="#faq"
                className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                FAQ
              </a>
              <a
                href="#contact"
                className="block px-4 py-2 bg-linear-to-r from-orange-500 to-orange-600 text-white text-center rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-emerald-800 to-teal-700 relative overflow-hidden">

        {/* Decorative elements */}

        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-300 rounded-full opacity-20 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div class="inset-0 pointer-events-none overflow-hidden">
          <div class="absolute w-48 h-48 bg-teal-500 rounded-full opacity-10 top-[10%] left-[10%] float-animation float-delay-1"></div>
          <div class="absolute w-36 h-36 bg-orange-500 rounded-full opacity-10 top-[60%] right-[15%] float-animation float-delay-2"></div>
          <div class="absolute w-24 h-24 bg-green-500 rounded-full opacity-10 bottom-[20%] left-[20%] float-animation float-delay-3"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div className="space-y-6">
              <div className="inline-flex items-center bg-linear-to-r from-orange-100 to-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-semibold opacity-100 translate-y-0">
                ✨BharatNest Industries Pvt. Ltd.
              </div>
              <h1 className="text-4xl sm:text-5xl  lg:text-6xl font-black text-gray-900 leading-tight">
                <span className="block  bg-linear-to-r from-white via-green-100 to-orange-400 bg-clip-text text-transparent fade-in-right" style={{ animationDelay: '0.2s' }}>Sourcing And</span>
                <span className="block  bg-linear-to-r from-white via-green-100 to-orange-400 bg-clip-text text-transparent fade-in-right" style={{ animationDelay: '0.3s' }}>Private-Label</span>
                <span className="block bg-linear-to-r from-white via-green-100 to-orange-400 bg-clip-text text-transparent fade-in-up ">Solutions</span>
              </h1>
              <p className="text-lg sm:text-xl font-serif text-white leading-relaxed fade-in-up" style={{ animationDelay: '0.5s' }}>
                Integrated product development, sourcing, and private label solutions across food and non-food categories.
              </p>
              <div className=" flex flex-col sm:flex-row gap-4 pt-6 sm:pt-4 fade-in-up w-full px-4 sm:px-0" style={{ animationDelay: '0.6s' }}>
                <a href="#features" className="inline-block w-full sm:w-auto text-center px-10 py-5 sm:py-4 bg-linear-to-r from-orange-400 to-orange-600 text-white text-lg font-bold rounded-full shadow-[0_10px_30px_rgba(251,146,60,0.4)] hover:shadow-[0_15px_40px_rgba(251,146,60,0.6)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden shine-effect no-underline self-center sm:self-auto">
                  Discover Features
                </a>
                <a href="#contact" className="bg-white text-teal-600 px-8 py-4 rounded-full hover:bg-gray-50 transition-all border-2 border-teal-600 flex items-center justify-center gap-2 text-lg font-semibold shadow-lg hover:scale-105">
                  Get in Touch
                </a>
              </div>
            </div>



            {/* Product Showcase */}
            <div className="relative fade-in-right" style={{ animationDelay: '0.3s' }}>
              <div className="bg-linear-to-br from-teal-500 to-teal-700 rounded-3xl p-8 sm:p-12 shadow-2xl transform hover:scale-105 transition-transform duration-500 hover-float">
                <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-xl">

                  <div className="text-6xl sm:text-8xl mb-4 animate-bounce-subtle">📦</div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">BharatNest</h3>
                  <p className="text-gray-600 font-medium">Product Development And Sourcing</p>
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 fill-orange-400 star-pulse" />
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 fill-orange-400 star-pulse" style={{ animationDelay: '0.1s' }} />
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 fill-orange-400 star-pulse" style={{ animationDelay: '0.2s' }} />
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 fill-orange-400 star-pulse" style={{ animationDelay: '0.3s' }} />
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 fill-orange-400 star-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-orange-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold shadow-lg transform rotate-12 hidden sm:block hover:rotate-6 transition-transform text-sm sm:text-base">
                #1 Choice
              </div>
              <div className="absolute -bottom-4 -left-4 bg-teal-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold shadow-lg transform -rotate-12 hidden sm:block hover:-rotate-6 transition-transform text-sm sm:text-base">
                Eco-Friendly
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}

      <section ref={statsRef} className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-3xl sm:text-4xl font-black text-teal-600">{counts.years}+</div>
              <div className="text-gray-600 font-medium mt-1 text-sm sm:text-base">Years Experience</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-3xl sm:text-4xl font-black text-orange-600">{counts.customers}K+</div>
              <div className="text-gray-600 font-medium mt-1 text-sm sm:text-base">Happy Customers</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-3xl sm:text-4xl font-black text-teal-600">{counts.germRemoval}+</div>
              <div className="text-gray-600 font-medium mt-1 text-sm sm:text-base">Product Categories</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-3xl sm:text-4xl font-black text-orange-600">{counts.quality}%</div>
              <div className="text-gray-600 font-medium mt-1 text-sm sm:text-base">Quality Assured</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-animate id="features-header">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 transition-all duration-1000 ${isVisible['features-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Why Choose <span className="text-teal-600">Bharat Nest</span>?
            </h2>
            <p className={`text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible['features-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Strategic expertise, reliable sourcing, and end-to-end private-label execution.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                data-animate
                id={`feature-${idx}`}
                className={`bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-teal-200 ${isVisible[`feature-${idx}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="text-teal-600 mb-4 transform hover:scale-110 hover:rotate-12 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Carousel Section */}
      <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12" data-animate id="products-header">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 transition-all duration-1000 ${isVisible['products-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Our Product <span className="text-orange-600">Categories</span>
            </h2>
            <p className={`text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible['products-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              We offer ODM and OEM services across a wide range of food products,
            </p>
          </div>

          <div className="relative px-4 sm:px-12">
            <Carousel
              opts={{ align: "start", loop: true }}
              plugins={[Autoplay({ delay: 3000 })]}
              className="w-full"
            >
              <CarouselContent className="-ml-2 sm:-ml-4">
                {products.map((product, index) => (
                  <CarouselItem key={index} className="pl-2 sm:pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <div className="bg-linear-to-br from-orange-50 via-white to-teal-50 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-orange-100 relative overflow-hidden group">
                        <div className="absolute top-4 right-4 bg-linear-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold transform rotate-3 group-hover:rotate-0 transition-transform">
                          {product.badge}
                        </div>
                        <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                          <Package className="w-16 h-16 text-teal-600 mx-auto" />
                        </div>
                        <div className="text-center">
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                          <div className="text-3xl sm:text-4xl font-black text-teal-600 mb-2">{product.size}</div>
                          <p className="text-gray-600 mb-4 text-sm sm:text-base">{product.description}</p>
                          <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">{product.price}</div>
                          <button className="w-full bg-linear-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base">
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>

          <div className="flex justify-center gap-2 mt-6 sm:hidden">
            {products.map((_, idx) => (
              <div key={idx} className="w-2 h-2 rounded-full bg-teal-300"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-teal-600 to-teal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-animate id="benefits-content">
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-8 transition-all duration-1000 ${isVisible['benefits-content'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                Why Partner With Us
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:translate-x-2 ${isVisible['benefits-content'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    <div className="shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center mt-1">
                      <ChevronRight className="w-4 h-4 text-teal-600" />
                    </div>
                    <p className="text-base sm:text-lg font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 lg:p-12 rounded-3xl border border-white/20" data-animate id="benefits-sizes">
              <h3 className={`text-2xl sm:text-3xl font-bold mb-6 transition-all duration-1000 ${isVisible['benefits-sizes'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>Our Promise💡</h3>
              <p className={`text-base sm:text-lg text-white leading-relaxed mb-6 transition-all duration-1000 delay-200 ${isVisible['benefits-sizes'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                We promise innovation backed by strong R&D, consistency supported by globally compliant manufacturing partners, and solutions tailored to your market needs.
                Every product we support is developed with a focus on safety, scalability, and long-term brand value.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12" data-animate id="faq-header">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 transition-all duration-1000 ${isVisible['faq-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Frequently Asked <span className="text-orange-600">Questions</span>
            </h2>
            <p className={`text-lg sm:text-xl text-gray-600 transition-all duration-1000 delay-200 ${isVisible['faq-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Everything you need to know about BharatNest
            </p>
          </div>

          <div data-animate id="faq-accordion" className={`transition-all duration-1000 ${isVisible['faq-accordion'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-orange-50 transition-colors">
                    <span className="text-base sm:text-lg font-bold text-gray-900 pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center" data-animate id="about-content">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6 transition-all duration-1000 ${isVisible['about-content'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            Trusted by Millions
          </h2>
          <p className={`text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 transition-all duration-1000 delay-200 ${isVisible['about-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <strong>BharatNest Industries Pvt. Ltd.</strong> operates as a comprehensive solutions provider specializing in <strong>Original Design Manufacturing (ODM)</strong> and <strong>Original Equipment Manufacturing (OEM).</strong>
            We enable organizations to build and expand their product portfolios without capital investment in manufacturing facilities.
          </p>
          <p className={`text-base sm:text-lg text-gray-600 leading-relaxed transition-all duration-1000 delay-400 ${isVisible['about-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            We collaborate with reliable, compliant, and certified partner manufacturers while managing product development, sourcing, quality control, and
            logistics execution on behalf of our clients.

          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12" data-animate id="contact-header">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 transition-all duration-1000 ${isVisible['contact-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Get in Touch
            </h2>
            <p className={`text-lg sm:text-xl text-gray-600 transition-all duration-1000 delay-200 ${isVisible['contact-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Have questions? We'd love to hear from you.
            </p>
          </div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {[
              { icon: <Phone className="w-6 sm:w-8 h-6 sm:h-8 text-teal-600" />, title: 'Call Us', content: '+91 9136044030', href: 'tel:+919136044030' },
              { icon: <Mail className="w-6 sm:w-8 h-6 sm:h-8 text-teal-600" />, title: 'Email Us', content: 'Bharatnestconsumer@gmail.com', href: 'Bharatnestconsumer@gmail.com' },
              { icon: <MapPin className="w-6 sm:w-8 h-6 sm:h-8 text-teal-600" />, title: 'Visit Us', content: 'Bharthnest Industries', href: 'https://www.google.com/maps?q=19.0101337,73.0336838' }
            ].map((item, idx) => (
              <div
                key={idx}
                data-animate
                id={`contact-${idx}`}
                className={`bg-white p-6 sm:p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${isVisible[`contact-${idx}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="bg-orange-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">{item.title}</h3>
                <a href={item.href} className="text-teal-600 hover:underline break-all text-sm sm:text-base">{item.content}</a>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 sm:p-8 lg:p-12 rounded-2xl shadow-xl" data-animate id="contact-form">
            <form onSubmit={handleSubmit} className={`space-y-6 transition-all duration-1000 ${isVisible['contact-form'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all text-sm sm:text-base"
                    placeholder="Your name" required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all text-sm sm:text-base"
                    placeholder="your@email.com" required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all text-sm sm:text-base"
                  placeholder="+91 00000 00000" required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all text-sm sm:text-base"
                  placeholder="How can we help you?" required
                ></textarea>
              </div>
              <input type="text" name="_gotcha" className="hidden" />

              {error && <p className="text-red-600 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">{success}</p>}
              <button
                type="submit"
                className="w-full bg-linear-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Send Message
              </button>

            </form>
             <div className="fixed bottom-6 right-6 z-50">
     
        {/* Mobile: Just icon */}
        <div className="lg:hidden p-4">
          <svg
            className="w-7 h-7"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </div>

        {/* Desktop: Pill with icon and text */}
       
<script src="https://elfsightcdn.com/platform.js" async></script>
<div class="elfsight-app-21b3f5d5-3f76-488b-a7d6-dca317cbe8f8" data-elfsight-app-lazy></div>
     
    </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 sm:col-span-1">
              <div className="text-2xl font-black text-white mb-3">
                <span className="text-white">BharatNest</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your Global ODM & OEM Partner for Food and Non-Food Manufacturing
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3 text-sm sm:text-base">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#home" className="hover:text-orange-400 transition-colors">Home</a></li>
                <li><a href="#features" className="hover:text-orange-400 transition-colors">Features</a></li>
                <li><a href="#products" className="hover:text-orange-400 transition-colors">Products</a></li>
                <li><a href="#benefits" className="hover:text-orange-400 transition-colors">Benefits</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3 text-sm sm:text-base">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-orange-400 transition-colors">About Us</a></li>
                <li><a href="#faq" className="hover:text-orange-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3 text-sm sm:text-base">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="tel:+918130206718" className="hover:text-orange-400 transition-colors">+91 9136044030</a></li>
                <li><a href="mailto:bharatnestconsumer@gmail.com" className="hover:text-orange-400 transition-colors break-all">bharatnestconsumer@gmail.com</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2026 Bharthnest Industries Pvt Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}