const express = require('express');
const Router = express.Router;
const auth = require("../controllers/authController.js").auth;
const destroySession = require("../controllers/authController.js").destroySession;
const registerUser = require("../controllers/authController.js").registerUser;
const isAuthenticated = require("../controllers/authController.js").isAuthenticated;
const passport = require("passport");
const checkAuthentication = require("../middlewares/authentication.js").checkAuthentication;

const routerAuth = Router();

routerAuth.get('/', checkAuthentication, isAuthenticated)
routerAuth.get('/logout' , destroySession);
routerAuth.post( '/login', passport.authenticate('login'),  auth );
routerAuth.post('/register', passport.authenticate('signup'),  registerUser);

module.exports = routerAuth;


