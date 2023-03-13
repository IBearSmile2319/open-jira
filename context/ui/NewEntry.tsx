import { Button, Box, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { EntriesContext } from "../entries";
import { useContext } from "react";
import { UIContext } from '.';
const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
  // const [isAdding, setIsAddingEntry] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [touch, setTouch] = useState(false);

  const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setTouch(true);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setInputValue("");
    setTouch(false);
  };
  return (
    <>
      <Box
        sx={{
          marginBottom: 2,
          paddingX: 1,
        }}
      >
        {isAddingEntry ? (
          <>
            <TextField
              fullWidth
              sx={{
                marginTop: 2,
                marginBottom: 1,
              }}
              autoFocus
              multiline
              label="Nueva entrada"
              helperText={inputValue.length <= 0 && touch && "El campo no puede estar vacío"}
              error={inputValue.length <= 0 && touch}
              placeholder="Nueva entrada"
              value={inputValue}
              onChange={onTextFieldChanges}
              onBlur={() => setTouch(true)}
            />
            <Box display="flex" justifyContent="space-between">
              <Button
                variant="text"
                onClick={() => {
                  setIsAddingEntry(false);
                  setInputValue("");
                  setTouch(false);
                }}
              >
                Cancelar
              </Button>

              <Button variant="outlined" color="secondary" endIcon={<SaveOutlinedIcon />} onClick={onSave}>
                Guardar
              </Button>
            </Box>
          </>
        ) : (
          <Button startIcon={<AddCircleOutlineIcon />} fullWidth variant="outlined" onClick={() => setIsAddingEntry(true)}>
            Agregar tarea
          </Button>
        )}
      </Box>
    </>
  );
};

export default NewEntry;
