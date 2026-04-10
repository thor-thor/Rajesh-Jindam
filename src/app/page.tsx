"use client";

import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const NAV_LINKS = [
  { href: "#about",      label: "About"      },
  { href: "#skills",     label: "Skills"     },
  { href: "#projects",   label: "Projects"   },
  { href: "#experience", label: "Experience" },
  { href: "#education",  label: "Education"  },
  { href: "#resume",    label: "Resume"    },
  { href: "#contact",    label: "Contact"   },
];

const SKILLS = [
  {
    icon: "🐍",
    title: "Backend & AI",
    color: "purple",
    tags: ["Python", "FastAPI", "Django", "Flask", "Node.js", "Express.js", "Rasa NLP", "REST APIs"],
  },
  {
    icon: "⚛️",
    title: "Frontend",
    color: "cyan",
    tags: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    icon: "🗄️",
    title: "Databases",
    color: "pink",
    tags: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma ORM"],
  },
  {
    icon: "☁️",
    title: "Cloud & DevOps",
    color: "green",
    tags: ["AWS", "Docker", "Git", "GitHub Actions", "Vercel", "Linux"],
  },
  {
    icon: "🔮",
    title: "AI / ML",
    color: "orange",
    tags: ["Rasa", "NLP", "Machine Learning", "Scikit-learn", "OpenAI API", "Langchain"],
  },
  {
    icon: "🛠️",
    title: "Tools & Others",
    color: "purple",
    tags: ["VS Code", "Postman", "Figma", "Jira", "WebSockets", "Multer", "JWT"],
  },
];

const PROJECTS = [
  {
    id: "talentsphere",
    title: "TalentSphere - AI Job Portal",
    category: "Full-Stack AI Platform",
    status: "Production-Ready",
    emoji: "💼",
    gradient: "linear-gradient(135deg, #0c1a12 0%, #064e3b 50%, #0f172a 100%)",
    accentColor: "#10b981",
    desc: "An AI-enhanced job portal with role-based authentication for job seekers, recruiters, and admins.",
    features: [
      "Integrated basic NLP techniques to match resumes with relevant job postings",
      "Intelligent job recommendation system using user preferences and profile data",
      "Designed PostgreSQL database schema ensuring efficient data retrieval and scalability",
      "Built RESTful APIs for job listings, applications, and company management",
    ],
    tech: ["React", "Node.js", "Express", "PostgreSQL", "NLP", "REST APIs"],
    github: "https://github.com/thor-thor/TalentSphere--AI-based-Job-Portal.git",
    demo: "https://github.com/thor-thor/TalentSphere--AI-based-Job-Portal.git",
  },
  {
    id: "cctv-iot",
    title: "Python CCTV IoT Dashboard",
    category: "IoT / Backend",
    status: "Production-Ready",
    emoji: "🚆",
    gradient: "linear-gradient(135deg, #1a0533 0%, #3b1d8a 50%, #0a0a1f 100%)",
    accentColor: "#8b5cf6",
    desc: "A production-grade IoT dashboard for railway CCTV monitoring with Python-based scalable APIs and PostgreSQL persistence.",
    features: [
      "Scalable Python (FastAPI) microservices for CCTV stream management",
      "Optimised PostgreSQL schema for asset, station & incident tracking",
      "Structured logging, exception handling and health-check endpoints",
      "Unit-tested API layer with 90%+ coverage following production standards",
    ],
    tech: ["Python", "FastAPI", "PostgreSQL", "Docker", "REST APIs", "Pytest", "SQLAlchemy"],
    github: "https://github.com/thor-thor/Python-CCTV-IOT.git",
    demo: "https://github.com/thor-thor/Python-CCTV-IOT.git",
  },
  {
    id: "trendora",
    title: "Trendora - E-Commerce Platform",
    category: "Full-Stack Web Application",
    status: "In Progress",
    emoji: "🛒",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #0f172a 100%)",
    accentColor: "#6366f1",
    desc: "A full-stack e-commerce platform using MERN stack with secure JWT-based authentication supporting 500+ users.",
    features: [
      "Built scalable RESTful APIs for product, cart, and order management using Node.js and Express.js",
      "Integrated MongoDB for efficient data storage and optimized queries, improving response time by 30%",
      "Implemented user-friendly UI with React.js, enhancing user experience and seamless navigation",
      "Secure JWT-based authentication system",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "REST APIs"],
    github: "https://github.com/thor-thor/Trendora",
    demo: "http://localhost:3000",
  },
];

