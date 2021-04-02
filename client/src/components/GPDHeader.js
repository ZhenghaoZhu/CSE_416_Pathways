import React, { Component } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { Link } from "react-router-dom";

class GPDHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        };
    }

    handleOpen = (event) => {
        console.log(event.currentTarget);
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    render() {
        return (
            <AppBar position="static" style={{ background: "#e35a5a" }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        style={{ marginRight: "10px" }}
                        aria-label="menu"
                    >
                        <MenuIcon onClick={this.handleOpen} />
                        <Menu
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}
                        >
                            <MenuItem>
                                <Link
                                    to="/"
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}
                                >
                                    Home Page
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link
                                    to="/login"
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}
                                >
                                    Login
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link
                                    to="/register"
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}
                                >
                                    Register Page
                                </Link>
                            </MenuItem>
                        </Menu>
                    </IconButton>
                    <img
                        src="https://i.ibb.co/9H09g8M/Pathways-Logo-Bordered.png"
                        width="38px"
                    />
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
