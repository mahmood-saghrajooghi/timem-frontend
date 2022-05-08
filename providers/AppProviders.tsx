import { CurrentSessionContextProvider } from "context/currentSessionContext";
import { TopicContextProvider } from "context/topic/context";
import React from "react";
import { AppLoadingContextProvider } from "../context/loadingContext";

export const AppProviders: React.FC = ({ children }) => {
  return (
    <AppLoadingContextProvider>
        <TopicContextProvider>{children}</TopicContextProvider>
    </AppLoadingContextProvider>
  );
};
