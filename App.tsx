import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProgressBar from './components/ProgressBar';
import CustomCursor from './components/CustomCursor';
import NeuralNetworkBackground from './components/NeuralNetworkBackground';
import LoadingScreen from './components/LoadingScreen';
import ResumeModal from './components/ResumeModal';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto';
    }, 2000);
    
    document.body.style.overflow = 'hidden';

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <CustomCursor />
      <NeuralNetworkBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <ProgressBar />
        <Header />
        <main className="flex-grow">
          <Hero onDownloadResume={() => setIsResumeModalOpen(true)} />
          <About />
          <Skills />
          <Projects />
          <Publications />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
      <Chatbot />
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </>
  );
};

export default App;