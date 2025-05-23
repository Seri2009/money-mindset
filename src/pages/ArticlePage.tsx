import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import ArticleCard from '@/components/ArticleCard';
import { Separator } from '@/components/ui/separator';
import { getArticleBySlug, getRecentArticles } from '@/data/generated-articles';
import { getCategoryLabel } from '@/types/article';
import { NotFound } from './NotFound';
import ReactMarkdown from 'react-markdown';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const relatedArticles = getRecentArticles(3);
  
  if (!article) {
    return <NotFound />;
  }
  
  const formattedDate = new Date(article.publicationDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  const categoryName = getCategoryLabel(article.category);
  
  return (
    <MainLayout>
      <article className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link to={`/category/${article.category}`}>
            <span className="text-sm font-medium hover:underline">
              {categoryName}
            </span>
          </Link>
          
          <h1 className="text-4xl font-bold mt-2 mb-4">{article.title}</h1>
          
          <p className="text-xl text-muted-foreground mb-6">{article.excerpt}</p>
          
          <div className="text-sm text-muted-foreground mb-8">
            Published on {formattedDate}
          </div>
          
          {article.image && (
            <div className="mb-8">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto rounded-md"
              />
            </div>
          )}
          
          <div className="prose prose-lg max-w-none article-content">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        </div>
        
        <Separator className="my-12" />
        
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">More Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.slice(0, 3).map((relatedArticle) => (
              <div key={relatedArticle.id}>
                <Link to={`/article/${relatedArticle.slug}`}>
                  <div className="relative h-48 w-full mb-4">
                    <img 
                      src={relatedArticle.image} 
                      alt={relatedArticle.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Link>
                <Link to={`/category/${relatedArticle.category}`}>
                  <span className="text-sm font-medium hover:underline">
                    {getCategoryLabel(relatedArticle.category)}
                  </span>
                </Link>
                <Link to={`/article/${relatedArticle.slug}`}>
                  <h3 className="text-lg font-bold mt-2 hover:text-primary/80">
                    {relatedArticle.title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </article>
    </MainLayout>
  );
};

export default ArticlePage;
