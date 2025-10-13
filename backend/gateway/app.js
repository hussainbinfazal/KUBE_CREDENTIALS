import express from "express";
import expressProxy from "express-http-proxy";
const app = express();
app.use("/api/issue", expressProxy(`${process.env.ISSUE_SERVICE_URL}`));
app.use("/api/verify", expressProxy(`${process.env.VERIFY_SERVICE_URL}`));
app.use("/", (req, res) => {
    res.send("Welcome to the Gateway");
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Gateway server listening on port ${PORT}`);
});
