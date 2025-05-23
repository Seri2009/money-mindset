#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths and constants
const BASE_PATH = "/clean-blog-website-template";
const articlesDir = path.join(__dirname, "../src/articles");
const outputFile = path.join(__dirname, "../src/data/generated-articles.ts");
const publicImagesDir = path.join(__dirname, "../public/article-images");
const srcImagesDir = path.join(__dirname, "../src/article-images");

// Define types
interface ArticleData {
  title: string;
  slug: string;
  category: string;
  image?: string;
  publicationDate: string;
  featured?: boolean;
  excerpt?: string;
  content: string;
  id: string;
}

// Create the article images directories if they don't exist
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

if (!fs.existsSync(srcImagesDir)) {
  fs.mkdirSync(srcImagesDir, { recursive: true });
}

function getAllMarkdownFiles(dir: string): string[] {
  return fs.readdirSync(dir)
    .filter(file => file.endsWith(".md"))
    .map(file => path.join(dir, file));
}

function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove Markdown headings and formatting
  const plainText = content
    .replace(/^#+\s+.*/gm, "") // Remove headings
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
    .replace(/\*(.*?)\*/g, "$1") // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Remove links
    .replace(/\n+/g, " ") // Replace newlines with spaces
    .replace(/\s+/g, " ") // Normalize spaces
    .trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  // Find a good cutoff point (end of sentence or space)
  const truncated = plainText.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf(".");
  const lastSpace = truncated.lastIndexOf(" ");
  
  const cutoff = lastPeriod > 0 ? lastPeriod + 1 : 
                lastSpace > 0 ? lastSpace : 
                maxLength;
  
  return plainText.substring(0, cutoff).trim() + "...";
}

function parseArticle(filePath: string): ArticleData {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  
  const slug = data.slug || path.basename(filePath, ".md");
  
  // Generate excerpt from content if not provided
  const excerpt = data.excerpt || generateExcerpt(content);
  
  return {
    ...data,
    content: content.trim(),
    id: slug,
    slug,
    excerpt
  } as ArticleData;
}

function ensureUniqueImageNames(articles: ArticleData[]): ArticleData[] {
  // Create a map of image name occurrences
  const imageMap: Record<string, string[]> = {};
  
  articles.forEach(article => {
    if (!article.image) {
      // If no image is set, use placeholder with base path
      article.image = `${BASE_PATH}/placeholder.svg`;
      return;
    }
    
    // If image doesn't start with base path, add it
    if (!article.image.startsWith(BASE_PATH)) {
      article.image = `${BASE_PATH}${article.image}`;
    }
    
    // Skip external URLs
    if (article.image.startsWith("http")) {
      return;
    }
    
    // Get just the filename from the path
    const fileName = path.basename(article.image);
    
    if (!imageMap[fileName]) {
      imageMap[fileName] = [];
    }
    
    imageMap[fileName].push(article.slug);
  });
  
  // For any duplicates, rename to include the slug
  Object.entries(imageMap).forEach(([fileName, slugs]) => {
    if (slugs.length > 1) {
      const ext = path.extname(fileName);
      const baseName = path.basename(fileName, ext);
      
      slugs.forEach((slug, index) => {
        if (index > 0) {
          const article = articles.find(a => a.slug === slug);
          if (article) {
            const newImageName = `${BASE_PATH}/article-images/${baseName}-${slug}${ext}`;
            article.image = newImageName;
          }
        }
      });
    }
  });
  
  return articles;
}

function main() {
  const files = getAllMarkdownFiles(articlesDir);
  let articles = files.map(parseArticle);
  
  // Ensure unique image names
  articles = ensureUniqueImageNames(articles);
  
  // Sort articles by publication date (newest first)
  articles.sort((a, b) => {
    const dateA = new Date(a.publicationDate || 0);
    const dateB = new Date(b.publicationDate || 0);
    return dateB.getTime() - dateA.getTime();
  });
  
  const ts = `// This file is auto-generated. Do not edit manually.
import { Article } from '../types/article';

export const articles: Article[] = ${JSON.stringify(articles, null, 2)};

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
`;

  fs.writeFileSync(outputFile, ts, "utf-8");
  console.log(`Generated ${outputFile} with ${articles.length} articles.`);
}

main();