export interface User {
  username: string;
  avatarUrl: string;
  subscriptionPrice: number;
  isSubscribed: boolean;
}

export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
}

export interface Post {
  id: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  commentsCount: number;
  isExclusive: boolean;
}

export interface AIRecommendation {
  title: string;
  plot: string;
  posterUrl: string;
}
