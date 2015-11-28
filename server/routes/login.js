var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var jwt = require("jsonwebtoken");
var authentication = require("../services/authentication.js");

/**
 * Login uživatele
 * Princip autentikace uživatele
 * http://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543
 */
router.post('/', function (req, res) {
    User.findOne({email: req.body.email}, function (err, user) {
        if (err) {
            res.status(500);
            res.json({
                errorMessage: 'Omlouváme se, ale nastala neočekávaná chyba.'
            });
        } else {
            if (user) {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (err) {
                        res.status(500);
                        res.json({
                            errorMessage: 'Omlouváme se, ale nastala neočekávaná chyba.'
                        });
                    } else {
                        if (isMatch) {
                            res.status(200);
                            res.json({
                                data: user,
                                token: user.token
                            });
                        } else {
                            res.status(401);
                            res.json({
                                errorMessage: 'Nesprávné přihlašovací údaje.'
                            });
                        }
                    }
                });
            } else {
                res.status(401);
                res.json({
                    errorMessage: 'Nesprávné přihlašovací údaje.'
                });
            }
        }
    });
});

module.exports = router;