const EXPERIENCE = [
  {
    emoji: "🚀",
    role: "Full Stack Developer",
    company: "Freelance / Self-employed",
    period: "2024 – Present",
    desc: "Designing and building full-stack web applications and AI-integrated platforms for clients across job-tech and IoT domains. Leading end-to-end architecture, API design, database modelling, and frontend implementation.",
  },
  {
    emoji: "🤖",
    role: "AI Feature Engineer",
    company: "TalentSphere (Project Lead)",
    period: "2024 – Present",
    desc: "Architected and integrated an AI chatbot using Rasa NLP into a job portal platform. Built conversational intelligence for job search, skill suggestions, and application guidance with dynamic database-driven responses.",
  },
  {
    emoji: "📡",
    role: "Backend Engineer",
    company: "IoT CCTV Railway Monitor (Project Lead)",
    period: "2024",
    desc: "Developed production-ready Python REST APIs for a railway IoT monitoring dashboard. Designed an optimised PostgreSQL schema, implemented structured logging, unit testing and containerised deployment with Docker.",
  },
];

const EDUCATION = [
  {
    emoji: "🎓",
    degree: "Master of Computer Application (MCA)",
    school: "KJEI's Trinity Academy of Engineering, Pune",
    year: "2024 – 2026 (Pursuing)",
  },
  {
    emoji: "🎓",
    degree: "Bachelor of Science (B.Sc)",
    school: "Osmania University, Hyderabad",
    year: "2021 – 2024 | CGPA: 8.77",
  },
];

const CERTIFICATIONS = [
  {
    emoji: "🎯",
    title: "Complete Full Stack Development",
    provider: "Udemy",
    color: "#a435f0",
  },
  {
    emoji: "🗄️",
    title: "SQL (Basic to Advanced)",
    provider: "SkillNation",
    color: "#007bff",
  },
  {
    emoji: "📊",
    title: "Advanced Excel and PowerBI",
    provider: "SkillNation",
    color: "#217346",
  },
];

function useInView(threshold = 0.1) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref);
        }
      },
      { threshold }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return { ref: setRef, isVisible };
}

