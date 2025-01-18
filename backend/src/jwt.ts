import * as jose from "jose";

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
