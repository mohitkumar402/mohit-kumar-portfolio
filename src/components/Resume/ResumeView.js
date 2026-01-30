import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Particle from "../Particle";
import defaultPdf from "../../Assets/mohit kumar resume (2).pdf";
import { getPrimaryResumeUrl } from "../../data/resumeStore";
import {
  AiOutlineDownload,
  AiOutlineFullscreenExit,
  AiOutlineShareAlt,
  AiOutlineMail,
  AiOutlineRocket,
  AiOutlineRight,
  AiOutlineCheckCircle,
} from "react-icons/ai";

const EKIONS_URL = "https://www.ekions.com/";

const SUMMARY_BULLETS = [
  { text: "Founder of Akions", link: EKIONS_URL },
  { text: "ERP & scalable systems", link: null },
  { text: "Performance-first mindset", link: null },
];

const SKILLS_BY_CATEGORY = {
  Frontend: ["React", "Next.js", "JavaScript", "HTML", "CSS"],
  Backend: ["Node.js", "REST APIs", "GraphQL"],
  Mobile: ["Flutter", "React Native"],
  "Databases & APIs": ["MongoDB", "PostgreSQL", "REST APIs"],
  "Emerging Tech": ["Web3", "Blockchain", "ERP"],
};

const EXPERIENCE = [
  {
    role: "Founder",
    company: "Akions",
    date: "Current",
    isCurrent: true,
    desc: "Building high-class web & mobile apps for startups and businesses.",
    tech: "React, Node.js, Flutter",
    outcomes: "Full-stack delivery · Modern web apps · Scalable solutions",
    projectLabel: "Visit Akions",
    projectLink: EKIONS_URL,
  },
  {
    role: "Full Stack Developer",
    company: "Custom Neon",
    date: "Current",
    isCurrent: true,
    desc: "Building and maintaining full-stack web applications. End-to-end solutions with modern tech stack and clean architecture.",
    tech: "React, Node.js, JavaScript",
    outcomes: "Full-stack delivery · Modern web apps · Scalable solutions",
  },
  {
    role: "System Software Analyst",
    company: "Celestix Industries",
    date: "2020 - 2021",
    desc: "Managed ERP systems and created new functionality. Designed and developed the company's new website.",
    tech: "React, Node.js, JavaScript",
    outcomes: "ERP management · New features · Company website",
  },
  {
    role: "ReactJS Developer Intern",
    company: "Celebal Technology",
    date: "2019 - 2020",
    desc: "Worked on React-based applications and frontend development. Component architecture, state management, responsive UIs.",
    tech: "React.js, JavaScript",
    outcomes: "React development · UI components · Frontend best practices",
    projectLabel: "Featured project",
    projectLink: "/project",
  },
];

const FEATURED_PROJECTS = [
  {
    name: "Ekions Flutter Apps",
    desc: "High-class mobile applications for startups and businesses.",
    tech: "Flutter",
    link: EKIONS_URL,
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80",
  },
  {
    name: "ERP Solution",
    desc: "Enterprise modules for HR, operations, and scalable systems.",
    tech: "React, Node, ERP",
    link: "/project",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
  },
];

const EDUCATION = [
  { title: "B.Tech", org: "Parul University, Vadodara", detail: "Computer Science & Engineering" },
  { title: "Diploma", org: "Parul University", detail: "Computer Science & Engineering" },
];

