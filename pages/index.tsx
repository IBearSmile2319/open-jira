import { Layout } from "@/components/layouts";
import { EntryList, NewEntry } from "@/context/ui";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { NextPage } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const HomePage: NextPage = () => {
  return (
    <>
      <Layout title="Home - OpenJira">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: "calc(100vh - 100px)" }}>
              <CardHeader title="Pending" />

              {/* Agregar una nueva entrada */}
              <NewEntry/> 
              {/* Listado de las entradas */}
              <EntryList status="pending"/>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: "calc(100vh - 100px)" }}>
              <CardHeader title="In progress" />
              <EntryList status="In-progress"/>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: "calc(100vh - 100px)" }}>
              <CardHeader title="Complete" />
              <EntryList status="finished"/>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default HomePage;
