import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  CssBaseline,
  Grid,
  TextField,
  Paper,
} from "@material-ui/core";
import styles from "../style/styles";
class RegisterForm extends Component {
  render() {
    return (
      <>
        <Grid container component="main" className={styles.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={styles.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={styles.paper}>
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
              >
                <Button>Sign In</Button>
                <Button>Sign Up</Button>
              </ButtonGroup>
              <form className={styles.form} noValidate>
                <TextField
                  variant="outlined"
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
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="confirm_password"
                  id="confirm_password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={styles.submit}
                >
                  Sign Up
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default RegisterForm;
