var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Post = require('./Post.js');

var Topic = new Schema({
    name: String,
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

/**
 * Přidání příspěvku do tématu
 * @param {object} post {subject, content}
 * @param {int} user_id 
 * @param {Topic} Topic model Topic
 * @param {function} callback funkce, která se zavolá až bude vše hotovo
 */
Topic.methods.addPost = function (post, user_id, Topic, callback) {

    var thisTopic = this;
    var postModel = new Post({
        subject: post.subject,
        content: post.content,
        topic: thisTopic,
        user: user_id
    });

    postModel.save(function (err, post) {
        if (err) {
            callback(err);
        } else {
            thisTopic.posts.push(post._id);
            thisTopic.save(function (err, topic) {
                Topic.findOne({_id: topic._id}).populate('posts', 'content subject user').populate('user', 'firstname surname').exec(function (err, topic) {
                    callback(err, topic);
                });
            });
        }
    });
};

module.exports = mongoose.model('Topic', Topic);


