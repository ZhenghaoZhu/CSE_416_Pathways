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
        <div
          style={{
            padding: "10px",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Add Student
          </Typography>
        </div>
        <div>
          <Grid container>
            <form noValidate autoComplete="off">
              <Grid item>
                <TextField
                  style={{
                    padding: "10px",
                  }}
                  id="sbu_id"
                  label="SBU ID"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  style={{
                    padding: "10px",
                  }}
                  id="first_name"
                  label="First Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  style={{
                    padding: "10px",
                  }}
                  id="last_name"
                  label="Last Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  style={{
                    padding: "10px",
                  }}
                  id="email"
                  label="Email"
                  variant="outlined"
                />
              </Grid>

              <Grid item>
                <TextField
                  style={{
                    padding: "10px",
                  }}
                  id="department"
                  label="Department"
                  variant="outlined"
                />
              </Grid>

              <Grid item>
                <TextField
                  style={{
                    padding: "10px",
                  }}
                  id="track"
                  label="Track"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  style={{
                    padding: "10px",
                  }}
                  id="entry_semester"
                  label="Entry Semester"
                  variant="outlined"
                />
              </Grid>

              <Grid item>
                <TextField
                  style={{
                    padding: "10px",
                  }}
                  id="entry_year"
                  label="Entry Year"
                  variant="outlined"
                />
              </Grid>

              <Grid item>
                <TextField
                  style={{
                    padding: "10px",
                  }}
                  id="requirement_version_semester"
                  label="Requirement Version Semester"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  style={{
                    padding: "10px",
                  }}
                  id="requirement_version_year"
                  label="Requirement Version Year"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  style={{
                    padding: "5px",
                  }}
                  id="graduation_semester"
                  label="Graduation Semester"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  style={{
                    padding: "10px",
                  }}
                  id="graduation_year"
                  label="Graduation Year"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  style={{
                    padding: "10px",
                  }}
                  id="password"
                  label="Password"
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                style={{
                  padding: "10px",
                }}
              >
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
