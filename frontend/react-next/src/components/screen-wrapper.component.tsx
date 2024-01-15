"use client";

import { PropsWithChildren } from "react";
import { ScreenHeaderComponent } from "./screen-header.component";

export default function ScreenWrapperComponent({
  children,
}: PropsWithChildren) {
  return (
    <div className="container mx-auto px-4">
      <ScreenHeaderComponent />

      <main className="py-8">{children}</main>

      <footer></footer>
    </div>
  );
}
