import React, { Component } from "react";
import { DropzoneAreaBase } from "material-ui-dropzone";
import Config from "../config.json";

const Papa = require("papaparse");
const axios = require("axios").default;

class FileUploadArea extends Component {
    constructor(props) {
        super(props);
    }

    addStudents(fileObj) {
        var curStudent = null;
        for (var i = 0; i < fileObj["data"].length; i++) {
            curStudent = fileObj["data"][i];
            console.log(curStudent);
            if (curStudent["track"] === "") {
                curStudent["track"] = " ";
            }
            axios
                .put(
                    Config.URL + "/student/get/sbuID/" + curStudent["sbu_id"],
                    {
                        firstName: curStudent["first_name"],
                        lastName: curStudent["last_name"],
                        id: curStudent["sbu_id"],
                        email: curStudent["email"],
                        gpa: 0,
                        department: curStudent["department"],
                        track: curStudent["track"],
                        reqVersionSem:
                            curStudent["requirement_version_semester"],
                        reqVersionYear: curStudent["requirement_version_year"],
                        entrySem: curStudent["entry_semester"],
                        entryYear: curStudent["entry_year"],
                        gradSem: curStudent["graduation_semester"],
                        gradYear: curStudent["graduation_year"],
                        coursePlan: {},
                        projectOption: " ",
                        facultyAdvisor: " ",
                        proficienyReq: [],
                        degreeRequirements: " ",
                        curSem: "Spring",
                        curYear: "2021",
                        password: curStudent["password"],
                        graduated: false,
                        settings: " ",
                        comments: [],
                    }
                )
                .then((cur) => console.log("Added student: ", cur))
                .catch((err) => console.log("Error happened :(", err));
        }
    }

    updateStudentGrades = async function (curClassObj, student) {
        var curSemester = curClassObj["semester"] + " " + curClassObj["year"];
        var curItem = [
            curClassObj["section"],
            curClassObj["department"] + " " + curClassObj["course_num"],
            curClassObj["grade"],
        ];
        if (student["coursePlan"][curSemester] === undefined) {
            // console.log(student["coursePlan"]);
            student["coursePlan"][curSemester] = [];
            student["coursePlan"][curSemester].push(curItem);
            // console.log(student["coursePlan"]);
        } else {
            student["coursePlan"][curSemester].push(curItem);
            // console.log(student["coursePlan"]);
        }
        await axios
            .post(Config.URL + "/student/update/" + student["id"], student)
            .then((cur) => console.log("Added student: ", cur))
            .catch((err) => console.log("Error happened :(", err));
    };

