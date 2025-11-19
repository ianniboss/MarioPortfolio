
export const profileData = {
  name: "Ian Hafiz Syahrul Azlan",
  title: "Computer Science Student",
  tagline: "Crafting Digital Adventures",
  avatar: "https://images.unsplash.com/photo-1633466876697-1eb9c820028d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxuaW50ZW5kbyUyMGF2YXRhcnxlbnwwfHx8fDE3NjE0NjM1NzB8MA&ixlib=rb-4.1.0&q=85",
  about: "Hello! I'm a passionate IT student and developer from Malaysia, currently studying in Toulouse, France. I love creating innovative applications and exploring new technologies. With a blend of creativity and technical expertise, I transform ideas into functional and engaging digital experiences. Currently seeking a 10-12 week internship for April-June 2026!",
  email: "ianhafiz9999@gmail.com",
  phoneFrance: "+33 7 44 43 99 59",
  phoneMalaysia: "+016 304 6426",
  location: "Toulouse, France",
  nationality: "Malaysian"
};

export const educationData = [
  {
    id: 1,
    level: "Level 1",
    degree: "Bachelor's Degree in IT (BUT Informatique)",
    institution: "IUT Paul Sabatier, Université Toulouse III",
    year: "2024 - Present",
    description: "2nd Year, specializing in Application Development. Focus areas: Software Development, Databases, Networking, Project Management."
  },
  {
    id: 2,
    level: "Level 2",
    degree: "Pre-University Programme (Malaysia–France Cooperation)",
    institution: "University of Tours (IUT de Tours)",
    year: "2022 - 2023",
    description: "Coursework: French Language, Mathematics, Physics-Chemistry, Algorithmics, and Logic. Achievement: French Language Level B2."
  },
  {
    id: 3,
    level: "Level 3",
    degree: "Sijil Pelajaran Malaysia (SPM)",
    institution: "Tuanku Munawir Science School, Malaysia",
    year: "2017 - 2022",
    description: "Result: 9A+ in Pure Science and Language subjects."
  }
];

export const skillsData = [
  {
    id: 1,
    name: "Java",
    level: 90,
    icon: "code",
    color: "#E44D26",
    type: "Fire Flower"
  },
  {
    id: 2,
    name: "Python",
    level: 88,
    icon: "star",
    color: "#F7DF1E",
    type: "Star Power"
  },
  {
    id: 3,
    name: "C",
    level: 85,
    icon: "zap",
    color: "#1572B6",
    type: "Leaf Power"
  },
  {
    id: 4,
    name: "SQL",
    level: 87,
    icon: "database",
    color: "#47A248",
    type: "Yoshi Egg"
  },
  {
    id: 5,
    name: "PHP",
    level: 82,
    icon: "layers",
    color: "#7377AD",
    type: "1-UP Mushroom"
  },
  {
    id: 6,
    name: "HTML/CSS",
    level: 92,
    icon: "layout",
    color: "#E34C26",
    type: "Super Mushroom"
  },
  {
    id: 7,
    name: "Git",
    level: 85,
    icon: "git-branch",
    color: "#F05032",
    type: "POW Block"
  },
  {
    id: 8,
    name: "Linux",
    level: 80,
    icon: "terminal",
    color: "#FCC624",
    type: "Cape Feather"
  }
];

