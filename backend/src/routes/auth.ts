import {Router} from "express";
import {query, validationResult} from "express-validator";
import axios from "axios";
import {AUTH_COOKIE, signJWT} from "../jwt.js";
import {insertUserIfNotExist} from "../datasource/user.js";
import {ObjectId} from 'mongodb';
import {MONGO_MANAGER} from "../index.js";

const DISCORD_AUTHORIZATION_URL = "https://discord.com/oauth2/authorize";
const DISCORD_TOKEN_URL = "https://discord.com/api/oauth2/token";
const DISCORD_USER_DATA_URL = "https://discord.com/api/v10/users/@me";

var mongo = new MongoManager();
import {ObjectId} from "mongodb";

export default Router()

    // Start the authorization process with Discord OAuth2
    // HTTP redirect to the Discord OAuth2 authorization server
    .get("/", (req, res) => {
        const authorizationUrl = new URL(DISCORD_AUTHORIZATION_URL);
        authorizationUrl.searchParams.set("client_id", process.env.DISCORD_CLIENT_ID!);
        authorizationUrl.searchParams.set("response_type", "code");
        authorizationUrl.searchParams.set("redirect_uri", process.env.DISCORD_REDIRECT_URI!);
        authorizationUrl.searchParams.set("scope", "identify");

        res.redirect(authorizationUrl.toString());
    })

    // Discord's authorization server redirects the user here. The query string contains the authorization code.
    .get("/callback",
        query("code").isString().notEmpty(),
        async (req, res) => {
            const redirectUrl = new URL(process.env.FRONTEND_REDIRECT_URI!);
            const validation = validationResult(req);

            if (validation.isEmpty()) {
                try {
                    // Request a token using the code
                    const tokenResponse = await axios.post(
                        DISCORD_TOKEN_URL,
                        new URLSearchParams({
                            client_id: process.env.DISCORD_CLIENT_ID!,
                            client_secret: process.env.DISCORD_CLIENT_SECRET!,
                            grant_type: "authorization_code",
                            code: req.query!.code,
                            redirect_uri: process.env.DISCORD_REDIRECT_URI!,
                        }),
                        {
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                        }
                    );

                    // Get Discord ID
                    const userDataResponse = await axios.get(
                        DISCORD_USER_DATA_URL,
                        {
                            headers: {
                                "Authorization": `${tokenResponse.data.token_type} ${tokenResponse.data.access_token}`,
                            }
                        }
                    );

                    var expire = new Date();
                    expire.setDate(expire.getDate() + 24 * 60 * 60 * 1000);

                    var id : ObjectId | null = await mongo.insertData("user_auth", "token", {
                        discordUSERID: userDataResponse.data.id,
                        expireDate: expire.getTime(),
                        valid: true,
                    })

                    if(id == null){
                        throw new Error("DB insert error");
                    }

                    // JSON Web Token
                    const jwt = await signJWT({
                        id: userDataResponse.data.id,
                        tokenID: id.toString(),
                        username: userDataResponse.data.username
                    });

                    console.log("SENDONG COOKIES");
                    res.setHeader("Access-Control-Expose-Headers", "Set-Cookie")
                    res.setHeader('Access-Control-Allow-Credentials', "true");
                    res.cookie(AUTH_COOKIE, `Bearer ${jwt}`, {
                        httpOnly: false,
                        maxAge: 24 * 60 * 60 * 1000,
                    });

                    // Insert in Google Sheets
                    await insertUserIfNotExist(userDataResponse.data.username, userDataResponse.data.id);
                    res.redirect(redirectUrl.toString());
                    return;

                } catch(reason) {
                    console.error(reason);
                    res.status(500).send("Internal Server Error");
                    return;
                }
            } else {
                redirectUrl.searchParams.set("error", req.query?.error ?? "unknown");
                redirectUrl.searchParams.set("error_description", req.query?.error_description ?? "unknown");
            }

            res.redirect(redirectUrl.toString());
        }
    );