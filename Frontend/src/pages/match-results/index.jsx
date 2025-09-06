import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import MatchCard from './components/MatchCard';
import FilterControls from './components/FilterControls';
import MatchStats from './components/MatchStats';
import EmptyState from './components/EmptyState';
import LoadingState from './components/LoadingState';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const MatchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mock user data
  const mockUser = {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  };

  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [matches, setMatches] = useState([]);
  const [sortBy, setSortBy] = useState('similarity');
  const [filterBy, setFilterBy] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock matches data
  const mockMatches = [
    {
      id: 1,
      name: "Sarah Chen",
      age: 28,
      location: "San Francisco, CA",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      similarityScore: 94,
      bio: "Travel enthusiast and coffee lover. Always looking for new adventures and great conversations.",
      matchedAt: "2 hours ago",
      mutualConnections: 3,
      isOnline: true
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      age: 32,
      location: "Austin, TX",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      similarityScore: 89,
      bio: "Software engineer by day, musician by night. Love hiking and exploring new places.",
      matchedAt: "5 hours ago",
      mutualConnections: 1,
      isOnline: false
    },
    {
      id: 3,
      name: "Emma Thompson",
      age: 26,
      location: "New York, NY",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      similarityScore: 87,
      bio: "Artist and designer with a passion for creativity. Always up for interesting conversations.",
      matchedAt: "1 day ago",
      mutualConnections: 5,
      isOnline: true
    },
    {
      id: 4,
      name: "David Kim",
      age: 30,
      location: "Seattle, WA",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      similarityScore: 82,
      bio: "Tech entrepreneur and fitness enthusiast. Love meeting new people and sharing ideas.",
      matchedAt: "2 days ago",
      mutualConnections: 2,
      isOnline: false
    },
    {
      id: 5,
      name: "Lisa Wang",
      age: 29,
      location: "Los Angeles, CA",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      similarityScore: 78,
      bio: "Marketing professional with a love for photography and travel. Always exploring new cultures.",
      matchedAt: "3 days ago",
      mutualConnections: 4,
      isOnline: true
    },
    {
      id: 6,
      name: "James Wilson",
      age: 34,
      location: "Chicago, IL",
      photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
      similarityScore: 75,
      bio: "Chef and food blogger. Passionate about culinary arts and meeting fellow food enthusiasts.",
      matchedAt: "4 days ago",
      mutualConnections: 1,
      isOnline: false
    }
  ];

  // Simulate loading process
  useEffect(() => {
    const loadingTimer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingTimer);
          setIsLoading(false);
          setMatches(mockMatches);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(loadingTimer);
  }, []);

  // Filter and sort matches
  const filteredAndSortedMatches = React.useMemo(() => {
    let filtered = [...matches];

    // Apply filters
    switch (filterBy) {
      case 'high':
        filtered = filtered?.filter(match => match?.similarityScore >= 90);
        break;
      case 'medium':
        filtered = filtered?.filter(match => match?.similarityScore >= 75 && match?.similarityScore < 90);
        break;
      case 'potential':
        filtered = filtered?.filter(match => match?.similarityScore >= 60 && match?.similarityScore < 75);
        break;
      default:
        break;
    }

    // Apply sorting
    switch (sortBy) {
      case 'similarity':
        filtered?.sort((a, b) => b?.similarityScore - a?.similarityScore);
        break;
      case 'recent':
        filtered?.sort((a, b) => new Date(b.matchedAt) - new Date(a.matchedAt));
        break;
      case 'location':
        filtered?.sort((a, b) => a?.location?.localeCompare(b?.location));
        break;
      case 'age':
        filtered?.sort((a, b) => a?.age - b?.age);
        break;
      default:
        break;
    }

    return filtered;
  }, [matches, sortBy, filterBy]);

  // Calculate stats
  const stats = React.useMemo(() => {
    const total = matches?.length;
    const highConfidence = matches?.filter(match => match?.similarityScore >= 90)?.length;
    const average = total > 0 ? Math.round(matches?.reduce((sum, match) => sum + match?.similarityScore, 0) / total) : 0;
    
    return { total, highConfidence, average };
  }, [matches]);

  // Handle actions
  const handleStartChat = (match) => {
    navigate('/chat-interface', { 
      state: { 
        selectedUser: match,
        fromMatches: true 
      } 
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      // Could update matches here
    }, 1000);
  };

  const handleUploadNew = () => {
    navigate('/photo-upload');
  };

  const handleBackToUpload = () => {
    navigate('/photo-upload');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationBar user={mockUser} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingState 
            progress={Math.round(loadingProgress)} 
            message="Analyzing your facial features and finding similar faces worldwide..."
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar user={mockUser} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Your Twin Matches
            </h1>
            <p className="text-text-secondary">
              Discover people who share similar facial features with you
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Button
              variant="outline"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={handleBackToUpload}
              className="touch-target"
            >
              Back to Upload
            </Button>
          </div>
        </div>

        {matches?.length > 0 ? (
          <>
            {/* Stats Section */}
            <MatchStats
              totalMatches={stats?.total}
              highConfidenceMatches={stats?.highConfidence}
              averageScore={stats?.average}
            />

            {/* Filter Controls */}
            <FilterControls
              sortBy={sortBy}
              setSortBy={setSortBy}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              onRefresh={handleRefresh}
              isLoading={isRefreshing}
            />

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-text-secondary">
                Showing {filteredAndSortedMatches?.length} of {matches?.length} matches
              </p>
              
              {filteredAndSortedMatches?.length === 0 && matches?.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilterBy('all')}
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Matches Grid */}
            {filteredAndSortedMatches?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedMatches?.map((match) => (
                  <MatchCard
                    key={match?.id}
                    match={match}
                    userPhoto={mockUser?.photo}
                    onStartChat={handleStartChat}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="Filter" size={24} color="var(--color-text-secondary)" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  No matches found with current filters
                </h3>
                <p className="text-text-secondary mb-4">
                  Try adjusting your filter settings to see more results
                </p>
                <Button
                  variant="outline"
                  onClick={() => setFilterBy('all')}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            onUploadNew={handleUploadNew}
            onRefresh={handleRefresh}
          />
        )}

        {/* Additional Actions */}
        {matches?.length > 0 && (
          <div className="mt-12 text-center">
            <div className="bg-card rounded-lg shadow-elevation-1 p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Want to find more matches?
              </h3>
              <p className="text-text-secondary mb-4">
                Upload additional photos to discover more people who look like you
              </p>
              <Button
                variant="default"
                iconName="Upload"
                iconPosition="left"
                onClick={handleUploadNew}
                className="touch-target"
              >
                Upload Another Photo
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MatchResults;