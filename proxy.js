const express = require("express");
const app = express();

// Cookies persistentes
let cookieJar = "";

app.get("/proxy", async (req, res) => {
    try {
        const url = req.query.url;

        const respuesta = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Language": "es-ES,es;q=0.9",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
                "Referer": "https://www.argot.es/",
                "Upgrade-Insecure-Requests": "1",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "same-origin",
                "Sec-Fetch-User": "?1",
                "Cookie": cookieJar
            }
        });

        const setCookie = respuesta.headers.get("set-cookie");
        if (setCookie) cookieJar = setCookie;

        const texto = await respuesta.text();

        res.set("Access-Control-Allow-Origin", "*");
        res.send(texto);

    } catch (error) {
        res.status(500).send("Error en el proxy: " + error.toString());
    }
});

app.listen(3000, () => console.log("Proxy activo en Render"));
