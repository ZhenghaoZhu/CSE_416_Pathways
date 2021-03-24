import React from "react";
import {
  Button,
  ButtonGroup,
  CssBaseline,
  Grid,
  TextField,
  Paper,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://i.ibb.co/N2jMyvn/Screen-Shot-2021-03-21-at-9-49-25-PM.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  background: {
    backgroundColor: "red",
  },
  loginTextField: {
    marginLeft: "25%",
    borderRadius: "5px",
    width: "50%",
    marginTop: theme.spacing(1),
    backgroundColor: "white",
  },
}));

const LoginForm = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={5}>
          <img
            src="https://i.ibb.co/N2jMyvn/Screen-Shot-2021-03-21-at-9-49-25-PM.png"
            width="100%"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={7}
          elevation={6}
          square
          style={{
            verticalAlign: "middle",
            paddingTop: "12%",
            backgroundColor: "#dc8f8a",
          }}
        >
          <div className={classes.paper}>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button className={classes.signInButton}>Sign In</Button>
              <Button className={classes.signUpButton}>Sign Up</Button>
            </ButtonGroup>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                className={classes.loginTextField}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                className={classes.loginTextField}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <p
                style={{
                  verticalAlign: "middle",
                  marginLeft: "42%",
                  fontSize: "19px",
                  textDecoration: "underline",
                }}
              >
                Forgot your password?
              </p>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginForm;
