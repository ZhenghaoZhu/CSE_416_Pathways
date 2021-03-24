import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Typography, Grid, Button } from "@material-ui/core";
import GPDHeader from "./GPDHeader";

class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div>
          <GPDHeader />
        </div>
        <div>
          <Typography variant="h3" gutterBottom>
            Add Student
          </Typography>
        </div>
        <div>
          <Grid container>
            <form noValidate autoComplete="off">
              <Grid item>
                <TextField id="sbu_id" label="SBU ID" variant="outlined" />
              </Grid>
              <Grid item>
                <TextField
                  id="first_name"
                  label="First Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="last_name"
                  label="Last Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField id="email" label="Email" variant="outlined" />
              </Grid>

              <Grid item>
                <TextField
                  id="department"
                  label="Department"
                  variant="outlined"
                />
              </Grid>

              <Grid item>
                <TextField id="track" label="Track" variant="outlined" />
              </Grid>
              <Grid item>
                <TextField
                  id="entry_semester"
                  label="Entry Semester"
                  variant="outlined"
                />
              </Grid>

              <Grid item>
                <TextField
                  id="entry_year"
                  label="Entry Year"
                  variant="outlined"
                />
              </Grid>

              <Grid item>
                <TextField
                  id="requirement_version_semester"
                  label="Requirement Version Semester"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="requirement_version_year"
                  label="Requirement Version Year"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="graduation_semester"
                  label="Graduation Semester"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="graduation_year"
                  label="Graduation Year"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField id="password" label="Password" variant="outlined" />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary">
                  Add Student
                </Button>
              </Grid>
            </form>
          </Grid>
        </div>
      </>
    );
  }
}

export default AddStudent;
