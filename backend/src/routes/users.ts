import {Router} from "express";
import {body, param, query, validationResult} from "express-validator";
import {findUsersByName, getUserById, getUsers} from "../datasource/user.js";
import {User} from "../types/user.js";
import {botBasicAuth, userJwtAuth} from "../middleware/auth.js";
import bodyParser from "body-parser";
import {setSkill, SetSkillResult} from "../datasource/skill.js";

export default Router()

    // Get the list of users
    .get("/",
        query("offset").optional().isInt({min: 0}).toInt(),
        query("limit").optional().isInt({min: 1, max: 200}).toInt(),
        query("skills").optional().isBoolean().toBoolean(),
        (req, res) => {
            const result = validationResult(req);

            if (result.isEmpty()) {
                const offset = req.query!.offset ?? 0;
                const limit = req.query!.limit ?? 25;
                const skills = req.query!.skills ?? false;

                getUsers(offset, limit, skills)
                    .then(users => res.send(users))
                    .catch(err => {
                        console.error(err);
                        res.status(500).end();
                    });
            } else {
                res.status(400).send({error: result.array()});
            }
    })

    // Get information about authenticated user
    .get("/me", userJwtAuth, (req, res) => {
        getUserById(req.authorization.id)
            .then((user?: User) => {
                if (user) {
                    res.send(user);
                } else {
                    res.status(500).end();
                }
            }).catch(reason => {
                console.log(reason);
                res.status(500).end();
            }
        );
    })

    // Find users by name
    .get("/search/:name",
        query("offset").optional().isInt({min: 0}).toInt(),
        query("limit").optional().isInt({min: 1, max: 200}).toInt(),
        param("name").isLength({min: 1}),
        (req, res) => {
            const result = validationResult(req);

            if (result.isEmpty()) {
                const name = req.params!.name;
                const offset = req.query!.offset ?? 0;
                const limit = req.query!.limit ?? 25;

                findUsersByName(name, offset, limit)
                    .then(users => res.send(users))
                    .catch(err => {
                        console.error(err);
                        res.status(500).end();
                    });
            } else {
                res.status(400).send({error: result.array()});
            }
    })

    // Get information about a user
    .get("/:discordId",
        param("discordId").isNumeric(),
        (req, res) => {
            const result = validationResult(req);

            if (result.isEmpty()) {
                getUserById(req.params!.discordId)
                    .then(user => {
                        if (user) {
                            res.send(user);
                        } else {
                            res.status(404).end();
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).end();
                    });
            } else {
                res.status(400).send({error: result.array()});
            }
    })

    // Set a skill for given user
    .put("/:discordId/skills",
        botBasicAuth,
        bodyParser.json(),
        param("discordId").isNumeric(),
        body("name").notEmpty().isLength({max:100}),
        body("grade").isInt({min: 0, max: 10}).toInt(),
        (req, res) => {
            const result = validationResult(req);

            if (result.isEmpty()) {
                setSkill(req.params.discordId, req.body.name, req.body.grade)
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
    );
