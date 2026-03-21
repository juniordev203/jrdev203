"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { ReactLenis } from "lenis/react";

const queryClient = new QueryClient({});

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <ReactLenis root>
          <ToastContainer position="top-right" autoClose={3000} />
          {children}
        </ReactLenis>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default RootProvider;
