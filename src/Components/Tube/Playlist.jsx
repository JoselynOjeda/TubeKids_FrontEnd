import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./TubeKids.css";

const Playlist = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const profile = location.state?.profile;

  // Handle back to profiles
  const handleBackToProfiles = () => {
    // Navigate back to the main page without any authentication state
    navigate("/profile-selector");
  };

  // If no profile was passed, redirect to home
  if (!profile) {
    return (
      <div className="tube-kids-app">
        <div className="tube-kids-container">
          <header className="tube-kids-header">
            <div className="tube-kids-logo">
              <h1>TubeKids</h1>
            </div>
          </header>
          <main className="tube-kids-content">
            <div className="error-message">
              <h2>Access Error</h2>
              <p>You need to select a profile first.</p>
              <button className="back-btn" onClick={handleBackToProfiles}>
                ← Back to Profile Selection
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="tube-kids-app">
      <div className="tube-kids-container">
        <header className="tube-kids-header">
          <div className="tube-kids-logo">
            <h1>TubeKids</h1>
          </div>
          <div className="tube-kids-user">
            <div className="profile-indicator">
              <div className="mini-avatar">
                <img src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
              </div>
              <span>{profile.name}</span>
            </div>
          </div>
        </header>

        <main className="tube-kids-content">
          <div className="playlist-section">
            <h2 className="section-title">My Playlist</h2>
            
            <div className="playlist-content">
              <div className="video-grid">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className="video-card">
                    <div className="video-thumbnail">
                      <img src={`https://via.placeholder.com/320x180/333333/FFFFFF?text=Video+${num}`} alt={`Video ${num}`} />
                      <div className="video-duration">3:45</div>
                    </div>
                    <div className="video-info">
                      <h3 className="video-title">Kids Video #{num}</h3>
                      <p className="video-channel">Kids Channel</p>
                      <p className="video-views">1.2M views</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="back-btn" onClick={handleBackToProfiles}>
              ← Back to Profile Selection
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Playlist;