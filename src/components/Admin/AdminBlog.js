import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { getStoredBlogs, deleteStoredBlog } from "../../utils/blogStorage";

function AdminBlog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setBlogs(getStoredBlogs());
  }, []);

  const load = () => setBlogs(getStoredBlogs());

  const handleDelete = (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    deleteStoredBlog(id);
    load();
  };

  const formatDate = (blog) => {
    if (blog.publishedAt) {
      const d = new Date(blog.publishedAt);
      return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    }
    return blog.date || "—";
  };

  return (
    <div className="admin-page">
      <div className="admin-blog-header d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <div>
          <h1 className="admin-page-title mb-1">Blog Posts</h1>
          <nav aria-label="breadcrumb">
            <ol className="admin-breadcrumb breadcrumb mb-0">
              <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Blog Posts</li>
            </ol>
          </nav>
        </div>
        <Button
          variant="primary"
          className="admin-btn-create"
          onClick={() => navigate("/admin/blog/new")}
        >
          <AiOutlinePlus /> Create New Post
        </Button>
      </div>

      <div className="admin-card">
        {blogs.length === 0 ? (
          <p className="text-muted mb-0">No blogs added yet. Create your first post.</p>
        ) : (
          <div className="admin-table-wrap">
            <Table responsive className="admin-blog-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Featured Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Published Date</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <tr key={blog.id}>
                    <td className="admin-blog-id">{blogs.length - index}</td>
                    <td>
                      <div className="admin-blog-thumb">
                        {blog.image ? (
                          <img src={blog.image} alt={blog.title} />
                        ) : (
                          <span className="admin-blog-no-img">No Image</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="admin-blog-title-cell">
                        <strong>{blog.title || "Untitled"}</strong>
                        <small className="d-block text-muted">{blog.slug || "—"}</small>
                      </div>
                    </td>
                    <td>
                      <span className="admin-pill admin-pill-category">{blog.category || blog.tag || "—"}</span>
                    </td>
                    <td>{blog.author || "Admin"}</td>
                    <td>
                      <span className="admin-pill admin-pill-status">{blog.status || "Published"}</span>
                    </td>
                    <td>{formatDate(blog)}</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        className="admin-btn-edit"
                        onClick={() => navigate(`/admin/blog/edit/${blog.id}`)}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(blog.id, blog.title)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBlog;
