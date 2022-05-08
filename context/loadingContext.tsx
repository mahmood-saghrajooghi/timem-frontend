import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type LoadingContextType = [boolean, Dispatch<SetStateAction<boolean>>];

const AppLoadingContext = createContext<LoadingContextType>([false, () => {}]);

export const AppLoadingContextProvider: React.FC = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <AppLoadingContext.Provider {...props} value={[loading, setLoading]} />
  );
};

export const useAppLoadingContext = () => {
  return useContext(AppLoadingContext);
};
