"use client";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ProtectedRoute>{children}</ProtectedRoute>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
