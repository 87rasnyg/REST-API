const express = require("express");
const router = express.Router();

const movieList = [{
    id: 0,
    title: "Gremlings",
    released: 1984,
    duration: 107
}];

router.get("/api/movies", (req, res) => {
    res.json(movieList);
});

module.exports = router;