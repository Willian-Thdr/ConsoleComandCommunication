const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const sourcePath = path.join(__dirname, "..");

const server = http.createServer((req, res) => {
    let filePath;

    if (req.url === "/") {
        filePath = path.join(sourcePath, "view", "index.html");
    }

    else if (req.url === "/style/index.css") {
        filePath = path.join(sourcePath, "style", "index.css");
    }

    else if (req.url === "/renderer.js") {
        filePath = path.join(sourcePath, "view", "renderer.js");
    }

    else {
        res.writeHead(404, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end("404 - Arquivo não encontrado");
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            res.end("Erro ao carregar arquivo");
            return;
        }

        let contentType = "text/plain";

        if (filePath.endsWith(".html")) {
            contentType = "text/html";
        }

        if (filePath.endsWith(".css")) {
            contentType = "text/css";
        }

        if (filePath.endsWith(".js")) {
            contentType = "text/javascript";
        }

        res.writeHead(200, {
            "Content-Type": contentType
        });

        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});