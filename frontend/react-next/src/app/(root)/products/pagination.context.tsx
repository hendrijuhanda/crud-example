import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

interface Pagination {
  currentPage: number;
  total: number;
}

interface PaginationContextValue {
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
}

export const PaginationContext = createContext<PaginationContextValue>(
  {} as PaginationContextValue
);

export const PaginationProvider = ({ children }: { children: ReactNode }) => {
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    total: 10,
  });

  const contextValue = useMemo(
    () => ({ pagination, setPagination }),
    [pagination, setPagination]
  );

  return (
    <PaginationContext.Provider value={contextValue}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePaginationContext = () => useContext(PaginationContext);
