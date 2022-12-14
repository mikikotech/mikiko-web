import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { OutlinedInput } from "@mui/material";

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © Mikiko Technology "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const RegisterPage = () => {
  const [showPass, showPassSet] = useState({
    pass1: false,
    pass2: false,
  });

  const [pass, passSet] = useState({
    email: "",
    pass1: "",
    pass2: "",
  });

  const auth = getAuth();

  const handleChange = (prop) => (event) => {
    // console.log(event.target.value);
    if (prop == "pass1") {
      passSet((oldVal) => {
        return {
          pass1: event.target.value,
          pass2: oldVal.pass2,
        };
      });
    } else {
      passSet((oldVal) => {
        return {
          pass1: oldVal.pass1,
          pass2: event.target.value,
        };
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log("data", data.get("password"));
    console.log("data", data.get("repeatpassword"));

    // const email = data.get("email");
    // const password = data.get("password");

    // signInWithEmailAndPassword(auth, email, password).then((res) => {
    //   console.log(res);
    // });
  };

  const handleClickShowPassword = (typePass) => {
    if (typePass == "pass1") {
      showPassSet((oldVal) => {
        return {
          pass1: !oldVal.pass1,
          pass2: oldVal.pass2,
        };
      });
    } else {
      showPassSet((oldVal) => {
        return {
          pass1: oldVal.pass1,
          pass2: !oldVal.pass2,
        };
      });
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPass.pass1 ? "text" : "password"}
                id="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          handleClickShowPassword("pass1");
                        }}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPass.pass1 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="repeatpassword"
                label="Repeat Password"
                type={showPass.pass2 ? "text" : "password"}
                id="repeatpassword"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          handleClickShowPassword("pass2");
                        }}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPass.pass2 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegisterPage;
