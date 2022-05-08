import React, { useCallback, useEffect, useState } from "react";
import { useContext } from "react";
import { useRef } from "react";

const DevtoolsContext = React.createContext<{
  jsonSrc: Record<string, any>;
  setJsonSrc: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  updateData: React.MutableRefObject<(v: any) => void>;
  isExpanded: boolean;
  toggleExpanded: () => void;
}>({} as any);

function watchKeyBind(toggle: () => void) {
  return function keyBind(e: KeyboardEvent) {
    if ((e.metaKey || e.altKey) && e.key === "j") {
      toggle();
    }
  };
}

export const DevtoolsProvider: React.FC = ({ children }) => {
  const [jsonSrc, setJsonSrc] = useState<Record<string, any>>({});
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const updateData = useRef<(v: any) => void>(() => {});

  const toggleExpanded = useCallback(() => {
    setIsExpanded((c) => !c);
  }, []);
  useEffect(() => {
    window.addEventListener("keydown", watchKeyBind(toggleExpanded));
    return () => {
      window.removeEventListener("keydown", watchKeyBind(toggleExpanded));
    };
  }, []);
  return (
    <DevtoolsContext.Provider
      value={{ jsonSrc, setJsonSrc, updateData, toggleExpanded, isExpanded }}
    >
      {children}
    </DevtoolsContext.Provider>
  );
};

export const useDevtoolsContext = () => {
  return useContext(DevtoolsContext);
};
