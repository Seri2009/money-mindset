import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Serve article images so they show in the admin UI
app.use('/article-images', express.static(path.join(__dirname, 'public/article-images')));

const ARTICLES_PATH = path.join(__dirname, 'src/data/generated-articles.ts');
const IMAGES_DIR = path.join(__dirname, 'public/article-images');

// Image upload setup
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, IMAGES_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.originalname.replace(ext, '').replace(/[^a-z0-9-]/gi, '-').toLowerCase();
    cb(null, `${name}${ext}`);
  }
});
const upload = multer({ storage });

// Parse articles from the TS file
function readArticles() {
  const content = fs.readFileSync(ARTICLES_PATH, 'utf-8');
  const match = content.match(/export const articles: Article\[\] = (\[[\s\S]*?\n\]);/);
  if (!match) throw new Error('Could not parse articles file');
  return JSON.parse(match[1]);
}

// Write articles back to the TS file
function writeArticles(articles) {
  const content = `// This file is auto-generated. Do not edit manually.
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
  fs.writeFileSync(ARTICLES_PATH, content, 'utf-8');
}

// Generate random view count: 93% chance 1000-2000, 7% chance up to 5000 (harder to go higher)
function generateViews() {
  const roll = Math.random();
  if (roll > 0.07) {
    return Math.floor(1000 + Math.random() * 1000);
  }
  const t = Math.random();
  return Math.floor(2000 + Math.pow(t, 2) * 3000);
}

// --- API Routes ---

app.get('/api/articles', (_req, res) => {
  try {
    res.json(readArticles());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/articles', (req, res) => {
  try {
    const articles = readArticles();
    const article = req.body;
    article.id = article.slug;
    if (!article.views) article.views = generateViews();
    articles.unshift(article);
    writeArticles(articles);
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/articles/:id', (req, res) => {
  try {
    const articles = readArticles();
    const idx = articles.findIndex(a => a.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Article not found' });
    articles[idx] = { ...articles[idx], ...req.body };
    writeArticles(articles);
    res.json(articles[idx]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/articles/:id', (req, res) => {
  try {
    const articles = readArticles();
    const idx = articles.findIndex(a => a.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Article not found' });
    articles.splice(idx, 1);
    writeArticles(articles);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ path: `/article-images/${req.file.filename}` });
});

// --- Serve Admin UI ---

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.listen(PORT, () => {
  console.log('\n  MoneyMindset Article Manager');
  console.log('  Open http://localhost:' + PORT + ' in your browser\n');
});
