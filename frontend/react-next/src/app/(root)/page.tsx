"use client";

import { useEffect } from "react";
import { ListComponent } from "./_components/list.component";
import { ProductProvider } from "./_components/product.provider";
import { useLayoutContext } from "@/providers/layout.provider";

export default function Page() {
  const { setPageTitle, setBreadcrumbs } = useLayoutContext();

  useEffect(() => {
    setPageTitle("Main");
    setBreadcrumbs(() => [{ label: "Main", link: undefined }]);
  }, []);

  return (
    <div>
      <ProductProvider>
        <ListComponent />
      </ProductProvider>
    </div>
  );
}
