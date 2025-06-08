import { useEffect, useState } from 'react';

export function useInfiniteScroll<T>(items: T[], initialCount: number, increment: number) {
  const [displayCount, setDisplayCount] = useState(initialCount);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight || document.documentElement.clientHeight;

      if (scrollHeight - scrollTop <= clientHeight + 100) {
        const newCount = displayCount + increment;
        setDisplayCount(newCount);
        setHasMore(newCount < items.length);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayCount, hasMore, items.length, increment]);

  return {
    displayItems: items.slice(0, displayCount),
    hasMore
  };
}