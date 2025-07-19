import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import AdComponent from "../adcomponent";



import chatify from "../../Assets/Projects/image.png";
import spotify from "../../Assets/Projects/download (1).png";
import admin from "../../Assets/Projects/admin.png";

import bitsOfCode from "../../Assets/Projects/blog.png";
import bitsOfCode1 from "../../Assets/Projects/tdp.jpg";
import suicide from "../../Assets/Projects/bg2.jpg";
import quickett from "../../Assets/Projects/quickett.png";
import voting from "../../Assets/Projects/voting7.webp"
function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <AdComponent></AdComponent>
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
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={quickett}
              isBlog={false}
              title="quickett"
              description="Qwiket is an innovative ticket booking application currently under development, designed to redefine the way users experience entertainment. Whether it's the latest blockbuster, an edge-of-the-seat horror movie, or a high-voltage cricket match, Qwiket brings it all to your fingertips.

Our platform aims to streamline the process of booking tickets for movies, cricket matches, and live shows, focusing on genres that excite and engage—like entertainment, thrillers, and horror. With a clean user interface, real-time availability updates, secure payments, and personalized recommendations, Qwiket is all set to become your go-to app for hassle-free ticketing."
              ghLink="https://github.com/mohitkumar402/TICKET-BOOKING-APP"
              demoLink="https://ticket-booking-app-theta.vercel.app/"
              
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={voting}
              isBlog={false}
              title="BLOCKCHAIN BASED VOTING SYSTEM"
              description="The Blockchain-Based Voting System is a secure and transparent voting platform that leverages blockchain technology to ensure the integrity and immutability of votes. This system allows users to cast their votes in a decentralized manner, providing a tamper-proof record of each vote while maintaining voter anonymity."
              //description="A sleek and fully responsive personal portfolio website showcasing my skills, projects, and experience as a Full-Stack Developer. Built using React.js, Node.js, and MongoDB, this portfolio highlights my expertise in web development, includes a dynamic project showcase, and features smooth navigation and interactive elements."
              ghLink="https://github.com/mohitkumar402/Blockchain_based_voting-system"
              demoLink="https://blockchain-based-voting-system-tbfe.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard 
              imgPath={spotify}
              isBlog={false}
              title="spotify clone"
              description="Spotify Clone is a web application that replicates the core features of the popular music streaming service, Spotify. Built using React.js and Node.js, this project allows users to search for songs, create playlists, and enjoy a seamless music listening experience."
              ghLink="https://github.com/mohitkumar402/spotify-clone"
              demoLink="https://spotify-clone-cyan-kappa-22.vercel.app/"
            />
          </Col>
           <Col md={4} className="project-card">
            <ProjectCard 

              imgPath={admin}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} 
              isBlog={false}
              title="admin dashboard"
              description="admin dashboard is a web application that provides a comprehensive interface for managing and monitoring various aspects of a system or service. Built using React.js, this dashboard allows administrators to view statistics, manage users, and perform administrative tasks efficiently and effectively"
              ghLink="https://github.com/mohitkumar402/admindashboard"
              demoLink="https://admindashboard-pi-tan.vercel.app/"
            />
          </Col>
          
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
