"use client";

import { ReactNode } from "react";

export default function ScreenWrapperComponent({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="w-screen min-h-screen">
      <div className="w-max-full relative bg-cover bg-[url(/banner.jpg)] -mb-16">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-75"></div>

        <div className="relative container mx-auto">
          <div className="px-4 h-36 mx-auto" style={{ width: "500px" }}>
            <header className="">
              <h1 className="m-0 p-0 py-2 text-white font-bold tracking-widest">
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
