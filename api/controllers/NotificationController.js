module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    addNotificationToUsers: function (req, res) {
        if (req.body) {
            Notification.addNotificationToUsers(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
    deleteNotificationFromUsers: function (req, res) {
        if (req.body) {
            Notification.deleteNotificationFromUsers(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    }
};
module.exports = _.assign(module.exports, controller);