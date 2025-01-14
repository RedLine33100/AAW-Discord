import express from 'express';
import skillsRouter from "./routes/skills.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";

const port = process.env.PORT || 8000;
const app = express();

const API_ROOT_ENDPOINT = "/api/v1";

app.get("/healthcheck", (req: express.Request, res: express.Response) => {
    res.send("OK");
});
app.use(API_ROOT_ENDPOINT + "/auth", authRouter);
app.use(API_ROOT_ENDPOINT + "/skills", skillsRouter);
app.use(API_ROOT_ENDPOINT + "/users", usersRouter);

app.listen(port, () => console.log(`App listening on port ${port}`));