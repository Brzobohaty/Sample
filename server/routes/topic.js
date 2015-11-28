var express = require('express');
var router = express.Router();
var Topic = require('../models/Topic.js');
var User = require('../models/User.js');
var Post = require('../models/Post.js');
var authentication = require("../services/authentication.js");

/**
 * Všechna témata
 */
router.get('/', authentication.ensureAuthorized, function (req, res) {
    Topic.find({}, 'name', function (err, topics) {
        if (err) {
            res.status(500);
            res.json({
                errorMessage: 'Omlouváme se, ale nastala neočekávaná chyba.'
            });
        } else {
            res.status(200);
            res.json(topics);
        }
    });
});

/**
 * Vytvořit téma
 */
router.post('/', authentication.ensureAuthorized, function (req, res) {
    Topic.findOne({'name': req.body.name}).select('_id').exec(function (err, topic) {
        if (err) {
            res.status(500);
            res.json({
                errorMessage: 'Omlouváme se, ale nastala neočekávaná chyba.'
            });
        } else {
            if (topic) {
                res.status(409);
                res.json({
                    errorMessage: 'Téma s daným názvem již existuje.'
                });
            } else {
                var topicModel = new Topic();
                topicModel.name = req.body.name;
                topicModel.save(function (err, topic) {
                    topic.save(function (err, topic) {
                        res.status(201);
                        res.send(topic);
                    });
                });
            }
        }
    });
});

/**
 * Všechny příspěvky z tématu
 */
router.get('/:topic_id/post', authentication.ensureAuthorized, function (req, res) {
    Topic.findOne({_id: req.params.topic_id}, 'name posts').populate('posts', 'subject content user').exec(function (err, topic) {
        if (err) {
            res.status(500);
            res.json({
                errorMessage: 'Omlouváme se, ale nastala neočekávaná chyba.'
            });
        } else {
            if (topic) {
                User.populate(topic.posts, {path: 'user', select: 'firstname surname'}, function () {
                    res.status(200);
                    res.json(topic);
                });
            } else {
                res.status(404);
                res.json({
                    errorMessage: 'Toto téma neexistuje.'
                });
            }
        }
    });
});

/**
 * Vytvořit příspěvěk
 */
router.post('/:topic_id/post', authentication.ensureAuthorized, function (req, res) {
    Topic.findOne({_id: req.params.topic_id}).exec(function (err, topic) {
        if (err) {
            res.status(500);
            res.json({
                errorMessage: 'Omlouváme se, ale nastala neočekávaná chyba.'
            });
        } else {
            if (topic) {
                User.findOne({token: req.token}, function (err, user) {
                    if (err) {
                        res.status(500);
                        res.json({
                            errorMessage: 'Omlouváme se, ale nastala neočekávaná chyba.'
                        });
                    } else {
                        topic.addPost(req.body, user._id, Topic, function (err, topic) {
                            if (err) {
                                res.status(500);
                                res.json({
                                    errorMessage: 'Omlouváme se, ale nastala neočekávaná chyba.'
                                });
                            } else {
                                User.populate(topic.posts, {path: 'user', select: 'firstname surname'}, function () {
                                    res.status(201);
                                    res.send(topic);
                                });
                            }
                        });
                    }
                });
            } else {
                res.status(404);
                res.json({
                    errorMessage: 'Toto téma neexistuje.'
                });
            }
        }
    });
});

module.exports = router;