import React from "react";
import { LayoutProps } from "./layout.props";
import { Box } from "@mui/material";
import { Footer, Navbar } from "../components";

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Navbar />
      <Box minHeight={"90vh"}>{children}</Box>
      <Footer />
    </>
  );
};

export default Layout;
