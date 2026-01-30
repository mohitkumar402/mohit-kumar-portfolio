import React, { useState, useEffect } from "react";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import Blog from "./components/Blog/Blog";
import BlogPost from "./components/Blog/BlogPost";
import AdminAuthGuard from "./components/Admin/AdminAuthGuard";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminAbout from "./components/Admin/AdminAbout";
import AdminProjects from "./components/Admin/AdminProjects";
import AdminResumes from "./components/Admin/AdminResumes";
import AdminBlog from "./components/Admin/AdminBlog";
import AdminBlogForm from "./components/Admin/AdminBlogForm";
import AdminRedirects from "./components/Admin/AdminRedirects";
import AdminUsers from "./components/Admin/AdminUsers";
import RedirectGuard from "./components/RedirectGuard";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<AdminAuthGuard />}>
          <Route path="login" element={<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="resumes" element={<AdminResumes />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="blog/new" element={<AdminBlogForm />} />
            <Route path="blog/edit/:id" element={<AdminBlogForm />} />
            <Route path="redirects" element={<AdminRedirects />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Route>
        <Route path="/" element={<RedirectGuard><Home /></RedirectGuard>} />
        <Route path="/project" element={<RedirectGuard><Projects /></RedirectGuard>} />
        <Route path="/about" element={<RedirectGuard><About /></RedirectGuard>} />
        <Route path="/resume" element={<RedirectGuard><Resume /></RedirectGuard>} />
        <Route path="/blog" element={<RedirectGuard><Blog /></RedirectGuard>} />
        <Route path="/blog/post/:slug" element={<RedirectGuard><BlogPost /></RedirectGuard>} />
        <Route path="*" element={<RedirectGuard><Navigate to="/"/></RedirectGuard>} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <AppContent />
      </div>
    </Router>
  );
}

export default App;
