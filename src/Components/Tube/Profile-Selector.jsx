import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./TubeKids.css";

// Assuming these imports are available in your project
import icon1 from "../../assets/icon1.jpg";
import icon2 from "../../assets/icon2.jpg";
import icon3 from "../../assets/icon3.jpg";
import icon4 from "../../assets/icon4.jpg";
import icon5 from "../../assets/icon5.jpg";
import icon6 from "../../assets/icon6.jpg";
import icon from "../../assets/iconpf.jpg";

const TubeKids = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.email || "example@gmail.com";
  const userName = location.state?.name || "John Doe";
  
  // State for profiles and modals
  const [profiles, setProfiles] = useState([
    {
      id: "1",
      name: "Emma",
      pin: "123456",
      avatar: icon1
    },
    {
      id: "2",
      name: "Lucas",
      pin: "654321",
      avatar: icon2
    }
  ]);
  
  // State for UI control
  const [isAddProfileOpen, setIsAddProfileOpen] = useState(false);
  const [isViewProfileOpen, setIsViewProfileOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isAdminPinModalOpen, setIsAdminPinModalOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("profileSelection"); // profileSelection, userManagement
  const [newProfile, setNewProfile] = useState({});
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [currentProfile, setCurrentProfile] = useState(null);
  const [enteredPin, setEnteredPin] = useState("");
  
  // Check localStorage for admin authentication on component mount
  useEffect(() => {
    const adminAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    const showUserManagement = localStorage.getItem('showUserManagement') === 'true';
    
    if (adminAuthenticated) {
      if (showUserManagement) {
        setCurrentScreen("userManagement");
      } else {
        setCurrentScreen("profileSelection");
      }
      
      // Clear the localStorage values after reading them
      localStorage.removeItem('adminAuthenticated');
      localStorage.removeItem('showUserManagement');
    }
  }, []);
  
  // Maximum number of profiles allowed
  const MAX_PROFILES = 6;

  // Admin PIN (in a real app, this would be stored securely)
  const ADMIN_PIN = "000000";

  // Predefined avatars
  const avatarOptions = [
    { id: "avatar1", src: icon1, alt: "Avatar 1" },
    { id: "avatar2", src: icon2, alt: "Avatar 2" },
    { id: "avatar3", src: icon3, alt: "Avatar 3" },
    { id: "avatar4", src: icon4, alt: "Avatar 4" },
    { id: "avatar5", src: icon5, alt: "Avatar 5" },
    { id: "avatar6", src: icon6, alt: "Avatar 6" },
  ];

  // Handle adding a new profile
  const handleAddProfile = () => {
    if (!newProfile.name || !newProfile.pin || !selectedAvatar) {
      return;
    }
    
    if (profiles.length >= MAX_PROFILES) {
      alert(`You can only create up to ${MAX_PROFILES} profiles.`);
      return;
    }
    
    const profile = {
      id: Date.now().toString(),
      name: newProfile.name,
      pin: newProfile.pin,
      avatar: selectedAvatar
    };
    
    setProfiles([...profiles, profile]);
    setNewProfile({});
    setSelectedAvatar("");
    setIsAddProfileOpen(false);
  };

  // Handle selecting a profile
  const handleSelectProfile = (profile) => {
    setCurrentProfile(profile);
    setIsPinModalOpen(true);
  };

  // Handle viewing a profile (admin action)
  const handleViewProfile = (profile) => {
    setCurrentProfile(profile);
    setIsViewProfileOpen(true);
  };

  // Handle editing a profile
  const handleEditProfile = (profile) => {
    setCurrentProfile(profile);
    setNewProfile({
      name: profile.name,
      pin: profile.pin
    });
    setSelectedAvatar(profile.avatar);
    setIsViewProfileOpen(false);
    setIsEditProfileOpen(true);
  };

  // Handle updating a profile
  const handleUpdateProfile = () => {
    if (!newProfile.name || !newProfile.pin || !selectedAvatar) {
      return;
    }
    
    const updatedProfiles = profiles.map(profile => 
      profile.id === currentProfile.id 
        ? { 
            ...profile, 
            name: newProfile.name, 
            pin: newProfile.pin, 
            avatar: selectedAvatar 
          } 
        : profile
    );
    
    setProfiles(updatedProfiles);
    setNewProfile({});
    setSelectedAvatar("");
    setCurrentProfile(null);
    setIsEditProfileOpen(false);
  };

  // Handle confirming deletion
  const handleDeleteConfirm = (profile) => {
    setCurrentProfile(profile);
    setIsDeleteConfirmOpen(true);
  };

  // Handle deleting a profile
  const handleDeleteProfile = () => {
    const updatedProfiles = profiles.filter(profile => profile.id !== currentProfile.id);
    setProfiles(updatedProfiles);
    setCurrentProfile(null);
    setIsDeleteConfirmOpen(false);
  };

  // Handle admin access
  const handleAdminAccess = () => {
    setIsAdminPinModalOpen(true);
  };

  // Verify PIN for profile access
  const handleVerifyProfilePin = () => {
    if (enteredPin === currentProfile.pin) {
      // Navigate to playlist page
      setIsPinModalOpen(false);
      setEnteredPin("");
      navigate("/playlist", { state: { profile: currentProfile } });
    } else {
      alert("Incorrect PIN. Please try again.");
    }
  };

  // Verify PIN for admin access
  const handleVerifyAdminPin = () => {
    if (enteredPin === ADMIN_PIN) {
      // Navigate to user management screen
      setIsAdminPinModalOpen(false);
      setEnteredPin("");
      setCurrentScreen("userManagement");
    } else {
      alert("Incorrect admin PIN. Please try again.");
    }
  };

  // Return to profile selection
  const handleBackToProfiles = () => {
    setCurrentScreen("profileSelection");
  };

  // Navigate to video management page
  const handleGoToVideoManagement = () => {
    // Set localStorage to maintain admin authentication state
    localStorage.setItem('adminAuthenticated', 'true');
    navigate("/video-management");
  };

  // Render the appropriate screen based on currentScreen state
  const renderScreen = () => {
    switch (currentScreen) {
      case "userManagement":
        return (
          <div className="user-management-section">
            <h2 className="section-title">Manage Restricted Users</h2>
            
            <div className="admin-tabs">
              <button 
                className="admin-tab"
                onClick={handleGoToVideoManagement}
              >
                Manage Videos
              </button>
              <button 
                className="admin-tab active"
              >
                Manage Restricted Users
              </button>
            </div>
            
            <div className="admin-description">
              <p>Manage restricted user profiles for your children.</p>
              <p>Each profile can access the platform with limited permissions.</p>
            </div>
            
            {/* Profile list */}
            <div className="admin-profiles-list">
              <div className="profiles-header">
                <h3>Existing Users ({profiles.length} of {MAX_PROFILES})</h3>
                <button 
                  className="add-profile-btn"
                  onClick={() => setIsAddProfileOpen(true)}
                  disabled={profiles.length >= MAX_PROFILES}
                >
                  + Add New
                </button>
              </div>
              
              {profiles.length > 0 ? (
                <div className="profiles-table">
                  <div className="profiles-table-header">
                    <div className="profile-col">Avatar</div>
                    <div className="profile-col">Name</div>
                    <div className="profile-col">PIN</div>
                    <div className="profile-col">Actions</div>
                  </div>
                  
                  {profiles.map((profile) => (
                    <div key={profile.id} className="profile-row">
                      <div className="profile-col profile-avatar-col">
                        <div className="profile-avatar-small">
                          <img src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                        </div>
                      </div>
                      <div className="profile-col profile-name-col">{profile.name}</div>
                      <div className="profile-col profile-pin-col">••••••</div>
                      <div className="profile-col profile-actions-col">
                        <button 
                          className="profile-action-btn view-btn"
                          onClick={() => handleViewProfile(profile)}
                          title="View Profile"
                        >
                          ⊙
                        </button>
                        <button 
                          className="profile-action-btn edit-btn"
                          onClick={() => handleEditProfile(profile)}
                          title="Edit Profile"
                        >
                          ✎
                        </button>
                        <button 
                          className="profile-action-btn delete-btn"
                          onClick={() => handleDeleteConfirm(profile)}
                          title="Delete Profile"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-profiles-message">
                  <p>No profiles created. Click "Add New" to create the first profile.</p>
                </div>
              )}
            </div>
            
            {profiles.length >= MAX_PROFILES && (
              <div className="max-profiles-warning">
                <p>You have reached the maximum number of allowed profiles ({MAX_PROFILES}).</p>
              </div>
            )}
            
            <button className="back-btn" onClick={handleBackToProfiles}>
              ← Back to Profile Selection
            </button>
          </div>
        );
        
      default: // profileSelection
        return (
          <div className="profile-selector">
            <h2 className="profile-title">Who's watching?</h2>
            <p className="profile-count">
              {profiles.length} of {MAX_PROFILES} profiles created
            </p>

            {/* Profiles grid */}
            {profiles.length > 0 ? (
              <div className="profiles-grid">
                {profiles.map((profile) => (
                  <div 
                    key={profile.id} 
                    className="profile-card"
                    onClick={() => handleSelectProfile(profile)}
                  >
                    <div className="profile-avatar">
                      <img src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                    </div>
                    <div className="profile-info">
                      <h3 className="profile-name">{profile.name}</h3>
                      <button className="view-profile-btn">
                        ⟩ Select Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-profiles">
                <p>No profiles yet. Add your first profile to get started!</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="action-buttons">
              <button 
                className="admin-btn"
                onClick={handleAdminAccess}
              >
                ⚙ Administration
              </button>
            </div>
            
            <div className="admin-note">
              <p>Click on Administration to manage videos and profiles</p>
              <p>Click on a profile to access its playlist</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="tube-kids-app">
      <div className="tube-kids-container">
        {/* Header with logo and user info */}
        <header className="tube-kids-header">
          <div className="tube-kids-logo">
            <h1>TubeKids</h1>
          </div>
          <div className="tube-kids-user">
            <span className="user-email">{userEmail}</span>
            <div className="user-avatar">
              <img src={icon || "/placeholder.svg"} alt={userName} />
            </div>
          </div>
        </header>

        {/* Main content - renders different screens based on state */}
        <main className="tube-kids-content">
          {renderScreen()}
        </main>
      </div>

      {/* Profile PIN Modal */}
      {isPinModalOpen && currentProfile && (
        <div className="modal-overlay">
          <div className="modal pin-modal">
            <div className="modal-header">
              <h3>Enter PIN for {currentProfile.name}</h3>
              <button 
                className="close-btn"
                onClick={() => {
                  setIsPinModalOpen(false);
                  setEnteredPin("");
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="pin-entry">
                <div className="selected-profile">
                  <div className="profile-avatar-small">
                    <img src={currentProfile.avatar || "/placeholder.svg"} alt={currentProfile.name} />
                  </div>
                  <h4>{currentProfile.name}</h4>
                </div>
                
                <div className="form-group">
                  <label htmlFor="profile-pin">Enter 6-digit PIN</label>
                  <input
                    id="profile-pin"
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={enteredPin}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setEnteredPin(value);
                    }}
                    placeholder="Enter PIN"
                    autoFocus
                  />
                </div>
                
                <div className="pin-hint">
                  <p>For this demo, use PIN: 123456 for Emma or 654321 for Lucas</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => {
                  setIsPinModalOpen(false);
                  setEnteredPin("");
                }}
              >
                Cancel
              </button>
              <button 
                className="submit-btn"
                onClick={handleVerifyProfilePin}
                disabled={enteredPin.length !== 6}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin PIN Modal */}
      {isAdminPinModalOpen && (
        <div className="modal-overlay">
          <div className="modal pin-modal">
            <div className="modal-header">
              <h3>Enter Administrator PIN</h3>
              <button 
                className="close-btn"
                onClick={() => {
                  setIsAdminPinModalOpen(false);
                  setEnteredPin("");
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="pin-entry">
                <div className="selected-profile admin-profile">
                  <div className="profile-avatar-small">
                    <img src="https://via.placeholder.com/60/CCCCCC/FFFFFF?text=A" alt="Admin" />
                  </div>
                  <h4>Administrator</h4>
                </div>
                
                <div className="form-group">
                  <label htmlFor="admin-pin">Enter 6-digit PIN</label>
                  <input
                    id="admin-pin"
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={enteredPin}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setEnteredPin(value);
                    }}
                    placeholder="Enter Administrator PIN"
                    autoFocus
                  />
                </div>
                
                <div className="pin-hint">
                  <p>For this demo, use PIN: 000000</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => {
                  setIsAdminPinModalOpen(false);
                  setEnteredPin("");
                }}
              >
                Cancel
              </button>
              <button 
                className="submit-btn"
                onClick={handleVerifyAdminPin}
                disabled={enteredPin.length !== 6}
              >
                Access
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Profile Modal */}
      {isAddProfileOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Profile</h3>
              <button 
                className="close-btn"
                onClick={() => setIsAddProfileOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  type="text"
                  value={newProfile.name || ""}
                  onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                  placeholder="Enter full name"
                />
                {newProfile.name === "" && <div className="validation-error">Name is required</div>}
              </div>
              <div className="form-group">
                <label htmlFor="pin">PIN * (6 digits)</label>
                <input
                  id="pin"
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={newProfile.pin || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setNewProfile({ ...newProfile, pin: value });
                  }}
                  placeholder="Enter 6-digit PIN"
                />
                {newProfile.pin === "" && <div className="validation-error">PIN is required</div>}
                {newProfile.pin !== "" && newProfile.pin.length !== 6 && (
                  <div className="validation-error">PIN must be 6 digits</div>
                )}
              </div>
              <div className="form-group">
                <label>Avatar *</label>
                <div className="avatar-grid">
                  {avatarOptions.map((avatar) => (
                    <div key={avatar.id} className="avatar-option">
                      <input
                        type="radio"
                        name="avatar"
                        id={avatar.id}
                        value={avatar.src}
                        checked={selectedAvatar === avatar.src}
                        onChange={() => setSelectedAvatar(avatar.src)}
                        className="avatar-input"
                      />
                      <label htmlFor={avatar.id} className="avatar-label">
                        <img 
                          src={avatar.src || "/placeholder.svg"} 
                          alt={avatar.alt}
                          className={selectedAvatar === avatar.src ? "selected" : ""}
                        />
                      </label>
                    </div>
                  ))}
                </div>
                {selectedAvatar === "" && <div className="validation-error">Avatar selection is required</div>}
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setIsAddProfileOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="submit-btn"
                onClick={handleAddProfile}
                disabled={!newProfile.name || !newProfile.pin || !selectedAvatar || newProfile.pin.length !== 6}
              >
                Add Profile
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* View Profile Modal */}
      {isViewProfileOpen && currentProfile && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Profile Details</h3>
              <button 
                className="close-btn"
                onClick={() => setIsViewProfileOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="profile-details">
                <div className="profile-details-avatar">
                  <img src={currentProfile.avatar || "/placeholder.svg"} alt={currentProfile.name} />
                </div>
                <div className="profile-details-info">
                  <div className="profile-detail">
                    <label>Name:</label>
                    <span>{currentProfile.name}</span>
                  </div>
                  <div className="profile-detail">
                    <label>PIN:</label>
                    <span>••••••</span>
                  </div>
                </div>
              </div>
              
              <div className="profile-actions">
                <div className="action-buttons-row">
                  <button 
                    className="profile-action-btn edit-btn"
                    onClick={() => handleEditProfile(currentProfile)}
                    title="Edit Profile"
                  >
                    ✎
                  </button>
                  <button 
                    className="profile-action-btn delete-btn"
                    onClick={() => handleDeleteConfirm(currentProfile)}
                    title="Delete Profile"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setIsViewProfileOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Profile Modal */}
      {isEditProfileOpen && currentProfile && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit Profile</h3>
              <button 
                className="close-btn"
                onClick={() => setIsEditProfileOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label htmlFor="edit-name">Full Name *</label>
                <input
                  id="edit-name"
                  type="text"
                  value={newProfile.name || ""}
                  onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                  placeholder="Enter full name"
                />
                {newProfile.name === "" && <div className="validation-error">Name is required</div>}
              </div>
              <div className="form-group">
                <label htmlFor="edit-pin">PIN * (6 digits)</label>
                <input
                  id="edit-pin"
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={newProfile.pin || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setNewProfile({ ...newProfile, pin: value });
                  }}
                  placeholder="Enter 6-digit PIN"
                />
                {newProfile.pin === "" && <div className="validation-error">PIN is required</div>}
                {newProfile.pin !== "" && newProfile.pin.length !== 6 && (
                  <div className="validation-error">PIN must be 6 digits</div>
                )}
              </div>
              <div className="form-group">
                <label>Avatar *</label>
                <div className="avatar-grid">
                  {avatarOptions.map((avatar) => (
                    <div key={avatar.id} className="avatar-option">
                      <input
                        type="radio"
                        name="edit-avatar"
                        id={`edit-${avatar.id}`}
                        value={avatar.src}
                        checked={selectedAvatar === avatar.src}
                        onChange={() => setSelectedAvatar(avatar.src)}
                        className="avatar-input"
                      />
                      <label htmlFor={`edit-${avatar.id}`} className="avatar-label">
                        <img 
                          src={avatar.src || "/placeholder.svg"} 
                          alt={avatar.alt}
                          className={selectedAvatar === avatar.src ? "selected" : ""}
                        />
                      </label>
                    </div>
                  ))}
                </div>
                {selectedAvatar === "" && <div className="validation-error">Avatar selection is required</div>}
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setIsEditProfileOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="submit-btn"
                onClick={handleUpdateProfile}
                disabled={!newProfile.name || !newProfile.pin || !selectedAvatar || newProfile.pin.length !== 6}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && currentProfile && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Delete Profile</h3>
              <button 
                className="close-btn"
                onClick={() => setIsDeleteConfirmOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="delete-confirmation">
                <p>Are you sure you want to delete <strong>{currentProfile.name}</strong>'s profile?</p>
                <p className="delete-warning">This action cannot be undone.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setIsDeleteConfirmOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="delete-btn"
                onClick={handleDeleteProfile}
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TubeKids;