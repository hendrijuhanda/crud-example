import { Pagination } from "@nextui-org/react";
import { FC, useCallback } from "react";
import { usePaginationContext } from "./pagination.context";

export const PaginationComponent: FC = () => {
  const { pagination, setPagination } = usePaginationContext();

  const handleOnChange = useCallback(
    (current: number) => {
      setPagination((prev) => ({
        ...prev,
        currentPage: current,
      }));
    },
    [setPagination]
  );

  return (
    <Pagination
      page={pagination.currentPage}
      total={pagination.total}
      onChange={handleOnChange}
    />
  );
};
