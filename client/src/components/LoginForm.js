import React, { Component } from "react";
import { Button, ButtonGroup, CssBaseline, Grid, TextField } from "@material-ui/core";
import Config from "../config.json";

const axios = require("axios").default;
const crypto = require("crypto");

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

    encryptPassword(password, salt) {
        var hash = crypto.createHmac("sha512", salt); /** Hashing algorithm sha512 */
        hash.update(password);
        var value = hash.digest("hex");
        return value;
    }

    getUser(e) {
        if (e != null) {
            e.preventDefault();
        }
        axios
            .get(Config.URL + "/gpd")
            .then((response) => {
                var allGPD = response.data;
                var curUser = undefined;
                var curSalt = null;
                var curValue = null;
                for (var i = 0; i < allGPD.length; i++) {
                    curUser = allGPD[i];
                    curSalt = curUser["password"][0];
                    curValue = curUser["password"][1];
                    // if (curUser["email"] === this.state.curEmail && curValue === this.encryptPassword(this.state.curPassword, curSalt)) {
                    if (curUser["email"] === this.state.curEmail && curValue === this.encryptPassword(this.state.curPassword, curSalt)) {
                        this.props.history.push({
                            pathname: "/gpd",
                            loggedInGPD: curUser,
                            curDep: curUser["department"],
                        });
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log("WHYYYYY");
        axios
            .get(Config.URL + "/student")
            .then((response) => {
                var allStudents = response.data;
                let curUser = undefined;
                var curSalt = null;
                var curValue = null;
                for (var i = 0; i < allStudents.length; i++) {
                    curUser = allStudents[i];
                    curSalt = curUser["password"][0];
                    curValue = curUser["password"][1];
                    if (curUser["email"] === this.state.curEmail && curValue === this.encryptPassword(this.state.curPassword, curSalt)) {
                        this.props.history.push({
                            pathname: "/student",
                            loggedInStudent: curUser,
                        });
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleKeypress = (e) => {
        if (e.key === "Enter") {
            this.getUser(null);
        }
    };

    render() {
        return (
            <>
                <Grid container component="main" className={this.classes.root} onKeyPress={this.handleKeypress}>
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={5}>
                        <img
                            alt="http://www.davescomputertips.com/wp-content/uploads/2013/09/alt-key.jpg"
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
                        style={{
                            verticalAlign: "middle",
                            paddingTop: "12%",
                            backgroundColor: "#f09c9c",
                        }}
                    >
                        <div className={this.classes.paper}>
                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                <Button className={this.classes.signInButton}>Sign In</Button>
                                <Button className={this.classes.signUpButton}>Sign Up</Button>
                            </ButtonGroup>
                            <form className={this.classes.form} noValidate>
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
                                    onChange={(e) => this.signInUpdatePassword(e)}
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
