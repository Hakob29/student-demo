"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db = {
    courses: [
        { id: 1, title: "JS" },
        { id: 2, title: "HTML" },
        { id: 3, title: "CSS" },
        { id: 4, title: "Front-end" },
        { id: 5, title: "Back-end" },
    ],
};
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
dotenv_1.default.config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
//Get Courses By ID
app.get("/courses/:id", (req, res) => {
    const existedCourse = db.courses.filter((course) => course.id === Number(req.params.id));
    if (existedCourse.length === 0) {
        res.status(404).send("Not Found!");
    }
    else {
        res.send(existedCourse[0]);
    }
});
//Get Courses By Tytle or All Courses
app.get("/courses", (req, res) => {
    var _a;
    const title = (_a = req.query.title) === null || _a === void 0 ? void 0 : _a.toString().toLocaleLowerCase();
    if (title === undefined) {
        setTimeout(() => {
            res.send(db.courses);
        }, 2000);
        return;
    }
    const existedCourse = db.courses.filter((course) => course.title.toLocaleLowerCase().indexOf(title) > -1);
    if (existedCourse.length === 0) {
        res.status(404).send("Not Found!");
    }
    else {
        res.send(existedCourse);
    }
});
//Post New Courses
app.post("/courses", (req, res) => {
    if (!req.body.title) {
        res.status(400).send("Give a title!");
        return;
    }
    const newCourse = {
        id: +new Date(),
        title: req.body.title,
    };
    db.courses.push(newCourse);
    res.send(`New Course is Added!}`);
});
//Delete By ID
app.delete("/courses/:id", (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send("Please give a ID!");
        return;
    }
    db.courses = db.courses.filter((course) => course.id !== Number(id));
    res.status(200).send(db.courses);
});
//Update Courses By ID
app.put("/courses/:id", (req, res) => {
    if (!req.body.title) {
        res.status(401).send("Please enter a new Course!");
        return;
    }
    db.courses = db.courses.map((course) => {
        if (course.id === Number(req.params.id)) {
            course.title = req.body.title;
        }
        return course;
    });
    res.status(200).send(db.courses);
});
app.listen(PORT, () => {
    console.log(`Server has been started on ${HOST + PORT}`);
});
