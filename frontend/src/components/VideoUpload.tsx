import React, { useState, useRef } from 'react';
import type{ Video } from '../types';
import { uploadVideo, api } from '../services/api';
import ProgressBar from './ProgressBar';
import VideoPlayer from './VideoPlayer';

interface VideoUploadProps {
  onUpload: (file: File) => void;
  videos: Video[];
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onUpload, videos }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (!file.type.startsWith('video/')) {
        setUploadError('Please select a video file');
        return;
      }
      
      if (file.size > 100 * 1024 * 1024) {
        setUploadError('File size must be less than 100MB');
        return;
      }
      
      setSelectedFile(file);
      setUploadError('');
      setUploadProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadError('');
    
    try {
      await uploadVideo(selectedFile, (progress) => {
        setUploadProgress(progress);
      });
      
      onUpload(selectedFile);
      setSelectedFile(null);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadError(error.response?.data?.detail || 'Failed to upload video');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelUpload = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteVideo = async (videoId: number) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await api.delete(`/videos/${videoId}`);
        onUpload(new File([], '')); // Refresh the list
      } catch (error) {
        console.error('Error deleting video:', error);
        alert('Failed to delete video');
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Video Upload</h3>
      
      {/* File Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Select Video File
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
        />
        <p className="text-xs text-gray-500 mt-1">
          Supported formats: MP4, AVI, MOV, etc. Max size: 100MB
        </p>
      </div>

      {/* Upload Progress */}
      {isUploading && selectedFile && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="font-medium text-gray-800 mb-2">Uploading...</h4>
          <ProgressBar 
            progress={uploadProgress} 
            fileName={selectedFile.name}
            isUploading={true}
          />
          <div className="text-xs text-gray-600 mt-1">
            Size: {formatFileSize(selectedFile.size)}
          </div>
        </div>
      )}

      {/* Selected File Info */}
      {selectedFile && !isUploading && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-blue-50">
          <h4 className="font-medium text-gray-800 mb-2">Selected File</h4>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{selectedFile.name}</p>
              <p className="text-xs text-gray-600">
                {formatFileSize(selectedFile.size)} • {selectedFile.type}
              </p>
            </div>
            <button
              onClick={handleCancelUpload}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {uploadError && (
        <div className="mb-6 p-3 bg-red-100 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{uploadError}</p>
        </div>
      )}

      {/* Upload Button */}
      {selectedFile && !isUploading && (
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
        >
          {isUploading ? 'Uploading...' : 'Upload Video'}
        </button>
      )}

      {/* Uploaded Videos */}
      <div>
        <h4 className="font-medium text-gray-800 mb-4">Uploaded Videos ({videos.length})</h4>
        {videos.length === 0 ? (
          <p className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
            No videos uploaded yet. Upload a video to get started.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoPlayer
                key={video.id}
                video={video}
                onDelete={handleDeleteVideo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;