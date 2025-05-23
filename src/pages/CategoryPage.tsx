import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import ArticleCard from '@/components/ArticleCard';
import { Separator } from '@/components/ui/separator';
import { getArticlesByCategory } from '@/data/generated-articles';
import { Category, getCategoryLabel } from '@/types/article';

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: Category }>();
  const articles = getArticlesByCategory(categorySlug);
  const categoryName = getCategoryLabel(categorySlug);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>
        
        {articles.length > 0 ? (
          <div className="space-y-8">
            {articles[0] && (
              <ArticleCard article={articles[0]} featured={true} />
            )}
            
            <Separator className="my-12" />
            
            <div className="grid grid-cols-1 gap-8">
              {articles.slice(1).map((article) => (
                <div key={article.id}>
                  <ArticleCard article={article} />
                  <Separator className="mt-8" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">No articles found in this category.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryPage;