function useTilt() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return ref;
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useInView(0.1);
  return (
    <div ref={ref} className={`${className} ${isVisible ? "animate-fade-in-up" : ""}`} style={{ opacity: isVisible ? 1 : 0 }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <nav
      className="navbar"
      style={{
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div className="container navbar-inner">
        <a href="/#home" className="navbar-logo" id="nav-logo">
          RJ<span style={{ opacity: 0.5 }}>.dev</span>
        </a>
        <ul className="navbar-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link">{link.label}</a>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <span className="moon">🌙</span>
            <span className="sun">☀️</span>
          </button>
          <a href="/#resume" className="btn btn-outline" style={{ padding: "0.55rem 1.25rem", fontSize: "0.82rem" }}>
            Resume 📄
          </a>
          <a href="/#contact" className="btn btn-primary" id="nav-cta" style={{ padding: "0.55rem 1.25rem", fontSize: "0.82rem" }}>
            Hire Me ✉️
          </a>
        </div>
      </div>
    </nav>
  );
}

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <div
      className="cursor-glow"
      style={{
        left: position.x,
        top: position.y,
        opacity: visible ? 1 : 0,
      }}
    />
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content animate-fade-in-up">
          <div className="hero-badge">
            <span className="dot" />
            Available for Work
          </div>

          <h1 className="hero-title">
            Hi, I&apos;m{" "}
            <span className="text-gradient">Rajesh Jindam</span>
            <br />
            Full Stack &amp; AI Engineer
          </h1>

          <p className="hero-subtitle">
            I build scalable, AI-powered web applications — from intelligent job
            portals to production-grade IoT dashboards. Turning complex problems
            into beautiful, functional products.
          </p>

          <div className="hero-actions">
            <a href="/#projects" className="btn btn-primary" id="hero-view-work">
              View My Work 🚀
            </a>
            <a href="/#contact" className="btn btn-outline" id="hero-contact">
              Let&apos;s Talk 💬
            </a>
            <a
              href="https://github.com/thor-thor"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              id="hero-github"
            >
              GitHub ↗
            </a>
          </div>

          <div className="hero-stats">
            {[
              { value: "3+", label: "Projects Shipped" },
              { value: "5+", label: "Tech Stacks" },
              { value: "AI", label: "Integrated Systems" },
              { value: "100%", label: "Passion" },
            ].map((s, i) => (
              <div className={`stat stagger-${i + 1}`} key={s.label} style={{ opacity: 0, animation: `fadeInUp 0.6s ease forwards`, animationDelay: `${0.5 + i * 0.15}s` }}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ background: "var(--bg-secondary)" }}>
      <div className="container">
        <div className="about-grid">
          {/* Avatar */}
          <div className="about-image-wrapper animate-fade-in">
            <div className="about-glow" />
            <div className="about-avatar">
              <span style={{ zIndex: 1 }}>👨‍💻</span>
            </div>
          </div>

          {/* Content */}
          <div className="about-content animate-fade-in-up">
            <div className="section-tag">About Me</div>
            <h2>
              Crafting digital experiences with{" "}
              <span className="text-gradient">code&nbsp;&amp;&nbsp;AI</span>
            </h2>
            <p>
              I&apos;m a Full Stack Developer and AI Engineer with a deep passion
              for building products that actually solve problems. I specialise in
              Python back-ends, React front-ends, and integrating AI capabilities
              to create intelligent, user-centric applications.
            </p>
            <p>
              From architecting scalable REST APIs and PostgreSQL databases to
              wiring up Rasa NLP chatbots and building real-time dashboards — I
              love the full spectrum of the stack. My projects have tackled
              real-world domains like recruitment tech and railway IoT monitoring.
            </p>
            <p>
              I write clean, maintainable code, follow production standards (unit
              tests, structured logging, Docker), and I&apos;m always learning the
              next thing on the horizon.
            </p>

            <div className="about-highlights">
              {[
                { icon: "🎯", title: "Problem Solver", desc: "Complex → Simple" },
                { icon: "⚡", title: "Fast Learner", desc: "Adapt to any stack" },
                { icon: "🤝", title: "Team Player", desc: "Collaborative coder" },
                { icon: "✨", title: "Detail-Oriented", desc: "Quality matters" },
              ].map((h) => (
                <div className="highlight-item" key={h.title}>
                  <span className="highlight-icon">{h.icon}</span>
                  <div className="highlight-text">
                    <strong>{h.title}</strong>
                    <span>{h.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <div className="section-header animate-fade-in-up">
          <div className="section-tag">Tech Stack</div>
          <h2 className="section-title">
            Skills &amp; <span className="text-gradient">Technologies</span>
          </h2>
          <div className="divider" />
          <p className="section-desc">
            A versatile toolkit spanning the full development lifecycle — from
            backend APIs and databases to AI models and beautiful front-ends.
          </p>
        </div>

        <div className="skills-grid">
          {SKILLS.map((cat, i) => (
            <div 
              className="card skill-category" 
              key={cat.title}
              style={{ 
                opacity: 0, 
                animation: `fadeInUp 0.6s ease forwards`,
                animationDelay: `${0.2 + i * 0.1}s`
              }}
            >
              <h3>
                <span>{cat.icon}</span>
                {cat.title}
              </h3>
              <div className="skill-list">
                {cat.tags.map((tag, j) => (
                  <span
                    key={tag}
                    className={`skill-tag ${cat.color}`}
                    style={{ animationDelay: `${0.3 + i * 0.1 + j * 0.05}s` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ background: "var(--bg-secondary)" }}>
      <div className="container">
        <div className="section-header animate-fade-in-up">
          <div className="section-tag">Portfolio</div>
          <h2 className="section-title">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="divider" />
          <p className="section-desc">
            Real-world applications built end-to-end — spanning AI integration,
            full-stack web development, and production-grade APIs.
          </p>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <article 
              className="project-card" 
              key={project.id} 
              id={`project-${project.id}`}
              style={{ 
                opacity: 0, 
                animation: `fadeInUp 0.6s ease forwards`,
                animationDelay: `${0.2 + i * 0.15}s`
              }}
            >
              {/* Banner */}
              <div className="project-banner">
                <div
                  className="project-banner-bg"
                  style={{ background: project.gradient }}
                />
                {/* Decorative blobs */}
                <div
                  style={{
                    position: "absolute",
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${project.accentColor}33, transparent)`,
                    top: 10,
                    right: 20,
                    filter: "blur(20px)",
                  }}
                />
                <span className="project-banner-icon">{project.emoji}</span>
              </div>

              {/* Content */}
              <div className="project-content">
                <div className="project-meta">
                  <span className="project-category">{project.category}</span>
                  <span className="project-status">{project.status}</span>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>

                <ul className="project-features">
                  {project.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>

                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>

                <div className="project-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link primary"
                    id={`${project.id}-github`}
                  >
                    GitHub ↗
                  </a>
                  <a
                    href={project.demo}
                    className="project-link secondary"
                    id={`${project.id}-demo`}
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <div className="section-header animate-fade-in-up">
          <div className="section-tag">Experience</div>
          <h2 className="section-title">
            Work <span className="text-gradient">History</span>
          </h2>
          <div className="divider" />
          <p className="section-desc">
            Building real products, solving real problems — one project at a time.
          </p>
        </div>

        <div className="timeline">
          {EXPERIENCE.map((exp, i) => (
            <div className="timeline-item" key={i} id={`exp-${i}`}>
              <div className="timeline-dot">{exp.emoji}</div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="timeline-role">{exp.role}</span>
                  <span className="timeline-period">{exp.period}</span>
                </div>
                <div className="timeline-company">{exp.company}</div>
                <p className="timeline-desc">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" style={{ background: "var(--bg-secondary)" }}>
      <div className="container">
        <div className="section-header animate-fade-in-up">
          <div className="section-tag">Education</div>
          <h2 className="section-title">
            Learning <span className="text-gradient">Journey</span>
          </h2>
          <div className="divider" />
        </div>

        <div className="education-grid">
          {EDUCATION.map((edu, i) => (
            <div className="edu-card" key={i} id={`edu-${i}`}>
              <div className="edu-icon">{edu.emoji}</div>
              <div>
                <div className="edu-degree">{edu.degree}</div>
                <div className="edu-school">{edu.school}</div>
                <div className="edu-year">{edu.year}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="certifications-section">
          <h3 className="certifications-title">Certifications</h3>
          <div className="certifications-grid">
            {CERTIFICATIONS.map((cert, i) => (
              <div className="cert-card" key={i} style={{ borderColor: `${cert.color}30`, background: `${cert.color}08` }}>
                <div className="cert-icon-wrapper" style={{ background: cert.color }}>
                  <span className="cert-icon">{cert.emoji}</span>
                </div>
                <div className="cert-content">
                  <div className="cert-title">{cert.title}</div>
                  <div className="cert-provider" style={{ color: cert.color }}>{cert.provider}</div>
                </div>
                <div className="cert-badge" style={{ background: cert.color }}>Verified</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/mnjoywvd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setFormState({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-wrapper">
          {/* Left */}
          <div className="contact-info animate-fade-in-up">
            <div className="section-tag">Contact</div>
            <h2>
              Let&apos;s Build Something{" "}
              <span className="text-gradient">Amazing</span>
            </h2>
            <p>
              Have a project in mind or want to collaborate? I&apos;m always open
              to discussing new opportunities, freelance work, or just an
              interesting tech conversation.
            </p>

            <div className="contact-items">
              {[
                {
                  id: "contact-email",
                  icon: "📧",
                  bg: "rgba(99,102,241,0.15)",
                  label: "Email",
                  value: "rajeshjindam1803@gmail.com",
                  href: "mailto:rajeshjindam1803@gmail.com",
                },
                {
                  id: "contact-github",
                  icon: "🐙",
                  bg: "rgba(139,92,246,0.15)",
                  label: "GitHub",
                  value: "github.com/thor-thor",
                  href: "https://github.com/thor-thor",
                },
                {
                  id: "contact-linkedin",
                  icon: "💼",
                  bg: "rgba(34,211,238,0.12)",
                  label: "LinkedIn",
                  value: "linkedin.com/in/rajesh-jindam-4570a2264",
                  href: "https://www.linkedin.com/in/rajesh-jindam-4570a2264",
                },
                {
                  id: "contact-phone",
                  icon: "📱",
                  bg: "rgba(249,115,22,0.12)",
                  label: "Phone",
                  value: "+91 8688461228",
                  href: "tel:+918688461228",
                },
                {
                  id: "contact-location",
                  icon: "📍",
                  bg: "rgba(16,185,129,0.12)",
                  label: "Location",
                  value: "India 🇮🇳",
                  href: "#contact",
                },
              ].map((item) => (
                <a
                  key={item.id}
                  id={item.id}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="contact-item"
                >
                  <div className="contact-icon" style={{ background: item.bg }}>
                    {item.icon}
                  </div>
                  <div className="contact-item-text">
                    <strong>{item.label}</strong>
                    <span>{item.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="contact-form animate-fade-in">
            {submitted ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  minHeight: 300,
                  gap: "1rem",
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: "3rem" }}>🎉</span>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    background: "var(--gradient-primary)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Message Sent!
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="contact-form">
                <h3
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    marginBottom: "1.5rem",
                    color: "var(--text-primary)",
                  }}
                >
                  Send a Message ✉️
                </h3>

                <div className="form-group">
                  <label htmlFor="form-name">Name</label>
                  <input
                    id="form-name"
                    type="text"
                    placeholder="Your name"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, name: e.target.value }))
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="form-email">Email</label>
                  <input
                    id="form-email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="form-message">Message</label>
                  <textarea
                    id="form-message"
                    rows={5}
                    placeholder="Tell me about your project or idea..."
                    required
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                  />
                </div>

                <button type="submit" className="btn btn-primary" id="form-submit" style={{ width: "100%", justifyContent: "center" }} disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message 🚀"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <a href="/#about">About</a>
          <a href="/#skills">Skills</a>
          <a href="/#projects">Projects</a>
          <a href="/#experience">Experience</a>
          <a href="/#education">Education</a>
          <a href="/#resume">Resume</a>
          <a href="/#contact">Contact</a>
        </div>
        <p suppressHydrationWarning>
          © {year} Rajesh Jindam — Built with <span>♥</span> using Next.js 16 and Tailwind CSS v4.
        </p>
        <p style={{ fontSize: "0.78rem", opacity: 0.6, marginTop: "0.5rem" }}>
          Full Stack Developer · AI Engineer · Open to Opportunities
        </p>
      </div>
    </footer>
  );
}

function Resume() {
  return (
    <section id="resume">
      <div className="container">
        <div className="section-header animate-fade-in-up">
          <div className="section-tag">Resume</div>
          <h2 className="section-title">
            Get My <span className="text-gradient">Resume</span>
          </h2>
          <div className="divider" />
          <p className="section-desc">
            Download my resume to learn more about my experience and skills.
          </p>
        </div>

        <div className="resume-content" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
          <div className="resume-preview" style={{ 
            background: "var(--bg-card)", 
            border: "1px solid var(--border)", 
            borderRadius: "var(--radius-xl)", 
            padding: "2rem",
            marginBottom: "2rem"
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "Full Stack & AI Engineer", value: "2+ Years Experience" },
                { label: "Tech Stack", value: "Python, React, Node.js, AI/ML" },
                { label: "Projects", value: "3+ Production Apps" },
                { label: "Open to", value: "Full-time & Freelance" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{item.label}</span>
                  <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <a 
            href="/rajesh-jindam-resume.pdf"
            download="Rajesh-Jindam-Resume.pdf"
            className="btn btn-primary"
            style={{ padding: "1rem 2.5rem", fontSize: "1rem" }}
          >
            📄 Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
        <Resume />
      </main>
      <Footer />
    </>
  );
}
