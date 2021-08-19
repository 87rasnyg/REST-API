const { Request, Response, NextFunction } = require("express");
const { body, valdidationResult, validationResult } = require("express-validator");

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

const MovieValidation = [
    body("title").notEmpty(),
    body("released").notEmpty().isFloat({ min: 1888, max: new Date().getFullYear()}),
    body("duration").notEmpty().isFloat({min: 1}),
    checkValidation
]

module.exports = {
    MovieValidation
}