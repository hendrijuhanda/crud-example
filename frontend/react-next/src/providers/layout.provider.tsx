import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

interface Breadcrumb {
  link: string | undefined;
  label: string;
}

interface LayoutContextValue {
  pageTitle: string;
  setPageTitle: Dispatch<SetStateAction<string>>;
  breadcrumbs: Breadcrumb[];
  setBreadcrumbs: Dispatch<SetStateAction<Breadcrumb[]>>;
}

const LayoutContext = createContext<LayoutContextValue>(
  {} as LayoutContextValue
);

export const LayoutProvider: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const [pageTitle, setPageTitle] = useState<string>("");
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  const contextValue = useMemo(
    () => ({ pageTitle, setPageTitle, breadcrumbs, setBreadcrumbs }),
    [pageTitle, setPageTitle, breadcrumbs, setBreadcrumbs]
  );

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => useContext(LayoutContext);
