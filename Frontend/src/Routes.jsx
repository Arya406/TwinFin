import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Authentication from './pages/authentication';
import ChatInterface from './pages/chat-interface';
import LandingPage from './pages/landing-page';
import MatchResults from './pages/match-results';
import PhotoUpload from './pages/photo-upload';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/chat-interface" element={<ChatInterface />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/match-results" element={<MatchResults />} />
        <Route path="/photo-upload" element={<PhotoUpload />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
