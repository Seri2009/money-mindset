
import { Article, Category } from "../types/article";

export const articles: Article[] = [
  {
    id: "1",
    title: "10 Essential Steps to Build an Emergency Fund",
    slug: "essential-steps-build-emergency-fund",
    excerpt: "Learn how to create a safety net with these proven strategies for building an emergency fund that can weather any financial storm.",
    content: `
# 10 Essential Steps to Build an Emergency Fund

An emergency fund is your financial safety net, designed to cover unexpected expenses or help you weather periods of income loss. Here's how to build one effectively.

## 1. Define Your Emergency Fund Goal

Most financial experts recommend saving enough to cover 3-6 months of essential expenses. Start by calculating your monthly necessities: housing, food, utilities, transportation, insurance, and minimum debt payments.

## 2. Start Small, Think Big

Begin with a modest goal, like $500 or $1,000, to handle minor emergencies. This early win will give you momentum to continue building.

## 3. Set Up a Separate Account

Keep your emergency fund in a high-yield savings account that's separate from your daily checking account but still easily accessible in a true emergency.

## 4. Automate Your Savings

Set up automatic transfers to your emergency fund on payday. Even small amounts add up when consistently contributed.

## 5. Find Extra Money to Save

Look for expenses you can reduce or eliminate from your budget and redirect those funds to your emergency savings.

## 6. Save Windfalls

Commit to saving at least a portion of tax refunds, bonuses, cash gifts, or other unexpected income.

## 7. Track Your Progress

Monitor your emergency fund regularly and celebrate milestones to stay motivated.

## 8. Resist Temptation

Define what constitutes a true emergency to avoid dipping into your fund for non-emergencies.

## 9. Replenish After Using

If you need to use your emergency fund, make a plan to replenish it as soon as your situation stabilizes.

## 10. Reevaluate Periodically

As your life circumstances change, reassess your emergency fund target to ensure it still provides adequate coverage.

Building an emergency fund takes time and discipline, but the financial security and peace of mind it provides are invaluable.
    `,
    category: "personal-finance",
    image: "/placeholder.svg",
    publicationDate: "2023-05-15",
    featured: true
  },
  {
    id: "2",
    title: "Understanding Market Volatility: A Guide for New Investors",
    slug: "understanding-market-volatility-guide-new-investors",
    excerpt: "Market fluctuations can be intimidating for beginners. Learn how to maintain perspective and make informed decisions during volatile periods.",
    content: `
# Understanding Market Volatility: A Guide for New Investors

Market volatility is a natural part of investing, but it can be unnerving, especially for those new to the investment world. This guide will help you understand what causes volatility and how to respond to it effectively.

## What Causes Market Volatility?

Market volatility is influenced by numerous factors:

- Economic indicators and reports
- Changes in interest rates
- Political events and policy changes
- Global crises and pandemics
- Industry disruptions and technological changes
- Investor sentiment and psychology

## Strategies for Navigating Volatile Markets

### 1. Maintain a Long-Term Perspective

Remember that historically, markets have trended upward over long periods despite short-term fluctuations. Your investment timeline should align with your financial goals.

### 2. Diversify Your Portfolio

A well-diversified portfolio across different asset classes, sectors, and geographies can help mitigate risk during market turbulence.

### 3. Dollar-Cost Averaging

Investing a fixed amount regularly regardless of market conditions can reduce the impact of volatility and potentially lower your average cost basis over time.

### 4. Keep Cash Reserves

Having adequate emergency savings prevents you from selling investments at inopportune times to cover unexpected expenses.

### 5. Resist Emotional Decisions

Emotional reactions to market movements often lead to buying high and selling low—the opposite of successful investing. Have a plan and stick to it.

### 6. Consider Rebalancing

Periodically adjusting your portfolio back to your target asset allocation helps maintain your desired risk level and can improve returns over time.

## When to Seek Professional Advice

If market volatility causes significant stress or if you're unsure about your investment strategy, consulting with a financial advisor can provide personalized guidance and perspective.

Remember, volatility creates both risks and opportunities. With the right mindset and strategy, you can navigate market turbulence with confidence.
    `,
    category: "investing-wealth",
    image: "/placeholder.svg",
    publicationDate: "2023-06-22",
    featured: true
  },
  {
    id: "3",
    title: "5 Key Financial Ratios Every Small Business Owner Should Track",
    slug: "key-financial-ratios-small-business-owners",
    excerpt: "Monitor the health of your business with these essential financial metrics that provide insight into profitability, liquidity, and operational efficiency.",
    content: "Full article content about business financial ratios would go here...",
    category: "entrepreneurship-business",
    image: "/placeholder.svg",
    publicationDate: "2023-07-10"
  },
  {
    id: "4",
    title: "How to Negotiate a Higher Salary: Strategies That Actually Work",
    slug: "negotiate-higher-salary-strategies",
    excerpt: "Master the art of salary negotiation with proven tactics that can help you secure better compensation while maintaining professional relationships.",
    content: "Full article content about salary negotiation would go here...",
    category: "financial-education-career",
    image: "/placeholder.svg",
    publicationDate: "2023-08-05"
  },
  {
    id: "5",
    title: "Inflation Explained: Causes, Effects, and Protection Strategies",
    slug: "inflation-explained-causes-effects-protection",
    excerpt: "Understand what drives inflation, how it impacts your finances, and actionable steps to protect your purchasing power during inflationary periods.",
    content: "Full article content about inflation would go here...",
    category: "financial-concepts-news",
    image: "/placeholder.svg",
    publicationDate: "2023-09-18"
  },
  {
    id: "6",
    title: "The Rise of Digital Currencies in Emerging Markets",
    slug: "digital-currencies-emerging-markets",
    excerpt: "Explore how cryptocurrencies and central bank digital currencies are gaining traction in developing economies and reshaping financial inclusion.",
    content: "Full article content about digital currencies would go here...",
    category: "global-economics-trends",
    image: "/placeholder.svg",
    publicationDate: "2023-10-27"
  }
];

export const getFeaturedArticles = (): Article[] => {
  return articles.filter(article => article.featured);
};

export const getRecentArticles = (count: number = 5): Article[] => {
  return [...articles]
    .sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime())
    .slice(0, count);
};

export const getArticlesByCategory = (category: Category): Article[] => {
  return articles.filter(article => article.category === category);
};

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find(article => article.slug === slug);
};
