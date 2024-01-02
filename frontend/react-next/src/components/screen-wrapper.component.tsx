"use client";

import { ReactNode } from "react";

export default function ScreenWrapperComponent({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="w-screen min-h-screen">
      <div
        className="relative bg-cover -mb-16"
        style={{ backgroundImage: "url(/banner.jpg)" }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-75">
          &nbsp;
        </div>

        <div className="relative container mx-auto">
          <div className="mx-auto px-4 max-w-full" style={{ width: "500px" }}>
            <header className="h-36">
              <h1 className="py-2 text-white font-bold tracking-widest">
                ToDo
              </h1>
            </header>
          </div>
        </div>
      </div>

      <div className="relative container mx-auto">
        <main className="mx-auto px-4 max-w-full" style={{ width: "500px" }}>
          {children}
        </main>
      </div>
    </section>
  );
}
