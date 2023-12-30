"use client";

import { Button } from "@nextui-org/react";
import { RiAddLine } from "@remixicon/react";

export default function Page() {
  return (
    <div>
      <Button color="primary" startContent={<RiAddLine />}>
        Click me
      </Button>
    </div>
  );
}
