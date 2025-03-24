"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "./TubeKids.css"

const Playlist = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const profile = location.state?.profile

  const [playlists, setPlaylists] = useState([])
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const [videos, setVideos] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredVideos, setFilteredVideos] = useState([])

  // Fetch playlists and filter by profile ID
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch("http://localhost:5000/api/playlists", {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!response.ok) throw new Error("Failed to fetch playlists")
        const data = await response.json()

        // Filtrar por el perfil actual
        const filtered = data.filter((playlist) =>
          playlist.assignedProfiles.includes(profile.id || profile._id)
        )
        setPlaylists(filtered)

      } catch (error) {
        console.error("Error fetching playlists:", error)
      }
    }

    fetchPlaylists()
  }, [profile])

  // Fetch videos relacionados
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch("http://localhost:5000/api/videos", {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!response.ok) throw new Error("Failed to fetch videos")
        const data = await response.json()
        setVideos(data)
      } catch (error) {
        console.error("Error fetching videos:", error)
      }
    }

    fetchVideos()
  }, [])

  // Filtrar videos basados en el término de búsqueda
  useEffect(() => {
    if (selectedPlaylist) {
      const playlistVideos = videos.filter((video) =>
        selectedPlaylist.videos.includes(video._id)
      )

      if (searchTerm.trim() === "") {
        setFilteredVideos(playlistVideos)
      } else {
        const filtered = playlistVideos.filter(
          (video) =>
            video.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            video.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredVideos(filtered)
      }
    } else if (searchTerm.trim() !== "") {
      const filtered = videos.filter(
        (video) =>
          video.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          video.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredVideos(filtered)
    } else {
      setFilteredVideos([])
    }
  }, [selectedPlaylist, videos, searchTerm])

  const handleSelectPlaylist = (playlist) => {
    setSelectedPlaylist(playlist)
    setSearchTerm("")
  }

  const handleBackToPlaylists = () => {
    setSelectedPlaylist(null)
    setSearchTerm("")
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handlePlayVideo = (video) => {
    console.log("Reproduciendo video:", video)
  }

  const handleBackToProfiles = () => {
    navigate("/profile-selector")
  }

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
    )
  }

  const renderVideoCard = (video) => (
    <div key={video._id} className="video-card" onClick={() => handlePlayVideo(video)}>
      <div className="video-thumbnail">
        <img src={video.thumbnail || "/placeholder.svg"} alt={video.name} />
        <div className="video-duration">{video.duration || " "}</div>
      </div>
      <div className="video-info">
        <h3 className="video-title">{video.name}</h3>
        <p className="video-description">{video.description}</p>
      </div>
    </div>
  )

  const renderPlaylistVideos = () => (
    <div className="playlist-videos-section">
      <div className="playlist-header">
        <button className="back-to-playlists-btn" onClick={handleBackToPlaylists}>
          ← Back to Playlists
        </button>
        <h2 className="section-title">{selectedPlaylist.name}</h2>
        <p className="playlist-description">{selectedPlaylist.description}</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search in this playlist..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        {searchTerm && (
          <button className="clear-search-btn" onClick={() => setSearchTerm("")}>
            ✕
          </button>
        )}
      </div>

      {filteredVideos.length > 0 ? (
        <div className="video-grid">{filteredVideos.map(renderVideoCard)}</div>
      ) : (
        <div className="empty-state">
          <p>
            {searchTerm
              ? `No videos found matching "${searchTerm}" in this playlist`
              : "No videos available in this playlist"}
          </p>
        </div>
      )}
    </div>
  )

  const renderPlaylistsList = () => (
    <div className="playlists-section">
      <h2 className="section-title">My Playlists</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search videos by name or description..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        {searchTerm && (
          <button className="clear-search-btn" onClick={() => setSearchTerm("")}>
            ✕
          </button>
        )}
      </div>

      {searchTerm ? (
        <div className="search-results">
          <h3 className="subsection-title">Search Results</h3>
          {filteredVideos.length > 0 ? (
            <div className="video-grid">{filteredVideos.map(renderVideoCard)}</div>
          ) : (
            <div className="empty-state">
              <p>No videos found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      ) : (
        <div className="playlists-grid">
          {playlists.map((playlist) => (
            <div
              key={playlist._id}
              className="playlist-card"
              onClick={() => handleSelectPlaylist(playlist)}
            >
              <div className="playlist-icon">🎵</div>
              <div className="playlist-info">
                <h3 className="playlist-title">{playlist.name}</h3>
                <p className="playlist-description">{playlist.description}</p>
                <div className="playlist-meta">
                  <span className="video-count">{playlist.videos.length} videos</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="back-btn" onClick={handleBackToProfiles}>
        ← Back to Profile Selection
      </button>
    </div>
  )

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
          {selectedPlaylist ? renderPlaylistVideos() : renderPlaylistsList()}
        </main>
      </div>
    </div>
  )
}

export default Playlist
