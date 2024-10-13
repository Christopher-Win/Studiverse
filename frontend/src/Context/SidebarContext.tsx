import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context state
interface SidebarContextProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

// Create the context with an empty default value
const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

// Create a provider component
export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider value={{ sidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook to use the Sidebar context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};