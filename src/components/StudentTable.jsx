import React, { useState } from "react";
import StudentDetail from "./StudentDetail"

function StudentTable() {
  return (
    <div class="row">
      <div class="col-7">
        <table class="table table-bordered">
          <thead class = "thead-light ">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Department</th>
              <th scope="col">Progress</th>
              <th scope="col">Course Plan Validity</th>
              <th scope="col">Course Plan Completeness</th>
              <th scope="col">Graduation Semester</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row"><a href = "">viewDetail</a></th>
              <td>Mark</td>
              <td>CSE</td>
              <td>5 S,0 P,0 U</td>
              <td>Valid</td>
              <td>Complete</td>
              <td>Spring 2020</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>CSE</td>
              <td>5 S,0 P,0 U</td>
              <td>Valid</td>
              <td>Complete</td>
              <td>Spring 2020</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>CSE</td>
              <td>5 S,0 P,0 U</td>
              <td>Valid</td>
              <td>Complete</td>
              <td>Spring 2020</td>
            </tr>
          </tbody>
        </table>
      </div>
      <StudentDetail />
    </div>
  );
}

export default StudentTable;
