import React, { Component } from "react";
import GPDHeader from "./GPDHeader";
import StudentTable from "./StudentTable";
import StudentDetail from "./StudentDetail";
import { DropzoneArea } from "material-ui-dropzone";
import { Grid, Button, ButtonGroup, Box } from "@material-ui/core";

class GPDPage extends Component {
  render() {
    return (
      <div>
        <GPDHeader />
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <StudentTable />
          </Grid>

          <Grid item xs={4}>
            <StudentDetail />
            <Box style={{ width: "97%" }}>
              <DropzoneArea
                onChange={(files) => console.log("Files:", files)}
              />
            </Box>

            <ButtonGroup
              variant="contained"
              style={{
                color: "#000000",
                marginLeft: "4%",
                marginTop: 13,
                height: "7%",
              }}
              aria-label="contained primary button group"
            >
              <Button style={{ width: "100%" }}>Add Student</Button>
              <Button style={{ width: "100%" }}>Edit Student</Button>
              <Button style={{ width: "100%" }}>Suggest Course Plan</Button>
              <Button style={{ width: "100%" }}>Make Comment</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default GPDPage;
