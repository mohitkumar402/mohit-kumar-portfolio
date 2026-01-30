import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineFundProjectionScreen, AiOutlineRead, AiOutlineSwapRight, AiOutlineTeam } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";

function AdminDashboard() {
  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-subtitle">
        Control your portfolio content. Edit About Me, Projects, Resumes, and Blog from the sidebar.
      </p>
      <div className="row g-3">
        <div className="col-md-4">
          <Link to="/admin/about" className="admin-dashboard-card">
            <AiOutlineUser className="admin-dashboard-icon" />
            <h3>About Me</h3>
            <p>Name, intro, social links, footer, and about card.</p>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/admin/projects" className="admin-dashboard-card">
            <AiOutlineFundProjectionScreen className="admin-dashboard-icon" />
            <h3>Projects</h3>
            <p>Add, edit, or remove project cards.</p>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/admin/resumes" className="admin-dashboard-card">
            <CgFileDocument className="admin-dashboard-icon" />
            <h3>Resumes</h3>
            <p>Add PDF resume links; set primary for the Resume page.</p>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/admin/blog" className="admin-dashboard-card">
            <AiOutlineRead className="admin-dashboard-icon" />
            <h3>Blog</h3>
            <p>Add and manage blog posts.</p>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/admin/redirects" className="admin-dashboard-card">
            <AiOutlineSwapRight className="admin-dashboard-icon" />
            <h3>301 Redirects</h3>
            <p>Add from → to redirects (client-side).</p>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/admin/users" className="admin-dashboard-card">
            <AiOutlineTeam className="admin-dashboard-icon" />
            <h3>Users / Login auth</h3>
            <p>Add or remove admin users who can log in.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
