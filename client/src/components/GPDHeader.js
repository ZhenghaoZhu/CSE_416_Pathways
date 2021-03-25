import React, { Component } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import styles from "../style/styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    abRoot: {
        backgroundColor: "red",
    },
    abStatic: {
        border: "solid blue 2px",
    },
}));
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
                    <Typography variant="h5" style={{ marginLeft: "auto" }}>
                        GPD Name
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
