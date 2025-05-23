# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/a4760ac2-5b45-4d36-858b-c4fbd8e90781

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a4760ac2-5b45-4d36-858b-c4fbd8e90781) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

To deploy this project to GitHub Pages:

1. Make sure you have pushed your latest changes to your repository.
2. Install dependencies if you haven't already:
   ```sh
   npm install
   ```
3. Build and deploy to GitHub Pages with:
   ```sh
   npm run deploy
   ```
   This will build the project and publish the contents of the `dist` folder to the `gh-pages` branch.
4. After deployment, your site will be available at:
   ```
   https://<your-github-username>.github.io/<your-repo-name>/
   ```
   (Replace `<your-github-username>` and `<your-repo-name>` accordingly.)

### Notes
- Client-side routing is supported. If you refresh or directly access a route, the custom `404.html` will redirect you correctly.
- Make sure the repository name in `vite.config.ts` matches your GitHub repo name for the `base` path.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Article Management System

This project includes a robust article management system that makes it easy to create, update, and publish articles using Markdown.

### Key Features

- Simple Markdown-based article creation
- Automatic excerpt generation from article content
- Support for article images
- Category organization
- Featured article designation
- Publication date management

### How to Use

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Managing Articles**

   We've included scripts to help you manage articles:

   ```bash
   # Run the interactive article manager
   npm run articles
   
   # Generate the TypeScript file from Markdown articles
   npm run generate-articles
   ```

3. **Article Manager Options**

   The article manager provides these options:
   - Create a new article
   - List existing articles
   - Update an existing article
   - Generate articles TypeScript file
   - Add an image to an article

4. **Article Structure**

   Articles are stored as Markdown files in `src/articles/` and follow this structure:

   ```markdown
   ---
   title: "Your Article Title"
   slug: "your-article-slug"
   category: "personal-finance"
   image: "/article-images/your-image.jpg"
   publicationDate: "2024-06-01"
   featured: false
   ---

   # Your Article Title

   Article content goes here...
   ```

5. **Images**

   - Place article images in `public/article-images/`
   - Reference them in articles as `/article-images/your-image.jpg`

6. **Build Process**

   When you build the site, articles are automatically processed and included in the static output.

### Workflow

1. Create or update articles using the article manager (`npm run articles`)
2. Add images to the articles as needed
3. Generate the TypeScript file (`npm run generate-articles`)
4. Build and deploy the site
