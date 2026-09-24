/**
 * MH Rahul – Web Developer Portfolio Data
 * ==========================================================
 * EDITABLE CONTENT CONFIGURATION
 * Edit this file to update any information across the portfolio.
 * All sections (hero, about, skills, services, projects, social links, contact)
 * are dynamically populated from this object.
 * ==========================================================
 */

window.PORTFOLIO_DATA = {
  // ==========================================
  // 1. GENERAL & PROFILE INFO
  // ==========================================
  profile: {
    name: "MH Rahul",
    shortLabel: "MH RAHUL",
    role: "Web Developer",
    heroHeading: "I’m a",
    highlightWord: "Web Developer",
    bioShort: "Passionate Full-Stack Web Developer specialized in architecting high-performance websites, robust PHP/MySQL applications, and interactive modern user experiences with pixel-perfect attention to detail.",
    profilePhoto: "assets/images/profile.png",
    backgroundPhoto: "assets/images/hero_bg.jpg",
    showBackgroundPhoto: true,
    backgroundPhotoOpacity: 0.38,
    backgroundPhotoStyle: "cyber-ambient",
    location: "Dhaka, Bangladesh · Remote Worldwide",
    availability: "Available for New Projects & Full-time Roles",
    yearsExperience: 5,
    completedProjects: 85,
    happyClients: 60,
    technologiesCount: 20,
    resumeUrl: "#contact"
  },

  // ==========================================
  // 2. ABOUT ME
  // ==========================================
  about: {
    title: "About Me",
    subtitle: "Turning Complex Ideas Into Elegant, High-Performance Web Realities",
    introParagraph: "Hello! I'm MH Rahul, a results-driven Web Developer with over 5 years of hands-on experience building fast, scalable, and visually captivating websites and web applications.",
    descriptionParagraph: "My core expertise revolves around modern front-end craftsmanship (HTML5, CSS3, JavaScript ES6+, Bootstrap 5) and solid, secure back-end architecture (PHP, MySQL, RESTful APIs). I have built end-to-end e-commerce engines, custom CMS platforms, administrative dashboards, and responsive web portals for startups, digital agencies, and enterprise clients worldwide.",
    highlights: [
      {
        icon: "fa-solid fa-code",
        title: "Clean & Modern Code",
        description: "Writing maintainable, modular, and standards-compliant code with best industry practices."
      },
      {
        icon: "fa-solid fa-bolt",
        title: "Performance & SEO",
        description: "Ultra-fast load speeds, optimized asset pipelines, and structured SEO-friendly markup."
      },
      {
        icon: "fa-solid fa-shield-halved",
        title: "Security & Reliability",
        description: "Implementing CSRF protection, SQL injection prevention, and bulletproof input sanitization."
      },
      {
        icon: "fa-solid fa-mobile-screen-button",
        title: "Fluid Responsiveness",
        description: "Flawless rendering and touch-optimized interfaces across smartphones, tablets, and desktops."
      }
    ]
  },

  // ==========================================
  // 3. SKILLS
  // ==========================================
  skills: [
    {
      id: "html",
      name: "HTML5",
      category: "frontend",
      level: 95,
      icon: "fa-brands fa-html5",
      iconColor: "#e34f26",
      description: "Semantic markup, accessibility (WCAG), modern HTML5 APIs & audio/video."
    },
    {
      id: "css",
      name: "CSS3",
      category: "frontend",
      level: 92,
      icon: "fa-brands fa-css3-alt",
      iconColor: "#1572b6",
      description: "Flexbox, CSS Grid, custom properties, animations, and responsive styling."
    },
    {
      id: "bootstrap",
      name: "Bootstrap 5",
      category: "frontend",
      level: 95,
      icon: "fa-brands fa-bootstrap",
      iconColor: "#7952b3",
      description: "Modern grid system, responsive utilities, customized themes, and UI components."
    },
    {
      id: "javascript",
      name: "JavaScript (ES6+)",
      category: "frontend",
      level: 90,
      icon: "fa-brands fa-js",
      iconColor: "#f7df1e",
      description: "Asynchronous programming, DOM manipulation, closures, event-driven architecture."
    },
    {
      id: "jquery",
      name: "jQuery",
      category: "frontend",
      level: 88,
      icon: "fa-solid fa-code-merge",
      iconColor: "#0769ad",
      description: "Interactive UI plugins, seamless DOM animation, legacy modernization & event delegation."
    },
    {
      id: "php",
      name: "PHP",
      category: "backend",
      level: 88,
      icon: "fa-brands fa-php",
      iconColor: "#777bb4",
      description: "Object-oriented PHP, MVC architecture, authentication, secure session handling."
    },
    {
      id: "mysql",
      name: "MySQL",
      category: "backend",
      level: 86,
      icon: "fa-solid fa-database",
      iconColor: "#4479a1",
      description: "Database normalization, indexing, complex joins, PDO prepared statements."
    },
    {
      id: "ajax",
      name: "Ajax",
      category: "backend",
      level: 90,
      icon: "fa-solid fa-arrows-rotate",
      iconColor: "#00f0ff",
      description: "Real-time client-server communication without page reload, Fetch API, FormData."
    },
    {
      id: "rest-api",
      name: "REST API",
      category: "tools",
      level: 92,
      icon: "fa-solid fa-network-wired",
      iconColor: "#10b981",
      description: "Designing, building, and consuming RESTful endpoints, JSON, webhook orchestration."
    },
    {
      id: "git",
      name: "Git / GitHub",
      category: "tools",
      level: 90,
      icon: "fa-brands fa-git-alt",
      iconColor: "#f05032",
      description: "Version control, branching workflows, pull requests, CI/CD and deployment setups."
    }
  ],

  // ==========================================
  // 4. SERVICES
  // ==========================================
  services: [
    {
      id: "web-dev",
      number: "01",
      icon: "fa-solid fa-laptop-code",
      title: "Website Development",
      description: "Custom, ultra-fast and standards-compliant websites tailored to your exact brand identity and business objectives.",
      features: ["Custom semantic markup", "Full responsiveness", "Speed & Core Web Vitals optimization", "Cross-browser compatibility"]
    },
    {
      id: "ecommerce",
      number: "02",
      icon: "fa-solid fa-cart-shopping",
      title: "E-commerce Development",
      description: "Complete online shopping stores featuring catalog browsing, cart systems, order tracking, and high-conversion checkouts.",
      features: ["Product catalog & filtering", "Cart & checkout workflows", "Customer order tracking", "Inventory management"]
    },
    {
      id: "php-mysql",
      number: "03",
      icon: "fa-solid fa-server",
      title: "PHP/MySQL Development",
      description: "Robust dynamic database-driven backends with scalable relational data architecture, PDO security, and clean business logic.",
      features: ["Relational schema design", "Fast database queries", "CRUD operations & validation", "Security hardening (SQLi/XSS)"]
    },
    {
      id: "admin-panel",
      number: "04",
      icon: "fa-solid fa-gauge-high",
      title: "Admin Panel Development",
      description: "Intuitive bespoke administrative dashboards providing full control over business data, users, analytics, and content.",
      features: ["Role-based access control (RBAC)", "Interactive visual charts", "Data export (CSV / PDF)", "Real-time activity logs"]
    },
    {
      id: "api-integration",
      number: "05",
      icon: "fa-solid fa-diagram-project",
      title: "API Integration",
      description: "Connecting third-party platforms, external microservices, SMS notification gateways, and automated webhook listeners.",
      features: ["Third-party API integration", "Custom JSON API design", "Webhook automated listeners", "Rate-limiting & caching"]
    },
    {
      id: "payment-gateways",
      number: "06",
      icon: "fa-solid fa-credit-card",
      title: "Payment Gateway Integration",
      description: "Secure, PCI-compliant payment integrations supporting global and local gateways with instant IPN verification.",
      features: ["Stripe & PayPal setups", "Local gateway support", "Instant payment notifications (IPN)", "Automated receipt dispatch"]
    },
    {
      id: "android-webview",
      number: "07",
      icon: "fa-brands fa-android",
      title: "Android WebView Apps",
      description: "Packaging responsive web applications into lightweight, native-feeling Android apps with offline caching and push notifications.",
      features: ["Native Android app wrapper", "Splash screen & app icons", "Pull-to-refresh & offline banner", "Play Store ready APK/AAB"]
    },
    {
      id: "custom-web-apps",
      number: "08",
      icon: "fa-solid fa-cubes",
      title: "Custom Web Applications",
      description: "Bespoke SaaS tools, booking systems, CRM platforms, and client portals built precisely around your company's workflows.",
      features: ["Tailored business workflows", "Automated email notifications", "Multi-tier user accounts", "Ongoing technical support"]
    }
  ],

  // ==========================================
  // 5. PROJECTS
  // ==========================================
  projects: [
    {
      id: "nexshop",
      name: "NexShop – Multi-Vendor E-Commerce Platform",
      category: "ecommerce",
      categoryLabel: "E-Commerce",
      image: "assets/images/project1.jpg",
      description: "A comprehensive modern e-commerce solution featuring live search filtering, multi-currency cart, customer reviews, and integrated Stripe/PayPal payments.",
      technologies: ["PHP 8", "MySQL", "JavaScript ES6", "Bootstrap 5", "Ajax", "Stripe API"],
      liveUrl: "#",
      githubUrl: "https://github.com/mhrahul",
      featured: true,
      stats: "2.4k+ Active Orders / Month"
    },
    {
      id: "novacrm",
      name: "NovaCRM – Enterprise Cloud Admin Suite",
      category: "admin",
      categoryLabel: "Admin Panel",
      image: "assets/images/project2.jpg",
      description: "Interactive SaaS administration portal with customizable real-time analytics dashboards, role-based employee permissions, and automated billing generation.",
      technologies: ["PHP", "MySQL", "Chart.js", "Bootstrap 5", "Ajax REST", "Export Engine"],
      liveUrl: "#",
      githubUrl: "https://github.com/mhrahul",
      featured: true,
      stats: "99.9% Uptime & Fast Response"
    },
    {
      id: "devnexus",
      name: "DevNexus – REST API Gateway & Hub",
      category: "api",
      categoryLabel: "API Integration",
      image: "assets/images/project3.jpg",
      description: "High-performance API developer portal featuring live interactive endpoint testing, token authentication, webhooks orchestration, and rate-limiting analytics.",
      technologies: ["PHP", "MySQL", "JavaScript", "cURL", "JSON REST", "Bootstrap 5"],
      liveUrl: "#",
      githubUrl: "https://github.com/mhrahul",
      featured: true,
      stats: "150ms Average Latency"
    },
    {
      id: "apexpay",
      name: "ApexPay – Multi-Gateway Payment Terminal",
      category: "ecommerce",
      categoryLabel: "Payment Gateway",
      image: "assets/images/project1.jpg",
      description: "Modular checkout bridge supporting Stripe, PayPal, and regional gateways with instant webhook verification, invoice dispatch, and fraud checking.",
      technologies: ["PHP", "MySQL", "Stripe SDK", "PayPal IPN", "jQuery", "Bootstrap 5"],
      liveUrl: "#",
      githubUrl: "https://github.com/mhrahul",
      featured: false,
      stats: "Zero Failed Transactions"
    },
    {
      id: "alphaportal",
      name: "AlphaPortal – Client Booking & Billing CMS",
      category: "fullstack",
      categoryLabel: "Full-Stack Web App",
      image: "assets/images/project2.jpg",
      description: "Custom online booking and appointment management system with client calendar synchronization, automated SMS alerts, and dynamic invoices.",
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Twilio SMS"],
      liveUrl: "#",
      githubUrl: "https://github.com/mhrahul",
      featured: false,
      stats: "500+ Bookings Automated"
    },
    {
      id: "webmatrix-android",
      name: "WebMatrix – Android Hybrid WebView App",
      category: "fullstack",
      categoryLabel: "Android WebView",
      image: "assets/images/project3.jpg",
      description: "Lightweight Android WebView solution wrapping complex web platforms into slick, fast, Google Play-ready Android application packages.",
      technologies: ["Android SDK", "Java/Kotlin", "WebView API", "HTML5/CSS3", "Push Notifications"],
      liveUrl: "#",
      githubUrl: "https://github.com/mhrahul",
      featured: false,
      stats: "4.8/5.0 User Rating"
    }
  ],

  // ==========================================
  // 6. EXPERIENCE TIMELINE
  // ==========================================
  experience: [
    {
      period: "2023 – Present",
      role: "Lead Full-Stack Web Developer",
      company: "Freelance & Global Digital Clients",
      location: "Remote",
      description: "Architecting bespoke web applications, e-commerce stores, and admin dashboards for international startups and businesses. Providing complete lifecycle engineering from wireframes to deployment.",
      achievements: [
        "Delivered 35+ successful production websites with 100% on-time completion.",
        "Optimized client database queries, cutting page load times by up to 60%.",
        "Integrated multi-currency payment solutions across 5 different national banking standards."
      ]
    },
    {
      period: "2021 – 2023",
      role: "Senior Web Developer",
      company: "TechHive Solutions Ltd.",
      location: "Dhaka, Bangladesh",
      description: "Spearheaded the core web engineering team, translating client business requirements into scalable PHP/MySQL applications, custom CMS modules, and modern responsive frontend interfaces.",
      achievements: [
        "Built modular PHP framework components adopted company-wide across 20+ client projects.",
        "Standardized front-end Bootstrap 5 design systems reducing development cycles by 30%.",
        "Mentored 6 junior developers in clean code practices and RESTful API integration."
      ]
    },
    {
      period: "2019 – 2021",
      role: "Frontend & UI Developer",
      company: "CreativePixel Digital Agency",
      location: "Dhaka, Bangladesh",
      description: "Crafted high-fidelity responsive websites, landing pages, interactive micro-sites, and user interfaces using HTML5, CSS3, JavaScript, jQuery, and Bootstrap.",
      achievements: [
        "Converted 70+ Figma and Photoshop designs into pixel-perfect responsive code.",
        "Ensured cross-browser compatibility and mobile responsiveness across all devices.",
        "Achieved 95+ Google PageSpeed Insights scores on all delivered landing pages."
      ]
    }
  ],

  // ==========================================
  // 7. SOCIAL LINKS & DIRECT CHANNELS
  // ==========================================
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/mhrahul",
      icon: "fa-brands fa-github",
      label: "github.com/mhrahul",
      color: "#ffffff"
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/8801700000000",
      icon: "fa-brands fa-whatsapp",
      label: "+880 1700-000000",
      color: "#25d366"
    },
    {
      name: "Telegram",
      url: "https://t.me/mhrahul_dev",
      icon: "fa-brands fa-telegram",
      label: "@mhrahul_dev",
      color: "#0088cc"
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@mhrahul",
      icon: "fa-brands fa-youtube",
      label: "@mhrahul",
      color: "#ff0000"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/mhrahul",
      icon: "fa-brands fa-linkedin-in",
      label: "MH Rahul",
      color: "#0a66c2"
    }
  ],

  // ==========================================
  // 8. CONTACT INFORMATION
  // ==========================================
  contact: {
    email: "contact.mhrahul@gmail.com",
    phone: "+880 1700-000000",
    address: "Dhaka, Bangladesh",
    whatsappDirect: "https://wa.me/8801700000000?text=Hello%20MH%20Rahul,%20I%20would%20like%20to%20discuss%20a%20project.",
    telegramDirect: "https://t.me/mhrahul_dev",
    workingHours: "Monday – Saturday: 9:00 AM – 10:00 PM (GMT+6)",
    responseTime: "Guaranteed reply within 2 hours"
  }
};
