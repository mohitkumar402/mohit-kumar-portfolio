/**
 * Portfolio content editable from /admin. Stored in localStorage.
 * Portfolio components read from here with fallback to these defaults.
 */

const PORTFOLIO_STORAGE_KEY = "mohit_portfolio_admin";

const DEFAULT_HOME = {
  name: "MOHIT KUMAR",
  typeStrings: [
    "Software Developer",
    "Freelancer",
    "MERN Stack Developer",
    "Open Source Contributor",
    "flutter Developer",
    "website Developer",
  ],
};

const DEFAULT_ABOUT = {
  cardIntro: "Hi Everyone, I am mohit kumar from bihar, India. I am currently a software engineer pursuing btech. I have completed diploma in computer science and engineering from parul university, vadodara. Apart from coding, some other activities that I love to do!",
  activities: ["Playing valorant", "Listening to Music", "a bit of personal blogging", "Watching Movies and Series", "Travelling and exploring mountains"],
  quote: "Strive to build things that make a difference! among oneself",
  quoteFooter: "mohit",
  sectionHeadingSkills: "Professional Skillset",
  sectionHeadingTools: "Tools I use",
};

const DEFAULT_HOME2_INTRO = `I'm a Full Stack Developer with deep expertise across the entire software development lifecycle from system architecture and design to deployment and scaling.

I specialize in mobile app development, custom web applications, and building robust ERP solutions that streamline business operations and scale alongside growing organizations.

I'm also the Founder of Akions, where we design and build high-class web and mobile applications and create professional portfolios that showcase brands, products, and individuals with clarity and impact. Our work reflects proven technical expertise, modern architectures, and a strong commitment to performance, scalability, and clean code, delivering solutions that are both visually refined and production-ready.

My focus is on building scalable, real-world solutions — whether it's a custom web application, an ERP module, a professional portfolio, or a polished, performance-driven mobile app.`;

const DEFAULT_SOCIAL = {
  github: "https://github.com/mohitkumar402",
  twitter: "https://twitter.com/mohitku77264348",
  linkedin: "https://www.linkedin.com/in/mohit-kumar-851367168/",
  instagram: "https://www.instagram.com/Mohitcodess",
  ekionsUrl: "https://www.ekions.com/",
};

const DEFAULT_FOOTER = {
  name: "Mohit Kumar",
  tagline: "Full Stack Developer · Mobile & Web · ERP & Scalable Systems",
  shortDesc: "Building high-class web and mobile applications. Founder of Akions.",
  email: "200345305011@paruluniversity.ac.in",
  location: "Vadodara, Gujarat, India",
  phone: "6203802704",
  copyrightText: "Designed & developed with care.",
};

