import {Router} from "express";
import {getSkills} from "../datasource.js";

export default Router()

    // Get the list of skills
    .get("/", (req, res) => {
        getSkills()
            .then(skills => res.send(skills))
            .catch(err => {
                console.error(err);
                res.status(500).end();
            });
    })

    // Get or manage authenticated user's skills
    // TODO