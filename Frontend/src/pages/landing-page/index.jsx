import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import CallToActionSection from './components/CallToActionSection';
import FooterSection from './components/FooterSection';

const LandingPage = () => {
  const navigate = useNavigate();

  // Mock user state - in real app this would come from auth context
  const user = null; // Set to null to show unauthenticated state
  const notificationCount = 0;

  const handleGetStarted = () => {
    // Navigate to photo upload if user is authenticated, otherwise to authentication
    if (user) {
      navigate('/photo-upload');
    } else {
      navigate('/authentication');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar user={user} notificationCount={notificationCount} />
      
      <main>
        <HeroSection onGetStarted={handleGetStarted} />
        <HowItWorksSection />
        <TestimonialsSection />
        <CallToActionSection onGetStarted={handleGetStarted} />
      </main>
      
      <FooterSection />
    </div>
  );
};

export default LandingPage;