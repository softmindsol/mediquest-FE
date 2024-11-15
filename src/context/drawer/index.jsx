import { createContext, useContext, useState } from "react";

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [drawerState, setDrawerState] = useState({
    isOpen: false,
    content: null,
  });

  const openDrawer = (content, title) => {
    setDrawerState({ isOpen: true, content, title });
  };

  const closeDrawer = () => {
    setDrawerState({ isOpen: false, content: null, title: null });
  };

  return (
    <DrawerContext.Provider value={{ ...drawerState, openDrawer, closeDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => useContext(DrawerContext);