const DEFAULT_PROJECTS = [
  { title: "Sign Language Recognition (SLR)", description: "The Sign Language Recognition (SLR) module is designed to facilitate communication for deaf and mute individuals by recognizing hand gestures and translating them into meaningful text or speech. This project leverages machine learning and computer vision techniques to identify different hand signs accurately.", imgPath: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800&q=80", ghLink: "https://github.com/mohitkumar402/slr.git", demoLink: "" },
  { title: "personal portfolio", description: "A sleek and fully responsive personal portfolio website showcasing my skills, projects, and experience as a Full-Stack Developer. Built using React.js, Node.js, and MongoDB, this portfolio highlights my expertise in web development, includes a dynamic project showcase, and features smooth navigation and interactive elements.", imgPath: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80", ghLink: "https://github.com/mohitkumar402/mohit-kumar-portfolio", demoLink: "https://mohit-kumar-portfolio.vercel.app/" },
  { title: "weather App", description: "A weather app that provides real-time weather updates and forecasts for any location. Users can search for their city and view current conditions, hourly forecasts, and extended weather predictions. The app is built using React.js and integrates with a weather API to deliver accurate and up-to-date information.", imgPath: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=800&q=80", ghLink: "https://github.com/mohitkumar402/weatherapp.git", demoLink: "https://mohit-kumar402.vercel.app/" },
  { title: "tradersplayground", description: "crypto app tp trade on sample demo or papermoney.", imgPath: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80", ghLink: "https://github.com/mohitkumar402/tradersplayground.git", demoLink: "https://mohit-kumar402.vercel.app/" },
  { title: "quickett", description: "Qwiket is an innovative ticket booking application currently under development, designed to redefine the way users experience entertainment. Whether it's the latest blockbuster, an edge-of-the-seat horror movie, or a high-voltage cricket match, Qwiket brings it all to your fingertips. Our platform aims to streamline the process of booking tickets for movies, cricket matches, and live shows, focusing on genres that excite and engage—like entertainment, thrillers, and horror. With a clean user interface, real-time availability updates, secure payments, and personalized recommendations, Qwiket is all set to become your go-to app for hassle-free ticketing.", imgPath: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80", ghLink: "https://github.com/mohitkumar402/TICKET-BOOKING-APP", demoLink: "https://ticket-booking-app-theta.vercel.app/" },
  { title: "BLOCKCHAIN BASED VOTING SYSTEM", description: "The Blockchain-Based Voting System is a secure and transparent voting platform that leverages blockchain technology to ensure the integrity and immutability of votes. This system allows users to cast their votes in a decentralized manner, providing a tamper-proof record of each vote while maintaining voter anonymity.", imgPath: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80", ghLink: "https://github.com/mohitkumar402/Blockchain_based_voting-system", demoLink: "https://blockchain-based-voting-system-tbfe.vercel.app/" },
  { title: "spotify clone", description: "Spotify Clone is a web application that replicates the core features of the popular music streaming service, Spotify. Built using React.js and Node.js, this project allows users to search for songs, create playlists, and enjoy a seamless music listening experience.", imgPath: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=800&q=80", ghLink: "https://github.com/mohitkumar402/spotify-clone", demoLink: "https://spotify-clone-cyan-kappa-22.vercel.app/" },
  { title: "admin dashboard", description: "admin dashboard is a web application that provides a comprehensive interface for managing and monitoring various aspects of a system or service. Built using React.js, this dashboard allows administrators to view statistics, manage users, and perform administrative tasks efficiently and effectively", imgPath: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", ghLink: "https://github.com/mohitkumar402/admindashboard", demoLink: "https://admindashboard-pi-tan.vercel.app/" },
  { title: "HRMS", description: "Human Resource Management System (HRMS) is a comprehensive ERP module for managing employees, attendance, leave, payroll, and performance. Built with modern web technologies, it streamlines HR operations, automates workflows, and provides dashboards and reports for decision-making.", imgPath: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80", ghLink: "https://github.com/mohitkumar402/hrms", demoLink: "https://hrms.vercel.app/" },
  { title: "ERP", description: "Enterprise Resource Planning (ERP) system that integrates core business processes—inventory, sales, finance, and reporting—into a single scalable platform. Custom-built for streamlined operations, real-time data, and scalability for growing organizations.", imgPath: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", ghLink: "https://github.com/mohitkumar402/erp", demoLink: "https://erp.vercel.app/" },
  { title: "Custom Portfolio", description: "Professional custom portfolio templates and websites built to showcase brands, products, and individuals. Clean design, responsive layout, and performance-focused—delivering visually refined, production-ready portfolios with modern tech stack (React, Next.js).", imgPath: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80", ghLink: "https://github.com/mohitkumar402/custom-portfolio", demoLink: "https://custom-portfolio.vercel.app/" },
  { title: "LMS", description: "Learning Management System (LMS) for delivering courses, assignments, and assessments online. Features include course management, student enrollment, progress tracking, quizzes, and certificates. Built for educators and organizations to scale training and education.", imgPath: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80", ghLink: "https://github.com/mohitkumar402/lms", demoLink: "https://lms.vercel.app/" },
  { title: "URL Shortener with QR & Tracking", description: "URL shortener that creates short links and generates QR codes for each link. Includes click analytics and tracking—view geographic data, device types, referrers, and visit counts. Built for campaigns, print materials, and sharing with measurable insights.", imgPath: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", ghLink: "https://github.com/mohitkumar402/url-shortener", demoLink: "https://url-shortener.vercel.app/" },
];

function getStored() {
  try {
    const raw = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

function setStored(data) {
  try {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
}

export function getPortfolioHome() {
  const s = getStored();
  return {
    name: s.home?.name ?? DEFAULT_HOME.name,
    typeStrings: Array.isArray(s.home?.typeStrings) && s.home.typeStrings.length ? s.home.typeStrings : DEFAULT_HOME.typeStrings,
  };
}

export function setPortfolioHome(data) {
  const s = getStored();
  s.home = { ...DEFAULT_HOME, ...s.home, ...data };
  return setStored(s);
}

export function getPortfolioAbout() {
  const s = getStored();
  return {
    cardIntro: s.about?.cardIntro ?? DEFAULT_ABOUT.cardIntro,
    activities: Array.isArray(s.about?.activities) ? s.about.activities : DEFAULT_ABOUT.activities,
    quote: s.about?.quote ?? DEFAULT_ABOUT.quote,
    quoteFooter: s.about?.quoteFooter ?? DEFAULT_ABOUT.quoteFooter,
    sectionHeadingSkills: s.about?.sectionHeadingSkills ?? DEFAULT_ABOUT.sectionHeadingSkills,
    sectionHeadingTools: s.about?.sectionHeadingTools ?? DEFAULT_ABOUT.sectionHeadingTools,
  };
}

export function setPortfolioAbout(data) {
  const s = getStored();
  s.about = { ...DEFAULT_ABOUT, ...s.about, ...data };
  return setStored(s);
}

export function getPortfolioHome2Intro() {
  const s = getStored();
  return s.home2Intro != null && s.home2Intro !== "" ? s.home2Intro : DEFAULT_HOME2_INTRO;
}

export function setPortfolioHome2Intro(text) {
  const s = getStored();
  s.home2Intro = text;
  return setStored(s);
}

export function getPortfolioSocial() {
  const s = getStored();
  return { ...DEFAULT_SOCIAL, ...s.social };
}

export function setPortfolioSocial(data) {
  const s = getStored();
  s.social = { ...DEFAULT_SOCIAL, ...s.social, ...data };
  return setStored(s);
}

export function getPortfolioFooter() {
  const s = getStored();
  return { ...DEFAULT_FOOTER, ...s.footer };
}

export function setPortfolioFooter(data) {
  const s = getStored();
  s.footer = { ...DEFAULT_FOOTER, ...s.footer, ...data };
  return setStored(s);
}

export function getPortfolioProjects() {
  const s = getStored();
  if (Array.isArray(s.projects) && s.projects.length > 0) return s.projects;
  return DEFAULT_PROJECTS;
}

export function setPortfolioProjects(projects) {
  const s = getStored();
  s.projects = projects;
  return setStored(s);
}

export {
  DEFAULT_HOME,
  DEFAULT_ABOUT,
  DEFAULT_HOME2_INTRO,
  DEFAULT_SOCIAL,
  DEFAULT_FOOTER,
  DEFAULT_PROJECTS,
  PORTFOLIO_STORAGE_KEY,
};
