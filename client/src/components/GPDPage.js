import React, { Component } from "react";
import GPDHeader from "./GPDHeader";
import StudentTable from "./StudentTable";
import StudentDetail from "./StudentDetail";
import { DropzoneAreaBase } from "material-ui-dropzone";
import { Grid, Button, ButtonGroup, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
// import Dropzone from "react-dropzone";
// import { CSVReader } from 'react-papaparse'
// import AddStudent from "./AddStudent";

const Papa = require("papaparse")
const fs = require("fs");
const axios = require("axios").default;

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

    add(fileObj){
        var i = 0
        for(i; i < fileObj["data"].length - 1; i++){
            console.log(i, fileObj["data"][i]);
            console.log("ID", fileObj["data"][i]["sbu_id"]);
            var track = " "
            if(fileObj["data"][i]["track"] != ""){
                track = fileObj["data"][i]["track"];
            }
            axios.put("http://localhost:5000/student/get/sbuID/"+fileObj["data"][i]["sbu_id"], {
                "firstName": fileObj["data"][i]["first_name"],
                "lastName": fileObj["data"][i]["last_name"],
                "id": fileObj["data"][i]["sbu_id"],
                "email": fileObj["data"][i]["email"],
                "gpa": 0,
                "department": fileObj["data"][i]["department"],
                "track": track,
                "reqVersionSem": fileObj["data"][i]["requirement_version_semester"],
                "reqVersionYear": fileObj["data"][i]["requirement_version_year"],
                "entrySem": fileObj["data"][i]["entry_semester"],
                "entryYear": fileObj["data"][i]["entry_year"],
                "gradSem": fileObj["data"][i]["graduation_semester"],
                "gradYear" : fileObj["data"][i]["graduation_year"],
                "coursePlan": " ",
                "projectOption": " ",
                "facultyAdvisor": " ",
                "proficienyReq": [],
                "degreeRequirements": " ",
                "password": fileObj["data"][i]["password"],
                "graduated": false,
                "settings": " ",
                "comments": []
            })
            .then((cur) => console.log("Added student: ", cur))
            .catch((err) => console.log("Error happened :(", err))
        }
    }
    // student course plan file
    addCourseGrades(fileObj){

    }

    checkFile(results){
        console.log("coursenum: ", results["data"][0]["course_num"])
        if(results["data"][0]["course_num"] == null){
            this.add(results);
        }
        else{
            this.addCourseGrades(results); //TODO import course grades, student course plan file
        }
    }

    fileParse(file) {
        // console.log("results:", file);
        // let csv = fs.readFileSync(file["data"]);
        // console.log(csv.toString());
        // console.log("results:", file);
        // var fr = new FileReader();
        // fr.readAsText(file);
        // console.log("results:",fr.result);
        Papa.parse(file["0"]["file"], {
            header: true,
            complete: (results, file1) =>
                this.checkFile(results)
            }
        );
        // console.log("files:", file);
    }


    onSub(e) {
        e.preventDefault();
        axios.delete("http://localhost:5000/student/remove");
        console.log("All Student Data Deleted");
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
                                // onChange={(files) =>
                                //     console.log("Files:", files)
                                // }
                                onAdd={(newFiles) => this.fileParse(newFiles)}
                                filesLimit={5}
                                showPreviewsInDropzone={false}
                                showFileNames={true}
                            />

                            <ButtonGroup
                                variant="contained"
                                style={{
                                    color: "#000000",
                                    marginTop: 13,
                                }}
                            >
                                <Button>Import Student</Button>
                                <Button>
                                    <Link to="/addStudent">
                                        Add Student Form
                                    </Link>
                                </Button>
                                <Button>Edit Student</Button>
                                <Button>Suggest Course Plan</Button>
                                <Button onClick={this.onSub}>
                                    Delete All{" "}
                                </Button>
                            </ButtonGroup>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default GPDPage;
