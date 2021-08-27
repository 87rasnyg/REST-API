const { Request, Response, NextFunction } = require("express");
const { body, validationResult } = require("express-validator");

/**
 * Checks if any errors occured and sends back a 400 status code if there was
 * or calls the next function.
 * @param {Require} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function checkValidation(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }
    else{
        next();
    }
}

/**
 * Checks if the object that was sent in has a title, a release year and a duration.
 * it also checks that the values aren't empty, that the realease year is between 1888 and the current year
 * and that duration is longer then one minute
 * 
 */
const createMovieValidation = [
    body("title").notEmpty(),
    body("released").notEmpty().isFloat({ min: 1888, max: new Date().getFullYear()}),
    body("duration").notEmpty().isFloat({min: 1}),
    checkValidation
]

/**
 * this funciton checks if title, release year and duration exists in the incoming
 * call. if release year and duration values aren't empty then the it also checks if the
 * realease year is between 1888 and the current year and that duration is longer then one minute
 */
const updateMovieValidation = [
    body("title").exists(),
    body("released").exists().if(body("released").notEmpty()).isFloat({ min: 1888, max: new Date().getFullYear() }),
    body("duration").exists().if(body("duration").notEmpty()).isFloat({ min: 1 }),
    checkValidation
]

module.exports = {
    createMovieValidation,
    updateMovieValidation
}