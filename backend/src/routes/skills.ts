import {Router} from "express";
import {getSkills} from "../datasource.js";
import {body, validationResult} from "express-validator";

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

    // Get authenticated user's skills
    // TODO Authentication middleware
    .get("/my", (req, res) => {
        res.status(500).send("Not implemented");
    })

    // Set a skill for authenticated user
    // TODO Authentication middleware
    .put("/my",
        body().notEmpty().isLength({max:100}),
        (req, res) => {
            const result = validationResult(req);

            if (result.isEmpty()) {
                res.status(500).send("Not implemented");
            } else {
                res.status(500).send({error: result.array()});
            }
        }
    )

    // Remove a skill for authenticated user
    // TODO Authentication middleware
    .delete("/my",
        body().notEmpty().isLength({max:100}),
        (req, res) => {
            const result = validationResult(req);

            if (result.isEmpty()) {
                res.status(500).send("Not implemented");
            } else {
                res.status(500).send({error: result.array()});
            }
        }
    )