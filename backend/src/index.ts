import express from 'express';
import {hello} from "./test.js";

const port = process.env.PORT || 8000;
const app = express();

app.get("/hello", (req: express.Request, res: express.Response) => {
    res.send(hello())
});
app.listen(port, () => console.log(`App listening on port ${port}`));