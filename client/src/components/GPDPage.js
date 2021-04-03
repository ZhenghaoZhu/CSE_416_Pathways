import React, { Component } from "react";
import GPDHeader from "./GPDHeader";
import StudentTable from "./StudentTable";
import StudentDetail from "./StudentDetail";
import FileUploadArea from "./FileUploadArea";
import { Grid, Button, ButtonGroup, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import Config from "../config.json";

const axios = require("axios").default;
class GPDPage extends Component {
    constructor(props) {
        super(props);
        var curStudent = this.props.focusStudent;
        this.state = {
            focusStudent: {
                curStudent,
            },
        };
        this.counter = 0;
    }

    onSub(e) {
        e.preventDefault();
        axios.delete(Config.URL + "/student/remove");
        console.log("All Student Data Deleted");
    }

    render() {
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
                            <FileUploadArea />

                            <ButtonGroup
                                variant="contained"
                                style={{
                                    color: "#000000",
                                    marginTop: 13,
                                }}
                            >
                                <Button>View Student File</Button>
                                <Button>
                                    <Link
                                        to="/addStudent"
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        Add Student Form
                                    </Link>
                                </Button>
                                <Button>
                                    <Link
                                        to="/editStudent"
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        Edit Student
                                    </Link>
                                </Button>
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
