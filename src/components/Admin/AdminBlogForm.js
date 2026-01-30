import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { getStoredBlogById, addBlog, updateBlog } from "../../utils/blogStorage";
import { slugify } from "../../data/blogsData";

const CATEGORIES = ["Web Dev", "Mobile", "Backend", "Design Tips", "Installation Guides", "LED Neon Signs", "Blog"];
const AUTHORS = ["Admin", "Neon Expert"];
const STATUS_OPTIONS = ["Published", "Draft"];
const TAG_OPTIONS = ["Blogs", "Design", "DIY", "Installation", "Maintenance", "Tips", "Tutorial", "Web Dev", "Mobile"];

const EMPTY_FORM = {
  title: "",
  content: "",
  excerpt: "",
  image: "",
  metaTitle: "",
  metaDescription: "",
  category: "",
  author: "Admin",
  status: "Published",
  publishedAt: "",
  tags: [],
  slug: "",
};

function AdminBlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(EMPTY_FORM);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isEdit && id) {
      const post = getStoredBlogById(id);
      if (post) {
        setForm({
          title: post.title || "",
          content: post.content || "",
          excerpt: post.excerpt || "",
          image: post.image || "",
          metaTitle: post.metaTitle || "",
          metaDescription: post.metaDescription || "",
          category: post.category || post.tag || "",
          author: post.author || "Admin",
          status: post.status || "Published",
          publishedAt: post.publishedAt ? post.publishedAt.slice(0, 16).replace(" ", "T") : "",
          tags: Array.isArray(post.tags) ? post.tags : [],
          slug: post.slug || "",
        });
      } else {
        navigate("/admin/blog", { replace: true });
      }
    } else {
      const now = new Date();
      setForm({
        ...EMPTY_FORM,
        publishedAt: now.toISOString().slice(0, 16),
      });
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "title" && !form.slug) {
      setForm((prev) => ({ ...prev, slug: value ? slugify(value) : "" }));
    }
  };

  const toggleTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    if (!form.title.trim()) {
      setMessage("Post title is required.");
      return;
    }
    const publishedAt = form.publishedAt ? new Date(form.publishedAt).toISOString().slice(0, 19).replace("T", " ") : new Date().toISOString().slice(0, 19).replace("T", " ");
    const payload = {
      title: form.title.trim(),
      content: form.content.trim(),
      excerpt: form.excerpt.trim() || form.content.trim().slice(0, 160),
      image: form.image.trim(),
      metaTitle: form.metaTitle.trim(),
      metaDescription: form.metaDescription.trim(),
      category: form.category || "Blog",
      tag: form.category || "Blog",
      author: form.author,
      status: form.status,
      publishedAt,
      tags: form.tags,
      slug: form.slug.trim() || undefined,
    };
    if (isEdit) {
      updateBlog(id, payload);
      setMessage("Post updated.");
    } else {
      addBlog(payload);
      setMessage("Post created.");
    }
    setTimeout(() => navigate("/admin/blog"), 1500);
  };

  return (
    <div className="admin-page">
      <div className="admin-blog-header mb-4">
        <h1 className="admin-page-title mb-1">
          {isEdit ? "Edit Blog Post" : "Create New Blog Post"}
        </h1>
        <nav aria-label="breadcrumb">
          <ol className="admin-breadcrumb breadcrumb mb-0">
            <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/admin/blog">Blog Posts</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{isEdit ? "Edit Post" : "Create Post"}</li>
          </ol>
        </nav>
      </div>

      {message && (
        <div className={`admin-message admin-message-success mb-3`}>{message}</div>
      )}

      <Form onSubmit={handleSubmit} className="admin-blog-form">
        <div className="row g-3">
          <div className="col-lg-8">
            <div className="admin-card mb-3">
              <h2 className="admin-card-title">Post Details</h2>
              <Form.Group className="mb-3">
                <Form.Label>Post Title *</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter blog post title"
                  required
                />
                <Form.Text className="text-muted">Slug will be auto-generated from title</Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Content *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={12}
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Write your blog post content. Use **bold** for emphasis. Paragraphs separated by blank lines."
                  className="admin-form-control"
                />
              </Form.Group>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="admin-card mb-3">
              <h2 className="admin-card-title">Featured Image</h2>
              <Form.Group className="mb-0">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                />
                {form.image && (
                  <div className="admin-featured-preview mt-2">
                    <img src={form.image} alt="Preview" />
                  </div>
                )}
              </Form.Group>
            </div>
          </div>
        </div>

        <div className="admin-card mb-3">
          <h2 className="admin-card-title">SEO Details</h2>
          <div className="row g-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Meta Title (SEO)</Form.Label>
                <Form.Control
                  type="text"
                  name="metaTitle"
                  value={form.metaTitle}
                  onChange={handleChange}
                  placeholder="SEO meta title (60 chars recommended)"
                  maxLength={70}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Meta Description (SEO)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="metaDescription"
                  value={form.metaDescription}
                  onChange={handleChange}
                  placeholder="SEO meta description (160 chars recommended)"
                  maxLength={170}
                />
              </Form.Group>
            </div>
          </div>
        </div>

        <div className="admin-card mb-3">
          <h2 className="admin-card-title">Publication Details</h2>
          <div className="row g-3">
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select name="category" value={form.category} onChange={handleChange}>
                  <option value="">--Select Category--</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Author *</Form.Label>
                <Form.Select name="author" value={form.author} onChange={handleChange} required>
                  {AUTHORS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Publish Status *</Form.Label>
                <Form.Select name="status" value={form.status} onChange={handleChange} required>
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Published At</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="publishedAt"
                  value={form.publishedAt}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="col-12">
              <Form.Label className="d-block">Tags</Form.Label>
              <div className="admin-tags-pills d-flex flex-wrap gap-2">
                {TAG_OPTIONS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`admin-tag-pill ${form.tags.includes(tag) ? "active" : ""}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <Button type="submit" variant="primary" className="admin-btn-create-post">
            {isEdit ? "Update Post" : "Create Post"}
          </Button>
          <Link to="/admin/blog" className="admin-btn-cancel">
            Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default AdminBlogForm;
