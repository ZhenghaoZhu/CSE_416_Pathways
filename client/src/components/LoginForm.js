import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  CssBaseline,
  Grid,
  TextField,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const axios = require("axios").default;

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // const useStyles = makeStyles((theme) => ({
    //   root: {
    //     height: "100vh",
    //   },
    //   image: {
    //     backgroundImage:
    //       "url(https://i.ibb.co/N2jMyvn/Screen-Shot-2021-03-21-at-9-49-25-PM.png)",
    //     backgroundRepeat: "no-repeat",
    //     backgroundColor:
    //       theme.palette.type === "light"
    //         ? theme.palette.grey[50]
    //         : theme.palette.grey[900],
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //   },
    //   paper: {
    //     margin: theme.spacing(8, 4),
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //   },
    //   avatar: {
    //     margin: theme.spacing(1),
    //     backgroundColor: theme.palette.secondary.main,
    //   },
    //   form: {
    //     width: "100%",
    //     marginTop: theme.spacing(1),
    //   },
    //   submit: {
    //     margin: theme.spacing(3, 0, 2),
    //   },
    //   background: {
    //     backgroundColor: "red",
    //   },
    // }));
    this.classes = {};
  }

  componentDidMount() {
    // let classes = useStyles();
  }
  signInUpdateEmail(e) {
    console.log(e.target.value);
  }

  signInUpdatePassword(e) {
    console.log(e.target.value);
  }

  getUser(e) {
    e.preventDefault();
    axios
      .get("http://localhost:5000/student/get/6056beb0dada4e0858d40f96")
      .then((response) => {
        this.state = { firstName: response.data.sbuID };
        console.log(this.state.firstName);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  render() {
    return (
      <>
        <Grid container component="main" className={this.classes.root}>
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
            <div className={this.classes.paper}>
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
              >
                <Button className={this.classes.signInButton}>Sign In</Button>
                <Button className={this.classes.signUpButton}>Sign Up</Button>
              </ButtonGroup>
              <form className={this.classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={this.signInUpdateEmail}
                  className={this.classes.loginTextField}
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
                  onChange={this.signInUpdatePassword}
                  className={this.classes.loginTextField}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={this.classes.submit}
                  onClick={this.getUser.bind(this)}
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
  }
}

export default LoginForm;
