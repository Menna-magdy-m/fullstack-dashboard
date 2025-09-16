import React from 'react';

interface ProgressBarProps {
  progress: number;
  fileName?: string;
  isUploading?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, fileName, isUploading = true }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-gray-600">
          {fileName && `${fileName} - `}
          {isUploading ? 'Uploading...' : 'Complete'}
        </span>
        <span className="text-xs font-medium text-gray-700">{progress}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;