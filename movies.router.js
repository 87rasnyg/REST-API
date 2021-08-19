const express = require("express");
const { getMovies, postMovie, updateMovie, deleteMovie } = require("./movie.controllers");
const { saveMovieValidation, updateMovieValidation } = require("./movie.validation");

const router = express.Router();

router.get("/api/movies", getMovies);
router.post("/api/movies", saveMovieValidation, postMovie);
router.put("/api/movies/:id", updateMovieValidation, updateMovie);
router.delete("/api/movies/:id", deleteMovie);

module.exports = router;