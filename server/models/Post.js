var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
    subject: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    content: String,
    topic: {type: Schema.Types.ObjectId, ref: 'Topic'}
});

module.exports = mongoose.model('Post', Post);


