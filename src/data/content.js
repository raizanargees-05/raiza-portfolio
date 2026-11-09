/**
 * Raiza Nargees - Portfolio Content Configuration
 * You can edit any text, links, projects, and skills directly in this file.
 */

export const personalData = {
  name: "RAIZA NARGEES",
  firstName: "RAIZA",
  lastName: "NARGEES",
  role: "First-year B.Tech Student, CSE (Artificial Intelligence)",
  college: "Thejus Engineering College",
  location: "Thrissur, Kerala, India",
  tagline: "Learning to build smart things that play back",
  heroSubtitleLine1: "FIRST-YEAR B.TECH CSE (AI) — THRISSUR, KERALA",
  heroSubtitleLine2: "LEARNING TO BUILD SMART THINGS THAT PLAY BACK",
  statusBadge: "OPEN TO INTERNSHIPS / PROJECTS",
  statusPillText: "● OPEN TO INTERNSHIPS & COLLABS",
  
  about: {
    headline: "First-year engineer exploring the sweet spot where intelligence meets interactive play.",
    paragraphs: [
      "Hey! I'm Raiza Nargees, a first-year Computer Science and Engineering student specializing in Artificial Intelligence at Thejus Engineering College in Thrissur, Kerala.",
      "I'm drawn to computers not just as calculating machines, but as reactive digital canvases. My goal is to master both algorithmic rigor—machine learning models, mathematical foundations, clean C and Python—and the art of crafting delightful web experiences that invite curiosity and play.",
      "When I'm not in lectures or debugging pointer syntax in C, you'll find me experimenting with neural network concepts, generative animations, and open-source creative technology."
    ],
    quickFacts: [
      { label: "DEGREE", value: "B.Tech CSE (AI)" },
      { label: "INSTITUTION", value: "Thejus Engg. College" },
      { label: "LOCATION", value: "Thrissur, Kerala 🇮🇳" },
      { label: "GRADUATION", value: "Class of 2029" },
      { label: "CURRENT OBSESSION", value: "Neural Nets & Physics UI" },
      { label: "FAVORITE LANGUAGE", value: "Python & Modern JS" },
    ]
  },

  socials: {
    email: "raizanargees.tech@gmail.com",
    github: "https://github.com/raizanargees",
    linkedin: "https://linkedin.com/in/raizanargees",
    twitter: "https://twitter.com/raizanargees",
  },

  projects: [
    {
      id: "synapse-canvas",
      title: "SYNAPSE CANVAS",
      badge: "AI & INTERACTION",
      featured: true,
      description: "Interactive browser playground visualizing neural network activations and hand gesture tracking in real-time.",
      longDescription: "A playful web experiment built with Python-based model exports and browser WebGL. Users can draw digits or interact with virtual floating nodes that light up based on classification probabilities.",
      tags: ["Python", "Machine Learning", "Canvas API", "React"],
      accentColor: "#D0003A", // Crimson red
      bgColor: "#1A1B1E",
      demoUrl: "https://github.com/raizanargees",
      codeUrl: "https://github.com/raizanargees",
      metrics: "Interactive 60fps canvas",
    },
    {
      id: "thejus-campus-bot",
      title: "CAMPUS INTELLIGENCE BOT",
      badge: "FULL STACK AI",
      featured: true,
      description: "Smart academic companion designed for Thejus Engineering College students to parse syllabi, exam schedules, and notes.",
      longDescription: "An intelligent query assistant utilizing vector search and conversational retrieval to help first-year students navigate course materials, classroom schedules, and department notices effortlessly.",
      tags: ["Python", "FastAPI", "Vector Embeddings", "Tailwind"],
      accentColor: "#007A3D", // Deep green
      bgColor: "#141516",
      demoUrl: "https://github.com/raizanargees",
      codeUrl: "https://github.com/raizanargees",
      metrics: "Instant answer latency",
    },
    {
      id: "retro-vision-play",
      title: "RETRO VISION LAB",
      badge: "COMPUTER VISION",
      featured: true,
      description: "Real-time retro ASCII and dither filter engine with face tracking and gesture-controlled audio synthesis.",
      longDescription: "Experiments in computer vision fundamentals. Converts live webcam frames into stylized retro pop-art bitmaps with dynamic color palettes and musical note triggers based on face landmarks.",
      tags: ["OpenCV / WebCam", "JavaScript", "Audio API", "CSS Art"],
      accentColor: "#F5C242", // Gold
      bgColor: "#18191B",
      demoUrl: "https://github.com/raizanargees",
      codeUrl: "https://github.com/raizanargees",
      metrics: "Zero latency on-device",
    },
    {
      id: "algorithmic-zen",
      title: "ALGORITHMIC PLAYGROUND",
      badge: "FOUNDATIONS",
      featured: false,
      description: "Visual exploration of sorting algorithms, graph traversals, and physics simulations in C & JavaScript.",
      longDescription: "Educational visualization suite created to master foundational computer science concepts at Thejus. Features interactive step-throughs of sorting mechanics and tree balancing.",
      tags: ["C", "Data Structures", "Matter.js", "Vite"],
      accentColor: "#D0003A",
      bgColor: "#121314",
      demoUrl: "https://github.com/raizanargees",
      codeUrl: "https://github.com/raizanargees",
      metrics: "Educational suite",
    }
  ],

  marqueeSkills: [
    "PYTHON", "ARTIFICIAL INTELLIGENCE", "C PROGRAMMING", "MACHINE LEARNING",
    "REACT", "TAILWIND CSS", "DATA STRUCTURES", "MATTER.JS PHYSICS",
    "OPENCV BASICS", "NUMPY & PANDAS", "GIT & GITHUB", "CREATIVE CODING",
    "NEURAL NETWORKS", "LINUX / BASH", "RESPONSIVE UI"
  ],

  skillsCategorized: [
    {
      category: "Languages & Foundations",
      color: "border-[#D0003A] text-[#D0003A]",
      bgBadge: "bg-[#D0003A]/10",
      skills: [
        { name: "Python", level: "Primary Language", note: "Scripting, AI math, logic" },
        { name: "C Programming", level: "Core Academic", note: "Memory, pointers, algorithms" },
        { name: "JavaScript (ES6+)", level: "Intermediate", note: "Interactive DOM, physics, async" },
        { name: "HTML5 / Semantic CSS", level: "Strong", note: "Modern layouts, responsive design" },
        { name: "SQL Basics", level: "Foundational", note: "Relational queries & schema" }
      ]
    },
    {
      category: "AI & Machine Learning",
      color: "border-[#007A3D] text-[#007A3D]",
      bgBadge: "bg-[#007A3D]/10",
      skills: [
        { name: "NumPy & Pandas", level: "Data Wrangling", note: "Matrix ops & dataframes" },
        { name: "Neural Net Foundations", level: "Actively Learning", note: "Perceptrons, backprop math" },
        { name: "Scikit-Learn Basics", level: "Foundational", note: "Classifiers & regressors" },
        { name: "OpenCV Fundamentals", level: "Exploratory", note: "Frame processing & filters" },
        { name: "Jupyter Notebooks", level: "Daily Driver", note: "Interactive model prototyping" }
      ]
    },
    {
      category: "Web & Creative Development",
      color: "border-[#D0003A] text-[#D0003A]",
      bgBadge: "bg-[#D0003A]/10",
      skills: [
        { name: "React", level: "Modern Frontend", note: "Hooks, components, state" },
        { name: "Tailwind CSS", level: "Design System", note: "Utility-first rapid styling" },
        { name: "Matter.js", level: "Physics Engine", note: "2D bodies, constraints, collisions" },
        { name: "GSAP & ScrollTrigger", level: "Motion Design", note: "Smooth orchestrated animations" },
        { name: "Figma", level: "Design Tool", note: "Wireframing & moodboards" }
      ]
    },
    {
      category: "Tools & Workflow",
      color: "border-[#007A3D] text-[#007A3D]",
      bgBadge: "bg-[#007A3D]/10",
      skills: [
        { name: "Git & GitHub", level: "Version Control", note: "Branching, PRs, collaboration" },
        { name: "VS Code", level: "Editor", note: "Customized coding environment" },
        { name: "Linux / Bash", level: "Terminal", note: "Shell scripting, command line tools" },
        { name: "Vite", level: "Build Tool", note: "Blazing fast dev server & bundler" },
        { name: "Postman", level: "API Testing", note: "HTTP endpoints & payload inspection" }
      ]
    }
  ],

  education: [
    {
      period: "2025 — 2029 (Expected)",
      degree: "B.Tech in Computer Science & Engineering (Artificial Intelligence)",
      institution: "Thejus Engineering College",
      location: "Thrissur, Kerala, India",
      status: "CURRENTLY ENROLLED (FIRST YEAR)",
      badge: "UNDERGRADUATE",
      description: "Focusing on core engineering mathematics, computer architecture, data structures, and emerging principles of modern artificial intelligence. Actively participating in tech symposiums, code sprints, and creative software builds.",
      highlights: [
        "Specialization in Artificial Intelligence & Machine Learning",
        "Active member of Campus Tech & Coding Initiatives",
        "Hands-on project work combining hardware logic and software"
      ]
    },
    {
      period: "2023 — 2025",
      degree: "Higher Secondary Education (Class XI & XII)",
      institution: "Kerala State Higher Secondary Board",
      location: "Kerala, India",
      status: "COMPLETED",
      badge: "SCIENCE STREAM",
      description: "Intensive coursework in Computer Science, Mathematics, Physics, and Chemistry. Developed first Python applications and laid the groundwork for an engineering degree.",
      highlights: [
        "Strong foundation in Calculus, Coordinate Geometry & Boolean Logic",
        "Top tier performance in Computer Science coursework",
        "Participated in state school science and computational fairs"
      ]
    },
    {
      period: "2023",
      degree: "Secondary School Leaving Certificate (SSLC / Class X)",
      institution: "Secondary High School",
      location: "Kerala, India",
      status: "COMPLETED WITH DISTINCTION",
      badge: "FOUNDATION",
      description: "First spark of interest in computer programming, electronics kits, and algorithmic thinking.",
      highlights: [
        "Consistent academic excellence",
        "Curiosity for computing systems and digital creation"
      ]
    }
  ],

  contact: {
    title: "LET'S TALK",
    subtitle: "HAVE AN EXCITING INTERNSHIP, HACKATHON, OR AI PROJECT IN MIND? LET'S CREATE SOMETHING REMARKABLE.",
    email: "raizanargees.tech@gmail.com",
    collegeContact: "Thejus Engineering College, Vellarakkad, Thrissur, Kerala",
    callout: "Always happy to chat about AI research, creative frontend physics, or first-year engineering life!",
  }
};

