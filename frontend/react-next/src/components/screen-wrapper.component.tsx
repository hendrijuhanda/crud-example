"use client";

import { ReactNode } from "react";

export default function ScreenWrapperComponent({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="relative min-h-screen">
      <div className="absolute top-0 left-0 w-full h-36 bg-cover bg-[url(/banner.jpg)]">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-75"></div>
      </div>

      <div>
        <div className="relative container mx-auto">
          <header
            className="px-4 h-16 max-w-full mx-auto"
            style={{ width: "500px" }}
          >
            <h1 className="m-0 p-0 py-2 text-white font-bold tracking-widest">
              ToDo
            </h1>
          </header>
        </div>

        <div className="relative container mx-auto">
          <main className="px-4 max-w-full mx-auto" style={{ width: "500px" }}>
            {children}
          </main>
        </div>

        <div className="relative container mx-auto">
          <footer
            className="px-4 text-center text-small text-default-400 pt-8 pb-2 max-w-full mx-auto"
            style={{ width: "500px" }}
          >
            Built with <a href="#">NextJS</a>
          </footer>
        </div>
      </div>
    </section>
  );
}
