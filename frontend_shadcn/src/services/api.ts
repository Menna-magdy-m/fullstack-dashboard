import axios from 'axios';
import type{ ReorderResponse } from '../types';

export const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add reorder function
export const reorderItems = async (itemIds: number[]): Promise<ReorderResponse> => {
  const response = await api.put('/items/reorder/', itemIds);
  return response.data;
};

// Video upload with progress
export const uploadVideo = async (file: File, onProgress?: (progress: number) => void) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post('/upload-video/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total && onProgress) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },
  });
  
  return response.data;
};