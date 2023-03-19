const express = require('express');
const Router = express.Router;
const passport = require("passport");
const { authController } = require( "../controllers/authController" );
const checkAuthentication = require("../middlewares/authentication.js").checkAuthentication;
const router= Router();

class routerAuth {
    constructor() {
        this.authController = new authController();
    }
    start() {
        router.get('/', checkAuthentication, this.authController.isAuthenticated);
        router.get('/logout' , this.authController.destroySession);
        router.post( '/login', passport.authenticate('login'),  this.authController.auth );
        router.post('/register', passport.authenticate('signup'),  this.authController.registerUser);
        return router
    }
}

module.exports = routerAuth;


