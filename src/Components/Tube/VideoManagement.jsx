import React from "react";
import { useNavigate } from "react-router-dom";
import "./TubeKids.css";

const VideoManagement = () => {
  const navigate = useNavigate();

  // Handle back to profiles
  const handleBackToProfiles = () => {
    // Store admin authentication state in localStorage
    localStorage.setItem('adminAuthenticated', 'true');
    navigate("/");
  };

  // Handle back to user management
  const handleGoToUserManagement = () => {
    // Store admin authentication state and user management flag in localStorage
    localStorage.setItem('adminAuthenticated', 'true');
    localStorage.setItem('showUserManagement', 'true');
    navigate("/");
  };

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
                <img src="https://via.placeholder.com/60/CCCCCC/FFFFFF?text=A" alt="Admin" />
              </div>
              <span>Administrator</span>
            </div>
          </div>
        </header>

        <main className="tube-kids-content">
          <div className="video-management-section">
            <h2 className="section-title">Video Management</h2>
            
            <div className="admin-tabs">
              <button 
                className="admin-tab active"
              >
                Manage Videos
              </button>
              <button 
                className="admin-tab"
                onClick={handleGoToUserManagement}
              >
                Manage Restricted Users
              </button>
            </div>
            
            <div className="admin-description">
              <p>Manage videos and playlists available for restricted users.</p>
            </div>
            
            <div className="video-management-content">
              <div className="management-cards">
                <div className="management-card">
                  <div className="card-icon">📹</div>
                  <h3>Add Video</h3>
                  <p>Add new videos to the library</p>
                  <button className="card-action-btn">Add Video</button>
                </div>
                
                <div className="management-card">
                  <div className="card-icon">🎬</div>
                  <h3>Manage Videos</h3>
                  <p>Edit or delete existing videos</p>
                  <button className="card-action-btn">View Videos</button>
                </div>
                
                <div className="management-card">
                  <div className="card-icon">🎵</div>
                  <h3>Create Playlist</h3>
                  <p>Create new playlists for users</p>
                  <button className="card-action-btn">New Playlist</button>
                </div>
                
                <div className="management-card">
                  <div className="card-icon">📋</div>
                  <h3>Manage Playlists</h3>
                  <p>Edit or delete existing playlists</p>
                  <button className="card-action-btn">View Playlists</button>
                </div>
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

export default VideoManagement;