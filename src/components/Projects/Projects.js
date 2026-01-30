import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import AdComponent from "../adcomponent";
import { getPortfolioProjects } from "../../data/portfolioAdminStore";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80";

function Projects() {
  const projects = getPortfolioProjects();

  return (
    <Container fluid className="project-section">
      <Particle />
      <AdComponent />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I&apos;ve worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {projects.map((proj, i) => (
            <Col md={4} className="project-card" key={i}>
              <ProjectCard
                imgPath={proj.imgPath || DEFAULT_IMAGE}
                isBlog={false}
                title={proj.title}
                description={proj.description || ""}
                ghLink={proj.ghLink || "#"}
                demoLink={proj.demoLink}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
