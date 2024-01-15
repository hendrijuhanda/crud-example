"use client";

import { FC, useState } from "react";

export const ScreenHeaderComponent: FC = () => {
  const [title, setTitle] = useState<string>("Merchandise");

  return (
    <div className="py-4 ">
      <h1 className="font-bold uppercase">{title}</h1>
    </div>
  );
};
