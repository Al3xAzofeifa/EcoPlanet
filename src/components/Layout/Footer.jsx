import { Box, Container, Grid, Typography } from "@mui/material";
export function Footer() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "4.5rem",
        backgroundColor: "green",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="white" variant="subtitle1">
            © 2023 EcoPlanet. Todos los derechos reservados.
            </Typography>
          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}


