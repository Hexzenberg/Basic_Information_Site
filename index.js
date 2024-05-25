const http = require("http");
const fs = require("fs").promises;
const path = require("path");

http.createServer(async function (req, res) {
    let filePath;

    if (req.url === "/") {
        filePath = path.join(__dirname, 'index.html');
    }
    else if (req.url === "/about") {
        filePath = path.join(__dirname, 'about.html');
    }
    else if (req.url === "/contact-me") {
        filePath = path.join(__dirname, 'contact-me.html');
    }
    else {
        filePath = path.join(__dirname, '404.html');
    }

    try {
        const data = await fs.readFile(filePath);
        res.setHeader('Content-Type', 'text/html');
        res.write(data);
        res.end();
    } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
    }
}).listen(8080);
