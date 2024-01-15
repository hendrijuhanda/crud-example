"use client";

import { ReactNode } from "react";
import { ScreenHeaderComponent } from "./screen-header.component";

export default function ScreenWrapperComponent({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="container mx-auto px-4">
      <header className="mb-8">
        <ScreenHeaderComponent />
      </header>

      <main>{children}</main>

      <footer></footer>
    </div>
  );
}
