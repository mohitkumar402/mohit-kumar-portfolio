import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineFundProjectionScreen,
  AiOutlineRead,
  AiOutlineHome,
  AiOutlineSwapRight,
  AiOutlineLogout,
  AiOutlineTeam,
} from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { logoutAdmin } from "../../data/adminAuth";
import "./admin.css";

const NAV_ITEMS = [
  { to: "/admin/dashboard", label: "Dashboard", icon: AiOutlineDashboard },
  { to: "/admin/about", label: "About Me", icon: AiOutlineUser },
  { to: "/admin/projects", label: "Projects", icon: AiOutlineFundProjectionScreen },
  { to: "/admin/resumes", label: "Resumes", icon: CgFileDocument },
  { to: "/admin/blog", label: "Blog", icon: AiOutlineRead },
  { to: "/admin/redirects", label: "301 Redirects", icon: AiOutlineSwapRight },
  { to: "/admin/users", label: "Users / Login auth", icon: AiOutlineTeam },
];

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <span className="admin-sidebar-title">Portfolio Admin</span>
        </div>
        <Nav className="admin-nav flex-column">
          {NAV_ITEMS.map((item) => (
            <Nav.Link
              key={item.to}
              as={Link}
              to={item.to}
              className={`admin-nav-link ${location.pathname === item.to ? "active" : ""}`}
            >
              <item.icon className="admin-nav-icon" />
              {item.label}
            </Nav.Link>
          ))}
        </Nav>
        <div className="admin-sidebar-footer">
          <button type="button" className="admin-logout-btn" onClick={handleLogout}>
            <AiOutlineLogout /> Log out
          </button>
          <Link to="/" className="admin-back-portfolio">
            <AiOutlineHome /> Back to Portfolio
          </Link>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
