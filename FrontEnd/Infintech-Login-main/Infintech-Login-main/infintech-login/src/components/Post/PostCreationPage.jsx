import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTimes, FaImage, FaPaperPlane, FaUsers, FaAlignLeft, FaListUl } from 'react-icons/fa';
import '../../components/Global.css';
import './PostCreationPage.css';

const PostCreationPage = () => {
  const [type, setType] = useState('Question');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [communities, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const communityId = queryParams.get('community');
    
    if (communityId) {
      setSelectedCommunity(communityId);
    }
  }, [location]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/communities');
        setCommunities(response.data);
        
        // If we have a selectedCommunity from URL but not yet in communities list
        const queryParams = new URLSearchParams(location.search);
        const communityId = queryParams.get('community');
        
        if (communityId && !response.data.some(c => c._id === communityId)) {
          try {
            const communityResponse = await axios.get(`http://localhost:8080/api/communities/${communityId}`);
            setCommunities(prev => [...prev, communityResponse.data]);
          } catch (err) {
            console.error('Error fetching specific community:', err);
          }
        }
      } catch (error) {
        console.error('Error fetching communities:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load communities',
          icon: 'error',
          background: '#1a202c',
          color: 'white',
          confirmButtonColor: '#4299e1'
        });
      }
    };
    
    fetchCommunities();
  }, [location]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          title: 'Invalid File',
          text: 'Please select an image file (JPEG, PNG, etc.)',
          icon: 'error',
          background: '#1a202c',
          color: 'white',
          confirmButtonColor: '#4299e1'
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: 'File Too Large',
          text: 'Image size should be less than 5MB',
          icon: 'error',
          background: '#1a202c',
          color: 'white',
          confirmButtonColor: '#4299e1'
        });
        return;
      }
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content || !selectedCommunity) {
      Swal.fire({
        title: 'Missing Fields',
        text: 'Please fill all required fields',
        icon: 'warning',
        background: '#1a202c',
        color: 'white',
        confirmButtonColor: '#4299e1'
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData || !userData.email) {
        throw new Error('Please login to create a post');
      }

      const formData = new FormData();
      formData.append('content', content);
      formData.append('type', type);
      formData.append('communityId', selectedCommunity);
      formData.append('userEmail', userData.email);
      
      if (image) {
        formData.append('image', image);
      }

      await axios.post('http://localhost:8080/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
      });

      Swal.fire({
        title: 'Success!',
        text: 'Your post has been published successfully',
        icon: 'success',
        background: '#1a202c',
        color: 'white',
        confirmButtonColor: '#48bb78',
        timer: 2000,
        timerProgressBar: true
      }).then(() => {
        navigate(`/community/${selectedCommunity}`);
      });
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || error.message || 'Failed to create post',
        icon: 'error',
        background: '#1a202c',
        color: 'white',
        confirmButtonColor: '#e53e3e'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="post-creation-wrapper">
      <div className="post-creation-glass-card">
        <div className="post-creation-header">
          <h2 className="post-creation-title">
            <FaPaperPlane className="icon-spacing" />
            Create New Post
          </h2>
          <p className="post-creation-subtitle">Share your thoughts with the community</p>
        </div>
        
        <form onSubmit={handleSubmit} className="post-creation-form">
          <div className="form-group">
            <label className="form-label">
              <FaUsers className="input-icon" />
              <span>Community *</span>
            </label>
            <select
              value={selectedCommunity}
              onChange={(e) => setSelectedCommunity(e.target.value)}
              className="form-select"
              required
              disabled={isLoading}
            >
              <option value="">Select a community</option>
              {communities.map(community => (
                <option key={community._id} value={community._id}>
                  {community.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              <FaListUl className="input-icon" />
              <span>Post Type *</span>
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="form-select"
              required
              disabled={isLoading}
            >
              <option value="Question">Question</option>
              <option value="Collaboration">Collaboration</option>
              <option value="Discussion">Discussion</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              <FaAlignLeft className="input-icon" />
              <span>Content *</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-textarea"
              placeholder="Share your thoughts with the community..."
              required
              minLength="10"
              rows="8"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <FaImage className="input-icon" />
              <span>Add Image (Optional)</span>
            </label>
            <div className="image-upload-container">
              <label className="image-upload-label">
                {image ? 'Change Image' : 'Select Image'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="image-upload-input"
                  disabled={isLoading}
                />
              </label>
              {image && (
                <div className="image-preview-container">
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt="Preview" 
                    className="image-preview"
                  />
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="image-remove-btn"
                    disabled={isLoading}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate(-1)}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isLoading || !content || !selectedCommunity}
            >
              {isLoading ? (
                <span className="spinner"></span>
              ) : (
                <>
                  <FaPaperPlane className="icon-spacing" />
                  Publish Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostCreationPage;