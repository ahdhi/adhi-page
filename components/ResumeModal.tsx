import React, { useState, FormEvent, useEffect } from 'react';
import { X } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      setError('Please enter your name.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('entry.488208614', userName);

    try {
      await fetch('https://docs.google.com/forms/d/e/1FAIpQLScetmHXDej5hcumPRrVMcc7gLOiQo_sTHHkbuBEo8-f-uVoDg/formResponse', {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // Google Forms does not support CORS, so we can't see the response
      });

      // Assume success and trigger download
      const link = document.createElement('a');
      link.href = '/resume.pdf'; // Assumes resume.pdf is in the public folder
      link.download = 'Adhithyan_Ajith_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setUserName('');
      onClose();

    } catch (error) {
      console.error('Form submission error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-8 max-w-sm w-full relative transform transition-all duration-300 ease-out animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">Download Resume</h2>
        <p className="text-gray-400 mb-6 text-sm">Please enter your name to start the download.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your Name"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Processing...' : 'Download'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResumeModal;
