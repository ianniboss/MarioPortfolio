export const translations = {
  en: {
    // Start Screen
    startScreen: {
      title: 'PORTFOLIO QUEST',
      button: 'PRESS START',
      hint: 'Click to begin your adventure'
    },

    // Header/Navigation
    nav: {
      home: 'Home',
      about: 'About',
      education: 'Education',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact'
    },

    // Hero Section
    hero: {
      name: 'Ian Hafiz Syahrul Azlan',
      title: 'Computer Science Student',
      tagline: 'Crafting Digital Adventures',
      startBtn: 'Start Adventure',
      projectsBtn: 'View Projects'
    },

    // About Section
    about: {
      title: 'About Me',
      description: "Hey there! I'm a passionate IT student and developer from Malaysia, currently studying in Toulouse, France. I love creating innovative applications and exploring new technologies. With a blend of creativity and technical expertise, I transform ideas into functional and engaging digital experiences. Currently seeking a 10-12 week internship for April-June 2026!",
      flipHint: 'Click to flip!',
      flipBackHint: 'Click to flip back!',
      resumeBtn: 'Download My Resume',
      contactTitle: 'Contact Info',
      email: 'ianhafiz9999@gmail.com',
      location: 'Toulouse, France',
      nationality: 'Malaysian'
    },

    // Education Section
    education: {
      title: 'Education Journey',
      level: 'Level',
      items: [
        {
          level: 'Level 1',
          degree: "Bachelor's Degree in IT (BUT Informatique)",
          institution: 'IUT Paul Sabatier, Université Toulouse III',
          year: '2024 - Present',
          description: '2nd Year, specializing in Application Development. Focus areas: Software Development, Databases, Networking, Project Management.',
          image: 'Photo_campus_IUT_Toulouse.jpg',
          logo: 'logo_iut_tls.png'
        },
        {
          level: 'Level 2',
          degree: 'Pre-University Programme (Malaysia–France Cooperation)',
          institution: 'University of Tours (IUT de Tours)',
          year: '2022 - 2023',
          description: 'Coursework: French Language, Mathematics, Physics-Chemistry, Algorithmics, and Logic. Achievement: French Language Level B2.',
          logo: 'tourslogo.svg'
        },
        {
          level: 'Level 3',
          degree: 'Sijil Pelajaran Malaysia (SPM)',
          institution: 'Tuanku Munawir Science School, Malaysia',
          year: '2017 - 2022',
          description: 'Result: 9A+ in Pure Science and Language subjects.',
          image: 'profile.jpg',
          logo: 'saser.jpg'
        }
      ]
    },

    // Skills Section
    skills: {
      title: 'Power-Ups & Skills',
      items: [
        { name: 'Java', type: 'Fire Flower' },
        { name: 'Python', type: 'Star Power' },
        { name: 'C', type: 'Leaf Power' },
        { name: 'SQL', type: 'Yoshi Egg' },
        { name: 'PHP', type: '1-UP Mushroom' },
        { name: 'HTML/CSS', type: 'Super Mushroom' },
        { name: 'Git', type: 'POW Block' },
        { name: 'Linux', type: 'Cape Feather' }
      ]
    },

    // Projects Section
    projects: {
      title: 'Mystery Blocks',
      subtitle: 'Hit the blocks to reveal projects!',
      viewDetails: 'View Details',
      liveDemo: 'Live Demo',
      source: 'Source',
      items: [
        {
          title: 'Parking Management Application',
          description: 'A full-stack parking management system enabling real-time slot booking, automated fee calculation, and multi-user access control with role-based permissions.',
          category: 'Database Application',
          problemSolved: 'Manual parking management leads to overbooking, revenue loss, and frustrated customers. This system automates everything from availability tracking to payment processing.',
          goals: 'Build an automated parking management system with real-time slot tracking, role-based user access, and automated billing.',
          role: 'Led database design using PL/SQL, built the Java GUI with WindowBuilder, wrote stored procedures for booking logic, and coordinated the team using SCRUM methodology.',
          challenges: 'Implemented ACID-compliant transactions for concurrent bookings to prevent double-reservations. Created complex PL/SQL triggers for automated fee calculation based on dynamic pricing rules.',
          learnings: 'Gained hands-on experience with relational database design, transaction management, and the importance of data integrity in multi-user systems.'
        },
        {
          title: 'Apache2/SSL Server Administration',
          description: 'Deployed and hardened a production-grade Apache2 web server with SSL/TLS encryption, implementing security best practices and monitoring on Linux infrastructure.',
          category: 'System Administration',
          problemSolved: 'Insecure web deployments expose organizations to data breaches and compliance failures. This project established a reusable secure server template.',
          goals: 'Deploy a secure, high-availability web server infrastructure with proper SSL/TLS configuration and OS-level hardening.',
          role: 'Configured Apache virtual hosts, generated and installed SSL certificates, wrote security policies, and implemented firewall rules.',
          challenges: 'Configured robust cipher suites to balance security and compatibility. Managed certificate lifecycles with automated renewal scripts. Hardened the Linux OS against common attack vectors (SSH, iptables, fail2ban).',
          learnings: 'Learned the fundamentals of DevOps security, certificate management, and the critical importance of defense-in-depth strategies.'
        },
        {
          title: 'Web Documentary Creation',
          description: 'An interactive multimedia web documentary combining video, audio, and responsive interactive elements to create an immersive storytelling experience.',
          category: 'Web Development',
          problemSolved: 'Traditional documentaries are passive experiences. This project explored how interactivity can deepen audience engagement and retention.',
          goals: 'Create an immersive digital storytelling platform that seamlessly blends multimedia content with user interaction.',
          role: 'Designed the UX flow, implemented responsive layouts, optimized media assets for web delivery, and integrated interactive hotspots.',
          challenges: 'Optimized asset loading using lazy-loading and adaptive quality to ensure smooth playback across varying network speeds. Built a fully responsive experience from desktop to mobile.',
          learnings: 'Understood the intersection of design and performance optimization, and how to prioritize user experience in content-heavy applications.'
        },
        {
          title: 'Tomato Sales Application',
          description: 'A desktop inventory and sales management system for agricultural products featuring real-time stock tracking, sales analytics, and a user-friendly Java interface.',
          category: 'Desktop Application',
          problemSolved: 'Small agricultural businesses often lack digital tools for inventory management, leading to stock discrepancies and lost sales opportunities.',
          goals: 'Deliver a comprehensive sales and inventory management tool with clear data visualization and intuitive user experience.',
          role: 'Architected the system using UML (Modelio), developed the Java HMI with Swing, designed the database schema, and implemented CRUD operations.',
          challenges: 'Designed an HMI that remains responsive during heavy database reads by implementing background threading. Mapped complex entity relationships in UML before coding.',
          learnings: 'Learned the value of thorough system design before implementation, and how threading improves perceived performance in desktop applications.'
        },
        {
          title: 'League of Legends Statistics Application',
          description: 'A data analytics dashboard that processes Riot API match data to reveal player performance trends, champion statistics, and game-winning factors using Oracle APEX.',
          category: 'Web Application',
          problemSolved: 'Raw game data is overwhelming; players and analysts need clear visualizations to identify patterns and improve strategies.',
          goals: 'Provide actionable insights into game meta and player performance through interactive dashboards and correlation analysis.',
          role: 'Integrated Riot API for data ingestion, designed the Oracle database schema, built APEX dashboards, and wrote complex SQL queries for statistical analysis.',
          challenges: 'Handled API rate limits with queuing and caching strategies. Processed large JSON payloads efficiently and optimized SQL queries for fast correlation analysis across thousands of matches.',
          learnings: 'Gained experience with third-party API integration, data pipeline design, and turning raw data into meaningful business intelligence.'
        },
        {
          title: 'Algorithmic Exploration and Graph Theory',
          description: 'A Python research project benchmarking and visualizing pathfinding algorithms (Dijkstra, A*, Bellman-Ford) on large-scale graph datasets with performance analysis.',
          category: 'Research & Development',
          problemSolved: 'Understanding algorithm performance on real-world data structures is crucial for making informed engineering decisions in routing and optimization problems.',
          goals: 'Evaluate, visualize, and compare pathfinding algorithms on massive graph datasets to understand their trade-offs.',
          role: 'Implemented algorithms from scratch, designed visualization tools using matplotlib, and conducted performance benchmarking with various graph sizes.',
          challenges: 'Optimized memory usage for graphs with millions of nodes using efficient adjacency list representations. Handled edge cases like negative cycle detection in Bellman-Ford.',
          learnings: 'Deepened understanding of algorithm complexity, space-time trade-offs, and the importance of choosing the right data structure for the problem.'
        },
        {
          title: 'Malaysian Student Resource Hub',
          description: 'A full-stack community platform serving 500+ Malaysian students in France with event management, administrative guides, location services, and real-time updates.',
          category: 'Full-stack Web Application',
          problemSolved: 'International students struggle to find reliable information about administrative procedures and community events in a foreign country.',
          goals: 'Create a centralized, always-updated platform for community events, embassy guides, and student resources.',
          role: 'Architected the React frontend, set up Firebase backend with Firestore, integrated Google Maps API, and implemented real-time data synchronization.',
          challenges: 'Managed real-time synchronization with Firebase listeners while minimizing unnecessary re-renders. Structured data for efficient querying across multiple resource categories.',
          learnings: 'Learned full-stack architecture patterns, real-time database design, and the impact of thoughtful UX on community adoption.'
        },
        {
          title: 'Trilingual Translator',
          description: 'An AI-powered real-time translation tool that simultaneously translates between Malay, English, and French with smart debouncing and optimized API usage.',
          category: 'AI Application',
          problemSolved: 'Trilingual students constantly switch between languages; existing translators require separate queries for each target language, wasting time.',
          goals: 'Provide instant, simultaneous translation across three languages optimized for students navigating multilingual environments.',
          role: 'Designed the UI/UX, integrated Gemini API, implemented debouncing logic for API efficiency, and built the responsive React frontend.',
          challenges: 'Implemented efficient debouncing (300ms) to reduce API calls while maintaining responsive feel. Managed parallel API calls for simultaneous translation output.',
          learnings: 'Understood the nuances of working with LLM APIs, including prompt engineering, rate limiting, and creating responsive AI-powered interfaces.'
        },
        {
          title: 'Multi-language Caption Generator',
          description: 'An AI content generator that creates engaging, culturally-aware social media captions in Malay, English, and French based on user context and platform requirements.',
          category: 'AI Application',
          problemSolved: 'Content creators managing multilingual audiences spend excessive time manually adapting captions for each language and culture.',
          goals: 'Automate trilingual caption generation with cultural awareness and platform-specific optimization.',
          role: 'Designed and tested AI prompts for cultural nuance, built the React interface, and implemented platform-specific formatting options.',
          challenges: 'Fine-tuned prompts to maintain consistent brand tone while adapting to cultural contexts. Handled edge cases where direct translation loses meaning.',
          learnings: 'Gained insight into prompt engineering for creative content, and how cultural context affects AI output quality.'
        },
        {
          title: 'Weather Application',
          description: 'A fast, responsive weather web app providing real-time conditions and 5-day forecasts for any city worldwide with optimized API usage and mobile-first design.',
          category: 'Web Application',
          problemSolved: 'Many weather apps are cluttered and slow; this project prioritized speed, clarity, and mobile-first usability.',
          goals: 'Build an intuitive weather interface with global search, real-time data, and a clean, accessible design.',
          role: 'Designed the UI, implemented the React frontend, integrated OpenWeatherMap API, and optimized data handling for performance.',
          challenges: 'Created a mapping system to convert OpenWeatherMap condition codes into dynamic, contextual icons. Reduced API payload processing by extracting only required fields to improve mobile performance.',
          learnings: 'Learned how to work with third-party APIs, handle asynchronous data in React, and design UI components that adapt to dynamic content.'
        },
        {
          title: 'Football Team Manager',
          description: 'A comprehensive team management platform for coaches to manage player rosters, schedule matches, track statistics, and analyze performance trends.',
          category: 'Management System',
          problemSolved: 'Amateur coaches often use spreadsheets or paper to track teams, leading to disorganization and lost insights.',
          goals: 'Build a robust digital platform for roster management, match scheduling, and real-time performance analytics.',
          role: 'Designed the MySQL database schema, developed PHP backend with MVC architecture, created responsive CSS layouts, and implemented statistical dashboards.',
          challenges: 'Designed relational database with proper foreign keys and indices for fast queries. Built a clean UI that presents complex statistics in digestible formats.',
          learnings: 'Strengthened backend development skills, database normalization practices, and data visualization techniques for non-technical users.'
        },
        {
          title: 'Sonic MP3 Converter',
          description: 'A high-speed YouTube to MP3 converter featuring a themed interface, queue management, and optimized backend processing for fast conversions.',
          category: 'Media Utility',
          problemSolved: 'Most converters are ad-heavy and slow; this project focused on speed, simplicity, and a delightful user experience.',
          goals: 'Provide a fast, user-friendly media conversion tool with engaging UI and efficient backend processing.',
          role: 'Built the React frontend, designed the Sonic-themed UI, configured Vercel deployment, and integrated with backend conversion services.',
          challenges: 'Implemented efficient queue management for multiple simultaneous requests. Optimized frontend responsiveness during conversion progress updates.',
          learnings: 'Gained experience with file handling workflows, progress tracking patterns, and creating engaging themed interfaces.'
        },
        {
          title: 'Mario Notion Dashboard',
          description: 'A productivity dashboard that combines Notion API functionality with a nostalgic Mario-themed interface for task management, goal tracking, and daily planning.',
          category: 'Productivity',
          problemSolved: 'Productivity tools often feel sterile and uninspiring; gamification can increase engagement and habit formation.',
          goals: 'Merge productivity functionality with gaming aesthetics to make task management genuinely enjoyable.',
          role: 'Integrated Notion API for data sync, designed the Mario-themed component library with TailwindCSS, and implemented gamification elements.',
          challenges: 'Worked around Notion API limitations for real-time updates. Created a cohesive retro design system that remains functional and accessible.',
          learnings: 'Explored the balance between aesthetics and usability, and learned how gamification principles can improve user engagement.'
        }
      ]


    },

    // Contact Section
    contact: {
      title: 'Pause Menu',
      subtitle: 'Ready to start a new quest together?',
      playerName: 'Player Name',
      emailAddress: 'Email Address',
      message: 'Message',
      namePlaceholder: 'Enter your name',
      emailPlaceholder: 'your@email.com',
      messagePlaceholder: 'Tell me about your project...',
      sendBtn: 'Send Message',
      socialTitle: 'Join My World',
      toastTitle: 'Message Sent!',
      toastDescription: "Your message has been received. I'll get back to you soon!"
    },

    // Footer
    footer: {
      craftedBy: 'Crafted with',
      by: 'by Ian Hafiz Syahrul Azlan',
      copyright: '© 2025 All Rights Reserved'
    }
  },

  fr: {
    // Start Screen
    startScreen: {
      title: 'QUÊTE PORTFOLIO',
      button: 'APPUYER START',
      hint: 'Cliquez pour commencer votre aventure'
    },

    // Header/Navigation
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      education: 'Éducation',
      skills: 'Compétences',
      projects: 'Projets',
      contact: 'Contact'
    },

    // Hero Section
    hero: {
      name: 'Ian Hafiz Syahrul Azlan',
      title: 'Étudiant en informatique',
      tagline: 'Créer des Aventures Numériques',
      startBtn: 'Commencer l\'Aventure',
      projectsBtn: 'Voir les Projets'
    },

    // About Section
    about: {
      title: 'À Propos de Moi',
      description: "Bonjour! Je suis un étudiant passionné en informatique et développeur originaire de Malaisie, actuellement en études à Toulouse, France. J'adore créer des applications innovantes et explorer de nouvelles technologies. Avec un mélange de créativité et d'expertise technique, je transforme les idées en expériences numériques fonctionnelles et engageantes. Actuellement à la recherche d'un stage de 10-12 semaines pour avril-juin 2026!",
      flipHint: 'Cliquez pour retourner!',
      flipBackHint: 'Cliquez pour revenir!',
      resumeBtn: 'Télécharger mon CV',
      contactTitle: 'Coordonnées',
      email: 'ianhafiz9999@gmail.com',
      location: 'Toulouse, France',
      nationality: 'Malaisien'
    },

    // Education Section
    education: {
      title: 'Parcours Éducatif',
      level: 'Niveau',
      items: [
        {
          level: 'Niveau 1',
          degree: 'BUT Informatique',
          institution: 'IUT Paul Sabatier, Université Toulouse III',
          year: '2024 - Présent',
          description: '2ème année, spécialisation en Développement d\'Applications. Domaines d\'étude: Développement Logiciel, Bases de Données, Réseaux, Gestion de Projet.',
          image: 'Photo_campus_IUT_Toulouse.jpg',
          logo: 'logo_iut_tls.png'
        },
        {
          level: 'Niveau 2',
          degree: 'Programme Pré-Universitaire (Coopération Malaisie-France)',
          institution: 'Université de Tours (IUT de Tours)',
          year: '2022 - 2023',
          description: 'Matières: Langue Française, Mathématiques, Physique-Chimie, Algorithmique et Logique. Accomplissement: Niveau de Langue Française B2.',
          logo: 'tourslogo.svg'
        },
        {
          level: 'Niveau 3',
          degree: 'Sijil Pelajaran Malaysia (SPM)',
          institution: 'Tuanku Munawir Science School, Malaisie',
          year: '2017 - 2022',
          description: 'Résultat: 9A+ en Sciences Pures et matières linguistiques.',
          image: 'profile.jpg',
          logo: 'saser.jpg'
        }
      ]
    },

    // Skills Section
    skills: {
      title: 'Power-Ups & Compétences',
      items: [
        { name: 'Java', type: 'Fleur de Feu' },
        { name: 'Python', type: 'Pouvoir Étoile' },
        { name: 'C', type: 'Pouvoir Feuille' },
        { name: 'SQL', type: 'Œuf de Yoshi' },
        { name: 'PHP', type: 'Champignon 1-UP' },
        { name: 'HTML/CSS', type: 'Super Champignon' },
        { name: 'Git', type: 'Bloc POW' },
        { name: 'Linux', type: 'Plume Cape' }
      ]
    },

    // Projects Section
    projects: {
      title: 'Blocs Mystères',
      subtitle: 'Frappez les blocs pour révéler les projets!',
      viewDetails: 'Voir Détails',
      liveDemo: 'Démo Live',
      source: 'Source',
      items: [
        {
          title: 'Application de Gestion de Parking',
          description: 'Un système full-stack de gestion de parking permettant la réservation en temps réel, le calcul automatique des frais et le contrôle d\'accès multi-utilisateurs avec permissions basées sur les rôles.',
          category: 'Application Base de Données',
          problemSolved: 'La gestion manuelle du parking entraîne des sur-réservations, des pertes de revenus et des clients frustrés. Ce système automatise tout, du suivi de disponibilité au traitement des paiements.',
          goals: 'Construire un système de gestion de parking automatisé avec suivi des places en temps réel, accès utilisateur basé sur les rôles et facturation automatique.',
          role: 'Dirigé la conception de la base de données avec PL/SQL, construit l\'interface Java avec WindowBuilder, écrit les procédures stockées pour la logique de réservation et coordonné l\'équipe avec la méthodologie SCRUM.',
          challenges: 'Implémenté des transactions conformes ACID pour les réservations simultanées afin d\'éviter les doubles réservations. Créé des déclencheurs PL/SQL complexes pour le calcul automatique des frais basé sur des règles de tarification dynamiques.',
          learnings: 'Acquis une expérience pratique de la conception de bases de données relationnelles, de la gestion des transactions et de l\'importance de l\'intégrité des données dans les systèmes multi-utilisateurs.'
        },
        {
          title: 'Administration Serveur Apache2/SSL',
          description: 'Déployé et sécurisé un serveur web Apache2 de production avec cryptage SSL/TLS, implémentant les meilleures pratiques de sécurité et la surveillance sur infrastructure Linux.',
          category: 'Administration Système',
          problemSolved: 'Les déploiements web non sécurisés exposent les organisations aux violations de données et aux échecs de conformité. Ce projet a établi un modèle de serveur sécurisé réutilisable.',
          goals: 'Déployer une infrastructure de serveur web sécurisée et haute disponibilité avec configuration SSL/TLS appropriée et durcissement au niveau OS.',
          role: 'Configuré les hôtes virtuels Apache, généré et installé les certificats SSL, rédigé les politiques de sécurité et implémenté les règles de pare-feu.',
          challenges: 'Configuré des suites de chiffrement robustes pour équilibrer sécurité et compatibilité. Géré les cycles de vie des certificats avec des scripts de renouvellement automatisés. Durci le Linux OS contre les vecteurs d\'attaque courants (SSH, iptables, fail2ban).',
          learnings: 'Appris les fondamentaux de la sécurité DevOps, la gestion des certificats et l\'importance critique des stratégies de défense en profondeur.'
        },
        {
          title: 'Création de Documentaire Web',
          description: 'Un documentaire web multimédia interactif combinant vidéo, audio et éléments interactifs réactifs pour créer une expérience narrative immersive.',
          category: 'Développement Web',
          problemSolved: 'Les documentaires traditionnels sont des expériences passives. Ce projet a exploré comment l\'interactivité peut approfondir l\'engagement et la rétention du public.',
          goals: 'Créer une plateforme de narration numérique immersive qui mélange harmonieusement contenu multimédia et interaction utilisateur.',
          role: 'Conçu le flux UX, implémenté les mises en page réactives, optimisé les ressources média pour la diffusion web et intégré les points chauds interactifs.',
          challenges: 'Optimisé le chargement des ressources en utilisant le lazy-loading et la qualité adaptative pour assurer une lecture fluide à travers diverses vitesses de réseau. Construit une expérience entièrement responsive du bureau au mobile.',
          learnings: 'Compris l\'intersection entre design et optimisation des performances, et comment prioriser l\'expérience utilisateur dans les applications riches en contenu.'
        },
        {
          title: 'Application de Vente de Tomates',
          description: 'Un système desktop de gestion des stocks et des ventes pour produits agricoles avec suivi des stocks en temps réel, analyses des ventes et interface Java conviviale.',
          category: 'Application Desktop',
          problemSolved: 'Les petites entreprises agricoles manquent souvent d\'outils numériques pour la gestion des stocks, entraînant des écarts de stock et des opportunités de vente perdues.',
          goals: 'Livrer un outil complet de gestion des ventes et des stocks avec visualisation claire des données et expérience utilisateur intuitive.',
          role: 'Architecturé le système en utilisant UML (Modelio), développé l\'interface HMI Java avec Swing, conçu le schéma de base de données et implémenté les opérations CRUD.',
          challenges: 'Conçu une interface HMI qui reste réactive lors des lectures intensives de base de données en implémentant le threading en arrière-plan. Cartographié les relations d\'entités complexes en UML avant le codage.',
          learnings: 'Appris la valeur d\'une conception système approfondie avant l\'implémentation, et comment le threading améliore les performances perçues dans les applications desktop.'
        },
        {
          title: 'Application Statistiques League of Legends',
          description: 'Un tableau de bord d\'analyse de données qui traite les données de match de l\'API Riot pour révéler les tendances de performance des joueurs, les statistiques des champions et les facteurs de victoire en utilisant Oracle APEX.',
          category: 'Application Web',
          problemSolved: 'Les données de jeu brutes sont écrasantes; les joueurs et analystes ont besoin de visualisations claires pour identifier les patterns et améliorer les stratégies.',
          goals: 'Fournir des insights actionnables sur la méta du jeu et les performances des joueurs via des tableaux de bord interactifs et l\'analyse de corrélation.',
          role: 'Intégré l\'API Riot pour l\'ingestion de données, conçu le schéma de base de données Oracle, construit les tableaux de bord APEX et écrit des requêtes SQL complexes pour l\'analyse statistique.',
          challenges: 'Géré les limites de taux de l\'API avec des stratégies de file d\'attente et de mise en cache. Traité efficacement les grandes charges JSON et optimisé les requêtes SQL pour une analyse de corrélation rapide sur des milliers de matchs.',
          learnings: 'Acquis de l\'expérience avec l\'intégration d\'API tierces, la conception de pipelines de données et la transformation de données brutes en intelligence d\'affaires significative.'
        },
        {
          title: 'Exploration Algorithmique et Théorie des Graphes',
          description: 'Un projet de recherche Python benchmarkant et visualisant les algorithmes de recherche de chemin (Dijkstra, A*, Bellman-Ford) sur des jeux de données de graphes à grande échelle avec analyse de performance.',
          category: 'Recherche & Développement',
          problemSolved: 'Comprendre les performances des algorithmes sur des structures de données réelles est crucial pour prendre des décisions d\'ingénierie éclairées dans les problèmes de routage et d\'optimisation.',
          goals: 'Évaluer, visualiser et comparer les algorithmes de recherche de chemin sur des jeux de données de graphes massifs pour comprendre leurs compromis.',
          role: 'Implémenté les algorithmes à partir de zéro, conçu des outils de visualisation avec matplotlib et mené des benchmarks de performance avec diverses tailles de graphes.',
          challenges: 'Optimisé l\'utilisation de la mémoire pour les graphes avec des millions de nœuds en utilisant des représentations de listes d\'adjacence efficaces. Géré les cas limites comme la détection de cycles négatifs dans Bellman-Ford.',
          learnings: 'Approfondi la compréhension de la complexité des algorithmes, des compromis espace-temps et de l\'importance de choisir la bonne structure de données pour le problème.'
        },
        {
          title: 'Hub de Ressources pour Étudiants Malaisiens',
          description: 'Une plateforme communautaire full-stack servant plus de 500 étudiants malaisiens en France avec gestion d\'événements, guides administratifs, services de localisation et mises à jour en temps réel.',
          category: 'Application Web Full-stack',
          problemSolved: 'Les étudiants internationaux peinent à trouver des informations fiables sur les procédures administratives et les événements communautaires dans un pays étranger.',
          goals: 'Créer une plateforme centralisée et toujours à jour pour les événements communautaires, les guides d\'ambassade et les ressources étudiantes.',
          role: 'Architecturé le frontend React, configuré le backend Firebase avec Firestore, intégré l\'API Google Maps et implémenté la synchronisation des données en temps réel.',
          challenges: 'Géré la synchronisation en temps réel avec les listeners Firebase tout en minimisant les re-rendus inutiles. Structuré les données pour des requêtes efficaces à travers plusieurs catégories de ressources.',
          learnings: 'Appris les patterns d\'architecture full-stack, la conception de bases de données temps réel et l\'impact d\'une UX réfléchie sur l\'adoption communautaire.'
        },
        {
          title: 'Traducteur Trilingue',
          description: 'Un outil de traduction en temps réel alimenté par IA qui traduit simultanément entre le malais, l\'anglais et le français avec debouncing intelligent et utilisation optimisée de l\'API.',
          category: 'Application IA',
          problemSolved: 'Les étudiants trilingues changent constamment de langues; les traducteurs existants nécessitent des requêtes séparées pour chaque langue cible, perdant du temps.',
          goals: 'Fournir une traduction instantanée et simultanée à travers trois langues optimisée pour les étudiants naviguant dans des environnements multilingues.',
          role: 'Conçu l\'UI/UX, intégré l\'API Gemini, implémenté la logique de debouncing pour l\'efficacité API et construit le frontend React responsive.',
          challenges: 'Implémenté un debouncing efficace (300ms) pour réduire les appels API tout en maintenant une sensation réactive. Géré les appels API parallèles pour la sortie de traduction simultanée.',
          learnings: 'Compris les nuances du travail avec les APIs LLM, y compris l\'ingénierie de prompts, la limitation de débit et la création d\'interfaces alimentées par IA réactives.'
        },
        {
          title: 'Générateur de Légendes Multi-langues',
          description: 'Un générateur de contenu IA qui crée des légendes de réseaux sociaux engageantes et culturellement adaptées en malais, anglais et français basé sur le contexte utilisateur et les exigences de plateforme.',
          category: 'Application IA',
          problemSolved: 'Les créateurs de contenu gérant des audiences multilingues passent un temps excessif à adapter manuellement les légendes pour chaque langue et culture.',
          goals: 'Automatiser la génération de légendes trilingues avec conscience culturelle et optimisation spécifique à la plateforme.',
          role: 'Conçu et testé les prompts IA pour les nuances culturelles, construit l\'interface React et implémenté les options de formatage spécifiques aux plateformes.',
          challenges: 'Affiné les prompts pour maintenir un ton de marque cohérent tout en s\'adaptant aux contextes culturels. Géré les cas limites où la traduction directe perd le sens.',
          learnings: 'Acquis des perspectives sur l\'ingénierie de prompts pour le contenu créatif, et comment le contexte culturel affecte la qualité de sortie de l\'IA.'
        },
        {
          title: 'Application Météo',
          description: 'Une application web météo rapide et responsive fournissant les conditions en temps réel et des prévisions à 5 jours pour toute ville mondiale avec utilisation optimisée de l\'API et design mobile-first.',
          category: 'Application Web',
          problemSolved: 'Beaucoup d\'applications météo sont encombrées et lentes; ce projet a priorisé la vitesse, la clarté et l\'utilisabilité mobile-first.',
          goals: 'Construire une interface météo intuitive avec recherche mondiale, données en temps réel et design propre et accessible.',
          role: 'Conçu l\'UI, implémenté le frontend React, intégré l\'API OpenWeatherMap et optimisé le traitement des données pour les performances.',
          challenges: 'Créé un système de mapping pour convertir les codes de condition OpenWeatherMap en icônes dynamiques et contextuelles. Réduit le traitement de la charge utile API en extrayant uniquement les champs requis pour améliorer les performances mobiles.',
          learnings: 'Appris à travailler avec les APIs tierces, gérer les données asynchrones en React et designer des composants UI qui s\'adaptent au contenu dynamique.'
        },
        {
          title: 'Football Team Manager',
          description: 'Une plateforme complète de gestion d\'équipe pour les entraîneurs pour gérer les effectifs de joueurs, planifier les matchs, suivre les statistiques et analyser les tendances de performance.',
          category: 'Système de Gestion',
          problemSolved: 'Les entraîneurs amateurs utilisent souvent des tableurs ou du papier pour suivre les équipes, menant à la désorganisation et à la perte d\'insights.',
          goals: 'Construire une plateforme numérique robuste pour la gestion des effectifs, la planification des matchs et l\'analyse de performance en temps réel.',
          role: 'Conçu le schéma de base de données MySQL, développé le backend PHP avec architecture MVC, créé des mises en page CSS responsives et implémenté des tableaux de bord statistiques.',
          challenges: 'Conçu une base de données relationnelle avec des clés étrangères et des index appropriés pour des requêtes rapides. Construit une interface propre qui présente des statistiques complexes dans des formats digestibles.',
          learnings: 'Renforcé les compétences en développement backend, les pratiques de normalisation de base de données et les techniques de visualisation de données pour les utilisateurs non-techniques.'
        },
        {
          title: 'Sonic MP3 Converter',
          description: 'Un convertisseur YouTube vers MP3 à haute vitesse avec une interface thématique, gestion de file d\'attente et traitement backend optimisé pour des conversions rapides.',
          category: 'Utilitaire Média',
          problemSolved: 'La plupart des convertisseurs sont pleins de publicités et lents; ce projet s\'est concentré sur la vitesse, la simplicité et une expérience utilisateur agréable.',
          goals: 'Fournir un outil de conversion média rapide et convivial avec une UI engageante et un traitement backend efficace.',
          role: 'Construit le frontend React, conçu l\'UI thème Sonic, configuré le déploiement Vercel et intégré avec les services de conversion backend.',
          challenges: 'Implémenté une gestion de file d\'attente efficace pour les requêtes simultanées multiples. Optimisé la réactivité du frontend pendant les mises à jour de progression de conversion.',
          learnings: 'Acquis de l\'expérience avec les flux de travail de gestion de fichiers, les patterns de suivi de progression et la création d\'interfaces thématiques engageantes.'
        },
        {
          title: 'Tableau de Bord Mario Notion',
          description: 'Un tableau de bord de productivité qui combine la fonctionnalité de l\'API Notion avec une interface nostalgique thème Mario pour la gestion des tâches, le suivi des objectifs et la planification quotidienne.',
          category: 'Productivité',
          problemSolved: 'Les outils de productivité semblent souvent stériles et sans inspiration; la gamification peut augmenter l\'engagement et la formation d\'habitudes.',
          goals: 'Fusionner la fonctionnalité de productivité avec l\'esthétique de jeu pour rendre la gestion des tâches véritablement agréable.',
          role: 'Intégré l\'API Notion pour la synchronisation des données, conçu la bibliothèque de composants thème Mario avec TailwindCSS et implémenté les éléments de gamification.',
          challenges: 'Contourné les limitations de l\'API Notion pour les mises à jour en temps réel. Créé un système de design rétro cohérent qui reste fonctionnel et accessible.',
          learnings: 'Exploré l\'équilibre entre esthétique et utilisabilité, et appris comment les principes de gamification peuvent améliorer l\'engagement utilisateur.'
        }
      ]


    },

    // Contact Section
    contact: {
      title: 'Menu Pause',
      subtitle: 'Prêt à commencer une nouvelle quête ensemble?',
      playerName: 'Nom du Joueur',
      emailAddress: 'Adresse Email',
      message: 'Message',
      namePlaceholder: 'Entrez votre nom',
      emailPlaceholder: 'votre@email.com',
      messagePlaceholder: 'Parlez-moi de votre projet...',
      sendBtn: 'Envoyer le Message',
      socialTitle: 'Rejoignez Mon Monde',
      toastTitle: 'Message Envoyé!',
      toastDescription: 'Votre message a été reçu. Je reviendrai vers vous bientôt!'
    },

    // Footer
    footer: {
      craftedBy: 'Créé avec',
      by: 'par Ian Hafiz Syahrul Azlan',
      copyright: '© 2025 Tous droits réservés'
    }
  }
};