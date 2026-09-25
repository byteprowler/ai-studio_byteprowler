import { useState } from 'react';

export const useCVActions = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  const handleViewCV = () => {
    const cvWindow = window.open('/docs/cv.pdf', '_blank');
    
    if (!cvWindow || cvWindow.closed || typeof cvWindow.closed === 'undefined') {
      // Fallback to download if popup blocked
      handleDownloadCV();
      setDownloadError('Popup blocked - downloading CV instead');
      setTimeout(() => setDownloadError(null), 3000); // Clear error after 3 seconds
    }
  };

  const handleDownloadCV = async () => {
    try {
      setIsDownloading(true);
      setDownloadError(null);
      
      const response = await fetch('/docs/cv.pdf');
      if (!response.ok) throw new Error('Failed to fetch CV');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'ByteProwler_CV.pdf';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      }, 100);
      
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadError(error.message);
      setTimeout(() => setDownloadError(null), 5000);
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    handleViewCV,
    handleDownloadCV,
    isDownloading,
    downloadError
  };
};