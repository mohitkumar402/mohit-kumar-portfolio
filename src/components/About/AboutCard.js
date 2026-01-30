import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import { getPortfolioAbout } from "../../data/portfolioAdminStore";

function AboutCard() {
  const { cardIntro, activities, quote, quoteFooter } = getPortfolioAbout();
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>{cardIntro}</p>
          <ul>
            {activities.map((item, i) => (
              <li key={i} className="about-activity">
                <ImPointRight /> {item}
              </li>
            ))}
          </ul>
          <p style={{ color: "rgb(155 126 172)" }}>&quot;{quote}&quot;</p>
          <footer className="blockquote-footer">{quoteFooter}</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
