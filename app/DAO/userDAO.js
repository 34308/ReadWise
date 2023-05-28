
import mongoose from 'mongoose';
import * as _ from 'lodash';
import Promise from 'bluebird';
import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';
import uniqueValidator from 'mongoose-unique-validator';
import FavModel from "../DAO/FavoriteListDAO"
import password from "../DAO/passwordDAO"

const userRole = {
  admin: 'admin',
  user: 'user'
};

const userRoles = [userRole.admin, userRole.user];

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  role: { type: String, enum: userRoles, default: userRole.admin, required: false },
  active: { type: Boolean, default: true, required: false },
  isAdmin: { type: Boolean, default: true, required: false }
}, {
  collection: 'user'
});

userSchema.plugin(uniqueValidator);

const UserModel = mongoose.model('user', userSchema);

function createNewOrUpdate(user) {
  return Promise.resolve().then(() => {
    if (!user.id) {
      return new  UserModel(user).save().then(async result => {
        if (result) {
          const res=await FavModel.createNewOrUpdate({userId: result._id, reviewId: [""]})
          return mongoConverter(result);
        }
      });
    } else {
      return UserModel.updateOne({_Id:user.id}, _.omit(user, 'id'), { new: true });
    }
  }).catch(error => {
    if ('ValidationError' === error.name) {
      error = error.errors[Object.keys(error.errors)[0]];
      throw applicationException.new(applicationException.BAD_REQUEST, error.message);
    }
    throw error;
  });
}

async function getByEmailOrName(name) {
  const result = await UserModel.findOne({ $or: [{ email: name }, { name: name }] });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}
async function putNewName(user) {
  console.log(user.id)
  return Promise.resolve().then(() => {
    const result=UserModel.findOne({name:user.name})
    if(result.count()>0){
      throw applicationException.new(applicationException.BAD_REQUEST, "user name already owned");
    }
    if (!user.id) {
      throw applicationException.new(applicationException.BAD_REQUEST, "false id, no user with such id");
    } else {
      return UserModel.updateOne({_id:user.id}, { name:user.name } , { new: true });
    }
  }).catch(error => {
    if ('ValidationError' === error.name) {
      error = error.errors[Object.keys(error.errors)[0]];
      throw applicationException.new(applicationException.BAD_REQUEST, error.message);
    }
    throw error;
  });
}
async function putNewEmail(user) {
  return Promise.resolve().then(() => {
    const result=UserModel.findOne({email:user.email})
    if(result.count()>0){
      throw applicationException.new(applicationException.BAD_REQUEST, "user email already owned");
    }
    if (!user.id) {
      throw applicationException.new(applicationException.BAD_REQUEST, "false id, no user with such id");
    } else {
      return UserModel.updateOne({_id:user.id}, { email:user.email } , { new: true });
    }
  }).catch(error => {
    if ('ValidationError' === error.name) {
      error = error.errors[Object.keys(error.errors)[0]];
      throw applicationException.new(applicationException.BAD_REQUEST, error.message);
    }
    throw error;
  });
}
async function get(id) {
  const result = await UserModel.findOne({ _id: id });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

async function removeById(id) {
  await password.model.remove({userId:id})
  await FavModel.model.remove({userId:id});
  return await UserModel.remove({_id:id});
}

export default {
  createNewOrUpdate: createNewOrUpdate,
  getByEmailOrName: getByEmailOrName,
  get: get,
  removeById: removeById,
  putNewName:putNewName,
  putNewEmail:putNewEmail,

  userRole: userRole,
  model: UserModel
};
