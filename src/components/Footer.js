import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
  AiOutlineMail,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineFundProjectionScreen,
  AiOutlineRead,
} from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { FaLinkedinIn } from "react-icons/fa";
import { getPortfolioFooter, getPortfolioSocial } from "../data/portfolioAdminStore";

const QUICK_LINKS = [
  { to: "/", label: "Home", icon: AiOutlineHome },
  { to: "/about", label: "About", icon: AiOutlineUser },
  { to: "/project", label: "Projects", icon: AiOutlineFundProjectionScreen },
  { to: "/resume", label: "Resume", icon: CgFileDocument },
  { to: "/blog", label: "Blog", icon: AiOutlineRead },
];

function Footer() {
  const year = new Date().getFullYear();
  const footer = getPortfolioFooter();
  const social = getPortfolioSocial();
  const SOCIAL_LINKS = [
    { href: social.github, icon: AiFillGithub, label: "GitHub" },
    { href: social.twitter, icon: AiOutlineTwitter, label: "Twitter" },
    { href: social.linkedin, icon: FaLinkedinIn, label: "LinkedIn" },
    { href: social.instagram, icon: AiFillInstagram, label: "Instagram" },
  ];

  return (
    <footer className="footer-high-end">
      <div className="footer-wave" aria-hidden="true" />
      <Container className="footer-main">
        <Row className="footer-row">
          <Col lg={4} md={6} className="footer-brand-col">
            <div className="footer-brand">
              <h3 className="footer-brand-name">{footer.name}</h3>
              <p className="footer-brand-tagline">{footer.tagline}</p>
              <p className="footer-brand-desc">{footer.shortDesc}</p>
            </div>
          </Col>
          <Col lg={2} md={6} className="footer-links-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              {QUICK_LINKS.map((item, i) => (
                <li key={i}>
                  <Link to={item.to} className="footer-link">
                    <item.icon className="footer-link-icon" /> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col lg={3} md={6} className="footer-contact-col">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-contact">
              <li>
                <AiOutlineMail className="footer-contact-icon" />
                <a href={`mailto:${footer.email}`} className="footer-contact-link" style={{ flex: "1 1 0", minWidth: 0 }}>
                  {footer.email}
                </a>
              </li>
              <li>
                <span className="footer-contact-text">{footer.location}</span>
              </li>
              <li>
                <a href={`tel:${footer.phone}`} className="footer-contact-link">{footer.phone}</a>
              </li>
            </ul>
          </Col>
          <Col lg={3} md={6} className="footer-social-col">
            <h4 className="footer-heading">Connect</h4>
            <ul className="footer-social">
              {SOCIAL_LINKS.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    aria-label={item.label}
                  >
                    <item.icon />
                  </a>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="footer-bottom">
        <Container>
          <Row>
            <Col className="footer-copyright">
              <span>© {year} {footer.name}. {footer.copyrightText}</span>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
