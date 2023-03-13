import { useReducer } from "react";
import { UIContext, UIReducer } from "./";
export interface UIState {
    sideMenuOpen: boolean
    isAddingEntry: boolean
    isDragging: boolean
}

export const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
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
    const setIsAddingEntry = (isAdding: boolean) => {
        dispatch({ type: "UI - Set isAddingEntry", payload: isAdding });
    };

    const startDragging = () => {
        dispatch({ type: "UI - Start Dragging" });
    };

    const stopDragging = () => {
        dispatch({ type: "UI - End Dragging" });
    };

    return (
        <UIContext.Provider
            value={{
                ...state,
                // Methods
                openSideMenu,
                closeSideMenu,
                setIsAddingEntry,
                
                startDragging,
                stopDragging,
            }}
        >
            {children}
        </UIContext.Provider>
    );
};  
