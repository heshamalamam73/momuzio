const mongoose = require('mongoose');

// mongo connect code 



mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://mido:mido2018@ds261253.mlab.com:61253/warbler",{
    keepAlive: true,
    useNewUrlParser: true 

    
});
module.exports.User = require('./user');
module.exports.Message = require('./message');
module.exports.Post = require('./post');
module.exports.Comment = require('./comment');
