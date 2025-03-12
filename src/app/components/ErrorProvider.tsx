"use client";

import { createContext, useContext, ReactNode } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ErrorContextType {
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const showError = (message: string) => {
    toast.error(message, { position: "top-right" });
  };

  const showSuccess = (message: string) => {
    toast.success(message, { position: "top-right" });
  };

  return (
    <ErrorContext.Provider value={{ showError, showSuccess }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};
