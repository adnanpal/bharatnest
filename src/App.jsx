import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, Sparkles, Droplets, Shield, Heart, Leaf, Star, Phone, Mail, MapPin, Package, ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import './App.css';

export default function SafediXWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    const targets = { years: 10, customers: 5, germRemoval: 99.9, quality: 100 };
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCounts({
        years: Math.floor(targets.years * progress),
        customers: Math.floor(targets.customers * progress),
        germRemoval: (targets.germRemoval * progress).toFixed(1),
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
      icon: <Sparkles className="w-12 h-12" />,
      title: "Superior Whiteness",
      description: "Advanced formula that removes tough stains while keeping your whites brilliantly white wash after wash."
    },
    {
      icon: <Droplets className="w-12 h-12" />,
      title: "Deep Cleaning Power",
      description: "Penetrates deep into fabric fibers to remove dirt, grime, and odors effectively in all water types."
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Fabric Protection",
      description: "Gentle on fabrics while tough on stains. Maintains fabric quality and extends garment life."
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Skin Friendly",
      description: "Dermatologically tested formula that's safe for sensitive skin and gentle on hands."
    },
    {
      icon: <Leaf className="w-12 h-12" />,
      title: "Eco-Conscious",
      description: "Biodegradable ingredients that are safe for the environment without compromising cleaning power."
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: "Long-Lasting Freshness",
      description: "Infused with refreshing fragrance that keeps clothes smelling fresh for days."
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
      name: "SAFEDI X Starter",
      size: "500g",
      price: "₹99",
      description: "Perfect for trying our premium formula",
      badge: "Trial Pack"
    },
    {
      name: "SAFEDI X Family",
      size: "1kg",
      price: "₹179",
      description: "Ideal for small to medium families",
      badge: "Popular"
    },
    {
      name: "SAFEDI X Value",
      size: "2kg",
      price: "₹329",
      description: "Best value for regular use",
      badge: "Best Value"
    },
    {
      name: "SAFEDI X Jumbo",
      size: "5kg",
      price: "₹749",
      description: "Maximum savings for large families",
      badge: "Save More"
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
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            {/* Logo */}
            <div className="shrink-0 logo-bounce">
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
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-all font-medium hover:scale-105">Home</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-all font-medium hover:scale-105">Features</a>
              <a href="#products" className="text-gray-700 hover:text-blue-600 transition-all font-medium hover:scale-105">Products</a>
              <a href="#benefits" className="text-gray-700 hover:text-blue-600 transition-all font-medium hover:scale-105">Benefits</a>
              <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-all font-medium hover:scale-105">FAQ</a>
              <a href="#contact" className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-medium hover:scale-105">
                Contact Us
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-900 hover:text-blue-600 transition-colors p-2"
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
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#features"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#products"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Products
              </a>
              <a
                href="#benefits"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Benefits
              </a>
              <a
                href="#faq"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                FAQ
              </a>
              <a
                href="#contact"
                className="block px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold opacity-100 translate-y-0">
                ✨BharatNest Industries Pvt. Ltd.
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                <span className="block fade-in-up" style={{ animationDelay: '0.2s' }}>Sourcing And</span>
                <span className="block text-blue-600 fade-in-up" style={{ animationDelay: '0.3s' }}>Private-Label</span>
                <span className="block bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent fade-in-up md:typing-effect">Solutions</span>
              </h1>
              <p className="text-lg sm:text-2xl text-gray-600 leading-relaxed fade-in-up" style={{ animationDelay: '0.5s' }}>
                Integrated product development, sourcing, and private label solutions across food and non-food categories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 fade-in-up" style={{ animationDelay: '0.6s' }}>
                <a href="#features" className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105">
                  Discover Features <ChevronRight size={20} />
                </a>
                <a href="#contact" className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-50 transition-all border-2 border-blue-600 flex items-center justify-center gap-2 text-lg font-semibold shadow-lg hover:scale-105">
                  Get in Touch
                </a>
              </div>
            </div>

            {/* Product Showcase */}
            <div className="relative fade-in-right" style={{ animationDelay: '0.3s' }}>
              <div className="bg-linear-to-br from-blue-500 to-blue-700 rounded-3xl p-8 sm:p-12 shadow-2xl transform hover:scale-105 transition-transform duration-500 hover-float">
                <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-xl">
                  <div className="text-6xl sm:text-8xl mb-4 animate-bounce-subtle">🧺</div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">SAFEDI X</h3>
                  <p className="text-gray-600 font-medium">Premium Detergent Powder</p>
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-yellow-400 star-pulse" />
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-yellow-400 star-pulse" style={{ animationDelay: '0.1s' }} />
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-yellow-400 star-pulse" style={{ animationDelay: '0.2s' }} />
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-yellow-400 star-pulse" style={{ animationDelay: '0.3s' }} />
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-yellow-400 star-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold shadow-lg transform rotate-12 hidden sm:block hover:rotate-6 transition-transform text-sm sm:text-base">
                #1 Choice
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-400 text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold shadow-lg transform -rotate-12 hidden sm:block hover:-rotate-6 transition-transform text-sm sm:text-base">
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
              <div className="text-3xl sm:text-4xl font-black text-blue-600">{counts.years}+</div>
              <div className="text-gray-600 font-medium mt-1 text-sm sm:text-base">Years Experience</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-3xl sm:text-4xl font-black text-blue-600">{counts.customers}M+</div>
              <div className="text-gray-600 font-medium mt-1 text-sm sm:text-base">Happy Customers</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-3xl sm:text-4xl font-black text-blue-600">{counts.germRemoval}%</div>
              <div className="text-gray-600 font-medium mt-1 text-sm sm:text-base">Germ Removal</div>
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <div className="text-3xl sm:text-4xl font-black text-blue-600">{counts.quality}%</div>
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
              Why Choose <span className="text-blue-600">Bharat Nest</span>?
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
                className={`bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 ${isVisible[`feature-${idx}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="text-blue-600 mb-4 transform hover:scale-110 hover:rotate-12 transition-transform">
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
              Our Product <span className="text-blue-600">Categories</span>
            </h2>
            <p className={`text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible['products-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Choose the perfect size for your family's needs
            </p>
          </div>

          <div className="relative px-4 sm:px-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-2 sm:-ml-4">
                {products.map((product, index) => (
                  <CarouselItem key={index} className="pl-2 sm:pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <div className="bg-linear-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-blue-100 relative overflow-hidden group">
                        {/* Badge */}
                        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold transform rotate-3 group-hover:rotate-0 transition-transform">
                          {product.badge}
                        </div>

                        {/* Icon */}
                        <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                          <Package className="w-16 h-16 text-blue-600 mx-auto" />
                        </div>

                        {/* Content */}
                        <div className="text-center">
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                          <div className="text-3xl sm:text-4xl font-black text-blue-600 mb-2">{product.size}</div>
                          <p className="text-gray-600 mb-4 text-sm sm:text-base">{product.description}</p>
                          <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">{product.price}</div>
                          <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base">
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

          {/* Mobile carousel indicators */}
          <div className="flex justify-center gap-2 mt-6 sm:hidden">
            {products.map((_, idx) => (
              <div key={idx} className="w-2 h-2 rounded-full bg-blue-300"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
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
                      <ChevronRight className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-base sm:text-lg font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 lg:p-12 rounded-3xl border border-white/20" data-animate id="benefits-sizes">
              <h3 className={`text-2xl sm:text-3xl font-bold mb-6 transition-all duration-1000 ${isVisible['benefits-sizes'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>Perfect for Every Wash</h3>
              <p className={`text-base sm:text-lg text-blue-100 leading-relaxed mb-6 transition-all duration-1000 delay-200 ${isVisible['benefits-sizes'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Whether it's everyday wear or your favorite whites, SAFEDI X delivers outstanding results every time.
                Our advanced formula is designed to work efficiently in all washing conditions.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {['500g', '1kg', '2kg', '5kg'].map((size, idx) => (
                  <div
                    key={idx}
                    className={`bg-white/10 p-4 rounded-xl text-center transform hover:scale-110 transition-all duration-300 hover:bg-white/20 ${isVisible['benefits-sizes'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${(idx + 3) * 100}ms` }}
                  >
                    <div className="text-2xl sm:text-3xl font-black">{size}</div>
                    <div className="text-xs sm:text-sm text-blue-100 mt-1">{['Starter', 'Family', 'Value', 'Jumbo'][idx]} Pack</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12" data-animate id="faq-header">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 transition-all duration-1000 ${isVisible['faq-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Frequently Asked <span className="text-blue-600">Questions</span>
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
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-blue-50 transition-colors">
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
              { icon: <Phone className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />, title: 'Call Us', content: '+91 81302 06718', href: 'tel:+918130206718' },
              { icon: <Mail className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />, title: 'Email Us', content: 'contact@bharthnest.com', href: 'mailto:contact@bharthnest.com' },
              { icon: <MapPin className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />, title: 'Visit Us', content: 'Bharthnest Industries', href: '#' }
            ].map((item, idx) => (
              <div
                key={idx}
                data-animate
                id={`contact-${idx}`}
                className={`bg-white p-6 sm:p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${isVisible[`contact-${idx}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">{item.title}</h3>
                <a href={item.href} className="text-blue-600 hover:underline break-all text-sm sm:text-base">{item.content}</a>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm sm:text-base"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm sm:text-base"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm sm:text-base"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm sm:text-base"
                  placeholder="How can we help you?" required
                ></textarea>
              </div>
              <input type="text" name="_gotcha" className="hidden" />

              {error && <p className="text-red-600 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">{success}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Send Message
              </button>

            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 sm:col-span-1">
              <div className="text-2xl font-black text-white mb-3">
                <span className="text-blue-400">Bharat</span>Nest
              </div>
              <p className="text-gray-400 text-sm">
                Premium detergent powder for superior cleaning and care.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3 text-sm sm:text-base">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#home" className="hover:text-blue-400 transition-colors">Home</a></li>
                <li><a href="#features" className="hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#products" className="hover:text-blue-400 transition-colors">Products</a></li>
                <li><a href="#benefits" className="hover:text-blue-400 transition-colors">Benefits</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3 text-sm sm:text-base">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#faq" className="hover:text-blue-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3 text-sm sm:text-base">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="tel:+918130206718" className="hover:text-blue-400 transition-colors">+91 81302 06718</a></li>
                <li><a href="mailto:contact@bharthnest.com" className="hover:text-blue-400 transition-colors break-all">contact@bharthnest.com</a></li>
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