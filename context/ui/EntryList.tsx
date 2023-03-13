import { EntryStatus } from "@/interfaces";
import { List, Paper } from "@mui/material";
import EntryCard from "./EntryCard";
import { DragEvent, useContext, useMemo } from "react";
import { EntriesContext } from "../entries";
import { UIContext } from ".";
import styles from "./EntryList.module.css";
interface Props {
  status: EntryStatus;
}

const EntryList = ({ status }: Props) => {
  const { entries, updatedEntry } = useContext(EntriesContext);
  const { isDragging, stopDragging } = useContext(UIContext);
  const entriesByStatus = useMemo(() => entries.filter((entry) => entry.status === status), [entries]);
  const allosDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("text");
    const entry = entries.find((entry) => entry._id === id)!;
    // change status
    entry.status = status;

    updatedEntry(entry);
    stopDragging();
  };

  return (
    <div onDrop={onDropEntry} onDragOver={allosDrop} className={isDragging ? styles.dragging : ""}>
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          overflowY: "scroll",
          backgroundColor: "transparent",
          padding: "3px 5px",
          // cambiar el scroll

          "&::-webkit-scrollbar": {
            width: "0.4em",
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(0,0,0,.2)",
          },
          "&::-webkit-scrollbar-thumb:active": {
            backgroundColor: "rgba(0,0,0,.3)",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-track:hover": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-track:active": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-corner": {
            backgroundColor: "transparent",
          },
        }}
      >
        <List sx={{ opacity: isDragging ? 0.5 : 1, transition: "all .3s ease-in-out" }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default EntryList;
