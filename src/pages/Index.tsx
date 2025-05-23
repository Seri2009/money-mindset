import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import ArticleCard from '@/components/ArticleCard';
import { Separator } from '@/components/ui/separator';
import { getFeaturedArticles, getRecentArticles } from '@/data/generated-articles';
import { getCategoryLabel } from '@/types/article';

const Index = () => {
  const featuredArticles = getFeaturedArticles();
  const recentArticles = getRecentArticles(4);

  return (
    <MainLayout>
      {/* Featured section */}
      <section className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredArticles.length > 0 && (
            <div>
              <ArticleCard article={featuredArticles[0]} featured={true} />
            </div>
          )}
          
          <div>
            <h2 className="text-xl font-bold mb-4 pb-2 border-b">Latest Insights</h2>
            <div className="space-y-6">
              {recentArticles.slice(0, 3).map((article) => (
                <div key={article.id} className="pb-6">
                  <Link to={`/category/${article.category}`}>
                    <span className="text-sm font-medium hover:underline">
                      {getCategoryLabel(article.category)}
                    </span>
                  </Link>
                  <Link to={`/article/${article.slug}`}>
                    <h3 className="text-lg font-bold mt-1 hover:text-primary/80">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Separator className="my-12" />
      
      {/* More articles */}
      <section className="container mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold mb-6">More From MoneyMindset</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentArticles.slice(0, 6).map((article) => (
            <div key={article.id}>
              <Link to={`/article/${article.slug}`}>
                <div className="relative h-48 w-full mb-4">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="h-full w-full object-cover"
                  />
                </div>
              </Link>
              <Link to={`/category/${article.category}`}>
                <span className="text-sm font-medium hover:underline">
                  {getCategoryLabel(article.category)}
                </span>
              </Link>
              <Link to={`/article/${article.slug}`}>
                <h3 className="text-lg font-bold mt-2 hover:text-primary/80">
                  {article.title}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {article.excerpt}
              </p>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
