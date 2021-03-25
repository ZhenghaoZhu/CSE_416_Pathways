import React, { Component } from "react";
import {
    Button,
    ButtonGroup,
    CssBaseline,
    Grid,
    TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const axios = require("axios").default;

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { curEmail: "", curPassword: "" };
        this.classes = {};
    }

    componentDidMount() {
        // let classes = useStyles();
    }
    signInUpdateEmail(e) {
        this.setState({ curEmail: e.target.value });
    }

    signInUpdatePassword(e) {
        this.setState({ curPassword: e.target.value });
    }

    getUser(e) {
        e.preventDefault();
        axios
            .get("http://localhost:5000/gpd")
            .then((response) => {
                var allGPD = response.data;
                var curUser = undefined;
                for (var i = 0; i < allGPD.length; i++) {
                    curUser = allGPD[i];
                    console.log(curUser);
                    console.log(this.state);
                    if (
                        curUser["email"] === this.state.curEmail &&
                        curUser["password"] === this.state.curPassword
                    ) {
                        this.props.history.push("/");
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        axios
            .get("http://localhost:5000/student")
            .then((response) => {
                var allStudents = response.data;
                var curUser = undefined;
                for (var i = 0; i < allStudents.length; i++) {
                    curUser = allStudents[i];
                    console.log(curUser);
                    console.log(this.state);
                    if (
                        curUser["email"] === this.state.curEmail &&
                        curUser["password"] === this.state.curPassword
                    ) {
                        this.props.history.push("/studentDetail");
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
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
                                <Button className={this.classes.signInButton}>
                                    Sign In
                                </Button>
                                <Button className={this.classes.signUpButton}>
                                    Sign Up
                                </Button>
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
                                    onChange={(e) => this.signInUpdateEmail(e)}
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
                                    onChange={(e) =>
                                        this.signInUpdatePassword(e)
                                    }
                                    className={this.classes.loginTextField}
                                />
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={this.classes.submit}
                                    onClick={(e) => this.getUser(e)}
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
