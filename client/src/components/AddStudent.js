import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Typography, Grid, Button } from "@material-ui/core";
import GPDHeader from "./GPDHeader";

const axios = require("axios").default;

class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "Anthony",
      lastName: "Anthony",
      id: 3122,
      email: "gmail@gmail.com",
      gpa: 0,
      department: "dd",
      track: "dd",
      reqVersion: "dd",
      entrySem: "dd",
      entryYear: "dd",
      gradSem: "dd",
      coursePlan: " ",
      projectOption: " ",
      facultyAdvisor: " ",
      proficiencyReq: [],
      degreeRequirements: " ",
      password: "password",
      graduated: false,
      settings: "settings",
      comments: [],
    };
  }
  setID(e){
    this.setState({id: e.target.value})
  }
  setFirst(e){
    this.setState({firstName: e.target.value})
  }
  setLast(e){
    this.setState({lastName: e.target.value})
  }
  setEmail(e){
    this.setState({email: e.target.value})
  }
  setDepartment(e){
    this.setState({department: e.target.value})
  }
  setTrack(e){
    this.setState({track: e.target.value})
  }
  setEntrySem(e){
    this.setState({entrySem: e.target.value})
  }
  setEntryYear(e){
    this.setState({entryYear: e.target.value})
  }
  setReqSem(e){
    this.setState({reqVersionSem: e.target.value})
    // this.stateHolder["reqSem"] = e.target.value;
  }
  setReqYear(e){
    this.setState({reqVersionYear: e.target.value})
    // this.stateHolder["reqYear"] = e.target.value;
  }
  setGradSem(e){
    this.setState({gradSem: e.target.value})
    console.log(this.state.gradSem);
  }
  setGradYear(e){
    console.log(this.state.gradYear);
    this.setState({gradYear: e.target.value})
    console.log(this.state.gradYear);
  }
  setPassword(e){
    this.setState({password: e.target.value})
    console.log(this.state.password);
  }

  onSubmit(e){
    axios.post("http://localhost:5000/student/add",  {
      "firstName": this.state.firstName,
      "lastName": this.state.lastName,
      "id": this.state.id,
      "email": this.state.email,
      "gpa": this.state.gpa,
      "department": this.state.department,
      "track": this.state.track,
      "reqVersionSem": this.state.reqVersionSem,
      "reqVersionYear": this.state.reqVersionYear,
      "entrySem": this.state.entrySem,
      "entryYear": this.state.entryYear,
      "gradSem": this.state.gradSem,
      "gradYear": this.state.gradYear,
      "coursePlan": this.state.coursePlan,
      "projectOption": this.state.projectOption,
      "facultyAdvisor": this.state.facultyAdvisor,
      "proficienyReq": this.state.proficiencyReq,
      "degreeRequirements": this.state.degreeRequirements,
      "password": this.state.password,
      "graduated": this.state.graduated,
      "settings": this.state.settings,
      "comments": this.state.comments
    }
    )
    .then((response) => {
      console.log("Reply: ", response);
    })
    .catch(function (error) {
      console.log(error);
    })
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
                  id="sbu_id" 
                  label="SBU ID" 
                  variant="outlined" 
                  autoFocus={true}
                  required={true}
                  onChange={(val) => this.setID(val)}
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
                  required={true}
                  onChange={(val) => this.setFirst(val)}
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
                  required={true}
                  onChange={(val) => this.setLast(val)}
                />
              </Grid>
              <Grid item>
                <TextField 
                  id="email" 
                  label="Email" 
                  variant="outlined" 
                  required={true}
                  onChange={(val) => this.setEmail(val)}
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
                  required={true}
                  onChange={(val) => this.setDepartment(val)}
                />
              </Grid>

              <Grid item>
                <TextField 
                  id="track" 
                  label="Track" 
                  variant="outlined" 
                  required={true}
                  onChange={(val) => this.setTrack(val)}
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
                  required={true}
                  onChange={(val) => this.setEntrySem(val)}
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
                  required={true}
                  onChange={(val) => this.setEntryYear(val)}
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
                  required={true}
                  onChange={(val) => this.setReqSem(val)}
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
                  required={true}
                  onChange={(val) => this.setReqYear(val)}
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
                  required={true}
                  onChange={(val) => this.setGradSem(val)}
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
                  required={true}
                  onChange={(val) => this.setGradYear(val)}
                />
              </Grid>
              <Grid item>
                <TextField 
                  id="password" 
                  label="Password" 
                  variant="outlined" 
                  required={true}
                  onChange={(val) => this.setPassword(val)}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={(e) => this.onSubmit(e)}>
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
