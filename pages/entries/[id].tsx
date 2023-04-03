import { Layout } from "@/components/layouts";
import { EntriesContext } from "@/context/entries";
import { getEntryById } from "@/database";
import { Entry, EntryStatus } from "@/interfaces";
import { dateFunctions } from "@/utils";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { ChangeEvent, useMemo, useState, useContext } from "react";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface IEntryProps {
  entry: Entry;
}

const EntryPage = ({ entry }: IEntryProps): JSX.Element => {
  const { updatedEntry, deleteEntry } = useContext(EntriesContext);
  const [inputValue, setInputValue] = useState<string>(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState<boolean>(false);

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

  const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length <= 0) return;

    updatedEntry({ ...entry, description: inputValue, status }, true);
  };

  const onDelete = () => {
    deleteEntry(entry._id);
  };

  return (
    <Layout title={inputValue.substring(0, 20) + "..."}>
      <Grid
        container
        justifyContent="center"
        sx={{
          marginTop: 2,
        }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title={`Entrada:`} subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`} />
            <CardContent>
              <TextField
                sx={{
                  marginTop: 2,
                  marginBottom: 1,
                }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                label="Nueva entrada"
                multiline
                value={inputValue}
                onChange={onTextFieldChanges}
                onBlur={() => setTouched(true)}
                error={isNotValid}
                helperText={isNotValid && "El campo no puede estar vacío"}
              />

              {/* RADIO */}
              <FormControl>
                <FormLabel>Estado</FormLabel>
                <RadioGroup row onChange={onStatusChanged} defaultValue={status} value={status}>
                  {validStatus.map((option) => (
                    <FormControlLabel key={option} value={option} control={<Radio />} label={capitalize(option)} />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button startIcon={<SaveOutlinedIcon />} variant="contained" fullWidth onClick={onSave} disabled={inputValue.length <= 0}>
                Saved
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "primary.main",
        }}
        onClick={onDelete}
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry: entry,
    },
  };
};

export default EntryPage;
