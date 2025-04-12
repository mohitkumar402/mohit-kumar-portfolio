import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";



import chatify from "../../Assets/Projects/image.png";

import bitsOfCode from "../../Assets/Projects/blog.png";
import bitsOfCode1 from "../../Assets/Projects/tdp.jpg";
import suicide from "../../Assets/Projects/bg2.jpg";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title=" Sign Language Recognition (SLR)"
              description="The Sign Language Recognition (SLR) module is designed to facilitate communication for deaf and mute individuals by recognizing hand gestures and translating them into meaningful text or speech. This project leverages machine learning and computer vision techniques to identify different hand signs accurately."
              ghLink="https://github.com/mohitkumar402/slr.git"
              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="personal portfolio"
              description="A sleek and fully responsive personal portfolio website showcasing my skills, projects, and experience as a Full-Stack Developer. Built using React.js, Node.js, and MongoDB, this portfolio highlights my expertise in web development, includes a dynamic project showcase, and features smooth navigation and interactive elements."
              ghLink="https://github.com/mohitkumar402/mohit-kumar-portfolio"
              demoLink="https://mohit-kumar-portfolio.vercel.app/"
              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={suicide}
              isBlog={false}
              title="weather App"
              description="A weather app that provides real-time weather updates and forecasts for any location. Users can search for their city and view current conditions, hourly forecasts, and extended weather predictions. The app is built using React.js and integrates with a weather API to deliver accurate and up-to-date information."
              //description="A sleek and fully responsive personal portfolio website showcasing my skills, projects, and experience as a Full-Stack Developer. Built using React.js, Node.js, and MongoDB, this portfolio highlights my expertise in web development, includes a dynamic project showcase, and features smooth navigation and interactive elements."
              ghLink="https://github.com/mohitkumar402/weatherapp.git"
              demoLink="https://mohit-kumar402.vercel.app/"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode1}
              isBlog={false}
              title="tradersplayground"
              description="crypto app tp trade on sample demo or papermoney."
              //description="A sleek and fully responsive personal portfolio website showcasing my skills, projects, and experience as a Full-Stack Developer. Built using React.js, Node.js, and MongoDB, this portfolio highlights my expertise in web development, includes a dynamic project showcase, and features smooth navigation and interactive elements."
              ghLink="https://github.com/mohitkumar402/tradersplayground.git"
              demoLink="https://mohit-kumar402.vercel.app/"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
