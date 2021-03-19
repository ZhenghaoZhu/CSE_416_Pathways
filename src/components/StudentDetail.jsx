import React, { useState } from "react";
function StudentDetail() {
  return (
    <div class="col-5">
      <h3 style={{ marginLeft: "170px" }}>Student's Detailed Information</h3>
      <table class="table table-bordered w-75 mx-auto">
        <tbody>
          <tr>
            <td>Student Name</td>
            <td>Mike</td>
          </tr>
          <tr>
            <td>SBU ID</td>
            <td>111532884</td>
          </tr>
          <tr>
            <td>Department</td>
            <td>CSE</td>
          </tr>
          <tr>
            <td>Entry Semester</td>
            <td>Fall 2017</td>
          </tr>
          <tr>
            <td>Graduation Semester</td>
            <td>Fall 2021</td>
          </tr>
          <tr>
            <td>Track</td>
            <td>Game Programming</td>
          </tr>
          <tr>
            <td>Progress</td>
            <td>5 satisfied, 3 pending, 2 unsatisfied</td>
          </tr>
        </tbody>
      </table>
      <div class="file-upload-wrapper">
        <input type="file" id="input-file-now" class="file-upload" />
      </div>
    </div>
  );
}

export default StudentDetail;
