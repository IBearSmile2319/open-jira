import { Entry } from "@/interfaces";
import { createContext } from "react";

export interface EntriesContextProps {
    entries: Entry[];
    addNewEntry: (description: string) => void;
    updatedEntry: (entry: Entry, showSnackbar?: boolean) => void;
    deleteEntry: (id: string) => void;
}

export const EntriesContext = createContext({} as EntriesContextProps);