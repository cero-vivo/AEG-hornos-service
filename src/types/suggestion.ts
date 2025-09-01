export type SuggestionCategory = 'bug' | 'suggestion' | 'feature' | 'question' | 'other';

export type SuggestionStatus = 'pending' | 'in_progress' | 'resolved' | 'rejected';

export interface Suggestion {
  id?: string;
  title: string;
  description: string;
  category: SuggestionCategory;
  status: SuggestionStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  userName?: string;
  userEmail?: string;
  createdAt: Date;
  updatedAt: Date;
  adminNotes?: string;
  screenshots?: string[];
  metadata?: {
    browser?: string;
    device?: string;
    url?: string;
    userAgent?: string;
  };
}