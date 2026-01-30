import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Particle from "../Particle";
import { AiOutlineArrowRight, AiOutlineCalendar } from "react-icons/ai";
import { getAllBlogs } from "../../utils/blogStorage";
import { slugify } from "../../data/blogsData";

const BLOGS_PER_PAGE = 12;

function Blog() {
  const allBlogs = getAllBlogs();
  const [visibleCount, setVisibleCount] = useState(BLOGS_PER_PAGE);
  const visibleBlogs = allBlogs.slice(0, visibleCount);
  const hasMore = visibleCount < allBlogs.length;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + BLOGS_PER_PAGE, allBlogs.length));
  };

  return (
    <Container fluid className="blog-section" id="blog">
      <Particle />
      <Container>
        <Row className="blog-header">
          <Col>
            <h1 className="project-heading">
              <span className="purple">Blog</span>
            </h1>
            <p className="blog-subtitle">
              Thoughts on development, tech, and building products. ({allBlogs.length} posts)
            </p>
          </Col>
        </Row>

        <Row className="blog-cta-row">
          <Col className="d-flex flex-wrap gap-2 justify-content-center">
            <a
              href="https://techbymohitkr.blogspot.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="blog-main-link"
            >
              Visit my blog on Blogger <AiOutlineArrowRight />
            </a>
          </Col>
        </Row>

        <Row>
          {visibleBlogs.map((post, i) => (
            <Col md={4} key={post.id || i} className="blog-card-col" style={{ animationDelay: `${Math.min(i * 0.05, 0.6)}s` }}>
              <Card className="blog-post-card">
                <div className="blog-post-img-wrap">
                  <Card.Img variant="top" src={post.image} alt={post.title} className="blog-post-img" />
                  <span className="blog-post-tag">{post.tag}</span>
                </div>
                <Card.Body>
                  <div className="blog-post-meta">
                    <AiOutlineCalendar /> <span>{post.date}</span>
                  </div>
                  <Card.Title className="blog-post-title">{post.title}</Card.Title>
                  <Card.Text className="blog-post-excerpt">{post.excerpt}</Card.Text>
                  <Link
                    to={`/blog/post/${post.slug || slugify(post.title || "post")}`}
                    className="blog-post-link"
                  >
                    Read more <AiOutlineArrowRight />
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {hasMore && (
          <Row className="blog-load-more-row">
            <Col className="text-center">
              <Button variant="outline-light" className="blog-load-more-btn" onClick={loadMore}>
                Load more ({allBlogs.length - visibleCount} remaining)
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </Container>
  );
}

export default Blog;
