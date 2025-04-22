/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type CreateContextProps = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<any>>;
  brand: string;
  setBrand: Dispatch<SetStateAction<any>>;
  range: null;
  setRange: Dispatch<SetStateAction<any>>;
};

const GlobalContextApi = createContext<CreateContextProps>({
  searchValue: "",
  setSearchValue: () => {},
  brand: "",
  setBrand: () => {},
  range: null,
  setRange: () => {},
});

export const useGlobalContextApi = () => useContext(GlobalContextApi);
const GlobalContext = ({ children }: { children: React.ReactNode }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [range, setRange] = useState(null);
  return (
    <GlobalContextApi.Provider
      value={{
        searchValue,
        setSearchValue,
        brand,
        setBrand,
        range,
        setRange,
      }}
    >
      {children}
    </GlobalContextApi.Provider>
  );
};

export default GlobalContext;
