// This file is auto-generated. Do not edit manually.
import { Article } from '../types/article';

export const articles: Article[] = [
  {
    "title": "New Beginnings",
    "slug": "new-beginnings",
    "category": "personal-finance",
    "publicationDate": "2025-05-23",
    "featured": true,
    "image": "/money-mindset/article-images/new-beginnings.jpg",
    "content": "# New Beginnings\n\nStart writing your article content here. This content will be automatically used to generate the excerpt.\n\n## Section Title\n\nYour content here...",
    "id": "new-beginnings",
    "excerpt": "Start writing your article content here. This content will be automatically used to generate the excerpt. Your content here..."
  }
];

export const getFeaturedArticles = (): Article[] => {
  return articles.filter(article => article.featured);
};

export const getRecentArticles = (count: number = 5): Article[] => {
  return articles.slice(0, count); // Articles are already sorted by date
};

export const getArticlesByCategory = (category: string): Article[] => {
  return articles.filter(article => article.category === category);
};

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find(article => article.slug === slug);
};
