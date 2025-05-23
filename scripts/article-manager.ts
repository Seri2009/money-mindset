#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import { exec } from 'child_process';
import matter from 'gray-matter';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const articlesDir = path.join(__dirname, '../src/articles');
const publicImagesDir = path.join(__dirname, '../public/article-images');
const srcImagesDir = path.join(__dirname, '../src/article-images');
const BASE_PATH = "/clean-blog-website-template";

// Create directories if they don't exist
for (const dir of [articlesDir, publicImagesDir, srcImagesDir]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Helper function to create URL-friendly slugs
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')  // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-');      // Replace multiple hyphens with single hyphen
}

// Categories from the type definition
const categories = [
  'personal-finance',
  'investing-wealth',
  'entrepreneurship-business',
  'financial-education-career',
  'financial-concepts-news',
  'global-economics-trends'
] as const;

type Category = typeof categories[number];

interface ArticleData {
  title: string;
  slug: string;
  category: Category;
  image?: string;
  publicationDate: string;
  featured?: boolean;
  excerpt?: string;
  content: string;
  filePath: string;
  fileName: string;
}

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function displayMenu() {
  console.log('\n===== Article Manager =====');
  console.log('1. Create a new article');
  console.log('2. List existing articles');
  console.log('3. Update an existing article');
  console.log('4. Generate articles typescript file');
  console.log('5. Add an image to an article');
  console.log('0. Exit');
  
  const choice = await question('\nEnter your choice: ');
  
  switch (choice) {
    case '1':
      await createArticle();
      break;
    case '2':
      await listArticles();
      break;
    case '3':
      await updateArticle();
      break;
    case '4':
      await generateArticlesFile();
      break;
    case '5':
      await addImageToArticle();
      break;
    case '0':
      console.log('Exiting...');
      rl.close();
      process.exit(0);
      break;
    default:
      console.log('Invalid choice. Please try again.');
      await displayMenu();
  }
  
  // Return to menu after action completes
  await displayMenu();
}

function getAllArticleFiles(): string[] {
  return fs.readdirSync(articlesDir)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(articlesDir, file));
}

function parseArticle(filePath: string): ArticleData {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  
  return {
    ...data,
    content,
    filePath,
    fileName: path.basename(filePath)
  } as ArticleData;
}

