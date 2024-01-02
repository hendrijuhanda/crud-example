"use client";

import { ReactNode } from "react";
import AppProvider from "@/providers/app.provider";

export default function Layout({ children }: { children: ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}
