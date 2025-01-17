import {RequestHandler, Response} from "express";
import {AUTH_COOKIE, decodeJWT} from "../jwt.js";

const UNAUTHORIZED = "Unauthorized";

const BEARER = "bearer";
const BASIC = "basic";

const BOT_USERNAME = "bot";
const BOT_CREDENTIALS = btoa(`${BOT_USERNAME}:${process.env.BOT_SECRET}`);

export const userJwtAuth: RequestHandler = async (req, res, next) => {
    const unauthorizedResponse = (res: Response, reason: string) => {
        res.setHeader('WWW-Authenticate', 'Bearer realm="user"');
        res.status(401).send({
            status: UNAUTHORIZED,
            reason
        });
    };

    try {
        const authorization: string = req.headers.authorization ?? req.cookies[AUTH_COOKIE];

        if (authorization && authorization.slice(0, BEARER.length).toLowerCase() === BEARER) {
            const {payload} = await decodeJWT(authorization.split(" ")[1]);
            req.authorization = payload;
            next();
        } else {
            unauthorizedResponse(res, "Missing auth token");
        }
    } catch (reason) {
        unauthorizedResponse(res, "Invalid auth token");
    }
}

export const botBasicAuth: RequestHandler = async (req, res, next) => {
    const authorization: string = req.headers.authorization ?? req.cookies[AUTH_COOKIE];

    if (process.env.BOT_SECRET
        && authorization
        && authorization.slice(0, BASIC.length).toLowerCase() === BASIC
        && authorization.split(" ")[1] === BOT_CREDENTIALS
    ) {
        next()
    } else {
        res.setHeader('WWW-Authenticate', 'Basic realm="bot"');
        res.status(401).send({
            status: UNAUTHORIZED,
            reason: "Missing or invalid credentials"
        });
    }
}