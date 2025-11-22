"use client";

import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="login-container">
            <div className="login-card glass-panel animate-slide-up">
                <h1 className="logo text-gradient">Life OS</h1>
                <p className="subtitle">Your personal AI workspace</p>

                <div className="auth-buttons">
                    <button className="google-btn glass-panel">
                        <img src="https://www.google.com/favicon.ico" alt="Google" width={20} height={20} />
                        <span>Continue with Google</span>
                    </button>
                </div>

                <p className="footer-text">
                    By continuing, you agree to our Terms & Privacy Policy.
                </p>
            </div>

            <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%);
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .logo {
          font-size: 32px;
          margin-bottom: 8px;
        }

        .subtitle {
          color: var(--fg-secondary);
          margin-bottom: 32px;
        }

        .auth-buttons {
          width: 100%;
          margin-bottom: 24px;
        }

        .google-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 12px;
          background: white;
          color: black;
          border: none;
          border-radius: var(--radius-md);
          font-weight: 500;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .google-btn:hover {
          transform: translateY(-2px);
        }

        .footer-text {
          font-size: 12px;
          color: var(--fg-tertiary);
        }
      `}</style>
        </div>
    );
}
