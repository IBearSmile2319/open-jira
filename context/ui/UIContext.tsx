import { createContext } from "react";

export interface UIContextProps {
    sideMenuOpen: boolean;

    // Methods
    openSideMenu: () => void;
    closeSideMenu: () => void;
}

export const UIContext = createContext({} as UIContextProps);