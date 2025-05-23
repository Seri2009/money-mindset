// This file is auto-generated. Do not edit manually.
import { Article } from '../types/article';

export const articles: Article[] = [
  {
    "title": "🎓 The 50/30/20 Rule Explained for Students",
    "slug": "-the-503020-rule-explained-for-students",
    "category": "personal-finance",
    "publicationDate": "2025-05-23",
    "featured": true,
    "image": "/money-mindset/article-images/-the-503020-rule-explained-for-students.jpg",
    "content": "# 🎓 The 50/30/20 Rule Explained for Students\n*by Seri Kanj*\n\nAs a high school student exploring how to manage money better, I kept coming across something called the **50/30/20 rule**. At first, it sounded like one of those adult budgeting things I wouldn’t need until college. But the more I looked into it, the more I realized it’s actually a simple and powerful tool that students like us can start using now.\n\n## What Is the 50/30/20 Rule?\n\nThe 50/30/20 rule is a budgeting method that divides your **after-tax income** into three categories:\n\n- **50% Needs**\n- **30% Wants**\n- **20% Savings**\n\nEven if you’re not making a full-time salary, this rule helps build strong money habits with whatever income you do have—whether it’s allowance, tutoring pay, or part-time work.\n\n## How It Works (Student Edition)\n\nLet’s say you earn **$100/month** from babysitting or tutoring. Here's how you'd break it down:\n\n### 🔹 50% — Needs ($50)\nFor students, “needs” could include:\n- School supplies\n- Lunch or snack money\n- Public transportation or gas\n- Phone bill contributions\n\n### 🔹 30% — Wants ($30)\nThis covers non-essentials and fun purchases:\n- Going out with friends\n- Streaming services (Spotify, Netflix)\n- Fashion, gadgets, or accessories\n- Gaming or entertainment\n\n### 🔹 20% — Savings ($20)\nSaving while you’re young creates lifelong habits:\n- Emergency fund\n- College or laptop fund\n- Investing (or just learning about it)\n- Opening a student savings account\n\n## Why It Works\n\nThe 50/30/20 rule gave me a **clear structure**. Instead of spending randomly, I now divide my money purposefully. It helps me enjoy the present while still being responsible about the future.\n\nAs I earn more in the future, this structure will scale with me—whether I’m earning $100 or $1,000 a month.\n\n## How I Got Started\n\nHere’s how I applied the rule:\n- Created a simple Google Sheets tracker\n- Used budgeting apps like *Revolut* or *Spendee*\n- Set short-term savings goals (like $100 for a concert)\n- Reviewed my spending weekly\n\nIt’s not about being perfect—just being consistent and intentional.\n\n## Final Thoughts\n\nThe 50/30/20 rule helped me **feel more confident** about managing money. It’s one of those things we aren’t usually taught in school but absolutely should be.\n\nIf you’re a student trying to build smart financial habits, this is a great place to start.\n\n> Let’s be the generation that actually knows how to budget.",
    "id": "-the-503020-rule-explained-for-students",
    "excerpt": "by Seri Kanj As a high school student exploring how to manage money better, I kept coming across something called the 50/30/20 rule...."
  },
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
