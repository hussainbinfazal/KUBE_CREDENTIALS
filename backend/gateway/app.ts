import express, { Application, Request, Response } from "express";
import expressProxy from "express-http-proxy";

const app: Application = express();

app.use("/api/issue", expressProxy(`${process.env.ISSUE_SERVICE_URL}`));
app.use("/api/verify", expressProxy(`${process.env.VERIFY_SERVICE_URL}`));
app.use("/", (req: Request, res: Response) => {
  res.send("Welcome to the Gateway");
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Gateway server listening on port ${PORT}`);
});