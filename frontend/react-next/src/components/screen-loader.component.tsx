"use client";

import { Spinner } from "@nextui-org/react";

export default function ScreenLoader() {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    </div>
  );
}
