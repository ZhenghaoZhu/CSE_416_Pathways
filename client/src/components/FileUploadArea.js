import React, { Component } from "react";
import { DropzoneAreaBase } from "material-ui-dropzone";
import Config from "../config.json";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from "@material-ui/core";

const Papa = require("papaparse");
const axios = require("axios").default;
const crypto = require("crypto");
const fs = require("fs");

var SHA256 = require("crypto-js/sha256");

class FileUploadArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popFlag: false,
            semester : "",
            year : "",
            department: "",
            courseFile:[]
        };
    }

    encryptPassword(password, salt) {
        var hash = crypto.createHmac("sha512", salt); /** Hashing algorithm sha512 */
        hash.update(password);
        var value = hash.digest("hex");
        return [salt, value];
    }

    addStudents = async function (fileObj) {
        var curStudent = null;
        for (var i = 0; i < fileObj["data"].length; i++) {
            curStudent = fileObj["data"][i];
            var curSalt = crypto.randomBytes(16).toString("base64");
            curStudent["password"] = this.encryptPassword(curStudent["password"], curSalt);
            if (curStudent["track"] === "") {
                curStudent["track"] = " ";
            }
            var curDegreeReqs = null;
            var curDegreeReqPath =
                curStudent["department"] + "/" + curStudent["requirement_version_year"] + "/" + curStudent["requirement_version_semester"];
            console.info(curStudent);
            await axios
                .get(Config.URL + "/degreeReqs/get/" + curDegreeReqPath)
                .then((degreeReq) => {
                    curDegreeReqs = degreeReq.data;
                })
                .catch((err) => console.log("Error: ", err));
            if (curDegreeReqs === null || curDegreeReqs === undefined) {
                await axios
                    .get(Config.URL + "/degreeReqs/get/" + curStudent["department"])
                    .then((degreeReq) => {
                        curDegreeReqs = degreeReq.data[0];
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

            await axios
                .put(Config.URL + "/student/get/sbuID/" + curStudent["sbu_id"], {
                    firstName: curStudent["first_name"],
                    lastName: curStudent["last_name"],
                    id: curStudent["sbu_id"],
                    email: curStudent["email"],
                    gpa: 0,
                    department: curStudent["department"],
                    track: curStudent["track"],
                    reqVersionSem: curStudent["requirement_version_semester"],
                    reqVersionYear: curStudent["requirement_version_year"],
                    entrySem: curStudent["entry_semester"],
                    entryYear: curStudent["entry_year"],
                    gradSem: curStudent["graduation_semester"],
                    gradYear: curStudent["graduation_year"],
                    coursePlan: {},
                    projectOption: " ",
                    facultyAdvisor: " ",
                    proficienyReq: [],
                    degreeRequirements: curDegreeReqs,
                    curSem: "Spring",
                    curYear: "2021",
                    password: curStudent["password"],
                    graduated: false,
                    settings: " ",
                    comments: [],
                })
                .then((cur) => console.log("Added student: ", cur))
                .catch((err) => console.log("Error happened :(", err));
        }
    };

    updateStudentGrades = async function (curClassObj, student) {
        var curSemester = curClassObj["semester"] + " " + curClassObj["year"];
        var curItem = [curClassObj["section"], curClassObj["department"] + " " + curClassObj["course_num"], curClassObj["grade"]];
        if (student["coursePlan"][curSemester] === undefined) {
            student["coursePlan"][curSemester] = [];
            student["coursePlan"][curSemester].push(curItem);
        } else {
            student["coursePlan"][curSemester].push(curItem);
        }
        await axios
            .post(Config.URL + "/student/update/" + student["id"], student)
            .then((cur) => console.debug("Update student grades: ", curItem))
            .catch((err) => console.debug("Error happened :(", err));
    };

    createCourse = async function (fileObj) {
        var curKey = fileObj["semester"] + " " + fileObj["year"];
        var newSection = [fileObj["section"], fileObj["timeslot"]];
        var curCourseInfo = {};
        curCourseInfo[curKey] = [];
        curCourseInfo[curKey].push(newSection);
        await axios
            .post(Config.URL + "/courses/add", {
                department: fileObj["department"],
                courseNum: fileObj["course_num"],
                courseName: "Another CS Class",
                credits: 3,
                preReqs: [],
                courseDescription: "Description",
                yearTrends: {},
                courseInfo: curCourseInfo,
                professorNames: {},
            })
            .then((course) => console.log("Course Added ", course))
            .catch((err) => console.log(err));
    };

    updateCourse = async function (curCourse, fileObj) {
        curCourse = curCourse["data"][0];
        var curKey = fileObj["semester"] + " " + fileObj["year"];
        var newSection = [fileObj["section"], fileObj["timeslot"]];
        var newCourseInfo = curCourse["courseInfo"];
        if (newCourseInfo[curKey] === undefined) {
            newCourseInfo[curKey] = [];
        }
        newCourseInfo[curKey].push(newSection);
        curCourse["courseInfo"] = newCourseInfo;
        await axios
            .put(Config.URL + "/courses/update/classID/" + curCourse["id"], curCourse)
            .then((cur) => console.log("Update course: ", cur))
            .catch((err) => console.log("Error happened :(", err));
    };

    checkCourses = async function (fileObj) {
        // Find the course, if it exists then update it with new section and time slot
        // If the course doesn't exist then create it with an array of courseInfo
        fileObj["data"].map((curCourse) => {
            var curClassID = null;
            if (Object.keys(curCourse).length === 6) {
                curClassID = curCourse["department"] + curCourse["course_num"];
                axios
                    .get(Config.URL + "/courses/get/classID/" + curClassID)
                    .then((res) => (res["data"].length === 0 ? this.createCourse(curCourse) : this.updateCourse(res, curCourse)))
                    .catch((err) => console.log("Course not added, ", err));
            }
            return 1;
        });
    };

    checkCourseGrade(curGrade) {
        if (curGrade === "") {
            return false;
        }
        if (curGrade.match(/^(A\+|A|A-|B\+|B|B-|C\+|C)$/)) {
            return true;
        }
    }

    getAllStudentCourses(curStudent) {
        var retAllCourses = [];
        var curCoursePlan = curStudent["coursePlan"];
        for (const [key, value] of Object.entries(curCoursePlan)) {
            value.map((curClass) => {
                if (this.checkCourseGrade(curClass[2])) {
                    retAllCourses.push(curClass[1] + " " + curClass[2] + " " + key);
                }
            });
        }
        return retAllCourses;
    }

    checkSelectedCourses(curCourseArray, curCourse) {
        var curCourseCheck = null;
        for (var i = 0; i < curCourseArray.length; i++) {
            curCourseCheck = curCourseArray[i];
            if (curCourseCheck !== undefined && curCourseCheck[1].indexOf("-") > -1) {
                // NOTE  Has Range
                var curCourseSplit = curCourse.split(" ");
                var curCourseDep = curCourseSplit[0];
                var curCourseNum = curCourseSplit[1];
                var curCourseCheckNums = curCourseCheck[1].split(" ");
                if (
                    curCourseDep === curCourseCheckNums[0] &&
                    curCourseNum >= parseInt(curCourseCheckNums[1]) &&
                    curCourseNum <= parseInt(curCourseCheckNums[3])
                ) {
                    curCourseCheck[0] = curCourseCheck[0] - 1;
                    if (curCourseCheck[0] === 0) {
                        curCourseArray.splice(i, 1);
                    }
                    return true;
                }
            } else {
                var curCourseSplit = curCourse.split(" ");
                var curCourseName = curCourseSplit[0] + " " + curCourseSplit[1];
                var curCourseDep = curCourseSplit[0];
                if (curCourseCheck !== undefined && (curCourseCheck[1] === curCourseDep || curCourseCheck[1] === curCourseName)) {
                    curCourseCheck[0] = curCourseCheck[0] - 1;
                    if (curCourseCheck[0] === 0) {
                        curCourseArray.splice(i, 1);
                    }
                    return true;
                }
            }
        }
        return false;
    }

    updateStudentDegreeRequirements = async function (curStudent) {
        if (curStudent === null) {
            return 1;
        }
        var curDegreeReq = null;
        var curDegreeReqPath = curStudent["department"] + "/" + curStudent["reqVersionYear"] + "/" + curStudent["reqVersionSem"];
        await axios
            .get(Config.URL + "/degreeReqs/get/" + curDegreeReqPath)
            .then((degreeReq) => {
                curDegreeReq = degreeReq;
            })
            .catch((err) => console.log("Error: ", err));
        // TODO  Handle non existent degree requirements
        var curTrack = curDegreeReq["data"]["tracks"][curStudent["track"]];
        var allCourses = this.getAllStudentCourses(curStudent);
        var seenBool = false;
        allCourses.forEach((curCourse) => {
            seenBool = this.checkSelectedCourses(curTrack["Required Courses"], curCourse);
            if (!seenBool) {
                this.checkSelectedCourses(curTrack["Elective Courses"], curCourse);
            }
            seenBool = false;
        });

        curDegreeReq["data"]["tracks"][curStudent["track"]] = curTrack;
        curStudent["degreeRequirements"] = curDegreeReq["data"];
        curStudent["graduated"] = this.fulfillsDegreeRequirements(curStudent);
        await axios
            .post(Config.URL + "/student/update/" + curStudent["id"], curStudent)
            .then((cur) => console.log("Updated student: ", cur))
            .catch((err) => console.log("Error happened :(", err));
        return 1;
    };

    fulfillsDegreeRequirements(curStudent) {
        var curTrack = curStudent["track"];
        var curRequirements = curStudent["degreeRequirements"]["tracks"][curTrack];
        return curRequirements["Required Courses"].length == 0 && curRequirements["Elective Courses"].length == 0;
    }

    updateStudentGPA = async function (curStudent) {
        if (curStudent === null) {
            return 1;
        }
        var gradeMap = {
            "A+": 4.0,
            A: 4.0,
            "A-": 3.67,
            "B+": 3.3,
            B: 3.0,
            "B-": 2.67,
            "C+": 2.3,
            C: 2.0,
            "C-": 1.67,
            "D+": 1.3,
            D: 1,
            "D-": 0.67,
            F: 0,
        };
        var allCourses = this.getAllStudentCourses(curStudent);
        var gpaCalc = 0;
        var curGrade = "";
        var curCourseCredits = 3;
        var totalCredits = 0;
        allCourses.forEach((curCourse) => {
            // TODO  Get credits for each class
            curCourseCredits = 3;
            totalCredits += curCourseCredits;
            curGrade = curCourse.split(" ")[2];
            gpaCalc += gradeMap[curGrade] * curCourseCredits;
        });
        var gpaCalc = gpaCalc / totalCredits;
        curStudent["gpa"] = gpaCalc;
        await axios
            .post(Config.URL + "/student/update/" + curStudent["id"], curStudent)
            .then((cur) => console.log("Updated student: ", cur))
            .catch((err) => console.log("Error happened :(", err));
    };

    updateDegreeReqAndGPA = async function (curStudent) {
        await this.updateStudentDegreeRequirements(curStudent["data"]);
        await this.updateStudentGPA(curStudent["data"]);
    };

    addCourseGrades = async function (fileObj) {
        var curData = fileObj["data"];
        var curSBUIDs = [];
        for (let i = 0; i < curData.length; i++) {
            await axios
                .get(Config.URL + "/student/get/" + curData[i]["sbu_id"])
                .then(async (student) => {
                    if (!curSBUIDs.includes(curData[i]["sbu_id"])) {
                        curSBUIDs.push(curData[i]["sbu_id"]);
                    }
                    if (student["data"] != null) {
                        await this.updateStudentGrades(curData[i], student["data"]);
                    }
                })
                .catch((err) => console.log("Error: ", err));
        }

        for (let i = 0; i < curSBUIDs.length; i++) {
            await axios
                .get(Config.URL + "/student/get/" + curSBUIDs[i])
                .then((student) => {
                    if (student != null) {
                        this.updateDegreeReqAndGPA(student);
                    }
                })
                .catch((err) => console.log("Error: ", err));
        }
    };

    addAMSdegreeReq = async function (degreeReq) {
        await axios
            .put(Config.URL + "/degreeReqs/edit/AMS/" + degreeReq["Version_Year"] + "/" + degreeReq["Version_Semester"], {
                department: degreeReq["Department"],
                gpaReq: degreeReq["GPA_Requirement"],
                tracks: degreeReq["Tracks"],
                reqVersionSem: degreeReq["Version_Semester"],
                reqVersionYear: degreeReq["Version_Year"],
                timeLimit: degreeReq["Time_Limit"],
            })
            .then((ret) => console.log("ams post:", ret))
            .catch((err) => console.log("invalid AMS reqs: ", err));
    };

    addECEdegreeReq = async function (degreeReq) {
        await axios
            .put(Config.URL + "/degreeReqs/edit/ECE/" + degreeReq["Version_Year"] + "/" + degreeReq["Version_Semester"], {
                department: degreeReq["Department"],
                gpaReq: degreeReq["GPA_Requirement"],
                tracks: degreeReq["Tracks"],
                reqVersionSem: degreeReq["Version_Semester"],
                reqVersionYear: degreeReq["Version_Year"],
                timeLimit: degreeReq["GPA_Requirement"],
                thesisOption: true,
            })
            .then((ret) => console.log("ece post:", ret))
            .catch((err) => console.log("invalid ece reqs: ", err));
    };

    addBMIdegreeReq = async function (degreeReq) {
        await axios
            .put(Config.URL + "/degreeReqs/edit/BMI/" + degreeReq["Version_Year"] + "/" + degreeReq["Version_Semester"], {
                department: degreeReq["Department"],
                gpaReq: degreeReq["GPA_Requirement"],
                tracks: degreeReq["Tracks"],
                reqVersionSem: degreeReq["Version_Semester"],
                reqVersionYear: degreeReq["Version_Year"],
                timeLimit: degreeReq["Time_Limit"],
            })
            .then((ret) => console.log("bmi post:", ret))
            .catch((err) => console.log("invalid bmi reqs: ", err));
    };

    checkJSONfile(file) {
        var jsonObj;
        var reader = new FileReader();
        const self = this;
        reader.onload = function () {
            var str = reader.result;
            str.replace("\r", "");
            str.replace("\n", "");
            console.log("reader ->", str);
            console.log(" object -> ", JSON.parse(str));
            jsonObj = JSON.parse(str);
            console.log("jsonObj: ", jsonObj);
            // console.log("CHECKING JSON FILE: ", results);
            if (jsonObj["Department"] === "AMS") {
                self.addAMSdegreeReq(jsonObj);
            } else if (jsonObj["Department"] === "ECE") {
                self.addECEdegreeReq(jsonObj);
            } else if (jsonObj["Department"] === "BMI") {
                self.addBMIdegreeReq(jsonObj);
            } else if (jsonObj["Department"] === "CSE") {
            }
        };
        reader.onerror = function () {
            console.log(reader.error);
        };
        reader.readAsText(file["file"]);
    }

    checkCSVFile(results) {
        // NOTE  Courses CSV has 6 elements in each object (row), Student CSV has 13, Course Grades has 7
        var firstHeaderLen = Object.keys(results["data"][0]).length;
        switch (firstHeaderLen) {
            case 6: // Courses CSV
                this.checkCourses(results);
                break;
            case 7: // Course Grades CSV
                this.addCourseGrades(results);
                break;
            case 13: // Students CSV
                this.addStudents(results);
                break;
            default:
                console.log("File format is wrong");
        }
    }

    addCourse(course) {
        var depID = course["courseName"].split(" ");
        course["courseNum"] = depID[1].substring(0, depID[1].length - 1);
        course["name"] = course["courseName"].split(": ")[1];
        course["department"] = depID[0];
        axios
            .post(Config.URL + "/courses/add", {
                department: course["department"],
                courseNum: course["courseNum"],
                courseName: course["name"],
                semester: course["semester"], //TODO default value for now, change when model is implemented - Anthony
                year: course["year"], //TODO default value for now, change when model is implemented - Anthony
                credits: course["numOfCredits"],
                preReqs: [course["prerequisites"]],
                courseDescription: course["description"],
                yearTrends: [],
                courseInfo: [],
                professorNames: [],
            })
            .then((course) => console.debug("Course added", course))
            .catch((err) => console.debug(err));
    }
    scrapeCourseInfo(files) {
        let file = files[0].file;
        let reader = new FileReader();
        const self = this;
        let department = this.state.department;
        let semester = this.state.semester;
        let year = this.state.year;
        // let department = "CSE";
        reader.onload = function () {
            let textFile = reader.result;
            // parse
            let course_array = textFile.match(/^[A-Z]{3} \d{3}: (.+(\r?\n){1,2})+/gm);
            course_array = course_array.filter((item) => item.substring(0, 3) === department); // filter the department
            console.log(course_array);

            const courses = course_array.map((course) => {
                let course_fields = course.match(/(.+(\r?\n))+/gm);
                let courseName = course_fields[0];
                let description = course_fields[1];
                let prerequisites = []; // default no prereq
                let numOfCredits = 3; // Default value = 3

                let matches = course.match(/\d{1}(\-\d+)? credit/);
                let creditNum = matches === null ? "" : matches[0];
                if (creditNum === "") {
                    // if not found, default is 3 credits.
                    numOfCredits = 3;
                } else if (!creditNum.includes("-")) {
                    // single digit credit
                    numOfCredits = creditNum[0];
                } else {
                    // if 3 is in the range, take 3. Else, take the minimum
                    if (creditNum.substring(0, 1) > 3) {
                        numOfCredits = 3;
                    } else if (creditNum.substring(0, 1) <= 3) {
                        numOfCredits = parseInt(creditNum.substring(0, 1));
                    }
                    if (creditNum.length === 10) {
                        //1-9
                        if (creditNum.substring(0, 1) >= 3) {
                            //3-x,4-x
                            numOfCredits = parseInt(creditNum.substring(0, 1));
                        } else if (creditNum.substring(0, 1) < 3) {
                            //1-x
                            if (creditNum.substring(2, 3) > 3) {
                                //1-4
                                numOfCredits = 3;
                            } else {
                                //1-2
                                numOfCredits = parseInt(creditNum.substring(0, 1));
                            }
                        }
                    } else if (creditNum.length === 11) {
                        //1-12
                        if (creditNum.substring(0, 1) < 3) {
                            //2-11 = 3
                            numOfCredits = 3;
                        } else {
                            //5-12 = 5
                            numOfCredits = parseInt(creditNum.substring(0, 1));
                        }
                    }
                }
                let prereq_match = course.match(/Prerequisite.+/);
                let prereq_text = prereq_match === null ? "" : prereq_match[0].substring(prereq_match[0].indexOf(":"));
                let preq_corse_match = prereq_text.match(/[A-Z]{3} ?\d{3}/gm);
                let w = preq_corse_match === null ? [] : preq_corse_match;
                prerequisites = w.filter((preq) => parseInt(preq.substring(4, 5)) > 4);
                // console.log(prereq_text);
                // console.log(prerequisites);
                return {
                    courseName,
                    description,
                    numOfCredits,
                    prerequisites,
                    semester,
                    year,
                };
            });
            console.log(courses);

            var RateLimiter = require("limiter").RateLimiter;
            var limiter = new RateLimiter(50, 100);
            courses.map((course) => {
                limiter.removeTokens(1, function () {
                    self.addCourse(course);
                });
            });
        };
        reader.onerror = function () {
            console.log(reader.error);
        };
        reader.readAsText(file);
    }
    fileParse(files) {
        console.log(files);
        for (var i = 0; i < files.length; i++) {
            if (files[i]["file"]["name"].indexOf(".json") !== -1) {
                this.checkJSONfile(files[i]);
            } else if (files[i].file.type === "text/plain") {
                this.handleOpen();
                this.setFile(files);
            } else {
                Papa.parse(files[i]["file"], {
                    header: true,
                    complete: (results) => this.checkCSVFile(results),
                });
            }
        }
    }
    setFile(files) {
        this.setState({ files: files });
        console.log(this.state);
    }
    setSem(e) {
        this.setState({ semester: e.target.value });
        console.log(this.state);
    }
    setYear(e) {
        this.setState({ year: e.target.value });
        console.log(this.state);
    }
    setDepartment(e) {
        this.setState({ department: e.target.value });
    }
    handleCancle() {
        this.setState({ popFlag: false, semester: "", year: "", department: "", files: [] });
    }
    handleOpen = () => {
        this.setState({ popFlag: true });
    };
    handleClose = () => {
        this.setState({ popFlag: false });
        console.log(this.state);
        this.scrapeCourseInfo(this.state.files);
    };
    render() {
        return (
            <div>
                <Dialog open={this.state.popFlag} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Enter Following Information</DialogTitle>
                    <DialogContent>
                        <TextField id="semester" label="Semester" fullWidth onChange={(val) => this.setSem(val)} />
                        <TextField id="year" label="Year" fullWidth onChange={(val) => this.setYear(val)} />
                        <TextField id="department" label="Department" fullWidth onChange={(val) => this.setDepartment(val)} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCancle} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Enter
                        </Button>
                    </DialogActions>
                </Dialog>
                <DropzoneAreaBase onAdd={(newFiles) => this.fileParse(newFiles)} filesLimit={5} showPreviewsInDropzone={false} showFileNames={true} />
            </div>
        );
    }
}

export default FileUploadArea;
