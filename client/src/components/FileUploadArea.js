import React, { Component } from "react";
import { DropzoneAreaBase } from "material-ui-dropzone";
import Config from "../config.json";

const Papa = require("papaparse");
const axios = require("axios").default;

class FileUploadArea extends Component {
    addStudents(fileObj) {
        var curStudent = null;
        for (var i = 0; i < fileObj["data"].length; i++) {
            curStudent = fileObj["data"][i];
            console.log(curStudent);
            if (curStudent["track"] === "") {
                curStudent["track"] = " ";
            }
            axios
                .post(Config.URL + "/student/add", {
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
                    degreeRequirements: " ",
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
    }

    updateStudentGrades = async function (curClassObj, student) {
        var curSemester = curClassObj["semester"] + " " + curClassObj["year"];
        var curItem = [
            curClassObj["section"],
            curClassObj["department"] + " " + curClassObj["course_num"],
            curClassObj["grade"],
        ];
        if (student["coursePlan"][curSemester] === undefined) {
            console.log(student["coursePlan"]);
            student["coursePlan"][curSemester] = [];
            student["coursePlan"][curSemester].push(curItem);
            console.log(student["coursePlan"]);
        } else {
            student["coursePlan"][curSemester].push(curItem);
            console.log(student["coursePlan"]);
        }
        await axios
            .post(Config.URL + "/student/update/" + student["id"], student)
            .then((cur) => console.log("Added student: ", cur))
            .catch((err) => console.log("Error happened :(", err));
    };

    createCourse = async function (fileObj) {
        console.log(fileObj);
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
        console.log(process);
        for (let i = 0; i < curData.length; i++) {
            await axios
                .get(Config.URL + "/student/get/" + curData[i]["sbu_id"])
                .then((student) =>
                    this.updateStudentGrades(curData[i], student["data"])
                )
                .catch((err) => console.log("Error: ", err));
        }
    };

    checkFile(results) {
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

    fileParse(file) {
        console.log(file);
        for (var i = 0; i < file.length; i++) {
            Papa.parse(file[i]["file"], {
                header: true,
                complete: (results) => this.checkFile(results),
            });
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
