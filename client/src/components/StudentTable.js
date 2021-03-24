import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";
import SearchBar from "material-ui-search-bar";

const axios = require("axios").default;

var columns = [
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "department", headerName: "Department", width: 130 },
  { field: "track", headerName: "track", width: 130 },
  { field: "gpa", headerName: "GPA", width: 50 },
  { field: "projectOption", headerName: "Project Option", width: 130 },
  { field: "facultyAdvisor", headerName: "Faculty Advisor", width: 130 },
  { field: "graduated", headerName: "Graduated", width: 130 },
];

class StudentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curStudents: [],
    };
  }

  componentDidMount() {
    this.getStudents();
    console.log(this.state.curStudents);
  }

  getStudents() {
    axios
      .get("http://localhost:5000/student/")
      .then((response) => {
        this.setState({
          curStudents: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        console.log("Got data, no error");
      });
  }

  render() {
    console.log(this.state.curStudents);
    return (
      <div style={{ height: 600, width: "100%", marginBottom: 100 }}>
        <h2>Student Summary Table</h2>
        <SearchBar placeholder="Search by Student Name, ID, Courses, ..." />
        <DataGrid
          rows={this.state.curStudents}
          columns={columns}
          pageSize={10}
          checkboxSelection
        />
      </div>
    );
  }
}

export default StudentTable;
