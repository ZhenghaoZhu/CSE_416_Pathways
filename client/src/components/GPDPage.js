import React, { Component } from "react";
import GPDHeader from "./GPDHeader";
import StudentTable from "./StudentTable";
import StudentDetail from "./StudentDetail";
import { DropzoneAreaBase } from "material-ui-dropzone";
import { Grid, Button, ButtonGroup, Box } from "@material-ui/core";
import Dropzone from 'react-dropzone'

const fs = require("fs");

const Papa = require("papaparse");

class GPDPage extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.focusStudent);
        var curStudent = this.props.focusStudent;
        this.state = {
            focusStudent: {
                curStudent,
            },
        };
    }
    fileParse(file){
      console.log("results:", file);
      // let csv = fs.readFileSync(file);
      // console.log(csv.toString());
      // console.log("results:", file);
      // var fr = new FileReader();
      // fr.readAsText(file);
      // console.log("results:",fr.result);
      // Papa.parse(file);
      // console.log("files:", file);
    }

    render() {
        console.log(this.state.focusStudent);
        return (
            <Box style={{ width: "99.82%" }}>
                <GPDHeader />
                <Grid container spacing={1}>
                    <Grid item xs={8}>
                        <StudentTable
                            focusStudent={this.state.focusStudent}
                            changeFocusStudent={(newStudent) =>
                                this.setState({ focusStudent: newStudent })
                            }
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <Box style={{ width: "95%" }}>
                            <StudentDetail
                                focusStudent={this.state.focusStudent}
                            />
                            <DropzoneAreaBase
                                onChange={(files) =>
                                    console.log("Files:", files)
                                }
                                filesLimit="5"
                                showPreviewsInDropzone="false"
                            />

                            <ButtonGroup
                                variant="contained"
                                style={{
                                    color: "#000000",
                                    marginTop: 13,
                                }}
                            >
                                <Button>Import Student</Button>
                                <Button>Add Student</Button>
                                <Button>Edit Student</Button>
                                <Button>Suggest Course Plan</Button>
                                <Button>Make Comment</Button>
                            </ButtonGroup>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default GPDPage;
