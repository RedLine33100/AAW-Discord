import {Router} from "express";
import {body, validationResult} from "express-validator";
import {jwtAuth} from "../jwt.js";
import {getSkills} from "../datasource/skill.js";
import {getUserById} from "../datasource/user.js";
import {User} from "../types/user.js";

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
    .get("/my", jwtAuth, (req, res) => {
        getUserById(req.authorization.id)
            .then((user?: User) => {
                if (user) {
                    res.send(user.skills);
                } else {
                    res.status(500).end();
                }
            }).catch(reason => {
                console.error(reason);
                res.status(500).end();
            }
        );
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