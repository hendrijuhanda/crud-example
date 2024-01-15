import { FC, PropsWithChildren } from "react";
import { PerpageProvider } from "./perpage.context";
import { PaginationProvider } from "./pagination.context";

export const ProductProvider: FC<PropsWithChildren> = (
  props: PropsWithChildren
) => {
  return (
    <PerpageProvider>
      <PaginationProvider>{props.children}</PaginationProvider>
    </PerpageProvider>
  );
};