async function createArticle() {
  console.log('\n===== Create New Article =====');
  
  try {
    // Get article details
    const title = await question('Article title: ');
    
    // Generate slug from title
    const slug = createSlug(title);
    
    // Display categories with numbers
    console.log('\nAvailable categories:');
    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat}`);
    });
    
    const categoryIndex = parseInt(await question('Select category number: '), 10) - 1;
    const category = categories[categoryIndex] || categories[0];
    
    const publicationDate = await question('Publication date (YYYY-MM-DD): ');
    const featuredResponse = await question('Featured article? (y/n): ');
    const featured = featuredResponse.toLowerCase() === 'y';
    
    const filePath = path.join(articlesDir, `${slug}.md`);
    
    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`\nArticle with slug "${slug}" already exists!`);
      const overwrite = await question('Overwrite? (y/n): ');
      if (overwrite.toLowerCase() !== 'y') {
        console.log('Article creation cancelled.');
        return;
      }
    }
    
    // Create markdown content
    const articleContent = `---
title: "${title}"
slug: "${slug}"
category: "${category}"
publicationDate: "${publicationDate}"
featured: ${featured}
image: "${BASE_PATH}/placeholder.svg"
---

# ${title}

Start writing your article content here. This content will be automatically used to generate the excerpt.

## Section Title

Your content here...
`;
    
    // Write to file
    fs.writeFileSync(filePath, articleContent, 'utf-8');
    
    console.log(`\nArticle created successfully: ${filePath}`);
    
    // Offer to open in editor
    const openEditor = await question('Open in default editor? (y/n): ');
    if (openEditor.toLowerCase() === 'y') {
      const editor = process.env.EDITOR || 'code';
      exec(`${editor} "${filePath}"`);
    }
  } catch (err) {
    console.error('Error creating article:', err);
  }
}

async function listArticles() {
  console.log('\n===== Existing Articles =====');
  
  const files = getAllArticleFiles();
  const articles = files.map(parseArticle);
  
  if (articles.length === 0) {
    console.log('No articles found.');
    return;
  }
  
  // Sort by publication date (newest first)
  articles.sort((a, b) => {
    const dateA = new Date(a.publicationDate || 0);
    const dateB = new Date(b.publicationDate || 0);
    return dateB.getTime() - dateA.getTime();
  });
  
  // Display articles
  articles.forEach((article, index) => {
    console.log(`${index + 1}. [${article.category}] ${article.title} (${article.fileName})`);
    console.log(`   Published: ${article.publicationDate || 'No date'} ${article.featured ? '★' : ''}`);
  });
  
  console.log(`\nTotal: ${articles.length} articles`);
}

async function updateArticle() {
  console.log('\n===== Update Article =====');
  
  const files = getAllArticleFiles();
  const articles = files.map(parseArticle);
  
  if (articles.length === 0) {
    console.log('No articles found.');
    return;
  }
  
  // List articles with numbers
  console.log('Select an article to update:');
  articles.forEach((article, index) => {
    console.log(`${index + 1}. ${article.title} (${article.fileName})`);
  });
  
  const articleIndex = parseInt(await question('Enter article number: '), 10) - 1;
  
  if (articleIndex < 0 || articleIndex >= articles.length) {
    console.log('Invalid selection.');
    return;
  }
  
  const article = articles[articleIndex];
  console.log(`\nUpdating: ${article.title}`);
  
  // Open in editor
  const openEditor = await question('Open in default editor? (y/n): ');
  if (openEditor.toLowerCase() === 'y') {
    exec(`open "${article.filePath}"`, (err) => {
      if (err) {
        console.log(`Could not open editor: ${err.message}`);
      }
    });
    return;
  }
  
  // Otherwise, update properties manually
  const newTitle = await question(`Title (${article.title}): `);
  const newCategory = await question(`Category (${article.category}): `);
  const newDate = await question(`Publication date (${article.publicationDate}): `);
  const featuredResponse = await question(`Featured (${article.featured ? 'y' : 'n'}): `);
  
  // Update only provided fields
  const updatedFrontmatter = {
    ...article,
    title: newTitle || article.title,
    category: newCategory || article.category,
    publicationDate: newDate || article.publicationDate,
    featured: featuredResponse ? (featuredResponse.toLowerCase() === 'y') : article.featured
  };
  
  // Remove content from frontmatter
  const { content, filePath, fileName, ...frontmatter } = updatedFrontmatter;
  
  // Create updated markdown
  const updatedMarkdown = matter.stringify(content, frontmatter);
  
  // Write back to file
  fs.writeFileSync(article.filePath, updatedMarkdown, 'utf-8');
  
  console.log(`\nArticle updated successfully: ${article.filePath}`);
}

async function addImageToArticle() {
  console.log('\n===== Add Image to Article =====');
  
  const files = getAllArticleFiles();
  const articles = files.map(parseArticle);
  
  if (articles.length === 0) {
    console.log('No articles found.');
    return;
  }
  
  // List articles with numbers
  console.log('Select an article to add an image to:');
  articles.forEach((article, index) => {
    console.log(`${index + 1}. ${article.title} (${article.fileName})`);
  });
  
  const articleIndex = parseInt(await question('Enter article number: '), 10) - 1;
  
  if (articleIndex < 0 || articleIndex >= articles.length) {
    console.log('Invalid selection.');
    return;
  }
  
  const article = articles[articleIndex];
  console.log(`\nAdding image to: ${article.title}`);
  
  // Get image path
  const imagePath = await question('Path to image file on your computer: ');
  
  if (!fs.existsSync(imagePath)) {
    console.log('Image file not found.');
    return;
  }
  
  // Generate image name based on article slug
  const ext = path.extname(imagePath);
  const imageName = `${article.slug}${ext}`;
  const publicImagePath = path.join(publicImagesDir, imageName);
  
  // Copy image to public directory
  try {
    await fs.promises.copyFile(imagePath, publicImagePath);
    console.log(`Image copied to: ${publicImagePath}`);
    
    // Update article frontmatter with base path
    const imageRelativePath = `${BASE_PATH}/article-images/${imageName}`;
    
    // Read and parse article
    const fileContent = fs.readFileSync(article.filePath, 'utf-8');
    const { content, data } = matter(fileContent);
    
    // Update image path
    data.image = imageRelativePath;
    
    // Write back to file
    const updatedContent = matter.stringify(content, data);
    fs.writeFileSync(article.filePath, updatedContent, 'utf-8');
    
    console.log(`Article updated with new image: ${imageRelativePath}`);
  } catch (err) {
    console.error('Error copying image:', err);
  }
}

async function generateArticlesFile() {
  console.log('\n===== Generating Articles File =====');
  
  // Execute generate-articles.ts script
  exec('npm run generate-articles', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing generate-articles: ${err.message}`);
      console.error(stderr);
      return;
    }
    
    console.log(stdout);
  });
}

// Start the application
console.log('Welcome to the Article Manager!');
displayMenu().catch(err => {
  console.error('An error occurred:', err);
  rl.close();
  process.exit(1);
}); 