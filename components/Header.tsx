import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { Menu, X, Maximize, Minimize } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      const sections = NAV_LINKS.map(link => document.getElementById(link.id));
      const hero = document.getElementById('hero');

      let currentSection = 'hero';
      
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition) {
          currentSection = section.id;
        }
      }
      
      if(hero && window.scrollY < hero.offsetHeight / 2) {
        currentSection = 'hero';
      }

      setActiveSection(currentSection);
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Note: Fullscreen functionality is complex to handle within this environment.
  // This is a placeholder for the toggle button.
  const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${isScrolled ? 'pt-0' : 'pt-1.5'}`}>
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'bg-gray-900/70 border-b border-gray-700/50 backdrop-blur-lg rounded-none' : 'bg-transparent border-transparent'}`}>
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 animate-gradient-x">
            Adhithyan Ajith
          </a>
          
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map(link => (
              <a 
                key={link.id} 
                href={`#${link.id}`}
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${activeSection === link.id ? 'text-blue-400' : 'text-gray-300'}`}
              >
                {link.title}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button onClick={toggleFullScreen} className="hidden md:block text-gray-300 hover:text-blue-400 transition-colors" aria-label="Toggle Fullscreen">
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-300 hover:text-blue-400" aria-label="Toggle Menu">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/90 backdrop-blur-lg absolute top-16 left-0 right-0 pb-4">
          <nav className="flex flex-col items-center space-y-4">
            {NAV_LINKS.map(link => (
              <a 
                key={link.id} 
                href={`#${link.id}`}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium transition-colors hover:text-blue-400 ${activeSection === link.id ? 'text-blue-400' : 'text-gray-300'}`}
              >
                {link.title}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