    createCourse = async function (fileObj) {
        // console.log(fileObj);
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
                credits: "3",
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
            .put(
                Config.URL + "/courses/update/classID/" + curCourse["id"],
                curCourse
            )
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
                    .then((res) =>
                        res["data"].length === 0
                            ? this.createCourse(curCourse)
                            : this.updateCourse(res, curCourse)
                    )
                    .catch((err) => console.log("Course not added, ", err));
            }
            return 1;
        });
    };

    addCourseGrades = async function (fileObj) {
        var curData = fileObj["data"];
        // console.log(process);
        for (let i = 0; i < curData.length; i++) {
            await axios
                .get(Config.URL + "/student/get/" + curData[i]["sbu_id"])
                .then((student) =>
                    this.updateStudentGrades(curData[i], student["data"])
                )
                .catch((err) => console.log("Error: ", err));
        }
    };

    addAMSdegreeReq = async function (degreeReq) {
        await axios
            .put(
                Config.URL +
                    "/degreeReqs/edit/AMS/" +
                    degreeReq["Version_Year"] +
                    "/" +
                    degreeReq["Version_Semester"],
                {
                    department: degreeReq["Department"],
                    gpaReq: degreeReq["GPA_Requirement"],
                    tracks: degreeReq["Tracks"],
                    reqVersionSem: degreeReq["Version_Semester"],
                    reqVersionYear: degreeReq["Version_Year"],
                    timeLimit: degreeReq["Time_Limit"],
                }
            )
            .then((ret) => console.log("ams post:", ret))
            .catch((err) => console.log("invalid AMS reqs: ", err));
    };

    addECEdegreeReq = async function (degreeReq) {
        await axios
            .put(
                Config.URL +
                    "/degreeReqs/edit/ECE/" +
                    degreeReq["Version_Year"] +
                    "/" +
                    degreeReq["Version_Semester"],
                {
                    department: degreeReq["Department"],
                    gpaReq: degreeReq["GPA_Requirement"],
                    tracks: degreeReq["Tracks"],
                    reqVersionSem: degreeReq["Version_Semester"],
                    reqVersionYear: degreeReq["Version_Year"],
                    timeLimit: degreeReq["GPA_Requirement"],
                    thesisOption: true,
                }
            )
            .then((ret) => console.log("ece post:", ret))
            .catch((err) => console.log("invalid ece reqs: ", err));
    };

    addBMIdegreeReq = async function (degreeReq) {
        await axios
            .put(
                Config.URL +
                    "/degreeReqs/edit/BMI/" +
                    degreeReq["Version_Year"] +
                    "/" +
                    degreeReq["Version_Semester"],
                {
                    department: degreeReq["Department"],
                    gpaReq: degreeReq["GPA_Requirement"],
                    tracks: degreeReq["Tracks"],
                    reqVersionSem: degreeReq["Version_Semester"],
                    reqVersionYear: degreeReq["Version_Year"],
                    timeLimit: degreeReq["Time_Limit"],
                }
            )
            .then((ret) => console.log("bmi post:", ret))
            .catch((err) => console.log("invalid bmi reqs: ", err));
    };

    checkJSONfile = async function (file) {
        var jsonObj;
        await axios
            .get(Config.URL + "/degreeReqs/file/" + file["file"]["name"])
            .then((data) => (jsonObj = JSON.parse(data["data"])))
            .catch((err) => console.log("axios err: ", err));

        // console.log("jsonObj: ", jsonObj);
        // console.log("CHECKING JSON FILE: ", results);
        if (jsonObj["Department"] === "AMS") {
            this.addAMSdegreeReq(jsonObj);
        } else if (jsonObj["Department"] === "ECE") {
            this.addECEdegreeReq(jsonObj);
        } else if (jsonObj["Department"] === "BMI") {
            this.addBMIdegreeReq(jsonObj);
        } else if (jsonObj["Department"] === "CSE") {
        }
    };

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
        // console.log(course);
        //fix course Num to delete colon :
        //fix course name, ID, courseNum
        // remove the \r\n

        axios
            .post(Config.URL + "/courses/add", {
                department: course["department"],
                courseNum: course["courseNum"],
                courseName: course["name"],
                credits: course["numOfCredits"],
                preReqs: [course["prerequisites"]],
                courseDescription: course["description"],
                yearTrends: {},
                courseInfo: {},
                professorNames: {},
            })
            .then((course) => console.log("Course added", course))
            .catch((err) => console.log(err));
    }

    fileParse(files) {
        console.log(files);
        // if(file)
        for (var i = 0; i < files.length; i++) {
            if (files[i]["file"]["name"].indexOf(".json") !== -1) {
                this.checkJSONfile(files[i]);
            } else if (files[i].file.type === "text/plain") {
                // parse the course information
                let file = files[0].file;
                let reader = new FileReader();

                const self = this;
                reader.onload = function () {
                    let textFile = reader.result;
                    // parse
                    let course_array = textFile.match(
                        /^[A-Z]{3} \d{3}: (.+(\r?\n){1,2})+/gm
                    );
                    const courses = course_array.map((course) => {
                        let course_fields = course.match(/(.+(\r?\n))+/gm);
                        let courseName = course_fields[0];
                        let description = course_fields[1];
                        let prerequisites = ["None"];
                        let numOfCredits = null;

                        let matches = course.match(/\d{1}(\-\d+)? credit/);
                        let creditNum = matches === null ? "" : matches[0];
                        if (!creditNum.includes("-")) {
                            // single digit credit
                            numOfCredits = creditNum[0];
                        } else {
                            // range of credit exp 0-12
                            if (creditNum.length === 10) {
                                numOfCredits = creditNum.substring(0, 3);
                            } else if (creditNum.length === 11) {
                                numOfCredits = creditNum.substring(0, 4);
                            }
                        }

                        let prereq_match = course.match(/Prerequisite.+/);
                        let prereq_text =
                            prereq_match === null ? "" : prereq_match[0];

                        console.log(prereq_text);
                        if (course.toLowerCase().includes("prerequisite")) {
                            prerequisites = prereq_text
                                .substring(prereq_text.indexOf(":") + 2)
                                .split(",");
                        }
                        // console.log(prerequisites);
                        return {
                            courseName,
                            description,
                            numOfCredits,
                            prerequisites,
                        };
                    });
                    // console.log(courses);
                    // courses.map((course) => self.addCourse(course));
                };
                reader.onerror = function () {
                    console.log(reader.error);
                };
                reader.readAsText(file);
            } else {
                Papa.parse(files[i]["file"], {
                    header: true,
                    complete: (results) => this.checkCSVFile(results),
                });
            }
        }
    }

    render() {
        return (
            <DropzoneAreaBase
                onAdd={(newFiles) => this.fileParse(newFiles)}
                filesLimit={5}
                showPreviewsInDropzone={false}
                showFileNames={true}
            />
        );
    }
}

export default FileUploadArea;
