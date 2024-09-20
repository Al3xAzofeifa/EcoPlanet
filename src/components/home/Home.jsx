import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LogoImage from "../../assets/images/Logo.png";
export function Home() {

  return (
    <Container
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textalign: "center",
      }}
      maxWidth="sm"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <img
          src={LogoImage}
          alt="Logo"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <Typography component="h1" variant="h2" color="text.primary" gutterBottom>
        EcoPlanet
      </Typography>

      <Typography variant="h5" color="text.secondary" paragraph>
        ¡Recicla el pasado, crea un futuro brillante!
      </Typography>
    </Container>
  );
}
