import { Entry } from "@/interfaces";
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import { useContext } from 'react';
import { UIContext } from '.';
interface Props {
  entry: Entry;
}
const EntryCard = ({ entry }: Props) => {

  const {
    startDragging,
    stopDragging,
  } = useContext(UIContext)

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // TODO: modificar el estado, para que sepa que se esta arrastrando
    e.dataTransfer.setData("text", entry._id);
    startDragging();
  };

  const onDragEnd = () => {
    // TODO: cancelar el estado de arrastrando
    stopDragging();
  }

  return (
    <Card
      sx={{
        marginBottom: 1,
      }}
      // Eventros de drag
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}>
          <Typography variant="body2" >
            {/* hace 1 minuto  */}
            {
              new Date(entry.createdAt).toLocaleString().split(",")[0]
            }
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default EntryCard;
