// eslint-disable-next-line no-unused-vars
import { React } from "react";
import Header from "./Header";
import { Footer } from "./Footer";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "../../themes/theme";
import PropTypes from "prop-types";
import { Toaster } from "react-hot-toast";

Layout.propTypes = { children: PropTypes.node.isRequired };

export function Layout({ children }) {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <Header />
      <Container
        maxWidth="xl"
        style={{ paddingTop: "1rem", paddingBottom: "4.5rem" }}
      >
        <Toaster position="top-center" />
        {children}
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
