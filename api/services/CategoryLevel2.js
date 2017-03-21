URLSlugs = require('mongoose-url-slugs');

var schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },

    imageThumb: {
        type: String,
    },
    imageDetailView: {
        type: String,
    },
    order: {
        type: String,
    },
    price: {
        type: String,
    },
    meta: {
        type: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        index: true
    }

});
schema.plugin(URLSlugs('name', {
    field: 'myslug'
}));

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('CategoryLevel2', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "category", "category"));
var model = {
    findByCategory: function (data, callback) {
        Category.findOne({
            "myslug": data.myslug
        }, function (err, cat) {
            if (err) {
                callback(err, null);
            } else {
                CategoryLevel2.find({
                    category: cat._id
                }).populate('category').exec(function (err, found) {
                    if (err) {
                        // console.log(err);
                        callback(err, null);
                    } else {
                        if (found) {
                            console.log("IN FOUND", found);
                            callback(null, found);
                        } else {
                            callback(null, {
                                message: "No Data Found"
                            });
                        }
                    }
                })
            }
        });

    },
    getByUrl: function (data, callback) {
        this.findOne({
            "myslug": data.myslug
        }, function (err, deleted) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, deleted);
            }
        });
    },
};
module.exports = _.assign(module.exports, exports, model);