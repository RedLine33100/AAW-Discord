import {Router} from "express";
import bodyParser from "body-parser";
import {body, param, validationResult} from "express-validator";
import {getAdmins, isAdmin, setAdmin} from "../datasource/user.js";
import {AUTH_COOKIE, decodeJWT} from "../jwt.js";
import {BEARER} from "../middleware/auth.js";

export default Router()
.get("/:discordID",param("discordID").notEmpty().isLength({max:50}),
    body("valid").isBoolean(),
    (req, res) => {
        const result = validationResult(req);

        if (result.isEmpty()) {
            isAdmin(req.params!.discordID).then(result =>
                res.status(200).send({admin: result})
            ).catch(err => res.status(400).send({error: err.message}))
        } else {
            res.status(400).send({error: result.array()});
        }
    })
    .get("/", (req, res) => {
        getAdmins().then(result => res.status(200).send(result)).catch(e => res.status(400).send({error: e.message}));
    })
    .put("/:discordID",
        bodyParser.json(),
        param("discordID").notEmpty().isLength({max:50}),
        body("valid").isBoolean(),
        (req, res) => {
            const result = validationResult(req);

            if (result.isEmpty()) {
                const authorization: string = req.headers.authorization ?? req.cookies[AUTH_COOKIE];

                if (!authorization || authorization.slice(0, BEARER.length).toLowerCase() !== BEARER) {
                    res.status(400).send({error: "Unauthorized"});
                }
                decodeJWT(authorization.split(" ")[1]).then(decodeJWT => {
                    isAdmin(<string>decodeJWT.payload.id).then(admin => {
                        if(!admin) {
                            res.status(400).send({error: "Unauthorized"});
                            return;
                        }

                        if(req.params!.discordID === (<string>decodeJWT.payload.id)) {
                            res.status(400).send({error: "Unauthorized to self"});
                            return;
                        }

                        setAdmin(req.params!.discordID, req.body.valid).then((result) => {
                            res.status(200).json("Ok");
                        }).catch(e => res.status(400).send({error: e.message}));

                    }).catch(err => {res.status(400).send({error: err.message});})
                }).catch(err => {res.status(400).send({error: err.message});});
            } else {
                res.status(400).send({error: result.array()});
            }
        })