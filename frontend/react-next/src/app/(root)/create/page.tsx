"use client";

import { useLayoutContext } from "@/providers/layout.provider";
import { FormComponent } from "./_components/form.component";
import { useEffect } from "react";

export default function Page() {
  const { setPageTitle, setBreadcrumbs } = useLayoutContext();

  useEffect(() => {
    setPageTitle("Add Product");

    setBreadcrumbs([
      {
        link: "/",
        label: "Main",
      },
      {
        link: undefined,
        label: "Create",
      },
    ]);
  }, [setPageTitle, setBreadcrumbs]);

  return <FormComponent />;
}
