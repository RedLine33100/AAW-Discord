import {Router} from "express";
import {body, validationResult} from "express-validator";
import {getSkills, SetSkillResult, setSkill} from "../datasource/skill.js";
import {getUserById} from "../datasource/user.js";
import {User} from "../types/user.js";
import bodyParser from "body-parser";
import {botBasicAuth, userJwtAuth} from "../middleware/auth.js";

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
    .get("/my", userJwtAuth, (req, res) => {
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
    .put("/my",
        userJwtAuth,
        bodyParser.json(),
        body("name").notEmpty().isLength({max:100}),
        body("grade").isInt({min: 0, max: 10}).toInt(),
        (req, res) => {
            const result = validationResult(req);

            if (result.isEmpty()) {
                setSkill(req.authorization.id, req.body.name, req.body.grade)
                    .then(result => {
                        if (result === SetSkillResult.SUCCESS) {
                            res.status(200).end();
                        } else {
                            res.status(404).send({error: result});
                        }
                    }).catch(err => {
                        console.error(err);
                        res.status(500).end();
                    });
            } else {
                res.status(400).send({error: result.array()});
            }
        }
    )

    // Remove a skill for authenticated user
    .delete("/my",
        userJwtAuth,
        bodyParser.text(),
        body().notEmpty().isLength({max:100}),
        (req, res) => {
            console.log(req.body);
            const result = validationResult(req);

            if (result.isEmpty()) {
                setSkill(req.authorization.id, req.body, 0)
                    .then(result => {
                        if (result === SetSkillResult.SUCCESS) {
                            res.status(200).end();
                        } else {
                            res.status(404).send({error: result});
                        }
                    }).catch(err => {
                        console.error(err);
                        res.status(500).end();
                    });
            } else {
                res.status(400).send({error: result.array()});
            }
        }
    )