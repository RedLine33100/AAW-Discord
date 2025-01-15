import {Router} from "express";
import {body, validationResult} from "express-validator";
import {jwtAuth} from "../jwt.js";
import {getSkills} from "../datasource/skill.js";

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
    // TODO Implementation
    .get("/my", jwtAuth, (req, res) => {
        res.status(500).send("Not implemented");
    })

    // Set a skill for authenticated user
    // TODO Implementation
    .put("/my",
        body().notEmpty().isLength({max:100}),
        jwtAuth,
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
    // TODO Implementation
    .delete("/my",
        body().notEmpty().isLength({max:100}),
        jwtAuth,
        (req, res) => {
            const result = validationResult(req);

            if (result.isEmpty()) {
                res.status(500).send("Not implemented");
            } else {
                res.status(500).send({error: result.array()});
            }
        }
    )