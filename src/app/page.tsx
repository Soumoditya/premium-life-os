"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Zap, Brain } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="nav glass-panel">
        <div className="logo">
          <div className="logo-icon">
            <Sparkles size={20} color="white" />
          </div>
          <span className="logo-text">Life OS</span>
        </div>
        <div className="nav-links">
          <Link href="/login" className="btn-text">Sign In</Link>
          <Link href="/signup" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <div className="badge">
            <span className="badge-dot"></span>
            v3.1 Ultra Premium (Live)
          </div>
          <h1>
            Organize your life <br />
            <span className="text-gradient">with Intelligence.</span>
          </h1>
          <p className="hero-desc">
            The all-in-one workspace for your notes, wellbeing, and AI-powered productivity.
            Experience the future of personal organization.
          </p>
          <div className="cta-group">
            <Link href="/signup" className="btn-primary large">
              Start for Free <ArrowRight size={20} />
            </Link>
            <Link href="/login" className="btn-secondary large">
              Live Demo
            </Link>
          </div>
        </motion.div>

        {/* Floating UI Elements (Decorative) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="hero-visual"
        >
          <div className="app-preview glass-panel">
            <div className="preview-header">
              <div className="dots">
                <span></span><span></span><span></span>
              </div>
            </div>
            <div className="preview-content">
              <div className="preview-sidebar"></div>
              <div className="preview-main">
                <div className="preview-card"></div>
                <div className="preview-row">
                  <div className="preview-box"></div>
                  <div className="preview-box"></div>
                </div>
              </div>
            </div>
            {/* Floating Icons */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="float-icon icon-1"
            >
              <Brain size={24} />
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, delay: 1 }}
              className="float-icon icon-2"
            >
              <Zap size={24} />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="features">
        <div className="feature-card glass-panel">
          <div className="icon-box"><Brain size={24} /></div>
          <h3>AI Assistant</h3>
          <p>Powered by Gemini Pro. Chat, brainstorm, and get answers instantly.</p>
        </div>
        <div className="feature-card glass-panel">
          <div className="icon-box"><Shield size={24} /></div>
          <h3>Secure & Private</h3>
          <p>Your data is encrypted and stored securely. Privacy first design.</p>
        </div>
        <div className="feature-card glass-panel">
          <div className="icon-box"><Zap size={24} /></div>
          <h3>Lightning Fast</h3>
          <p>Built with Next.js and Framer Motion for a buttery smooth experience.</p>
        </div>
      </section>

      <style jsx>{`
        .landing-page {
          min-height: 100vh;
          background: var(--bg-dark);
          color: white;
          overflow-x: hidden;
        }

        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 1200px;
          z-index: 100;
          border-radius: 100px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          font-size: 20px;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background: var(--accent-gradient);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 20px 60px;
          position: relative;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: 100px;
          font-size: 14px;
          margin-bottom: 24px;
          color: var(--fg-secondary);
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          background: #4ade80;
          border-radius: 50%;
          box-shadow: 0 0 10px #4ade80;
        }

        h1 {
          font-size: 64px;
          line-height: 1.1;
          font-weight: 800;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .hero-desc {
          font-size: 20px;
          color: var(--fg-secondary);
          max-width: 600px;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .cta-group {
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        .large {
          padding: 16px 32px;
          font-size: 18px;
        }

        .hero-visual {
          margin-top: 80px;
          position: relative;
          width: 100%;
          max-width: 800px;
        }

        .app-preview {
          width: 100%;
          height: 400px;
          border-radius: 24px;
          border: 1px solid var(--glass-border);
          background: rgba(0, 0, 0, 0.4);
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 80px rgba(0,0,0,0.5);
        }

        .preview-header {
          height: 40px;
          border-bottom: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          padding: 0 20px;
        }

        .dots {
          display: flex;
          gap: 6px;
        }

        .dots span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
        }

        .preview-content {
          display: flex;
          height: calc(100% - 40px);
        }

        .preview-sidebar {
          width: 200px;
          border-right: 1px solid var(--glass-border);
          background: rgba(255, 255, 255, 0.02);
        }

        .preview-main {
          flex: 1;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .preview-card {
          height: 120px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
        }

        .preview-row {
          display: flex;
          gap: 20px;
          height: 120px;
        }

        .preview-box {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
        }

        .float-icon {
          position: absolute;
          width: 60px;
          height: 60px;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          color: var(--accent-primary);
        }

        .icon-1 { top: -30px; left: -30px; }
        .icon-2 { bottom: 40px; right: -20px; }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px 100px;
        }

        .feature-card {
          padding: 40px;
          border-radius: 24px;
          transition: transform 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-10px);
        }

        .icon-box {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          color: var(--accent-primary);
        }

        h3 {
          font-size: 20px;
          margin-bottom: 10px;
        }

        p {
          color: var(--fg-secondary);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          h1 { font-size: 40px; }
          .nav { width: 95%; padding: 15px 20px; }
          .hero-visual { display: none; }
        }
      `}</style>
    </div>
  );
}
