import React from "react";
import {
  Button,
  ButtonGroup,
  CssBaseline,
  Grid,
  TextField,
  Paper,
} from "@material-ui/core";
import useStyles from "../style/styles";

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
            backgroundColor: "#f09c9c",
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
