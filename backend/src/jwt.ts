import * as jose from "jose";
import {RequestHandler} from "express";

export const AUTH_COOKIE = "access_token";

const JWT_ALGORITHM = "HS256";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function signJWT(payload: any) {
    return await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: JWT_ALGORITHM })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(JWT_SECRET);
}

export async function decodeJWT(jwt: string) {
    const {payload, protectedHeader} = await jose.jwtVerify(jwt, JWT_SECRET);
    return {payload, protectedHeader};
}

export const jwtAuth: RequestHandler = async (req, res, next) => {
    try {
        const authorization: string = req.headers.authorization ?? req.cookies[AUTH_COOKIE];

        if (authorization) {
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