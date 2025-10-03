import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Github,
  Linkedin,
  Mail,
  Code,
  BookOpen,
  User,
  Briefcase,
  Award,
  Heart,
  ChevronDown,
  ExternalLink,
  Feather,
  Star,
  Calendar,
  MapPin,
  Phone,
  Download,
  Menu,
  X,
  Target,
  Code2,
  LucideLink,
  Brain,
  Car,
  Trees,
  Snowflake,
  ShieldUser,
} from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";

const NihilisticPortfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPoem, setSelectedPoem] = useState(null);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");
  // const [formData, setFormData] = useState({
  //   user_name: "",
  //   user_email: "",
  //   message: "",
  // });

  // Your existing data arrays remain exactly the same
  const projects = [
    {
      id: 1,
      title: "Asklet - Quiz generator",
      description:
        "Intelligent quiz generation system powered by Large Language Models to create personalized educational content.",
      tech: [
        "Python",
        "Streamlit",
        "React.js",
        "Tailwind CSS",
        "FastAPI",
        "LangChain + Groq",
        "Pandas",
        "ReportLab",
        "Pydantic",
        "Llama 3.1-8B",
      ],
      category: "Gen AI",
      status: "Completed",
      image: (
        <div className="w-full h-32 bg-gray-800 rounded flex items-center justify-center border-4 border-black">
          <Brain className="w-12 h-12 text-white" />
        </div>
      ),
      details:
        "Built an adaptive quiz system that generates questions based on user preferences and difficulty levels, with real-time scoring and detailed analytics.",
      github: "https://github.com/laksssshhhhya/Asklet-Quiz_Generator",
      live: "https://asklet.streamlit.app/",
      live_extra: "https://asklet-quizes.onrender.com/",
    },
    {
      id: 2,
      title: "Urban Mobility Analysis",
      description:
        "Comprehensive analysis of urban transportation patterns using data visualization and machine learning algorithms to optimize city traffic flow.",
      tech: [
        "Python",
        "Pandas",
        "Matplotlib",
        "Seaborn + Matplotlib",
        "Pydeck",
      ],
      category: "Data Analysis",
      status: "Completed",
      image: (
        <div className="w-full h-32 bg-gray-800 rounded flex items-center justify-center border-4 border-black">
          <Car className="w-12 h-12 text-white" />
        </div>
      ),
      details:
        "Analyzed traffic patterns across metropolitan areas, implemented predictive models for congestion forecasting, and created interactive dashboards for city planners.",
      github: "https://github.com/laksssshhhhya/Urban-Mobility-Analysis",
    },
    {
      id: 3,
      title: "Green Cure",
      description:
        "AI-powered agricultural decision-support system designed to assist farmers, researchers, and policymakers in making informed agricultural decisions. It integrates real-time insights, intelligent recommendations, and automated reporting to address the challenges faced by modern Indian farmers.",
      tech: [
        "Python",
        "Streamlit",
        "LangChain + Groq",
        "Pandas",
        "ReportLab",
        "Pydantic",
        "Llama 3.1-8B",
      ],
      category: "Gen AI",
      status: "In Progress",
      image: (
        <div className="w-full h-32 bg-gray-800 rounded flex items-center justify-center border-4 border-black">
          <Trees className="w-12 h-12 text-white" />
        </div>
      ),
      details:
        "Green Cure is designed primarily for agricultural experts and stakeholders rather than direct farmer use, since it requires inputs like soil pH, organic matter, and disease symptoms, which are often technical and not farmer-friendly",
      github: "https://github.com/laksssshhhhya/Asklet-Quiz_Generator",
      // live: "https://asklet.streamlit.app/",
    },
    {
      id: 4,
      title: "React Component Library",
      description:
        "A collection of mini-projects demonstrating various React concepts, built as part of my learning journey.",
      tech: ["React", "JavaScript", "Tailwind CSS"],
      category: "Frontend",
      status: "In Progress",
      image: (
        <div className="w-full h-32 bg-gray-800 rounded flex items-center justify-center border-4 border-black">
          <Snowflake className="w-12 h-12 text-white" />
        </div>
      ),
      details:
        "Developing a comprehensive library of accessible, customizable React components with TypeScript support and extensive documentation.",
      github: "https://github.com/laksssshhhhya/react-concepts-projects",
    },
    {
      id: 5,
      title: "Crime Data Analysis Dashboard",
      description:
        "Data visualization dashboard to identify crime hotspots and time-based trends using exploratory data analysis for law enforcement insights.",
      tech: ["Python", "Power BI", "Data Analytics", "Visualization"],
      category: "Data Analysis",
      status: "Completed",
      image: (
        <div className="w-full h-32 bg-gray-800 rounded flex items-center justify-center border-4 border-black">
          <ShieldUser className="w-12 h-12 text-white" />
        </div>
      ),
      details:
        "Built comprehensive crime analysis dashboard with interactive visualizations to help law enforcement identify patterns, hotspots, and trends for better resource allocation.",
    },
    {
      id: 6,
      title: "Poetry Platform",
      description:
        "Bilingual poetry sharing platform supporting both Hindi and English with community features.",
      tech: ["Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
      category: "Full Stack",
      status: "In Progress",
      image: (
        <div className="w-full h-32 bg-gray-800 rounded flex items-center justify-center border-4 border-black">
          <Feather className="w-12 h-12 text-white" />
        </div>
      ),
      details:
        "Creating a platform for poets to share their work in multiple languages with features like collaborative editing and community feedback.",
    },
  ];

  // const poems = [
  //   {
  //     id: 1,
  //     title: "Moon without scars",
  //     language: "English",
  //     preview:
  //       "She's moonlight\nin a quiet garden,\nStars spill off her lips.\nThis is my chance...",
  //     category: "Contemporary Metaphorical",
  //     date: "2024",
  //     content:
  //       "She's moonlight\nin a quiet garden,\nStars spill off her lips.\nThis is my chance - maiden\nHow do I gaze a whole universe... Any tips?\n\nShe holds the universe \nin those shiny eyes,\nThere is a meteor shower\nwhen she cries. \n\nShe has a ethereal soul,...",
  //   },
  //   {
  //     id: 2,
  //     title: "इजाज़त",
  //     language: "Hindi",
  //     preview:
  //       "डूबी हुई सी रहती हैं साँसे मेरी,\nबचाए भी भला कौन मुझे\nये दरिया सी जो हैं आँखें तेरी,\nवाक़िफ़ कराए भी तो...",
  //     category: "Urdu-Hindi Rom",
  //     date: "2024",
  //     content:
  //       "डूबी हुई सी रहती हैं साँसे मेरी,\nबचाए भी भला कौन मुझे\nये दरिया सी जो हैं आँखें तेरी,\nवाक़िफ़ कराए भी तो कौन तुझे\nमेरी ख़्वाहिश-ए-दिल की डूबना चाहूँ\nइजाज़त हो अगर,\nतो मैं तेरी आँखों को समंदर लिखना चाहूँ।\n\nउन्हीं आँखों में उलझा काजल भी...",
  //   },
  //   {
  //     id: 3,
  //     title: "Wrist watch",
  //     language: "English",
  //     preview:
  //       "You always somehow mends the things\ninside me that are not even broken.\nYou always create an aura that makes me\nfell like my heart...",
  //     category: "Contemporary Romantic",
  //     date: "2024",
  //     content:
  //       "You always somehow mends the things\ninside me that are not even broken.\nYou always create an aura that makes me\nfell like my heart is a solemn.\nYou always know how to manage the monster behind those rib cages.\nYou know the language of poets,\nYou know why they bleed you on those pages.\n\nMay be one day you came to know, whenever...",
  //   },
  //   {
  //     id: 4,
  //     title: "Life's irony",
  //     language: "English",
  //     preview:
  //       "In a quiet small town, where the sunsets painted the sky in shades of pink and orange, lived a boy named Logan. His heart had a secret...",
  //     category: "Short story",
  //     date: "2024",
  //     content:
  //       "In a quiet small town, where the sunsets painted the sky in shades of pink and orange, lived a boy named Logan. His heart had a secret, one he had held for nine long years. This secret was a love, deep and unspoken, for a girl named Lana. They had been friends since childhood, but Lana was oblivious to Logan's feelings.\n\n Logan's best friend, Lucas, had been the keeper of this secret. One evening, unable to see his friend suffer any longer, Lucas decided it was time to reveal the truth to Lana....",
  //   },
  //   {
  //     id: 5,
  //     title: "Write Yourself as you want.",
  //     language: "English",
  //     preview:
  //       "I am the unpenned poem, the silent verse etched in invisible ink. I am the story that unfolds in the spaces between breaths...",
  //     category: "Introspective Prose",
  //     date: "2024",
  //     content:
  //       "I am the unpenned poem, the silent verse etched in invisible ink. I am the story that unfolds in the spaces between breaths, in the pauses of conversation, in the quiet moments when the world feels too loud. I am the one who finds solace in solitude, yet cherishes the company of others. I walk the delicate tightrope between the comfort of being alone and the warmth of human connection. I am a paradox, a quiet storm, a gentle whisper in a noisy world. My thoughts often echo the existential musings of Kafka....",
  //   },
  // ];

  const skills = [
    // Languages (4 skills)
    { name: "Python", category: "Languages" },
    { name: "JavaScript", category: "Languages" },
    { name: "Java", category: "Languages" },
    { name: "C/C++", category: "Languages" },

    // Frontend (5 skills)
    { name: "React.js", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "Framer Motion", category: "Frontend" },
    { name: "Responsive Design", category: "Frontend" },

    // Backend (5 skills)
    { name: "Node.js", category: "Backend" },
    { name: "FastAPI", category: "Backend" },
    { name: "REST API", category: "Backend" },
    { name: "MongoDB", category: "Backend" },
    { name: "Express.js", category: "Backend" },

    // Database (5 skills)
    { name: "SQL", category: "Database" },
    { name: "MySQL", category: "Database" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Firebase", category: "Database" },
    { name: "Database Design", category: "Database" },

    // DevOps & Tools (5 skills)
    { name: "Git/GitHub", category: "DevOps & Tools" },
    { name: "Docker", category: "DevOps & Tools" },
    { name: "Apache Kafka", category: "DevOps & Tools" },
    { name: "CI/CD", category: "DevOps & Tools" },
    { name: "Linux", category: "DevOps & Tools" },

    // Data Analytics (5 skills)
    { name: "Pandas & NumPy", category: "Data Analytics" },
    { name: "Power BI", category: "Data Analytics" },
    { name: "Excel", category: "Data Analytics" },
    { name: "Data Visualization", category: "Data Analytics" },
    { name: "EDA", category: "Data Analytics" },

    // AI & ML (5 skills)
    { name: "LangChain", category: "Gen AI" },
    { name: "LLM Integration", category: "Gen AI" },
    { name: "Groq API", category: "Gen AI" },
    { name: "Prompt Engineering", category: "Gen AI" },
    { name: "ReportLab", category: "Gen AI" },

    // UI/UX Design (5 skills)
    { name: "Wireframing", category: "UI/UX Design" },
    { name: "Prototyping", category: "UI/UX Design" },
    { name: "User Research", category: "UI/UX Design" },
    { name: "Visual Design", category: "UI/UX Design" },
    { name: "Information Architecture", category: "UI/UX Design" },
  ];

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const experiences = [
    {
      title: "Frontend Developer Intern",
      company: "Coders Hire Pvt. Ltd.",
      period: "May 2025 - June 2025",
      location: "Guna, India",
      description:
        " Developed a Talent Matching and Analytics Dashboard with an intelligent matching engine for candidate filtering based on technical skills and experience.",
      achievements: [
        "Implemented custom React hooks and interactive UI components",
        "Enhanced UX with Framer Motion animations",
        "Applied glassmorphic design principles",
        "Implemented responsive architecture",
      ],
    },
    {
      title: "Creative Content Writer",
      company: "Writer's Pocket",
      period: "Sept 2023 - Oct 2023",
      location: "Remote",
      description:
        "Created creative and poetic content for Writer's Pocket's monthly anthology, developing engaging literary pieces.",
      achievements: [
        "Enhanced artistic appeal of publications",
        "Contributed to thematic storytelling",
        "... Poetry selection for anthology",
      ],
    },
    {
      title: "Hackathon Finalist - Build-a-thon",
      company: "Saras AI Institute",
      period: "November 2024",
      location: "Online",
      description:
        "Developed a humorous chatbot to solve coding queries using Flowise AI tool in a team of four.",
      achievements: [
        "Built interactive AI-powered solution",
        "Focused on engagement and humor",
        "Team collaboration and project management",
        "Lead the team effectively",
      ],
    },
  ];

  // Add these handler functions
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   // Replace with your actual EmailJS credentials
  //   emailjs
  //     .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData, "YOUR_PUBLIC_KEY")
  //     .then(() => {
  //       alert("✅ Message sent successfully!");
  //       setFormData({
  //         user_name: "",
  //         user_email: "",
  //         message: "",
  //       });
  //     })
  //     .catch((error) => {
  //       alert("❌ Failed to send message. Please try again.");
  //       console.error("EmailJS Error:", error);
  //     })
  //     .finally(() => {
  //       setIsSubmitting(false);
  //     });
  // };

  // Nihilistic Card Component
  const NihilCard = ({ children, className = "", banner = null, ...props }) => (
    <motion.div
      className={`relative bg-black border-8 border-white shadow-[15px_15px_0px_white] transform -rotate-2 hover:rotate-0 hover:scale-105 hover:shadow-[20px_20px_0px_white] transition-all duration-300 overflow-hidden ${className}`}
      whileHover={{ rotate: 0, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {banner && (
        <div className="absolute top-4 right-0 bg-white text-black pl-16 pr-14 py-3 transform rotate-45 font-bold text-lg tracking-wider z-10 translate-x-1/4">
          {banner}
        </div>
      )}
      {children}
    </motion.div>
  );

  // Shake Animation
  const shakeAnimation = {
    shake: {
      x: [0, -5, 5, -5, 0],
      transition: { duration: 0.5 },
    },
  };

  // Navigation
  const Navigation = () => (
    <nav className="fixed top-0 w-full z-50 bg-black border-b-8 border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-white font-bold text-2xl uppercase tracking-wider">
            LAKSHYA.JHA
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {[
              "home",
              "about",
              "skills",
              "projects",
              "poetry",
              "experience",
              "contact",
            ].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`px-4 py-2 font-bold uppercase tracking-wide border-4 border-white transition-all duration-300 ${
                  activeSection === section
                    ? "bg-white text-black"
                    : "bg-black text-white hover:bg-white hover:text-black"
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white border-4 border-white p-2 hover:bg-white hover:text-black transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden bg-black border-t-4 border-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {[
                "home",
                "about",
                "skills",
                "projects",
                "poetry",
                "experience",
                "contact",
              ].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left px-4 py-3 font-bold uppercase tracking-wide border-4 border-white bg-black text-white hover:bg-white hover:text-black transition-all"
                >
                  {section}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );

  // Hero Section
  const HeroSection = () => (
    <section
      id="home"
      className="min-h-screen bg-black flex items-center justify-center px-4 pt-20"
    >
      <div className="text-center">
        <NihilCard className="p-16 mb-8" banner="Hi! Hello!!">
          <h1 className="text-3xl sm:text-6xl md:text-8xl font-bold text-white uppercase tracking-wider mb-4 border-b-8 border-white inline-block text-left md:text-center">
            LAKSHYA JHA
          </h1>
          <div className="text-xl md:text-3xl text-gray-300 font-medium">
            <TypeAnimation
              sequence={[
                "full stack developer",
                1700,
                "data analyst",
                1700,
                "exploring technologies",
                1700,
                "poet & creative writer",
                1700,
                "problem solver",
                1700,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        </NihilCard>

        <motion.div
          className="flex justify-center space-x-6"
          variants={shakeAnimation}
        >
          <motion.a
            href="https://github.com/laksssshhhhya"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-black border-4 border-white text-white hover:bg-white hover:text-black transition-all transform hover:-translate-y-2 hover:shadow-[0_8px_0px_white]"
            whileTap="shake"
          >
            <Github className="w-8 h-8" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/lakshyajha2003"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-black border-4 border-white text-white hover:bg-white hover:text-black transition-all transform hover:-translate-y-2 hover:shadow-[0_8px_0px_white]"
            whileTap="shake"
          >
            <Linkedin className="w-8 h-8" />
          </motion.a>
          <motion.button
            onClick={() => setShowSocialModal(true)}
            className="p-4 bg-black border-4 border-white text-white hover:bg-white hover:text-black transition-all transform hover:-translate-y-2 hover:shadow-[0_8px_0px_white]"
            whileTap="shake"
          >
            <Mail className="w-8 h-8" />
          </motion.button>
        </motion.div>
        <motion.div
          className="flex justify-center space-x-6 mt-2"
          variants={shakeAnimation}
        >
          <motion.a
            href="https://drive.google.com/file/d/1waAmkty0OEVu1j5ykm1cgWLuYZ-KL7iu/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="w-64 py-4 px-16 text-lg flex bg-black border-4 border-white text-white font-bold hover:bg-white hover:text-black transition-all transform hover:-translate-y-2 hover:shadow-[0_8px_0px_white]"
            whileTap="shake"
          >
            <div className="flex-1">RESUME</div>
            <Download className="flex-1 w-6 h-6" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );

  // Section Divider
  const SectionDivider = () => (
    <div className="relative w-full h-16 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-white transform -skew-y-2"></div>
      <div className="absolute inset-0 bg-black transform skew-y-1 translate-y-4"></div>
    </div>
  );

  // About Section
  const AboutSection = () => (
    <section id="about" className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-bold text-white uppercase tracking-wider border-b-8 border-white inline-block mb-4">
            ABOUT
          </h2>
          <p className="text-gray-400 text-xl">the void behind the code</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <NihilCard className="p-8" banner="TECH">
            <h3 className="text-3xl font-bold text-white uppercase border-b-4 border-white mb-6 inline-block">
              DEVELOPER
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Passionate about exploring new technologies, building innovative
              solutions, and expressing creativity through code.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Currently pursuing B.Tech in Computer Science, I'm passionate
              about exploring diverse technology stacks and experimenting with
              cutting-edge frameworks. My curiosity drives me to constantly
              learn and adapt to new technologies.
            </p>
          </NihilCard>

          <NihilCard className="p-8" banner="POET">
            <h3 className="text-3xl font-bold text-white uppercase border-b-4 border-white mb-6 inline-block">
              CREATOR
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Beyond coding, I express my creativity through poetry in both
              Hindi and English.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Winner of 30-minute instant poetry competitions in 2023 and 2024.
              Former Creative Content Writer at Writer's Pocket, contributing to
              monthly anthologies and thematic storytelling.
            </p>
          </NihilCard>
        </div>
      </div>
    </section>
  );

  // Skills Section
  const SkillsSection = () => (
    <section id="skills" className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-bold text-white uppercase tracking-wider border-b-8 border-white inline-block mb-4">
            SKILLS
          </h2>
          <p className="text-gray-400 text-xl">tools of destruction</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <NihilCard key={category} className="p-6">
              <h2 className="text-2xl font-bold text-white uppercase mb-6 border-b-2 border-white pb-2">
                {category}
              </h2>
              <div className="space-y-3">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="text-white text-lg font-semibold"
                  >
                    <p>▹ {skill.name}</p>
                  </div>
                ))}
              </div>
            </NihilCard>
          ))}
        </div>
      </div>
    </section>
  );

  // Projects Section
  const ProjectsSection = () => (
    <section id="projects" className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-bold text-white uppercase tracking-wider border-b-8 border-white inline-block mb-4">
            PROJECTS
          </h2>
          <p className="text-gray-400 text-xl">digital chaos</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <NihilCard
              key={project.id}
              className="p-6 cursor-pointer"
              banner={project.category}
            >
              <div onClick={() => setSelectedProject(project)}>
                {project.image}
                <h3 className="text-2xl font-bold text-white uppercase mt-4 mb-2 border-b-4 border-white inline-block">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white text-black text-sm font-bold uppercase border-2 border-black"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-3 py-1 bg-gray-800 text-white text-sm font-bold">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold uppercase text-sm">
                    {project.status}
                  </span>
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              </div>
            </NihilCard>
          ))}
        </div>
      </div>
    </section>
  );

  // Poetry Section
  const PoetrySection = () => (
    <section id="poetry" className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-bold text-white uppercase tracking-wider border-b-8 border-white inline-block mb-4">
            Creative Writing
          </h2>
          <p className="text-gray-400 text-xl">verses from the void</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-8">
          <NihilCard className="p-8" banner="Explore">
            <h3 className="text-3xl font-bold text-white uppercase border-b-4 border-white mb-6 inline-block">
              MEDIUM
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Short stories and articles born from midnight musings.{" "}
              <a
                href="https://medium.com/@lakshya2003jha"
                target="_blank"
                rel="noopener noreferrer"
                className=" py-4 px-8 text-lg inline-flex bg-black text-white font-bold hover:text-gray-500 transition-all transform hover:-translate-y-2"
              >
                <div className="flex-1">@lakshya2003jha &nbsp;&nbsp;</div>
                <ExternalLink className="flex-1 w-6 h-6" />
              </a>
            </p>
            <h3 className="text-3xl font-bold text-white uppercase border-b-4 border-white mb-6 inline-block">
              Instagram
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Ephemeral thoughts, preserved in short lines of poetry.{" "}
              <a
                href="https://lakshyajha2003.medium.com/"
                target="_blank"
                rel="noopener noreferrer"
                className=" py-4 px-8 text-lg inline-flex bg-black text-white font-bold hover:text-gray-500 transition-all transform hover:-translate-y-2"
              >
                <div className="flex-1">@tumchaandho &nbsp;&nbsp;</div>
                <ExternalLink className="flex-1 w-6 h-6" />
              </a>
            </p>
          </NihilCard>
        </div>
      </div>
    </section>
  );

  // Experience Section
  const ExperienceSection = () => (
    <section id="experience" className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-bold text-white uppercase tracking-wider border-b-8 border-white inline-block mb-4">
            EXPERIENCE
          </h2>
          <p className="text-gray-400 text-xl">journey through chaos</p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <NihilCard key={index} className="p-8" banner="EXPERIENCE">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-white uppercase border-b-4 border-white mb-2 inline-block">
                    {exp.title}
                  </h3>
                  <h4 className="text-xl text-gray-300 font-bold mb-2">
                    {exp.company}
                  </h4>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-gray-400 mb-1 md:-translate-x-20">
                    <Calendar className="w-4 h-4 mr-2" />
                    {exp.period}
                  </div>
                  <div className="flex items-center text-gray-400 md:-translate-x-20">
                    <MapPin className="w-4 h-4 mr-2" />
                    {exp.location}
                  </div>
                </div>
              </div>

              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {exp.description}
              </p>

              <div className="space-y-2">
                <h5 className="text-white font-bold uppercase text-lg border-b-2 border-white inline-block">
                  Achievements:
                </h5>
                {exp.achievements.map((achievement, i) => (
                  <div key={i} className="flex items-start">
                    <span className="text-white font-bold mr-3">▪</span>
                    <span className="text-gray-300">{achievement}</span>
                  </div>
                ))}
              </div>
            </NihilCard>
          ))}
        </div>

        {/* Education Section */}
        <div className="mt-16">
          <h3 className="text-4xl font-bold text-white uppercase tracking-wider border-b-8 border-white inline-block mb-8">
            EDUCATION
          </h3>
          <NihilCard className="p-6 mb-12" banner="2022-26">
            <h4 className="text-2xl font-bold text-white uppercase border-b-4 border-white mb-4 inline-block">
              Bachelors in Technology
            </h4>
            <p className="text-gray-300 text-lg mb-2">
              Jaypee University of Engineering & Technology
            </p>
            <p className="text-gray-400">
              Computer Science and Engineering • CGPA: 8.3
            </p>
          </NihilCard>
          <div className="grid md:grid-cols-2 gap-8">
            <NihilCard className="p-6" banner="2022">
              <h4 className="text-2xl font-bold text-white uppercase border-b-4 border-white mb-4 inline-block">
                SENIOR SECONDARY
              </h4>
              <p className="text-gray-300 text-lg mb-2">
                Christ Senior Secondary School
              </p>
              <p className="text-gray-400">Science Stream • CBSE Board</p>
            </NihilCard>

            <NihilCard className="p-6" banner="2020">
              <h4 className="text-2xl font-bold text-white uppercase border-b-4 border-white mb-4 inline-block">
                SECONDARY
              </h4>
              <p className="text-gray-300 text-lg mb-2">
                Christ Senior Secondary School
              </p>
              <p className="text-gray-400">CBSE Board</p>
            </NihilCard>
          </div>
        </div>
      </div>
    </section>
  );

  // Contact Section
  const ContactSection = () => (
    <section id="contact" className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-bold text-white uppercase tracking-wider border-b-8 border-white inline-block mb-4">
            CONTACT
          </h2>
          <p className="text-gray-400 text-xl">reach into the void</p>
        </div>

        <NihilCard className="p-8" banner="CONNECT">
          <h3 className="text-3xl font-bold text-white uppercase border-b-4 border-white mb-6 inline-block">
            GET IN TOUCH
          </h3>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            I'm always excited to discuss new opportunities, collaborate on
            projects, or just chat about technology and creativity.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <motion.a
                href="mailto:lakshya2003jha@gmail.com"
                className="flex items-center p-3 bg-black border-4 border-white text-white hover:bg-white hover:text-black transition-all group"
                whileHover={{ x: 10 }}
                whileTap="shake"
                variants={shakeAnimation}
              >
                <Mail className="w-6 h-6 mr-4" />
                <div>
                  <p className="font-bold uppercase">Email</p>
                  <p className="text-gray-400 group-hover:text-gray-600">
                    lakshya2003jha@gmail.com
                  </p>
                </div>
              </motion.a>

              <motion.a
                href="https://github.com/laksssshhhhya"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-black border-4 border-white text-white hover:bg-white hover:text-black transition-all group"
                whileHover={{ x: 10 }}
                whileTap="shake"
                variants={shakeAnimation}
              >
                <Github className="w-6 h-6 mr-4" />
                <div>
                  <p className="font-bold uppercase">GitHub</p>
                  <p className="text-gray-400 group-hover:text-gray-600">
                    laksssshhhhya
                  </p>
                </div>
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/lakshyajha2003"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-black border-4 border-white text-white hover:bg-white hover:text-black transition-all group"
                whileHover={{ x: 10 }}
                whileTap="shake"
                variants={shakeAnimation}
              >
                <Linkedin className="w-6 h-6 mr-4" />
                <div>
                  <p className="font-bold uppercase">LinkedIn</p>
                  <p className="text-gray-400 group-hover:text-gray-600">
                    lakshyajha2003
                  </p>
                </div>
              </motion.a>
              <motion.a
                href="https://leetcode.com/LakshyaJha/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-black border-4 border-white text-white hover:bg-white hover:text-black transition-all group"
                whileHover={{ x: 10 }}
                whileTap="shake"
                variants={shakeAnimation}
              >
                <SiLeetcode className="w-6 h-6 mr-4" />
                <div>
                  <p className="font-bold uppercase">LeetCode</p>
                  <p className="text-gray-400 group-hover:text-gray-600">
                    LakshyaJha
                  </p>
                </div>
              </motion.a>
              <motion.a
                href="https://wa.me/919301785326"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-black border-4 border-white text-white hover:bg-white hover:text-black transition-all group"
                whileHover={{ x: 10 }}
                whileTap="shake"
                variants={shakeAnimation}
              >
                <FaWhatsapp className="w-6 h-6 mr-4" />
                <div>
                  <p className="font-bold uppercase">Whatsapp</p>
                  <p className="text-gray-400 group-hover:text-gray-600">
                    +91 9301785326
                  </p>
                </div>
              </motion.a>
            </div>

            <div className="bg-gray-900 border-4 border-white p-5">
              <h4 className="text-2xl font-bold text-white uppercase border-b-4 border-white mb-6 inline-block">
                QUICK MESSAGE
              </h4>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const data = {
                    username: formData.get("username"),
                    useremail: formData.get("useremail"),
                    message: formData.get("message"),
                  };

                  setIsSubmitting(true);

                  emailjs
                    .send(
                      "service_kpdi6vj",
                      "template_zz0hi6t",
                      data,
                      "qmK_wT-DwmJ6uSprS"
                    )
                    .then(() => {
                      setAlertMessage(
                        "Message sent successfully! I'll get back to you soon."
                      );
                      setAlertType("success");
                      e.target.reset();
                    })
                    .catch((error) => {
                      setAlertMessage(
                        "Failed to send message. Please try again or email me directly."
                      );
                      setAlertType("error");
                      console.error("EmailJS Error:", error);
                    })
                    .finally(() => {
                      setIsSubmitting(false);
                    });
                }}
                className="space-y-3"
              >
                <input
                  type="text"
                  name="username"
                  placeholder="Your Name"
                  className="w-full p-4 border-4 border-black bg-white text-black font-bold focus:scale-105 transition-transform outline-none"
                  required
                />
                <input
                  type="email"
                  name="useremail"
                  placeholder="Your Email"
                  className="w-full p-4 border-4 border-black bg-white text-black font-bold focus:scale-105 transition-transform outline-none"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="4"
                  className="w-full p-4 border-4 border-black bg-white text-black font-bold focus:scale-105 transition-transform outline-none resize-none"
                  required
                ></textarea>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full p-4 bg-black border-4 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black hover:-translate-y-2 hover:shadow-[0_8px_0px_white] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileTap={!isSubmitting ? "shake" : undefined}
                  variants={shakeAnimation}
                >
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </motion.button>
              </form>
            </div>
          </div>
        </NihilCard>
      </div>
    </section>
  );

  // Project Modal
  const ProjectModal = ({ project, onClose }) => (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5, rotate: 10 }}
            className="bg-black border-8 border-white shadow-[20px_20px_0px_white] p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white text-black hover:bg-black hover:text-white border-4 border-black hover:border-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-6">{project.image}</div>

            <h3 className="text-4xl font-bold text-white uppercase border-b-8 border-white mb-4 inline-block">
              {project.title}
            </h3>

            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="text-2xl font-bold text-white uppercase border-b-4 border-white mb-4 inline-block">
                  DESCRIPTION
                </h4>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  {project.description}
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {project.details}
                </p>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-white uppercase border-b-4 border-white mb-4 inline-block">
                  TECH STACK
                </h4>
                <div className="flex flex-wrap gap-3 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-white text-black font-bold uppercase border-2 border-black"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-white font-bold uppercase mr-4">
                      Category:
                    </span>
                    <span className="text-gray-300">{project.category}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-white font-bold uppercase mr-4">
                      Status:
                    </span>
                    <span className="text-gray-300">{project.status}</span>
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-3 bg-black border-4 border-white text-white hover:bg-white hover:text-black transition-all"
                      whileTap="shake"
                      variants={shakeAnimation}
                    >
                      <Github className="w-5 h-5 mr-2" />
                      CODE
                    </motion.a>
                  )}
                  {project.live && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-3 bg-black border-4 border-white text-white hover:bg-white hover:text-black transition-all"
                      whileTap="shake"
                      variants={shakeAnimation}
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      LIVE (Streamlit)
                    </motion.a>
                  )}
                  {project.live_extra && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-6 py-3 bg-black border-4 border-white text-white hover:bg-white hover:text-black transition-all"
                      whileTap="shake"
                      variants={shakeAnimation}
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      LIVE (React.js)
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Poem Modal
  const PoemModal = ({ poem, onClose }) => (
    <AnimatePresence>
      {poem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5, rotate: 5 }}
            className="bg-black border-8 border-white shadow-[20px_20px_0px_white] p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white text-black hover:bg-black hover:text-white border-4 border-black hover:border-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-4xl font-bold text-white uppercase border-b-8 border-white mb-4 inline-block">
              {poem.title}
            </h3>

            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400 uppercase font-bold">
                {poem.language} • {poem.category}
              </span>
              <span className="text-gray-400">{poem.date}</span>
            </div>

            <div className="bg-gray-900 border-4 border-white p-6">
              <pre className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap font-serif">
                {poem.content}
              </pre>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Social Modal
  const SocialModal = ({ show, onClose }) => (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5, rotate: 10 }}
            className="bg-black border-8 border-white shadow-[20px_20px_0px_white] p-8 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white text-black hover:bg-black hover:text-white border-4 border-black hover:border-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-3xl font-bold text-white uppercase border-b-8 border-white mb-6 inline-block">
              CONNECT
            </h3>

            <p className="text-gray-300 text-lg mb-8">
              Dive into my creative world through these platforms.
            </p>

            <div className="space-y-4">
              <motion.a
                href="https://leetcode.com/lakshyajha2003"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-black border-4 border-white text-white hover:bg-white hover:text-black transition-all w-full"
                whileHover={{ x: 10 }}
                whileTap="shake"
                variants={shakeAnimation}
              >
                <SiLeetcode className="w-6 h-6 mr-4" />
                <span className="font-bold uppercase">LeetCode</span>
              </motion.a>

              <motion.a
                href="https://wa.me/919301785326"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-black border-4 border-white text-white hover:bg-white hover:text-black transition-all w-full"
                whileHover={{ x: 10 }}
                whileTap="shake"
                variants={shakeAnimation}
              >
                <FaWhatsapp className="w-6 h-6 mr-4" />
                <span className="font-bold uppercase">WhatsApp</span>
              </motion.a>

              <motion.a
                href="tel:+919301785326"
                className="flex items-center p-4 bg-black border-4 border-white text-white hover:bg-white hover:text-black transition-all w-full"
                whileHover={{ x: 10 }}
                whileTap="shake"
                variants={shakeAnimation}
              >
                <Phone className="w-6 h-6 mr-4" />
                <span className="font-bold uppercase">Call</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Custom Alert Modal
  const AlertModal = ({ message, type, onClose }) => (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5, rotate: 10 }}
            className="bg-black border-8 border-white shadow-[20px_20px_0px_white] p-8 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white text-black hover:bg-black hover:text-white border-4 border-black hover:border-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <div className="mb-6">
                {type === "success" ? (
                  <div className="w-16 h-16 bg-green-500 border-4 border-white mx-auto rounded-full flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">✓</span>
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-red-500 border-4 border-white mx-auto rounded-full flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">✗</span>
                  </div>
                )}
              </div>

              <h3 className="text-3xl font-bold text-white uppercase border-b-4 border-white mb-4 inline-block">
                {type === "success" ? "SUCCESS!" : "ERROR!"}
              </h3>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {message}
              </p>

              <motion.button
                onClick={onClose}
                className="px-8 py-3 bg-black border-4 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all"
                whileTap="shake"
                variants={shakeAnimation}
              >
                GOT IT
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "poetry",
        "experience",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
    });
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <SkillsSection />
      <SectionDivider />
      <ProjectsSection />
      <SectionDivider />
      <PoetrySection />
      <SectionDivider />
      <ExperienceSection />
      <SectionDivider />
      <ContactSection />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <PoemModal poem={selectedPoem} onClose={() => setSelectedPoem(null)} />
      <SocialModal
        show={showSocialModal}
        onClose={() => setShowSocialModal(false)}
      />
      <AlertModal
        message={alertMessage}
        type={alertType}
        onClose={() => setAlertMessage(null)}
      />
    </div>
  );
};

export default NihilisticPortfolio;
