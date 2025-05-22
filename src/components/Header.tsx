
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { getRecentArticles } from '@/data/articles';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const articles = getRecentArticles(20);

  const handleSearch = (articleSlug: string) => {
    setSearchOpen(false);
    navigate(`/article/${articleSlug}`);
  };

  // Handle keyboard shortcut for search
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`border-b border-border sticky top-0 bg-background z-50 transition-all duration-300 ${
        scrolled ? 'bg-opacity-90 py-0' : 'bg-opacity-100'
      }`}
    >
      <div className={`container mx-auto px-4 flex items-center justify-between ${
        scrolled ? 'h-12' : 'h-16'
      } transition-all duration-300`}>
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <span className="sr-only">Menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tighter">MoneyMindset</h2>
              </div>
              <nav className="flex flex-col gap-4">
                <Link to="/category/personal-finance" className="text-sm font-medium hover:text-primary/80">Personal Finance</Link>
                <Link to="/category/investing-wealth" className="text-sm font-medium hover:text-primary/80">Investing & Wealth</Link>
                <Link to="/category/entrepreneurship-business" className="text-sm font-medium hover:text-primary/80">Entrepreneurship</Link>
                <Link to="/category/financial-education-career" className="text-sm font-medium hover:text-primary/80">Career Planning</Link>
                <Link to="/category/financial-concepts-news" className="text-sm font-medium hover:text-primary/80">Financial News</Link>
                <Link to="/category/global-economics-trends" className="text-sm font-medium hover:text-primary/80">Global Economics</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className={`font-bold tracking-tighter transition-all duration-300 ${
            scrolled ? 'text-xl' : 'text-2xl'
          }`}>MoneyMindset</h1>
        </Link>
        
        {/* Search button */}
        <div>
          <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
      
      {/* Date display */}
      <div className={`container mx-auto px-4 py-2 text-sm text-muted-foreground transition-all duration-300 ${
        scrolled ? 'hidden' : 'block'
      }`}>
        {formattedDate}
      </div>
      
      {/* Category navigation - only visible on desktop */}
      <nav className={`hidden md:flex container mx-auto px-4 justify-center transition-all duration-300 ${
        scrolled ? 'py-1' : 'py-2'
      }`}>
        <ul className={`flex flex-nowrap transition-all duration-300 ${
          scrolled ? 'pb-1' : 'pb-3'
        }`}>
          <li className="px-4"><Link to="/category/personal-finance" className="text-sm font-medium whitespace-nowrap hover:text-primary/80">Personal Finance</Link></li>
          <li className="px-4"><Link to="/category/investing-wealth" className="text-sm font-medium whitespace-nowrap hover:text-primary/80">Investing & Wealth</Link></li>
          <li className="px-4"><Link to="/category/entrepreneurship-business" className="text-sm font-medium whitespace-nowrap hover:text-primary/80">Entrepreneurship</Link></li>
          <li className="px-4"><Link to="/category/financial-education-career" className="text-sm font-medium whitespace-nowrap hover:text-primary/80">Career Planning</Link></li>
          <li className="px-4"><Link to="/category/financial-concepts-news" className="text-sm font-medium whitespace-nowrap hover:text-primary/80">Financial News</Link></li>
          <li className="px-4"><Link to="/category/global-economics-trends" className="text-sm font-medium whitespace-nowrap hover:text-primary/80">Global Economics</Link></li>
        </ul>
      </nav>

      {/* Search Dialog */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Search articles..." />
        <CommandList>
          <CommandEmpty>No articles found.</CommandEmpty>
          <CommandGroup heading="Articles">
            {articles.map((article) => (
              <CommandItem
                key={article.id}
                onSelect={() => handleSearch(article.slug)}
              >
                {article.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default Header;
