import {Router} from "express";
import {param, query, validationResult} from "express-validator";
import {jwtAuth} from "../jwt.js";
import {findUsersByName, getUserById, getUsers} from "../datasource/user.js";
import {User} from "../types/user.js";

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
    .get("/me", jwtAuth, (req, res) => {
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
    });
