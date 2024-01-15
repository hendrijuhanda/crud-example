"use client";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { LayoutProvider } from "./layout.provider";

const queryClient = new QueryClient();

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutProvider>
        <NextUIProvider>
          {children}
          <Toaster closeButton />
        </NextUIProvider>
      </LayoutProvider>
    </QueryClientProvider>
  );
}