export const projectsData = [
  {
    id: 1,
    title: "Parking Management Application",
    description: "Designed and created PL/SQL database using SQL Developer. GUI developed in Java with WindowBuilder (Eclipse). Managed project using SCRUM methodology with Trello.",
    image: "/img/parking.png",
    screenshots: [
      "/img/parking.png"
    ],
    technologies: ["Java", "PL/SQL", "SQL Developer", "Eclipse", "SCRUM"],
    link: "https://github.com/ianniboss",
    source: "https://gitlab.info.iut-tlse3.fr/b15_22/sae3a01",
    category: "Database Application",
    year: "2025"
  },
  {
    id: 2,
    title: "Apache2/SSL Server Administration",
    description: "Configured and managed Apache2 and SSL servers in a Linux environment. Handled server security, deployment, and maintenance.",
    image: "/img/apache.png",
    screenshots: [
      "/img/apache.png"
    ],
    technologies: ["Linux", "Apache2", "SSL", "Server Admin"],
    link: "https://github.com/ianniboss",
    category: "System Administration",
    year: "2025"
  },
  {
    id: 3,
    title: "Web Documentary Creation",
    description: "Designed and developed an interactive web documentary with multimedia content and engaging user interface.",
    image: "/img/webdoc.jpg",
    screenshots: [
      "/img/webdoc.jpg"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Web Design"],
    demo: "https://viewer.pandasuite.com/2kTY2xBI",
    link: "https://github.com/ianniboss",
    category: "Web Development",
    year: "2025"
  },
  {
    id: 4,
    title: "Tomato Sales Application",
    description: "Developed Human–Machine Interface (HMI) in Java. Managed database and designed UML models using Modelio.",
    image: "/img/tomato.webp",
    screenshots: [
      "/img/tomato.webp",
      "/img/tomato-1.png",
      "/img/tomato-2.png",
      "/img/tomato-3.png",
      "/img/tomato-4.png",
      "/img/tomato-5.png",
      "/img/tomato-6.png",
      "/img/tomato-7.png",
      "/img/tomato-8.png"
    ],
    technologies: ["Java", "Modelio", "UML", "Database"],
    link: "https://github.com/ianniboss",
    source: "https://github.com/ianniboss/S201_TOMATES",
    category: "Desktop Application",
    year: "2025",
    goals: "Create a comprehensive tomato sales management system with inventory tracking, customer management, and sales reporting capabilities using Java HMI and database integration.",
    duration: "1.5 months"
  },
  {
    id: 5,
    title: "League of Legends Statistics Application",
    description: "Managed and utilized database using Oracle APEX. Created interactive statistics dashboard for game data analysis.",
    image: "/img/lol.webp",
    screenshots: [
      "/img/lol.webp",
      "/img/lol-1.png",
      "/img/lol-2.png",
      "/img/lol-3.png"
    ],
    technologies: ["Oracle APEX", "SQL", "Database"],
    link: "https://github.com/ianniboss",
    category: "Web Application",
    year: "2024",
    goals: "Analyze LoL matches (Jan 16–18, 2025) via Riot API with an Oracle APEX app; highlight trends and win factors (performance, roles, champion stats); add two pages with correlation-based insights.",
    duration: "1 month"
  },
  {
    id: 6,
    title: "Algorithmic Exploration and Graph Theory",
    description: "Designed and implemented algorithms in Python. Explored graph theory concepts and optimization techniques.",
    image: "/img/python.png",
    screenshots: [
      "/img/python.png",
      "/img/python-1.png",
      "/img/python-2.png",
      "/img/python-3.png",
      "/img/python-4.png",
      "/img/python-5.png",
      "/img/python-6.png",
      "/img/python-7.png"
    ],
    technologies: ["Python", "Algorithms", "Graph Theory"],
    link: "https://github.com/ianniboss",
    category: "Research & Development",
    year: "2024",
    goals: "Implement and compare shortest-path algorithms (Dijkstra and Bellman–Ford) to compute routes on weighted graphs; visualize paths, distances, and predecessor trees; evaluate performance and edge-case behavior (negative weights) to recommend optimal routing strategies.",
    duration: "9 weeks"
  }
];

export const socialLinks = [
  { name: "GitHub", icon: "github", url: "https://github.com/ianniboss" },
  { name: "LinkedIn", icon: "linkedin", url: "https://linkedin.com/in/ian-hafiz-syahrul-azlan" },
  { name: "Instagram", icon: "instagram", url: "https://www.instagram.com/iandelreyyy/" },
  { name: "Discord", icon: "discord", url: "https://discord.gg/fcTVw6pg" },
  { name: "Email", icon: "mail", url: "mailto:ianhafiz9999@gmail.com" }
];

export const languagesSpoken = [
  { name: "Malay", level: "Native" },
  { name: "English", level: "C1 (Bilingual)" },
  { name: "French", level: "B2" }
];

export const interests = [
  "Photography",
  "Travel",
  "Sports (Hockey, Archery, Sprints)",
  "Baking"
];

export const experience = [
  {
    title: "Photographer",
    organization: "Malaysian Events in France",
    description: "Produced photo reports for cultural and student events. Showcased Malaysian community activities through visual media."
  },
  {
    title: "South Regional Council",
    organization: "MASAF (Malaysian Students' Movement in France)",
    description: "Organized student and cultural events."
  }
];

