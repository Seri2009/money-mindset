
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Article, getCategoryLabel } from '@/types/article';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

const ArticleCard = ({ article, featured = false }: ArticleCardProps) => {
  const formattedDate = new Date(article.publicationDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  if (featured) {
    return (
      <Card className="border-0 shadow-none overflow-hidden">
        <Link to={`/article/${article.slug}`}>
          <div className="relative h-64 md:h-96 w-full">
            <img 
              src={article.image} 
              alt={article.title} 
              className="h-full w-full object-cover"
            />
          </div>
        </Link>
        <CardContent className="px-0 pt-4">
          <Link to={`/category/${article.category}`}>
            <span className="text-sm font-medium hover:underline">
              {getCategoryLabel(article.category)}
            </span>
          </Link>
          <Link to={`/article/${article.slug}`}>
            <h2 className="text-2xl md:text-3xl font-bold mt-2 hover:text-primary/80">
              {article.title}
            </h2>
          </Link>
          <p className="text-muted-foreground mt-3">{article.excerpt}</p>
        </CardContent>
        <CardFooter className="px-0 text-sm text-muted-foreground">
          {formattedDate}
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-none overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to={`/article/${article.slug}`} className="md:col-span-1">
          <div className="relative h-48 w-full">
            <img 
              src={article.image} 
              alt={article.title} 
              className="h-full w-full object-cover"
            />
          </div>
        </Link>
        <div className="md:col-span-2">
          <CardContent className="px-0 pt-4 md:pt-0">
            <Link to={`/category/${article.category}`}>
              <span className="text-sm font-medium hover:underline">
                {getCategoryLabel(article.category)}
              </span>
            </Link>
            <Link to={`/article/${article.slug}`}>
              <h2 className="text-xl font-bold mt-2 hover:text-primary/80">
                {article.title}
              </h2>
            </Link>
            <p className="text-muted-foreground mt-2 text-sm line-clamp-2">{article.excerpt}</p>
          </CardContent>
          <CardFooter className="px-0 text-sm text-muted-foreground">
            {formattedDate}
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default ArticleCard;
