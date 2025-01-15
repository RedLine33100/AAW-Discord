import {RequestHandler} from "express";
import {AUTH_COOKIE, decodeJWT} from "./jwt.js";

export const jwtAuth: RequestHandler = async (req, res, next) => {
    try {
        const authorization: string = req.headers.authorization ?? req.cookies[AUTH_COOKIE];

        if (authorization && authorization.split(" ")[0] === "Bearer") {
            const {payload, protectedHeader} = await decodeJWT(authorization.split(" ")[1]);
            req.authorization = payload;
            next();
        } else {
            res.status(401).send("Unauthorized (missing auth token)");
        }
    } catch (reason) {
        res.status(401).send("Unauthorized (invalid auth token)");
    }
}

export const botBasicAuth: RequestHandler = async (req, res, next) => {
    try {
        const authorization: string = req.headers.authorization ?? req.cookies[AUTH_COOKIE];

        if (authorization && authorization.split(" ")[0] === "Basic" && authorization.split(" ")[1] === process.env.BOT_SECRET!) {
            next();
        } else {
            res.status(401).send("Unauthorized (missing auth token)");
        }
    } catch (reason) {
        res.status(401).send("Unauthorized");
    }
}