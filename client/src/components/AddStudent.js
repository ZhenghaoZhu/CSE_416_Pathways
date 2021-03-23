import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography, Grid, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    title: {
      width: "100%",
      maxWidth: 500,
    },
  },
}));

export default function AddStudent() {
  const classes = useStyles();

  return (
    <>
      <div>
        <Typography variant="h3" gutterBottom>
          Add Student
        </Typography>
      </div>
      <div>
        <Grid container>
          <form className={classes.form} noValidate autoComplete="off">
            <Grid item>
              <TextField id="sbu_id" label="SBU ID" variant="outlined" />
              <TextField
                id="first_name"
                label="First Name"
                variant="outlined"
              />
              <TextField id="last_name" label="Last Name" variant="outlined" />
              <TextField id="email" label="Email" variant="outlined" />
              <TextField
                id="department"
                label="Department"
                variant="outlined"
              />
              <TextField id="track" label="Track" variant="outlined" />
              <TextField
                id="entry_semester"
                label="Entry Semester"
                variant="outlined"
              />
              <TextField
                id="entry_year"
                label="Entry Year"
                variant="outlined"
              />
              <TextField
                id="requirement_version_semester"
                label="Requirement Version Semester"
                variant="outlined"
              />
              <TextField
                id="requirement_version_year"
                label="Requirement Version Year"
                variant="outlined"
              />
              <TextField
                id="graduation_semester"
                label="Graduation Semester"
                variant="outlined"
              />
              <TextField
                id="graduation_year"
                label="Graduation Year"
                variant="outlined"
              />
              <TextField id="password" label="Password" variant="outlined" />
            </Grid>
            <Button variant="contained" color="primary">
              Add Student
            </Button>
          </form>
        </Grid>
      </div>
    </>
  );
}
