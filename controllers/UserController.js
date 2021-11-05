const ApiError = require('../handlers/ApiError');
const User = require ('../models/models');

class UserController {
    async registration (req, res, next) {

    }

    async login (req, res, next) {

    }

    async check (req, res, next) {
        const {id} = req.query;
        if (!id) {
            return next(ApiError.badRequest('ID not found!'))
        }
        res.json(id)
    }
} 

module.exports = new UserController();