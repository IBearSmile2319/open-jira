import { Box } from "@mui/material";
import Head from "next/head";
import React from "react";
import { Navbar, Sidebar } from "../ui";
interface Props {
  title?: string;
  children?: React.ReactNode;
}
const Layout = ({ title = "OpenJira", children }: Props) => {
  return (
    <Box
      sx={{
        flexFlow: 1,
      }}
    >
      <Head>
        <title>{title}</title>
      </Head>
      {/* NAVBAR */}
      <Navbar />
      {/* SIDEBAR */}
      <Sidebar />
      <Box
        sx={{
          padding: "10px 20px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
