export interface FeedbackData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category: string;
  rating: number;
  title: string;
  content: string;
  isAnonymous: boolean;
  timestamp: string;
  likes: number;
  avatar?: string;
}

export interface FeedbackStats {
  totalFeedbacks: number;
  averageRating: number;
  categoryStats: Record<string, number>;
  recentFeedbacks: FeedbackData[];
  lastUpdated: string;
}

const STORAGE_KEY = 'mekong_pathfinder_feedbacks';

// Save feedback to localStorage
export const saveFeedback = (feedbackData: Omit<FeedbackData, 'id' | 'timestamp' | 'likes'>): void => {
  try {
    const existingData = getFeedbackStats();
    const newFeedback: FeedbackData = {
      ...feedbackData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      likes: 0
    };

    const updatedFeedbacks = [newFeedback, ...existingData.recentFeedbacks];
    
    const updatedStats: FeedbackStats = {
      totalFeedbacks: updatedFeedbacks.length,
      averageRating: updatedFeedbacks.reduce((sum, f) => sum + f.rating, 0) / updatedFeedbacks.length,
      categoryStats: updatedFeedbacks.reduce((acc, f) => {
        acc[f.category] = (acc[f.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      recentFeedbacks: updatedFeedbacks,
      lastUpdated: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStats));
  } catch (error) {
    console.error('Error saving feedback:', error);
  }
};

// Get feedback statistics
export const getFeedbackStats = (): FeedbackStats => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error getting feedback stats:', error);
  }

  // Return default empty stats
  return {
    totalFeedbacks: 0,
    averageRating: 0,
    categoryStats: {},
    recentFeedbacks: [],
    lastUpdated: new Date().toISOString()
  };
};

// Get recent feedbacks
export const getRecentFeedbacks = (limit: number = 10): FeedbackData[] => {
  const stats = getFeedbackStats();
  return stats.recentFeedbacks.slice(0, limit);
};

// Update feedback likes
export const updateFeedbackLikes = (feedbackId: string, increment: number = 1): void => {
  try {
    const stats = getFeedbackStats();
    const updatedFeedbacks = stats.recentFeedbacks.map(feedback => 
      feedback.id === feedbackId 
        ? { ...feedback, likes: feedback.likes + increment }
        : feedback
    );

    const updatedStats: FeedbackStats = {
      ...stats,
      recentFeedbacks: updatedFeedbacks,
      lastUpdated: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStats));
  } catch (error) {
    console.error('Error updating feedback likes:', error);
  }
};

// Export feedback data
export const exportFeedbackData = (): string => {
  const stats = getFeedbackStats();
  return JSON.stringify(stats, null, 2);
};

// Clear all feedback data
export const clearFeedbackData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing feedback data:', error);
  }
};
