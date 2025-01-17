import express from 'express';
import cookieParser from 'cookie-parser';
import skillsRouter from "./routes/skills.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";

const port = process.env.PORT || 8000;
const app = express();

const API_ROOT_ENDPOINT = "/api/v1";

app.set("x-powered-by", false);
app.use((req, res, next) => {
    if (process.env.ACCESS_CONTROL_ALLOW_ORIGIN) {
        res.setHeader("Access-Control-Allow-Origin", process.env.ACCESS_CONTROL_ALLOW_ORIGIN);
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.setHeader("Access-Control-Allow-Credentials", "true");
    }
    next();
})
app.use(cookieParser())
app.get("/healthcheck", (req: express.Request, res: express.Response) => {
    res.send("OK");
});
app.use(API_ROOT_ENDPOINT + "/auth", authRouter);
app.use(API_ROOT_ENDPOINT + "/skills", skillsRouter);
app.use(API_ROOT_ENDPOINT + "/users", usersRouter);

app.listen(port, () => console.log(`App listening on port ${port}`));