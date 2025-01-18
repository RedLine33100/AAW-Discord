import {Router} from "express";
import {body, param, validationResult} from "express-validator";
import {deleteSession, getSession, searchSessions, updateSession} from "../datasource/session.js";
import bodyParser from "body-parser";
import {BEARER} from "../middleware/auth.js";
import {AUTH_COOKIE, decodeJWT} from "../jwt.js";
import {isAdmin} from "../datasource/user.js";

export default Router()

    // Get the list of users
    .get("/search/:discordID",
        param("discordID").notEmpty().isLength({max:50}),
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

                        searchSessions(req.params!.discordID).then(allSessions => {
                            if(allSessions){
                                res.status(200).send(allSessions);
                                return;
                            }
                            res.status(200).send([]);
                        }).catch((err) => res.status(400).send({error: err.message}))

                    }).catch(err => {res.status(400).send({error: err.message});})
                }).catch(err => {res.status(400).send({error: err.message});});

            } else {
                res.status(400).send({error: result.array()});
            }
    })

    .get("/:sessionID",
        param("sessionID").notEmpty().isLength({max:50}),
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

                        getSession(req.params!.sessionID).then(sess=>{
                            if(sess){
                                res.status(200).send(sess);
                                return;
                            }else{
                                res.status(400).send({error: "Session not found"});
                            }
                        }).catch(err => res.status(400).send({error: err.message}))

                    }).catch(err => {res.status(400).send({error: err.message});})
                }).catch(err => {res.status(400).send({error: err.message});});
            } else {
                res.status(400).send({error: result.array()});
            }
        })

    .put("/:sessionID",
        bodyParser.json(),
        param("sessionID").notEmpty().isLength({max:50}),
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

                        updateSession(req.params!.sessionID, {valid: req.body.valid}).then(result => {
                            if(result){
                                res.status(200).send(result);
                                return
                            }else{
                                res.status(404).send({error: "Session not found"});
                            }
                        });

                    }).catch(err => {res.status(400).send({error: err.message});})
                }).catch(err => {res.status(400).send({error: err.message});});
            } else {
                res.status(400).send({error: result.array()});
            }
        })

.delete("/:sessionID",
    param("sessionID").notEmpty().isLength({max:50}),
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

                    deleteSession(req.params!.sessionID).then(session=>{
                        if(session){
                            res.status(200).send(session);
                        }else {
                            res.status(400).send({error: "Session not found"});
                        }
                    })

                }).catch(err => {res.status(400).send({error: "Unauthorized"});})
            }).catch(err => {res.status(400).send({error: "Unauthorized"});});
        } else {
            res.status(400).send({error: result.array()});
        }
    })