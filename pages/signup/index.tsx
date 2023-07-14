import { useContext } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";

import AuthContext from "../../context/AuthContext";
import GoogleSocialAuth from "../../components/auth/GoogleSocialAuth";

//material-ui colors
import { yellow } from "@mui/material/colors";
import Div100vh from "react-div-100vh";
import { Card } from "@mui/material";

const theme = createTheme();

const Signup = () => {
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = String(data.get("email"));
    const firstName = String(data.get("firstName"));
    const lastName = String(data.get("lastName"));
    const password = data.get("password");
    const password2 = data.get("password2");
    username.length > 0 &&
      registerUser(username, firstName, lastName, password, password2);
  };

  return (
    <Div100vh className="bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 flex items-center justify-center">
      <span className=" whitespace-nowrap text-blue-600 absolute top-2 left-2">
        <svg
          aria-hidden="true"
          viewBox="0 0 418 42"
          className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"
          preserveAspectRatio="none"
        >
          <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
        </svg>
        <span className="font-geomanist relative text-lg text-white">
          Another AI
        </span>
      </span>
      <Card
        className={`p-5`}
        style={{
          boxShadow: "0 0 100px 0 rgba(0,0,0,0.5)",
        }}
      >
        <Box
          sx={{
            my: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Box
              sx={{
                display: "space-between",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                margin="normal"
                required
                name="firstName"
                label="Nombre"
                type="text"
                id="firstName"
                sx={{ marginRight: 1 }}
              />
              <TextField
                margin="normal"
                required
                name="lastName"
                label="Apellido"
                type="text"
                id="lastName"
                sx={{ marginLeft: 1 }}
              />
            </Box>
            <Stack>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Confirmar contraseña"
                type="password"
                id="password2"
                autoComplete="current-password"
              />
            </Stack>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#3f51b5", borderRadius: 0 }}
            >
              Registrarse
            </Button>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Grid container>
                <Grid item xs>
                  <Link href="/login">¿Ya tienes cuenta?</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <GoogleSocialAuth className={`mt-3`} prompt="Registrarme con Google" />
        </Box>
      </Card>
    </Div100vh>
  );
};

export default Signup;
