
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';

export const NotFound = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold">404</h1>
        <p className="text-xl md:text-2xl my-6 text-center">The page you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    </MainLayout>
  );
};

export default NotFound;