function ResumeView() {
  const [activeSkillCategory, setActiveSkillCategory] = useState("Frontend");
  const [shareCopied, setShareCopied] = useState(false);
  const pdfUrl = getPrimaryResumeUrl() || defaultPdf;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Mohit Kumar – Resume", url, text: "View my resume" });
      } catch (e) {
        copyLink(url);
      }
    } else {
      copyLink(url);
    }
  };

  const copyLink = (url) => {
    navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const openPdfFullscreen = () => window.open(pdfUrl, "_blank", "noopener,noreferrer");

  return (
    <Container fluid className="resume-section" id="resume">
      <Particle />
      <Container className="resume-view-container">
        {/* Header */}
        <Row className="resume-view-header">
          <Col>
            <h1 className="resume-main-title">
              <span className="purple">Resume</span>
            </h1>
            <p className="resume-subtitle">
              Full Stack Developer building scalable web & mobile systems.
            </p>
            <div className="resume-header-buttons">
              <Button variant="primary" href={pdfUrl} target="_blank" download className="resume-action-btn">
                <AiOutlineDownload /> Download PDF
              </Button>
              <Button variant="primary" onClick={openPdfFullscreen} className="resume-action-btn">
                <AiOutlineFullscreenExit /> View Fullscreen
              </Button>
            </div>
          </Col>
        </Row>

        {/* Professional Summary */}
        <Row className="resume-section-row">
          <Col>
            <div className="resume-section-title-bar">
              <h2 className="resume-section-title">Professional Summary</h2>
            </div>
            <Card className="resume-summary-card">
              <Card.Body>
                <Row>
                  <Col md={7}>
                    <p className="resume-summary-role">
                      Full Stack Developer | Mobile & Web | ERP & Scalable Systems
                    </p>
                    <p className="resume-summary-desc">
                      <a href={EKIONS_URL} target="_blank" rel="noopener noreferrer" className="resume-ekions-link">Founder of Akions</a>
                      {" "}— building high-class web and mobile applications along with
                      professional portfolios. Focused on performance, scalability, and clean code.
                    </p>
                  </Col>
                  <Col md={5}>
                    <ul className="resume-summary-bullets">
                      {SUMMARY_BULLETS.map((bullet, i) => (
                        <li key={i}>
                          <AiOutlineCheckCircle className="purple" />
                          {bullet.link ? (
                            <a href={bullet.link} target="_blank" rel="noopener noreferrer" className="resume-ekions-link">{bullet.text}</a>
                          ) : (
                            ` ${bullet.text}`
                          )}
                        </li>
                      ))}
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Skills Overview */}
        <Row className="resume-section-row">
          <Col>
            <div className="resume-section-title-bar">
              <h2 className="resume-section-title">Skills Overview</h2>
            </div>
            <p className="resume-skills-subtitle">
              Technologies I use to design and build high-class digital solutions.
            </p>
            <div className="resume-skill-categories">
              {Object.keys(SKILLS_BY_CATEGORY).map((cat) => (
                <Button
                  key={cat}
                  variant={activeSkillCategory === cat ? "primary" : "outline-light"}
                  size="sm"
                  className="resume-skill-cat-btn"
                  onClick={() => setActiveSkillCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
            <div className="skills-pills">
              {SKILLS_BY_CATEGORY[activeSkillCategory].map((skill, i) => (
                <span key={i} className="skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </Col>
        </Row>

        {/* Work Experience Timeline */}
        <Row className="resume-section-row">
          <Col>
            <div className="resume-section-title-bar">
              <h2 className="resume-section-title">Work Experience</h2>
            </div>
            <div className="resume-timeline">
              {EXPERIENCE.map((item, i) => (
                <div key={i} className={`resume-timeline-item experience-item--${i % 2 === 0 ? "left" : "right"}`} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="resume-timeline-dot" />
                  <Card className="resume-timeline-card">
                    <Card.Body>
                      <div className="resume-timeline-header">
                        <div>
                          <span className="resume-timeline-role">
                            {item.role} – {item.company}
                          </span>
                          <span className="resume-timeline-date">
                            {item.isCurrent ? (
                              <span className="resume-current-badge">Current</span>
                            ) : (
                              item.date
                            )}
                          </span>
                        </div>
                        {item.projectLink && (
                          item.projectLink.startsWith("http") ? (
                            <a href={item.projectLink} target="_blank" rel="noopener noreferrer" className="resume-timeline-link">
                              {item.projectLabel} <AiOutlineRight />
                            </a>
                          ) : (
                            <Link to={item.projectLink} className="resume-timeline-link">
                              {item.projectLabel} <AiOutlineRight />
                            </Link>
                          )
                        )}
                      </div>
                      <p className="resume-timeline-desc">{item.desc}</p>
                      <p className="resume-timeline-tech">
                        <strong>Tech Stack:</strong> {item.tech}
                      </p>
                      <p className="resume-timeline-outcomes">{item.outcomes}</p>
                      {!item.projectLink && (
                        <Link to="/project" className="resume-view-details">
                          View Details <AiOutlineRight />
                        </Link>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </Col>
        </Row>

        {/* Featured Projects */}
        <Row className="resume-section-row">
          <Col>
            <div className="resume-section-title-bar">
              <h2 className="resume-section-title">Featured Projects</h2>
            </div>
            <Row>
              {FEATURED_PROJECTS.map((proj, i) => (
                <Col md={6} key={i} className="mb-3">
                  <Card className="resume-featured-card">
                    <Card.Img variant="top" src={proj.img} alt={proj.name} className="resume-featured-img" />
                    <Card.Body>
                      <Card.Title className="purple">{proj.name}</Card.Title>
                      <Card.Text className="resume-project-desc">{proj.desc}</Card.Text>
                      <small className="text-muted d-block mb-2">{proj.tech}</small>
                      {proj.link.startsWith("http") ? (
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="resume-project-link">
                          Visit Akions <AiOutlineRight />
                        </a>
                      ) : (
                        <Link to={proj.link} className="resume-project-link">
                          View Project <AiOutlineRight />
                        </Link>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Education */}
        <Row className="resume-section-row">
          <Col>
            <div className="resume-section-title-bar">
              <h2 className="resume-section-title">Education & Certifications</h2>
            </div>
            <ul className="resume-edu-list">
              {EDUCATION.map((edu, i) => (
                <li key={i}>
                  <strong>{edu.title}</strong> – {edu.org}
                  <br />
                  <span className="text-muted">{edu.detail}</span>
                </li>
              ))}
            </ul>
          </Col>
        </Row>

        {/* CTA */}
        <Row className="resume-cta-row">
          <Col>
            <Card className="resume-cta-card">
              <Card.Body>
                <h3 className="resume-cta-title">Like what you see?</h3>
                <div className="resume-cta-buttons">
                  <Button variant="primary" href={pdfUrl} target="_blank" download className="resume-cta-btn">
                    <AiOutlineDownload /> Download Resume
                  </Button>
                  <Link to="/about">
                    <Button variant="outline-light" className="resume-cta-btn">
                      <AiOutlineMail /> Contact Me
                    </Button>
                  </Link>
                  <Link to="/project">
                    <Button variant="outline-light" className="resume-cta-btn">
                      <AiOutlineRocket /> View Projects
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Sidebar quick actions */}
      <div className="resume-sidebar-actions">
        <Button variant="link" href={pdfUrl} target="_blank" download className="resume-sidebar-btn" title="Download">
          <AiOutlineDownload />
        </Button>
        <Button variant="link" onClick={handleShare} className="resume-sidebar-btn" title={shareCopied ? "Copied!" : "Share"}>
          <AiOutlineShareAlt />
        </Button>
        <Link to="/about">
          <Button variant="link" className="resume-sidebar-btn" title="Contact">
            <AiOutlineMail />
          </Button>
        </Link>
      </div>
    </Container>
  );
}

export default ResumeView;
