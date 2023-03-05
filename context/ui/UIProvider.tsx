import { useReducer } from "react";
import { UIContext, UIReducer } from "./";
export interface UIState {
    sideMenuOpen: boolean
}

export const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false
};

type Props = {
    children: React.ReactNode;
};

export const UIProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

    const openSideMenu = () => {
        dispatch({ type: "UI - Open Sidebar" });
    };

    const closeSideMenu = () => {
        dispatch({ type: "UI - Close Sidebar" });
    };

    return (
        <UIContext.Provider
            value={{
                ...state,
                // Methods
                openSideMenu,
                closeSideMenu
            }}
        >
            {children}
        </UIContext.Provider>
    );
};  
