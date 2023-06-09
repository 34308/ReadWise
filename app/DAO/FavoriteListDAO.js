import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import mongoConverter from '../service/mongoConverter';
import * as _ from "lodash";
import BookModel from "./BookDAO";
import {ObjectID} from "mongodb";
import password from "./passwordDAO";

const favSchema = new mongoose.Schema({
    userId:{type: ObjectID},
    reviewId: {type: [ObjectID]},
}, {
    collection: 'favList'
});
favSchema.plugin(uniqueValidator);

const favModel = mongoose.model('favList', favSchema);

async function query() {
    const result = await favModel.find({});
    {
        if (result) {
            return mongoConverter(result);
        }
    }
}

async function get(id) {
    let favIds;
    await favModel.findOne({userId:id}).then(function (result) {
        if (result) {
            favIds = result.toObject();

        }
    });
    if(!favIds){
        return new favModel();
    }
    return BookModel.model.find({_id:favIds.reviewId}).then(function (result) {

        if (result) {
            return mongoConverter(result);
        }
    });
}
async function removeById(userId,reviewIdToDelete) {
    return favModel.updateOne(
        { userId: userId },
        { $pull: { reviewId: reviewIdToDelete}})
        .then(result => {
            return mongoConverter(result)
        })
        .catch(error => {
            console.error('Error updating document:', error);
            // Handle error, display error message, or take appropriate action
        });
}
async function createNewOrUpdate(data) {
    return Promise.resolve().then(() => {
        if (!data.update) {
            return new favModel({userId:data.userId}).save().then(result => {
                if (result[0]) {
                    return mongoConverter(result[0]);
                }
            });
        } else {
            return favModel.updateOne({userId:data.userId},{ $push: { reviewId: data.reviewId } },{ new: true});
        }
    });
}

export default {
    query: query,
    get: get,
    createNewOrUpdate: createNewOrUpdate,
    removeById:removeById,
    model: favModel
};
