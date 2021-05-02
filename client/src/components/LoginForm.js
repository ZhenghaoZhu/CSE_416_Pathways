import React, { Component } from "react";
import { Button, ButtonGroup, CssBaseline, Grid, TextField, Popover, Typography } from "@material-ui/core";
import Config from "../config.json";

const axios = require("axios").default;
const crypto = require("crypto");
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { curEmail: "", curPassword: "", anchorEl: null, foundUser: 0, popupMsg: "Invalid username/password. Please try again." };
        this.classes = {
            form: {
                width: "500px",
                marginLeft: "30%",
                marginTop: "10%",
            },
        };
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

    getUser = async function (e) {
        if (e != null) {
            e.preventDefault();
        }
        var pushUser = null;
        await axios
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
                        this.setState({ foundUser: 1 });
                        pushUser = curUser;
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        if (this.state.foundUser === 0) {
            await axios
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
                            this.setState({ foundUser: 2 });
                            pushUser = curUser;
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        if (this.state.foundUser == 1) {
            this.props.history.push({
                pathname: "/gpd",
                loggedInGPD: pushUser,
                curDep: pushUser["department"],
            });
        } else if (this.state.foundUser == 2) {
            this.props.history.push({
                pathname: "/student",
                loggedInStudent: pushUser,
            });
        }
        this.handleOpen();
    };

    handleKeypress = (e) => {
        if (e.key === "Enter") {
            this.getUser(null);
        }
    };

    handleOpen = () => {
        this.setState({ anchorEl: true });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        console.log(this.state.popupMessage);
        return (
            <>
                <Grid container component="main" className={this.classes.root} onKeyPress={this.handleKeypress}>
                    <CssBaseline />
                    <Popover
                        id="simple-popover"
                        open={Boolean(this.state.anchorEl)}
                        anchorEl={this.state.anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                    >
                        <Typography>{this.state.popupMsg}</Typography>
                    </Popover>
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
                            <form style={this.classes.form} noValidate>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    style={{ marginBottom: "2%", backgroundColor: "white", borderRadius: "4px" }}
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
                                    required
                                    fullWidth
                                    style={{ marginBottom: "2%", backgroundColor: "white", borderRadius: "4px" }}
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
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: "1%", width: "60%", marginLeft: "19%" }}
                                    className={this.classes.submit}
                                    onClick={(e) => this.getUser(e)}
                                >
                                    Sign In
                                </Button>
                                <p
                                    style={{
                                        verticalAlign: "middle",
                                        marginLeft: "30%",
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
