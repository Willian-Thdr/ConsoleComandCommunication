const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "Source", "view", "index.html")
    );
});

app.use(express.static(path.join(__dirname, "Source")));

app.use(express.json());

app.post("/api/client-error", (req, res) => {
    console.error("ERROR");
    console.error(req.body);

    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
});
