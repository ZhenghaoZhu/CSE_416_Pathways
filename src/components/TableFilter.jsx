import React, { useState } from "react";

function TableFilter() {
  return (
    <div>
      <form>
        <div class="form-group col-2">
          <input
            type="text"
            class="form-control"
            placeholder="Search for Students by Name"
          />
        </div>
        <div class="form-group col-2">
          <select class="form-control" id="exampleFormControlSelect1">
            <option value="" disabled selected>
              Select Graduation Semester
            </option>
            <option>Spring 2018</option>
            <option>Fall 2018</option>
            <option>Spring 2019</option>
            <option>Fall 2019</option>
            <option>Spring 2020</option>
            <option>Fall 2020</option>
            <option>Spring 2021</option>
            <option>Fall 2021</option>
          </select>
        </div>
        
        <div class="row">
          <div class="form-group col-2 ml-4">
            <h6>Course Plan Validity:</h6>
          </div>
          <div class="form-check col-1 ">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="validCheck1"
            />
            <label class="form-check-label" for="validCheck1">
              Valid
            </label>
          </div>
          <div class="form-check col-1">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="validCheck2"
            />
            <label class="form-check-label" for="validCheck2">
                Invalid
            </label>
          </div>
          <div class="form-group col-2">
            <button type="button" class="btn btn-info">Filter And Search</button>
          </div>
        </div>
        
        <div class="row">
          <div class="form-group col-2 ml-4">
            <h6>Course Plan Completeness:</h6>
          </div>
          <div class="form-check col-1 ">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="completeCheck1"
            />
            <label class="form-check-label" for="completeCheck1">
              Complete
            </label>
          </div>
          <div class="form-check col-1">
            <input
              class="form-check-input"  
              type="checkbox"
              value=""
              id="completeCheck2"
            />
            <label class="form-check-label" for="completeCheck2">
              Incomplete
            </label>
          </div>
          <div class="form-group col-2">
            <button type="button" class="btn btn-success">&nbsp;&nbsp;&nbsp;&nbsp;Add Student&nbsp;&nbsp;&nbsp;</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TableFilter;
