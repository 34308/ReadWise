import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import mongoConverter from '../service/mongoConverter';
import * as _ from "lodash";
import * as Console from "console";
import favModel from "../DAO/FavoriteListDAO"

const bookSchema = new mongoose.Schema({
    author: {type: String},
    image: {type: String},
    rating: {type: Number},
    review: {type: String},
    title: {type: String},
    subtitle: {type: String},
    creatorId: {type: String},
}, {
    collection: 'bookReviews'
});
bookSchema.plugin(uniqueValidator);

const BookModel = mongoose.model('bookReviews', bookSchema);

async function query() {
    const result = await BookModel.find({});
    {
        if (result) {
            return mongoConverter(result);
        }
    }
}

async function get(id) {
    return BookModel.findOne({_id:id}).then(function (result) {
        console.log(result);
        if (result) {
            return mongoConverter(result);
        }
    });
}
async function removeById(id) {
    return BookModel.findOne({_id:id}).then(function (result) {
        console.log(result);
        if (result) {
            return mongoConverter(result);
        }
    });
}
async function createNewOrUpdate(data) {
    return Promise.resolve().then(() => {
        if (!data.id) {
            return new BookModel(data).save().then(result => {
                if (result[0]) {
                    return mongoConverter(result[0]);
                }
            });
        } else {
            return BookModel.updateOne({_id:data.id},{ title:data.title,review:data.review,subtitle:data.subtitle,rating:data.rating },{ new: true});
        }
    });
}

export default {
    query: query,
    get: get,
    createNewOrUpdate: createNewOrUpdate,

    model: BookModel
};
