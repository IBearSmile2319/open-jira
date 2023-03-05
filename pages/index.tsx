import { Layout } from "@/components/layouts";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const HomePage: NextPage = () => {
  return (
    <>
      <Layout title="Hola mundo">
        <Typography variant="h1" color="primary">
          Hello World
        </Typography>
      </Layout>
    </>
  );
};

export default HomePage;
