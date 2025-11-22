"use client";

import Header from "@/components/Header";

export default function SettingsPage() {
    return (
        <div className="settings-page">
            <Header title="Settings" />

            <div className="settings-container animate-slide-up">
                <section className="settings-section glass-panel">
                    <h2>Profile</h2>
                    <div className="profile-form">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" defaultValue="Mrinal" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" defaultValue="mrinal@example.com" />
                        </div>
                        <div className="form-group">
                            <label>Bio</label>
                            <textarea defaultValue="Pro User | Digital Nomad" />
                        </div>
                        <button className="btn-primary">Save Changes</button>
                    </div>
                </section>

                <section className="settings-section glass-panel delay-100">
                    <h2>Preferences</h2>
                    <div className="preferences-list">
                        <div className="pref-item">
                            <div className="pref-info">
                                <h4>Dark Mode</h4>
                                <p>Always on for premium feel</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" checked readOnly />
                                <span className="slider round"></span>
                            </label>
                        </div>

                        <div className="pref-item">
                            <div className="pref-info">
                                <h4>Notifications</h4>
                                <p>Receive updates and alerts</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider round"></span>
                            </label>
                        </div>

                        <div className="pref-item">
                            <div className="pref-info">
                                <h4>Sound Effects</h4>
                                <p>Play sounds on interaction</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                </section>
            </div>

            <style jsx>{`
        .settings-container {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .settings-section {
          padding: 30px;
        }

        .settings-section h2 {
          margin-bottom: 24px;
          font-size: 20px;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 12px;
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 14px;
          color: var(--fg-secondary);
        }

        .form-group input,
        .form-group textarea {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 12px;
          color: white;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: var(--accent-primary);
        }

        .form-group textarea {
          min-height: 100px;
          resize: vertical;
        }

        .preferences-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .pref-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pref-info h4 {
          margin-bottom: 4px;
        }

        .pref-info p {
          font-size: 13px;
          color: var(--fg-secondary);
        }

        /* Switch Toggle (Reused) */
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 26px;
        }

        .switch input { 
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #3f3f46;
          transition: .4s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .4s;
        }

        input:checked + .slider {
          background-color: var(--accent-primary);
        }

        input:checked + .slider:before {
          transform: translateX(24px);
        }

        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>
        </div>
    );
}
