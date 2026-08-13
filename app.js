const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send(`
        <h1>Production Website</h1>
        <h2>Version 1</h2>
        <h3>Everything is Working</h3>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
