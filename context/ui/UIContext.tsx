import { createContext } from "react";

export interface UIContextProps {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
    // Methods
    openSideMenu: () => void;
    closeSideMenu: () => void;
    setIsAddingEntry: (isAdding: boolean) => void;
    
    startDragging: () => void;
    stopDragging: () => void;
}

export const UIContext = createContext({} as UIContextProps);