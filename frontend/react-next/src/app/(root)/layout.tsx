"use client";

import { ReactNode } from "react";
import AppProvider from "@/providers/app.provider";
import ScreenWrapperComponent from "@/components/screen-wrapper.component";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <ScreenWrapperComponent>{children}</ScreenWrapperComponent>
    </AppProvider>
  );
}
