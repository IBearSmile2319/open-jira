import { Entry } from "@/interfaces";
import { useEffect, useReducer } from "react";
import { EntriesContext, entriesReducer } from "./";
import { v4 as uuidv4 } from "uuid";
import { entriesApi } from "@/apis";
export interface EntriesState {
    entries: Entry[];
}

export const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
};

type Props = {
    children: React.ReactNode;
};

export const EntriesProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
    const addNewEntry = async (description: string) => {
        // const newEntry: Entry = {
        //     _id: uuidv4(),
        //     description,
        //     status: "pending",
        //     createdAt: Date.now(),
        // };
        await entriesApi.post<Entry>('/entries', {description}).then(({data}) => {
        dispatch({ type: "[Entry] - Add-Entry", payload: data });
        })
    }

    const updatedEntry = async (entry: Entry) => {
        await entriesApi.put<Entry>(`/entries/${entry._id}`, entry).then(({data}) => {
        dispatch({ type: "[Entry] - Updated-Entry", payload: data });
        })
    }

    const refreshEntries = async () => {
        await entriesApi.get<Entry[]>('/entries').then(({data}) => {
            dispatch({ type: "[Entry] - Refresh-Entries", payload: data });
        })
    }

    useEffect(()=>{
        refreshEntries()
    },[])

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