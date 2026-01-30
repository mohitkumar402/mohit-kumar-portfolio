import React, { useState, useEffect } from "react";
import {
  getPortfolioHome,
  setPortfolioHome,
  getPortfolioAbout,
  setPortfolioAbout,
  getPortfolioHome2Intro,
  setPortfolioHome2Intro,
  getPortfolioSocial,
  setPortfolioSocial,
  getPortfolioFooter,
  setPortfolioFooter,
} from "../../data/portfolioAdminStore";

function AdminAbout() {
  const [message, setMessage] = useState("");
  const [home, setHome] = useState({ name: "", typeStrings: [] });
  const [about, setAbout] = useState({ cardIntro: "", activities: "", quote: "", quoteFooter: "", sectionHeadingSkills: "", sectionHeadingTools: "" });
  const [home2Intro, setHome2Intro] = useState("");
  const [social, setSocial] = useState({ github: "", twitter: "", linkedin: "", instagram: "", ekionsUrl: "" });
  const [footer, setFooter] = useState({ name: "", tagline: "", shortDesc: "", email: "", location: "", phone: "", copyrightText: "" });

  useEffect(() => {
    const h = getPortfolioHome();
    setHome({ name: h.name, typeStrings: h.typeStrings.join(", ") });
    const a = getPortfolioAbout();
    setAbout({
      cardIntro: a.cardIntro,
      activities: a.activities.join("\n"),
      quote: a.quote,
      quoteFooter: a.quoteFooter,
      sectionHeadingSkills: a.sectionHeadingSkills,
      sectionHeadingTools: a.sectionHeadingTools,
    });
    setHome2Intro(getPortfolioHome2Intro());
    setSocial(getPortfolioSocial());
    setFooter(getPortfolioFooter());
  }, []);

  const showMsg = (text, isError = false) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSaveHome = (e) => {
    e.preventDefault();
    const typeStrings = home.typeStrings.split(",").map((s) => s.trim()).filter(Boolean);
    setPortfolioHome({ name: home.name.trim(), typeStrings: typeStrings.length ? typeStrings : ["Software Developer"] });
    showMsg("Home section saved.");
  };

  const handleSaveAbout = (e) => {
    e.preventDefault();
    const activities = about.activities.split("\n").map((s) => s.trim()).filter(Boolean);
    setPortfolioAbout({
      cardIntro: about.cardIntro.trim(),
      activities: activities.length ? activities : ["Coding"],
      quote: about.quote.trim(),
      quoteFooter: about.quoteFooter.trim(),
      sectionHeadingSkills: about.sectionHeadingSkills.trim(),
      sectionHeadingTools: about.sectionHeadingTools.trim(),
    });
    showMsg("About section saved.");
  };

  const handleSaveHome2Intro = (e) => {
    e.preventDefault();
    setPortfolioHome2Intro(home2Intro.trim());
    showMsg("Intro text saved.");
  };

  const handleSaveSocial = (e) => {
    e.preventDefault();
    setPortfolioSocial(social);
    showMsg("Social links saved.");
  };

  const handleSaveFooter = (e) => {
    e.preventDefault();
    setPortfolioFooter(footer);
    showMsg("Footer saved.");
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">About Me</h1>
      <p className="admin-page-subtitle">
        Edit content that appears on the main portfolio: home, about, intro, social links, and footer.
      </p>

      {message && (
        <div className={`admin-message ${message.includes("saved") ? "admin-message-success" : "admin-message-error"}`}>
          {message}
        </div>
      )}

      <div className="admin-card">
        <h2 className="admin-card-title">Home (hero)</h2>
        <form onSubmit={handleSaveHome}>
          <label className="admin-form-label">Your name (e.g. MOHIT KUMAR)</label>
          <input
            type="text"
            className="admin-form-control"
            value={home.name}
            onChange={(e) => setHome((p) => ({ ...p, name: e.target.value }))}
            placeholder="MOHIT KUMAR"
          />
          <label className="admin-form-label">Typewriter strings (comma-separated)</label>
          <input
            type="text"
            className="admin-form-control"
            value={home.typeStrings}
            onChange={(e) => setHome((p) => ({ ...p, typeStrings: e.target.value }))}
            placeholder="Software Developer, Freelancer, MERN Stack Developer"
          />
          <button type="submit" className="admin-btn-primary">Save Home</button>
        </form>
      </div>

      <div className="admin-card">
        <h2 className="admin-card-title">About card (About page)</h2>
        <form onSubmit={handleSaveAbout}>
          <label className="admin-form-label">Card intro text</label>
          <textarea
            className="admin-form-control"
            rows={4}
            value={about.cardIntro}
            onChange={(e) => setAbout((p) => ({ ...p, cardIntro: e.target.value }))}
            placeholder="Hi Everyone, I am ... from ..."
          />
          <label className="admin-form-label">Activities (one per line)</label>
          <textarea
            className="admin-form-control"
            rows={5}
            value={about.activities}
            onChange={(e) => setAbout((p) => ({ ...p, activities: e.target.value }))}
            placeholder="Playing valorant&#10;Listening to Music"
          />
          <label className="admin-form-label">Quote</label>
          <input
            type="text"
            className="admin-form-control"
            value={about.quote}
            onChange={(e) => setAbout((p) => ({ ...p, quote: e.target.value }))}
            placeholder="Strive to build things..."
          />
          <label className="admin-form-label">Quote footer name</label>
          <input
            type="text"
            className="admin-form-control"
            value={about.quoteFooter}
            onChange={(e) => setAbout((p) => ({ ...p, quoteFooter: e.target.value }))}
            placeholder="mohit"
          />
          <label className="admin-form-label">Section heading – Skills</label>
          <input
            type="text"
            className="admin-form-control"
            value={about.sectionHeadingSkills}
            onChange={(e) => setAbout((p) => ({ ...p, sectionHeadingSkills: e.target.value }))}
            placeholder="Professional Skillset"
          />
          <label className="admin-form-label">Section heading – Tools</label>
          <input
            type="text"
            className="admin-form-control"
            value={about.sectionHeadingTools}
            onChange={(e) => setAbout((p) => ({ ...p, sectionHeadingTools: e.target.value }))}
            placeholder="Tools I use"
          />
          <button type="submit" className="admin-btn-primary">Save About Card</button>
        </form>
      </div>

      <div className="admin-card">
        <h2 className="admin-card-title">Intro text (Home – “Let me introduce myself”)</h2>
        <form onSubmit={handleSaveHome2Intro}>
          <label className="admin-form-label">Full intro paragraph(s)</label>
          <textarea
            className="admin-form-control"
            rows={10}
            value={home2Intro}
            onChange={(e) => setHome2Intro(e.target.value)}
            placeholder="I'm a Full Stack Developer..."
          />
          <button type="submit" className="admin-btn-primary">Save Intro</button>
        </form>
      </div>

      <div className="admin-card">
        <h2 className="admin-card-title">Social links</h2>
        <form onSubmit={handleSaveSocial}>
          {["github", "twitter", "linkedin", "instagram", "ekionsUrl"].map((key) => (
            <React.Fragment key={key}>
              <label className="admin-form-label">{key === "ekionsUrl" ? "Ekions / Akions URL" : key}</label>
              <input
                type="url"
                className="admin-form-control"
                value={social[key] || ""}
                onChange={(e) => setSocial((p) => ({ ...p, [key]: e.target.value }))}
                placeholder={`https://${key}.com/...`}
              />
            </React.Fragment>
          ))}
          <button type="submit" className="admin-btn-primary">Save Social Links</button>
        </form>
      </div>

      <div className="admin-card">
        <h2 className="admin-card-title">Footer</h2>
        <form onSubmit={handleSaveFooter}>
          {["name", "tagline", "shortDesc", "email", "location", "phone", "copyrightText"].map((key) => (
            <React.Fragment key={key}>
              <label className="admin-form-label">{key}</label>
              <input
                type={key === "email" ? "email" : "text"}
                className="admin-form-control"
                value={footer[key] || ""}
                onChange={(e) => setFooter((p) => ({ ...p, [key]: e.target.value }))}
                placeholder={key}
              />
            </React.Fragment>
          ))}
          <button type="submit" className="admin-btn-primary">Save Footer</button>
        </form>
      </div>
    </div>
  );
}

export default AdminAbout;
