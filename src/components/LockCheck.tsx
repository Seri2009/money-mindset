import { useQuery } from "@tanstack/react-query";
import { Suspense, lazy, useEffect, useState } from "react";

const NotFound = lazy(() => import("@/pages/NotFound"));

const checkLockStatus = async () => {
  try {
    const response = await fetch("https://v0-lock-api-requirements.vercel.app/api/lock/status");
    if (!response.ok) {
      throw new Error("Lock check failed");
    }
    const data = await response.json();
    console.log("Lock status response:", data);
    return data;
  } catch (error) {
    console.error("Lock check error:", error);
    throw error;
  }
};

interface LockCheckProps {
  children: React.ReactNode;
}

export function LockCheck({ children }: LockCheckProps) {
  const [shouldBlock, setShouldBlock] = useState(false);
  const { data, isError, isSuccess } = useQuery({
    queryKey: ["lockStatus"],
    queryFn: checkLockStatus,
    retry: 1,
    retryDelay: 1000,
    staleTime: Infinity,
  });

  useEffect(() => {
    console.log("Effect running with:", { data, isError, isSuccess, shouldBlock });
    
    if (isSuccess && data?.unlocked === true) {
      // Site is explicitly unlocked
      setShouldBlock(false);
    } else if (isError || (isSuccess && data?.unlocked === false)) {
      // Either error occurred or site is explicitly locked
      const timer = setTimeout(() => {
        console.log("Setting shouldBlock to true");
        setShouldBlock(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [data, isError, isSuccess]);

  if (shouldBlock) {
    console.log("Rendering NotFound page");
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound />
      </Suspense>
    );
  }

  console.log("Rendering children");
  return <>{children}</>;
}