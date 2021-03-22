import React from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

function GPDHeader() {
  return (
    <AppBar position = "static" color="secondary">
      <Toolbar>
        <Typography variant="h2">
          Pathways
        </Typography>
        <Typography variant="h5" style = {{"margin-left": "auto"}}>
          GPD Name
        </Typography>
        <IconButton color="inherit">
          <AccountBoxIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default GPDHeader;
