import React, { Component } from "react";
import { Grid, MenuItem, FormControl, Button, Select, InputLabel, TextField, Typography, Input } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import GPDHeader from "./GPDHeader";
import Config from "../config.json";

const axios = require("axios").default;
const maxClassesList = [...Array(10).keys()];
const timeConstraintsList = [
    "MWF 08:00AM-08:53AM",
    "MWF 09:00AM-09:53AM",
    "MWF 10:00AM-10:53AM",
    "MWF 11:00AM-11:53AM",
    "MWF 12:00PM-12:53PM",
    "MWF 02:30PM-03:23PM",
    "MWF 03:30PM-04:23PM",
    "MW 08:30AM-9:50AM",
    "MW 02:30PM-03:50PM",
    "MW 04:00PM-05:20PM",
    "MW 05:30PM-06:50PM",
    "MW 07:00PM-08:20PM",
    "MW 08:30PM-09:50PM",
    "MF 01:00PM-02:20PM",
    "TUTH 08:30AM-9:50AM",
    "TUTH 10:00AM-11:20AM",
    "TUTH 11:30AM-12:50PM",
    "TUTH 01:00PM-02:20PM",
    "TUTH 02:30PM-03:50PM",
    "TUTH 04:00PM-05:20PM",
    "TUTH 05:30PM-06:50PM",
    "TUTH 07:00PM-08:20PM",
    "TUTH 08:30PM-09:50PM",
];
export default class SuggestCoursePlanView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curGPD: this.props.curGPD,
            allCourses: [],
            curMaxCourses: 4,
            curTimeConstraints: [],
            curPreferredCourses: [],
            curAvoidedCourses: [],
        };
    }

    componentDidMount() {
        this.getAllCourses();
    }

    getAllCourses = async function () {
        await axios
            .get(Config.URL + "/courses")
            .then((response) => {
                var coursesArr = [];
                var curCourse = undefined;
                var curName = "";
                response.data.forEach((course) => {
                    curName = course["department"] + " " + course["courseNum"] + " " + course["courseName"];
                    curCourse = { title: curName };
                    coursesArr.push(curCourse);
                });
                this.setState({ allCourses: coursesArr });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleMaxCourses = (e) => {
        this.setState({ curMaxCourses: e.target.value });
    };

    handleTimeChange = (e) => {
        this.setState({ curTimeConstraints: e.target.value });
    };

    handlePreferredChange = (e) => {
        var newPreferredCourseArr = [];
        var curCourseSplit = [];
        var curCourseID = "";
        e.forEach((curCourse) => {
            curCourseSplit = curCourse.title.split(" ");
            curCourseID = curCourseSplit[0] + curCourseSplit[1];
            newPreferredCourseArr.push(curCourseID);
        });
        this.setState({ curPreferredCourses: newPreferredCourseArr });
    };

    handleAvoidedChange = (e) => {
        var newAvoidedCourseArr = [];
        var curCourseSplit = [];
        var curCourseID = "";
        e.forEach((curCourse) => {
            curCourseSplit = curCourse.title.split(" ");
            curCourseID = curCourseSplit[0] + curCourseSplit[1];
            newAvoidedCourseArr.push(curCourseID);
        });
        this.setState({ curAvoidedCourses: newAvoidedCourseArr });
    };

    render() {
        console.info(this.state);
        return (
            <>
                <GPDHeader curGPD={this.state.curGPD} />
                <Grid container spacing={1} direction="column" justify="center" style={{ width: "95%" }}>
                    <Grid item xs={12} style={{ marginTop: "13%", marginLeft: "22%" }}>
                        <Typography style={{ marginBottom: "20px", marginLeft: "19%", fontSize: "30px", fontWeight: "bold" }}>
                            Input Constraints to Create Course Plan(s)
                        </Typography>
                        <FormControl variant="outlined" style={{ width: "36%", marginRight: "28px" }}>
                            <InputLabel>Courses Per Semester</InputLabel>
                            <Select label="Courses Per Semester" onChange={this.handleMaxCourses}>
                                {maxClassesList.map((maxClasses) => (
                                    <MenuItem value={maxClasses + 1}>{maxClasses + 1}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" style={{ width: "36%", marginRight: "28px" }}>
                            <InputLabel>Time Constraints</InputLabel>
                            <Select multiple value={this.state.curTimeConstraints} label="Time Constraints" onChange={this.handleTimeChange}>
                                {timeConstraintsList.map((timeConstraints) => (
                                    <MenuItem value={timeConstraints}>{timeConstraints}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Autocomplete
                            multiple
                            style={{ marginTop: "20px", width: "74%" }}
                            limitTags={4}
                            id="multiple-limit-tags"
                            options={this.state.allCourses}
                            getOptionLabel={(option) => option.title}
                            onChange={(event, newValue) => {
                                this.handlePreferredChange(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" label="Preferred Courses" placeholder="Preferred Courses" />
                            )}
                        />
                        <Autocomplete
                            multiple
                            style={{ marginTop: "20px", width: "74%" }}
                            limitTags={4}
                            id="multiple-limit-tags"
                            options={this.state.allCourses}
                            getOptionLabel={(option) => option.title}
                            onChange={(event, newValue) => {
                                this.handleAvoidedChange(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" label="Avoided Courses" placeholder="Avoided Courses" />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} style={{ marginLeft: "35%" }}>
                        <Button type="button" variant="contained" style={{ fontSize: "20px", marginRight: "20px", width: "50%" }}>
                            Suggest Course Plan Mode
                        </Button>
                        <br></br>
                        <Button type="button" variant="contained" color="primary" style={{ fontSize: "20px", marginTop: "15px", width: "50%" }}>
                            Smart Suggestion Mode
                        </Button>
                    </Grid>
                </Grid>
            </>
        );
    }
}

var top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    { title: "The Lord of the Rings: The Return of the King", year: 2003 },
    { title: "The Good, the Bad and the Ugly", year: 1966 },
    { title: "Fight Club", year: 1999 },
    { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
    { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
    { title: "Forrest Gump", year: 1994 },
    { title: "Inception", year: 2010 },
    { title: "The Lord of the Rings: The Two Towers", year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: "Goodfellas", year: 1990 },
    { title: "The Matrix", year: 1999 },
    { title: "Seven Samurai", year: 1954 },
    { title: "Star Wars: Episode IV - A New Hope", year: 1977 },
    { title: "City of God", year: 2002 },
    { title: "Se7en", year: 1995 },
    { title: "The Silence of the Lambs", year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: "Life Is Beautiful", year: 1997 },
    { title: "The Usual Suspects", year: 1995 },
    { title: "Léon: The Professional", year: 1994 },
    { title: "Spirited Away", year: 2001 },
    { title: "Saving Private Ryan", year: 1998 },
    { title: "Once Upon a Time in the West", year: 1968 },
    { title: "American History X", year: 1998 },
    { title: "Interstellar", year: 2014 },
    { title: "Casablanca", year: 1942 },
    { title: "City Lights", year: 1931 },
    { title: "Psycho", year: 1960 },
    { title: "The Green Mile", year: 1999 },
    { title: "The Intouchables", year: 2011 },
    { title: "Modern Times", year: 1936 },
    { title: "Raiders of the Lost Ark", year: 1981 },
    { title: "Rear Window", year: 1954 },
    { title: "The Pianist", year: 2002 },
    { title: "The Departed", year: 2006 },
    { title: "Terminator 2: Judgment Day", year: 1991 },
    { title: "Back to the Future", year: 1985 },
    { title: "Whiplash", year: 2014 },
    { title: "Gladiator", year: 2000 },
    { title: "Memento", year: 2000 },
    { title: "The Prestige", year: 2006 },
    { title: "The Lion King", year: 1994 },
    { title: "Apocalypse Now", year: 1979 },
    { title: "Alien", year: 1979 },
    { title: "Sunset Boulevard", year: 1950 },
    { title: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb", year: 1964 },
    { title: "The Great Dictator", year: 1940 },
    { title: "Cinema Paradiso", year: 1988 },
    { title: "The Lives of Others", year: 2006 },
    { title: "Grave of the Fireflies", year: 1988 },
    { title: "Paths of Glory", year: 1957 },
    { title: "Django Unchained", year: 2012 },
    { title: "The Shining", year: 1980 },
    { title: "WALL·E", year: 2008 },
    { title: "American Beauty", year: 1999 },
    { title: "The Dark Knight Rises", year: 2012 },
    { title: "Princess Mononoke", year: 1997 },
    { title: "Aliens", year: 1986 },
    { title: "Oldboy", year: 2003 },
    { title: "Once Upon a Time in America", year: 1984 },
    { title: "Witness for the Prosecution", year: 1957 },
    { title: "Das Boot", year: 1981 },
    { title: "Citizen Kane", year: 1941 },
    { title: "North by Northwest", year: 1959 },
    { title: "Vertigo", year: 1958 },
    { title: "Star Wars: Episode VI - Return of the Jedi", year: 1983 },
    { title: "Reservoir Dogs", year: 1992 },
    { title: "Braveheart", year: 1995 },
    { title: "M", year: 1931 },
    { title: "Requiem for a Dream", year: 2000 },
    { title: "Amélie", year: 2001 },
    { title: "A Clockwork Orange", year: 1971 },
    { title: "Like Stars on Earth", year: 2007 },
    { title: "Taxi Driver", year: 1976 },
    { title: "Lawrence of Arabia", year: 1962 },
    { title: "Double Indemnity", year: 1944 },
    { title: "Eternal Sunshine of the Spotless Mind", year: 2004 },
    { title: "Amadeus", year: 1984 },
    { title: "To Kill a Mockingbird", year: 1962 },
    { title: "Toy Story 3", year: 2010 },
    { title: "Logan", year: 2017 },
    { title: "Full Metal Jacket", year: 1987 },
    { title: "Dangal", year: 2016 },
    { title: "The Sting", year: 1973 },
    { title: "2001: A Space Odyssey", year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: "Toy Story", year: 1995 },
    { title: "Bicycle Thieves", year: 1948 },
    { title: "The Kid", year: 1921 },
    { title: "Inglourious Basterds", year: 2009 },
    { title: "Snatch", year: 2000 },
    { title: "3 Idiots", year: 2009 },
    { title: "Monty Python and the Holy Grail", year: 1975 },
];
