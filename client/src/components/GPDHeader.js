import React, { Component } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

class GPDHeader extends Component {
    render() {
        return (
            <AppBar position="static" style={{ background: "#e35a5a" }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        style={{ marginRight: "10px" }}
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4">Pathways</Typography>
                    <li>
                        <Link to="/">GPD Home Page</Link>
                    </li>
                    <li>
                        <Link to="/login">Login Form</Link>
                    </li>
                    <Typography variant="h5" style={{ marginLeft: "auto" }}>
                        Emerson True
                    </Typography>
                    <IconButton color="inherit">
                        <AccountBoxIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}

export default GPDHeader;
