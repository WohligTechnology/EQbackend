var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');
var validators = require('mongoose-validators');
var monguurl = require('monguurl');
require('mongoose-middleware').initialize(mongoose);

var Schema = mongoose.Schema;

var schema = new Schema({
    title: {
        type: String,
        required: true,

    },
    content: {
        type: String,
        required: true,

    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Notification', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    addNotificationToUsers: function (data, callback) {
        Notification.saveData(data, function (err, notification) {
            if (notification) {
                User.update({}, {
                    $push: {
                        'notification': notification._id
                    }
                }, {
                    multi: true
                }).exec(function (err, found) {
                    if (err) {
                        callback(err, null);
                    } else if (_.isEmpty(found)) {
                        callback(null, "noDataound");
                    } else {
                        callback(null, found);
                    }

                });
            } else {
                callback(err, null);
            }
        });
    },
    deleteNotificationFromUsers: function (data, callback) {
        console.log("data: ", data);
        Notification.remove({
            _id: mongoose.Types.ObjectId(data._id)
        }).exec(function (err, removed) {
            if (removed) {
                User.update({
                    notification: mongoose.Types.ObjectId(data._id)
                }, {
                    $pull: {
                        notification: mongoose.Types.ObjectId(data._id)
                    }
                }, {
                    multi: true
                }).exec(function (err, found) {
                    if (err) {
                        callback(err, null);
                    } else if (_.isEmpty(found)) {
                        callback(null, "noDataound");
                    } else {

                        callback(null, found);
                    }

                });
            } else {
                callback(err, null);
            }
        });
    }

};
module.exports = _.assign(module.exports, exports, model);