import React, { useState, useEffect } from 'react';
import VideoUpload from '../components/VideoUpload';
import type{ Video } from '../types';
import { api } from '../services/api';

const VideosPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await api.get('/videos/');
      // Sort videos by upload date (newest first)
      const sortedVideos = response.data.sort((a: Video, b: Video) => 
        new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime()
      );
      setVideos(sortedVideos);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleVideoUpload = async (file: File) => {
    // The upload is handled by the VideoUpload component with progress
    // We just need to refresh the list after upload
    await fetchVideos();
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Video Management</h2>
      <VideoUpload onUpload={handleVideoUpload} videos={videos} />
    </div>
  );
};

export default VideosPage;