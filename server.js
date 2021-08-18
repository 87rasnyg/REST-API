const express = require("express");
const app = express();
const movieRouter = require("./movies.router");

app.use(express.json());

app.use(movieRouter);

app.listen(3000, () => {
    console.log("surver is running at: http://localhost:3000");
});