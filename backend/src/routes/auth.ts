import {Router} from "express";
import {query, validationResult} from "express-validator";

export default Router()

    // Start the authorization process with Discord OAuth2
    // HTTP redirect to the Discord OAuth2 authorization server
    .get("/", (req, res) => {
        // TODO redirect
        res.status(500).send("Not implemented");
    })

    // Discord's authorization server redirects the user here. The query string contains the authorization code.
    .get("/callback",
        query("code").isString().notEmpty(),
        (req, res) => {
            const validation = validationResult(req);

            if (validation.isEmpty()) {
                // TODO request a token using the code
                // TODO get Discord ID
                // TODO other things... (JWT, create session ID...)
                // TODO redirect to the front-end
                res.status(500).send("Not implemented");
            } else {
                res.status(400).send({error: validation.array()})
            }
        }
    );