
export type Category = 
  | 'personal-finance' 
  | 'investing-wealth' 
  | 'entrepreneurship-business' 
  | 'financial-education-career' 
  | 'financial-concepts-news' 
  | 'global-economics-trends';

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: Category;
  image?: string;
  publicationDate: string;
  featured?: boolean;
}

export const getCategoryLabel = (category: Category): string => {
  const labels: Record<Category, string> = {
    'personal-finance': 'Personal Finance',
    'investing-wealth': 'Investing & Wealth Building',
    'entrepreneurship-business': 'Entrepreneurship & Business',
    'financial-education-career': 'Financial Education & Career Planning',
    'financial-concepts-news': 'Financial Concepts & News',
    'global-economics-trends': 'Global Economics & Trends'
  };
  
  return labels[category];
};
