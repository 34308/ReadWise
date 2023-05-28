import mongoose from 'mongoose';
import * as _ from 'lodash';
import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';
import Promise from "bluebird";


const passwordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true },
  password: { type: String, required: true }
}, {
  collection: 'password'
});

const PasswordModel = mongoose.model('password', passwordSchema);

async function createOrUpdate(data) {
  const result = await PasswordModel.findOneAndUpdate({ userId: data.userId }, _.omit(data, 'id'), { new: true });
  if (!result) {
    const result = await new PasswordModel({ userId: data.userId, password: data.password }).save();
    if (result) {
      return mongoConverter(result);
    }
  }
  return result;
}
async function putNewPassword(userid,password) {
  console.log("check2");
  return Promise.resolve().then(() => {
    if (!userid) {
      return "false id, no user with such id";
    } else {
      return  PasswordModel.updateOne({userId:userid},  { password: password } , { new: true });
    }
  }).catch(error => {
    if ('ValidationError' === error.name) {
      error = error.errors[Object.keys(error.errors)[0]];
      throw applicationException.new(applicationException.BAD_REQUEST, error.message);
    }
    throw error;
  });
}
async function authorize(userId,password) {
  console.log("authorize"+userId);
  const result = await PasswordModel.findOne({ userId: userId, password: password });
  console.log("authorize r"+result);

  if (result && mongoConverter(await result)) {
    return true;
  }
  throw applicationException.new(applicationException.UNAUTHORIZED, 'User and password does not match');
}

export default {
  createOrUpdate: createOrUpdate,
  authorize: authorize,
  putNewPassword: putNewPassword,
  model: PasswordModel
};
