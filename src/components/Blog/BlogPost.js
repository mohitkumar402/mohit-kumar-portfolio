import React from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import Particle from "../Particle";
import { AiOutlineArrowLeft, AiOutlineCalendar } from "react-icons/ai";
import { getBlogBySlug } from "../../utils/blogStorage";

/** Render content with paragraphs and simple **bold** support */
function renderContent(text) {
  if (!text || !text.trim()) return null;
  const paragraphs = text.trim().split(/\n\n+/);
  return paragraphs.map((para, i) => {
    const parts = para.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
    return <p key={i} className="blog-post-para">{rendered}</p>;
  });
}

function BlogPost() {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);

  if (!post) {
    return (
      <Container fluid className="blog-section blog-post-section" id="blog-post">
        <Particle />
        <Container>
          <Row>
            <Col>
              <div className="blog-post-not-found">
                <h2 className="purple">Post not found</h2>
                <p>This blog post doesn&apos;t exist or was removed.</p>
                <Link to="/blog">
                  <Button variant="outline-light">Back to Blog</Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }

  return (
    <Container fluid className="blog-section blog-post-section" id="blog-post">
      <Particle />
      <Container>
        <Row className="blog-post-back-row">
          <Col>
            <Link to="/blog" className="blog-post-back-link">
              <AiOutlineArrowLeft /> Back to Blog
            </Link>
          </Col>
        </Row>

        <Row>
          <Col lg={10} xl={8} className="mx-auto">
            <article className="blog-post-article">
              <div className="blog-post-hero-wrap">
                <img
                  src={post.image}
                  alt={post.title}
                  className="blog-post-hero-img"
                />
                <span className="blog-post-tag blog-post-tag-hero">{post.tag}</span>
              </div>

              <div className="blog-post-body">
                <div className="blog-post-meta blog-post-meta-hero">
                  <AiOutlineCalendar /> <span>{post.date}</span>
                </div>
                <h1 className="blog-post-h1">{post.title}</h1>
                <div className="blog-post-content">
                  {renderContent(post.content)}
                </div>
                <div className="blog-post-footer-cta">
                  <Link to="/blog">
                    <Button variant="outline-light" className="blog-post-back-btn">
                      <AiOutlineArrowLeft /> All posts
                    </Button>
                  </Link>
                  {post.link && post.link !== "https://techbymohitkr.blogspot.com/" && (
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blog-post-external"
                    >
                      Read more on Blogger
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default BlogPost;
