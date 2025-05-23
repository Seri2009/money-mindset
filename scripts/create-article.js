#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import { exec } from 'child_process';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const articlesDir = path.join(__dirname, '../src/articles');

// Create articles directory if it doesn't exist
if (!fs.existsSync(articlesDir)) {
  fs.mkdirSync(articlesDir, { recursive: true });
}

// Categories from the type definition
const categories = [
  'personal-finance',
  'investing-wealth',
  'entrepreneurship-business',
  'financial-education-career',
  'financial-concepts-news',
  'global-economics-trends'
];

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Simple slug generation
function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')  // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
    .trim();
}

// Main function to get article details and create the file
async function createArticle() {
  console.log('\n===== Create New Article =====\n');
  
  try {
    // Get article details using promises
    const title = await question('Article title: ');
    
    // Generate slug from title
    const defaultSlug = createSlug(title);
    const slugInput = await question(`Slug (default: ${defaultSlug}): `);
    const slug = slugInput.trim() || defaultSlug;
    
    // Display categories with numbers
    console.log('\nAvailable categories:');
    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat}`);
    });
    
    const categoryIndexInput = await question('Select category number: ');
    const categoryIndex = parseInt(categoryIndexInput, 10) - 1;
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
        rl.close();
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
image: "/placeholder.svg"
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
      const editorCommand = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
      exec(`${editorCommand} "${filePath}"`, (err) => {
        if (err) {
          console.log(`Could not open editor: ${err.message}`);
        }
      });
    }
    
    // Remind to generate articles file
    console.log('\nRemember to run "npm run generate-articles" after making changes to update the site.');
    
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    rl.close();
  }
}

// Helper function to promisify readline.question
function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

// Start the application
console.log('Welcome to the Article Creator!');
createArticle(); 