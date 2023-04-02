import { Entry } from "@/interfaces";
import { EntriesState } from ".";

type EntriesActionType = { type: "[Entry] - Add-Entry"; payload: Entry } | { type: "[Entry] - Updated-Entry"; payload: Entry } | 
{ type: "[Entry] - Refresh-Entries"; payload: Entry[] };

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
  switch (action.type) {
    case "[Entry] - Add-Entry":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case "[Entry] - Updated-Entry":
      return {
        ...state,
        entries: state.entries.map((entry) => (entry._id === action.payload._id ? action.payload : entry)),
      };
    case "[Entry] - Refresh-Entries":
      return {
        ...state,
        entries: [...action.payload],
      };
    default:
      return state;
  }
};
