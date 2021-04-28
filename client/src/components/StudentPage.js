import React, { Component } from "react";
import StudentHeader from "./StudentHeader";
import StudentTable from "./StudentTable";
import StudentDetail from "./StudentDetail";
import {
    Grid,
    Button,
    ButtonGroup,
    Box,
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
    Card,
    CardContent
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Link } from "react-router-dom";
import Config from "../config.json";
import StudentProfile from "./StudentProfile";

const axios = require("axios").default;

class StudentPage extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         focusStudent: this.props.focusStudent,
    //         curGPD: this.props.location.loggedInGPD,
    //     };
    //     console.log(this.state);
    // }
    makeCards(course_plan){
        let courses = []
        course_plan.map(e =>{
            courses.push(
                <Card>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {e}
                    </Typography>
                    </CardContent>
                </Card>
            )
        })
        return courses;
    }
        
    render() {
        var student = {
            proficiencyReq: [],
            comments: [],
            firstName: "Pinus",
            lastName: "LIvan Belt",
            id: 111222334,
            email: "pinus.belt@stonybrook.edu",
            gpa: 0,
            department: "AMS",
            track: "Computational Applied Mathematics",
            reqVersionSem: "Spring",
            reqVersionYear: "2020",
            entrySem: "Spring",
            entryYear: "2020",
            gradSem: "Spring",
            gradYear: "2021",
            coursePlan: {
                "Spring 2020": [
                    ["01", "AMS 501", "A-"],
                    ["01", "AMS 503", "A-"],
                    ["01", "AMS 526", "A-"],
                ],
                "Fall 2020": [
                    ["01", "AMS 527", "A-"],
                    ["01", "AMS 528", "A-"],
                    ["01", "AMS 595", "A-"],
                ],
                "Spring 2021": [
                    ["01", "AMS 504", "A-"],
                    ["01", "AMS 505", "A-"],
                    ["01", "AMS 507", "A-"],
                    ["01", "AMS 511", "A-"],
                ],
            },
            projectOption: " ",
            facultyAdvisor: " ",
            degreeRequirements: {
                _id: "6077596e6e808705e81bba20",
                department: "AMS",
                gpaReq: 3,
                tracks: {
                    "Computational Applied Mathematics": {
                        "Required Courses": [],
                        "Elective Courses": [[4, "AMS"]],
                        "Excluded Courses": [],
                    },
                    "Computational Biology": {
                        "Required Courses": [
                            [1, "AMS 507"],
                            [1, "AMS 510"],
                            [1, "MCB 520", "CHE 541"],
                            [2, "AMS 531"],
                            [2, "AMS 532"],
                            [1, "AMS 533"],
                            [1, "AMS 535"],
                            [1, "AMS 537"],
                            [1, "AMS 539"],
                            [1, "AMS 549"],
                        ],
                        "Elective Courses": [[3, "AMS"]],
                        "Excluded Courses": [],
                    },
                    "Operations Research": {
                        "Required Courses": [
                            [1, "AMS 510"],
                            [1, "AMS 507"],
                            [1, "AMS 540"],
                            [1, "AMS 550"],
                            [1, "AMS 553"],
                            [1, "AMS 570 - 586"],
                            [1, "AMS 595"],
                        ],
                        "Elective Courses": [[4, "AMS 542­ - 556"]],
                        "Excluded Courses": [],
                    },
                    Statistics: {
                        "Required Courses": [
                            [1, "AMS 507"],
                            [1, "AMS 510"],
                            [1, "AMS 570"],
                            [1, "AMS 572"],
                            [1, "AMS 573"],
                            [1, "AMS 578"],
                            [1, "AMS 582"],
                            [1, "AMS 597"],
                        ],
                        "Elective Courses": [[2, "AMS"]],
                        "Excluded Courses": [],
                    },
                    "Quantitative Finance": {
                        "Required Courses": [
                            [1, "AMS 507"],
                            [1, "AMS 510"],
                            [1, "AMS 511"],
                            [1, "AMS 512"],
                            [1, "AMS 513"],
                            [1, "AMS 514"],
                            [1, "AMS 516"],
                            [1, "AMS 517"],
                            [1, "AMS 518"],
                            [1, "AMS 572"],
                            [1, "FIN 539"],
                        ],
                        "Elective Courses": [[1, "AMS"]],
                        "Excluded Courses": [],
                    },
                },
                reqVersionSem: "Spring",
                reqVersionYear: "2020",
                timeLimit: 3,
                updatedAt: "2021-04-18T04:10:25.061Z",
                createdAt: "2021-04-18T04:10:25.061Z",
            },
            curSem: "Spring",
            curYear: "2021",
            password: "security_blanket",
            graduated: false,
            settings: " ",
        };
        const courseplanObj = [];
        for (const [semester, course_plan] of Object.entries(student.coursePlan)) {
            courseplanObj.push(
                <Accordion
                    style={{ width: "80%", margin: "auto", marginTop: "20px" }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{semester}</Typography>
                    </AccordionSummary>
                    
                    <AccordionDetails>
                    {this.makeCards(course_plan)}
                    </AccordionDetails>

                </Accordion>
            );
        }

        return (
            <Box style={{ width: "99.82%" }}>
                {/* <StudentHeader curStudent={this.state.curStudent} /> */}
                <StudentHeader name = {student.firstName + " " + student.lastName}/>
                <Accordion
                    style={{ width: "80%", margin: "auto", marginTop: "20px" }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Student Profile</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* <StudentDetail /> */}
                        <StudentProfile student = {student}/>
                    </AccordionDetails>
                </Accordion>
                {courseplanObj}
                <ButtonGroup
                    variant="contained"
                    style={{
                        color: "#000000",
                        marginTop: 20,
                        marginLeft: "80%",
                    }}
                >
                    <Button>
                        <Link
                            to="/limitedEditStudent"
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            Edit Profile
                        </Link>
                    </Button>
                    <Button>Suggest Course Plan</Button>
                </ButtonGroup>
            </Box>
        );
    }
}

export default StudentPage;
