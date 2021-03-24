import React, { Component } from "react";
import { Grid } from "@material-ui/core";

let student1 = {
  sbu_id: "123456789",
  email: "john.doe@stonybrook.edu",
  first_name: "John",
  last_name: "Doe",
  department: "CSE",
  track: "Thesis",
  entry_semester: "Fall",
  entry_year: "2020",
  requirement_version_semester: "Fall",
  requirement_version_year: "2020",
  graduation_semester: "Spring",
  graduation_year: "2022",
};

class StudentInfo extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   text: "Logo",
    //   color: "#0000FF",
    //   fontSize: 30,
    //   borderColor: "#FFA500",
    //   backgroundColor: "#FFC0CB", //chnaged
    //   borderRadius: 40, //changed
    //   borderWidth: 30,
    //   borderPadding: 15,
    //   borderMargin: 15,
    //   whiteSpace: false,
    // };
    
  }

  render(){
    return (
      <>
        <div>
          <Grid container spacing={3} direction="column">
            <Grid item xs={12} container>
              <Grid item xs={6}>
                SBU ID: {student1.sbu_id}
              </Grid>
              <Grid item xs={6}>
                Email: {student1.email}
              </Grid>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={6}>
                First Name: {student1.first_name}
              </Grid>
              <Grid item xs={6}>
                Last Name: {student1.first_name}
              </Grid>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={6}>
                Department: {student1.department}
              </Grid>
              <Grid item xs={6}>
                Track: {student1.track}
              </Grid>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={6}>
                Entry Semester: {student1.entry_semester}
              </Grid>
              <Grid item xs={6}>
                Entry Year: : {student1.entry_year}
              </Grid>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={6}>
                Requirement Version Semester:{" "}
                {student1.requirement_version_semester}
              </Grid>
              <Grid item xs={6}>
                Requirement Version Year: {student1.requirement_version_year}
              </Grid>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={6}>
                Graduation Semester: {student1.graduation_semester}
              </Grid>
              <Grid item xs={6}>
                Graudation Year: {student1.graduation_year}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default StudentInfo;
