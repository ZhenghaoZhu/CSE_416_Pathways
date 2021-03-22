import React from "react";
import GPDHeader from "./GPDHeader";
import StudentTable from "./StudentTable";
import StudentDetail from "./StudentDetail";
import { DropzoneArea } from "material-ui-dropzone";
import { Grid, Button, ButtonGroup } from "@material-ui/core";

function GPDPage() {
  return (
    <div>
      <GPDHeader />
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <StudentTable />
          <Button variant="contained" color="primary">
            Add Student
          </Button>
        </Grid>

        <Grid item xs={4}>
          <StudentDetail />
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button>Edit Student</Button>
            <Button>Suggest Course Plan</Button>
            <Button>Make Comment</Button>
          </ButtonGroup>
          <DropzoneArea onChange={(files) => console.log("Files:", files)} />
        </Grid>
      </Grid>
    </div>
  );
}

export default GPDPage;
