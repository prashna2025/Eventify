// src/context/ToastContext.jsx
import { createContext, useState, useContext } from 'react';
import Toast from '../components/ui/Toast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);