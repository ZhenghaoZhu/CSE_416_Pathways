import React, { Component } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { Link } from "react-router-dom";
import { MenuItem, Menu } from "@material-ui/core";
import Config from "../config.json";

class StudentHeader extends Component {
    render() {
        return (
            <AppBar position="static" style={{ background: "#e35a5a" }}>
                <Toolbar>
                    <img src="https://i.ibb.co/9H09g8M/Pathways-Logo-Bordered.png" width="38px" alt="" />
                    <Typography variant="h6" style={{ marginLeft: "45px" }}>
                        <Link
                            to="/student"
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            Home
                        </Link>
                    </Typography>
                    <Typography variant="h6" style={{ marginLeft: "35px" }}>
                        <Link
                            to="/login"
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            Login
                        </Link>
                    </Typography>
                    <Typography variant="h5" style={{ marginLeft: "auto" }}>
                        {this.props.name}
                    </Typography>
                    <IconButton color="inherit">
                        <AccountBoxIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}

export default StudentHeader;
