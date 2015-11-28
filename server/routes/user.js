var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var jwt = require("jsonwebtoken");
var authentication = require("../services/authentication.js");

/**
 * Registrace uživatele
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
                res.status(409);
                res.json({
                    errorMessage: 'Uživatel se stejným emailem je již zaregistrován.'
                });
            } else {
                var userModel = new User();
                userModel.email = req.body.email;
                userModel.password = req.body.password;
                userModel.firstname = req.body.firstname;
                userModel.surname = req.body.surname;
                userModel.save(function (err, user) {
                    user.token = jwt.sign(user, 'ba51d54wq4d54wqdas4d5sa4d');
                    user.save(function (err, user1) {
                        res.status(201);
                        res.send(user1);
                    });
                });
            }
        }
    });
});

module.exports = router;