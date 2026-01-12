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
          description: 'Designed and created PL/SQL database with Java GUI; managed using SCRUM (Trello).',
          category: 'Database Application',
          goals: 'Create an automated parking management system with real-time slot tracking and multi-user access.',
          challenges: 'Implementing ACID-compliant transactions for booking slots and managing complex PL/SQL triggers for automated fee calculation.'
        },
        {
          title: 'Apache2/SSL Server Administration',
          description: 'Configured and managed Apache2 and SSL servers in Linux.',
          category: 'System Administration',
          goals: 'Deploy a secure, high-availability web server infrastructure using Apache2 with SSL/TLS encryption.',
          challenges: 'Configuring robust cipher suites, managing certificate lifecycles, and hardening the OS against common network attacks.'
        },
        {
          title: 'Web Documentary Creation',
          description: 'Designed and developed an interactive web documentary with multimedia content.',
          category: 'Web Development',
          goals: 'Develop an immersive storytelling platform that combines video, audio, and interactive elements.',
          challenges: 'Optimizing asset loading for smooth performance across different network speeds and ensuring responsive design for mobile users.'
        },
        {
          title: 'Tomato Sales Application',
          description: 'Built Java HMI; managed database and modeled UML using Modelio.',
          category: 'Desktop Application',
          goals: 'Create a sales and inventory management tool for agricultural products with clear data visualization.',
          challenges: 'Designing an intuitive HMI that stays responsive during heavy database operations and mapping complex UML relationships.'
        },
        {
          title: 'League of Legends Statistics Application',
          description: 'Managed database using Oracle APEX; built interactive statistics dashboard.',
          category: 'Web Application',
          goals: 'Provide deep insights into game meta and player performance using Riot API and Oracle APEX.',
          challenges: 'Handling API rate limits, processing massive amounts of JSON match data, and designing efficient SQL queries for complex correlations.'
        },
        {
          title: 'Algorithmic Exploration and Graph Theory',
          description: 'Designed and implemented algorithms in Python; explored graph theory concepts.',
          category: 'Research & Development',
          goals: 'Evaluate and visualize pathfinding algorithms on massive graph datasets.',
          challenges: 'Optimizing memory usage for large adjacency lists and handling edge cases like negative cycle detection in Bellman-Ford.'
        },
        {
          title: 'Malaysian Student Resource Hub',
          description: 'Full-stack web application connecting 500+ Malaysian students across France.',
          category: 'Full-stack Web Application',
          goals: 'Create a centralized platform for community events and administrative guides for students.',
          challenges: 'Managing real-time synchronization with Firebase and integrating multiple administrative resource categories.'
        },
        {
          title: 'Trilingual Translator',
          description: 'AI-powered translation tool for Malay, English, and French with simultaneous output.',
          category: 'AI Application',
          goals: 'Bridge language gaps for students using AI-driven real-time translation across three languages.',
          challenges: 'Implementing efficient debouncing and handling simultaneous API calls for multiple target languages.'
        },
        {
          title: 'Multi-language Caption Generator',
          description: 'AI-powered social media caption generator for Malay, English, and French.',
          category: 'AI Application',
          goals: 'Automate content creation for social media with context-aware trilingual generation.',
          challenges: 'Fine-tuning AI prompts for cultural nuances and maintaining consistent tone across languages.'
        },
        {
          title: 'Weather Application',
          description: 'Clean weather app with modern UI and 5-day forecast functionality.',
          category: 'Web Application',
          goals: 'Provide an intuitive interface for global weather tracking with precise search capability.',
          challenges: 'Mapping dynamic weather icons and optimizing OpenWeatherMap API responses for mobile performance.'
        },
        {
          title: 'Football Team Manager',
          description: 'A comprehensive football team management system for tracking players, matches, and statistics.',
          category: 'Management System',
          goals: 'Build a robust platform for coaches to manage team rosters, schedule matches, and analyze player performance.',
          challenges: 'Managing complex database relationships and providing a clean UI for real-time statistical analysis.'
        },
        {
          title: 'Sonic MP3 Converter',
          description: 'Fast and efficient YouTube to MP3 converter with a sleek, themed interface.',
          category: 'Media Utility',
          goals: 'Provide a simple, high-speed tool for converting media formats with a focus on user experience.',
          challenges: 'Integrating with YouTube APIs and handling high-speed media conversion efficiently.'
        },
        {
          title: 'Mario Notion Dashboard',
          description: 'A Mario-themed productivity dashboard integrated with Notion for task management and organization.',
          category: 'Productivity',
          goals: 'Combine productivity tools with a nostalgic gaming aesthetic to make task management fun.',
          challenges: 'Integrating with Notion API and creating a cohesive Mario-themed UI with TailwindCSS.'
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
          description: 'Conception base PL/SQL avec interface Java; gestion SCRUM (Trello).',
          category: 'Application Base de Données',
          goals: 'Créer un système de gestion de parking automatisé avec suivi des places en temps réel et accès multi-utilisateurs.',
          challenges: 'Mise en œuvre de transactions conformes ACID pour la réservation des places et gestion de déclencheurs PL/SQL complexes pour le calcul automatique des frais.'
        },
        {
          title: 'Administration Serveur Apache2/SSL',
          description: 'Configuration et gestion des serveurs Apache2 et SSL sous Linux.',
          category: 'Administration Système',
          goals: 'Déployer une infrastructure de serveur web sécurisée et à haute disponibilité utilisant Apache2 avec cryptage SSL/TLS.',
          challenges: 'Configuration de suites de chiffrement robustes, gestion des cycles de vie des certificats et renforcement de l\'OS contre les attaques réseau courantes.'
        },
        {
          title: 'Création de Documentaire Web',
          description: 'Conçu et développé un documentaire web interactif multimédia.',
          category: 'Développement Web',
          goals: 'Développer une plateforme narrative immersive combinant vidéo, audio et éléments interactifs.',
          challenges: 'Optimisation du chargement des ressources pour des performances fluides sur différentes vitesses de réseau et garantie d\'un design réactif pour les utilisateurs mobiles.'
        },
        {
          title: 'Application de Vente de Tomates',
          description: 'Interface HMI en Java; gestion BD et UML avec Modelio.',
          category: 'Application Desktop',
          goals: 'Créer un outil de gestion des ventes et des stocks pour les produits agricoles avec une visualisation claire des données.',
          challenges: 'Conception d\'une interface HMI intuitive qui reste réactive lors d\'opérations de base de données lourdes et cartographie des relations UML complexes.'
        },
        {
          title: 'Application Statistiques League of Legends',
          description: 'Base de données avec Oracle APEX; tableau de bord interactif.',
          category: 'Application Web',
          goals: 'Fournir des informations approfondies sur la méta du jeu et les performances des joueurs en utilisant l\'API Riot et Oracle APEX.',
          challenges: 'Gestion des limites de taux de l\'API, traitement de volumes massifs de données de match JSON et conception de requêtes SQL efficaces pour des corrélations complexes.'
        },
        {
          title: 'Exploration Algorithmique et Théorie des Graphes',
          description: 'Algorithmes en Python; concepts de graphes et optimisation.',
          category: 'Recherche & Développement',
          goals: 'Évaluer et visualiser des algorithmes de recherche de chemin sur des jeux de données de graphes massifs.',
          challenges: 'Optimisation de l\'utilisation de la mémoire pour les grandes listes d\'adjacence et gestion des cas particuliers comme la détection de cycles négatifs dans Bellman-Ford.'
        },
        {
          title: 'Hub de Ressources pour Étudiants Malaisiens',
          description: 'Application web full-stack connectant plus de 500 étudiants malaisiens en France.',
          category: 'Application Web Full-stack',
          goals: 'Créer une plateforme centralisée pour les événements communautaires et les guides administratifs.',
          challenges: 'Gestion de la synchronisation en temps réel avec Firebase et intégration de diverses catégories de ressources.'
        },
        {
          title: 'Traducteur Trilingue',
          description: 'Outil de traduction IA pour le malais, l\'anglais et le français avec sortie simultanée.',
          category: 'Application IA',
          goals: 'Combler les lacunes linguistiques via une traduction IA en temps réel sur trois langues.',
          challenges: 'Mise en œuvre d\'un debouncing efficace et gestion des appels API simultanés.'
        },
        {
          title: 'Générateur de Légendes Multi-langues',
          description: 'Générateur de légendes pour réseaux sociaux via IA en malais, anglais et français.',
          category: 'Application IA',
          goals: 'Automatiser la création de contenu pour les réseaux sociaux avec une génération trilingue.',
          challenges: 'Peaufinage des prompts IA pour les nuances culturelles et maintien d\'un ton cohérent.'
        },
        {
          title: 'Application Météo',
          description: 'App météo épurée avec interface moderne et prévisions à 5 jours.',
          category: 'Application Web',
          goals: 'Fournir une interface intuitive pour le suivi météo mondial avec recherche précise.',
          challenges: 'Cartographie des icônes météo dynamiques et optimisation des réponses de l\'API OpenWeatherMap.'
        },
        {
          title: 'Football Team Manager',
          description: 'Un système complet de gestion d\'équipe de football pour le suivi des joueurs, des matchs et des statistiques.',
          category: 'Système de Gestion',
          goals: 'Construire une plateforme robuste pour les entraîneurs afin de gérer les effectifs, planifier les matchs et analyser les performances.',
          challenges: 'Gestion de relations de base de données complexes et fourniture d\'une interface claire pour l\'analyse statistique en temps réel.'
        },
        {
          title: 'Sonic MP3 Converter',
          description: 'Convertisseur YouTube en MP3 rapide et efficace avec une interface thématique élégante.',
          category: 'Utilitaire Média',
          goals: 'Fournir un outil simple et rapide pour convertir des formats multimédias en mettant l\'accent sur l\'expérience utilisateur.',
          challenges: 'Intégration avec les API YouTube et gestion efficace de la conversion multimédia à haute vitesse.'
        },
        {
          title: 'Tableau de Bord Mario Notion',
          description: 'Un tableau de bord de productivité sur le thème de Mario intégré à Notion pour la gestion des tâches et l\'organisation.',
          category: 'Productivité',
          goals: 'Combiner des outils de productivité avec une esthétique de jeu nostalgique pour rendre la gestion des tâches amusante.',
          challenges: 'Intégration avec l\'API Notion et création d\'une interface cohérente sur le thème de Mario avec TailwindCSS.'
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