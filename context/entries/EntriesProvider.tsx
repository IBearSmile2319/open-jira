import { Entry } from "@/interfaces";
import { useReducer } from "react";
import { EntriesContext, entriesReducer } from "./";
import { v4 as uuidv4 } from "uuid";
export interface EntriesState {
    entries: Entry[];
}

export const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: "pendiente Description 1",
            status: "pending",
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: "in progress Description 2",
            status: "In-progress",
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: "finished Description 3",
            status: "finished",
            createdAt: Date.now() - 1000000,
        },
        {
            _id: uuidv4(),
            description: "Description 4",
            status: "pending",
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: "Description 5",
            status: "finished",
            createdAt: Date.now() - 10000000,
        },

    ],
};

type Props = {
    children: React.ReactNode;
};

export const EntriesProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
    const addNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            status: "pending",
            createdAt: Date.now(),
        };
        dispatch({ type: "[Entry] - Add-Entry", payload: newEntry });
    }

    const updatedEntry = (entry: Entry) => {
        dispatch({ type: "[Entry] - Updated-Entry", payload: entry });
    }

    return (
        <EntriesContext.Provider
            value={{
                ...state,
                addNewEntry,
                updatedEntry
            }}
        >
            {children}
        </EntriesContext.Provider>
    );
};