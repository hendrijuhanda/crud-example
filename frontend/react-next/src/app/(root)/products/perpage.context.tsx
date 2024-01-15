import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

interface PerpageContextValue {
  perpage: string;
  setPerpage: Dispatch<SetStateAction<string>>;
}

export const PerpageContext = createContext<PerpageContextValue>(
  {} as PerpageContextValue
);

export const PerpageProvider = ({ children }: { children: ReactNode }) => {
  const [perpage, setPerpage] = useState("25");

  const contextValue = useMemo(
    () => ({ perpage, setPerpage }),
    [perpage, setPerpage]
  );

  return (
    <PerpageContext.Provider value={contextValue}>
      {children}
    </PerpageContext.Provider>
  );
};

export const usePerpageContext = () => useContext(PerpageContext);
