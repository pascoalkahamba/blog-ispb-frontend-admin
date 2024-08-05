"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Aos from "aos";
import AOS from "aos";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const queryClient = new QueryClient();

  useEffect(() => {
    AOS.init();

    () => {
      Aos.refresh();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
      <ToastContainer />
    </QueryClientProvider>
  );
}
