const express = require("express");
const { getMovies, getMovie, postMovie, updateMovie, deleteMovie } = require("./movie.controllers");
const { MovieValidation } = require("./movie.validation");

const router = express.Router();

router.get("/api/movies", getMovies);
router.get("/api/movies/:id", getMovie);
router.post("/api/movies", MovieValidation, postMovie);
router.put("/api/movies/:id", MovieValidation, updateMovie);
router.delete("/api/movies/:id", deleteMovie);

module.exports = router;