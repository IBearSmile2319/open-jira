import { Entry } from "@/interfaces";
import { createContext } from "react";

export interface EntriesContextProps {
    entries: Entry[];
    addNewEntry: (description: string) => void;
    updatedEntry: (entry: Entry) => void;
}

export const EntriesContext = createContext({} as EntriesContextProps);