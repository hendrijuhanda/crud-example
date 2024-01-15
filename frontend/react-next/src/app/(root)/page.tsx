"use client";

import ScreenWrapperComponent from "@/components/screen-wrapper.component";
import { ListComponent } from "./products/list.component";
import { ProductProvider } from "./products/product.provider";

export default function Page() {
  return (
    <div>
      <ScreenWrapperComponent>
        <ProductProvider>
          <ListComponent />
        </ProductProvider>
      </ScreenWrapperComponent>
    </div>
  );
}
