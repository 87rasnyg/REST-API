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

router.post("/api/movies", (req, res) => {
    const {title, released, duration} = req.body;

    //get current index
    if(movieList.length > 0){
        id = movieList[movieList.length-1].id + 1;
    }
    else{
        id = 0;
    }

    const movie = {
        id: id,
        title: title,
        released: released,
        duration: duration
    }

    movieList.push(movie);

    res.status(201).json(movie);
});

module.exports = router;