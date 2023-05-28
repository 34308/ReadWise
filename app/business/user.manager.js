import PasswordDAO from '../DAO/passwordDAO';
import TokenDAO from '../DAO/tokenDAO';
import UserDAO from '../DAO/userDAO';
import applicationException from '../service/applicationException';
import sha1 from 'sha1';
import userDAO from "../DAO/userDAO";

function create(context) {

  function hashString(password) {
    return sha1(password);
  }

  async function authenticate(name, password) {
    let userData;
    console.log(name + password)
    const user = await UserDAO.getByEmailOrName(name);
    console.log(user)
    if (!user) {
      throw applicationException.new(applicationException.UNAUTHORIZED, 'User with that email does not exist');
    }
    userData = await user;
    await PasswordDAO.authorize(user.id, hashString(password));
    console.log()
    const token = await TokenDAO.create(userData);
    return getToken(token);
  }

  function getToken(token) {
    return {token: token.value};
  }

  async function createNewOrUpdate(userData) {
    const user = await UserDAO.createNewOrUpdate(userData);
    if (await userData.password) {
      return await PasswordDAO.createOrUpdate({userId: user.id, password: hashString(userData.password)});
    } else {
      return user;
    }
  }

  async function removeHashSession(userId) {
    return await TokenDAO.remove(userId);
  }
  async function putNewName(userData) {
    const user = await UserDAO.putNewName(userData);
    return user;
  }
  async function putNewEmail(userData) {
    const user = await UserDAO.putNewEmail(userData);
    return user;
  }
  async function putNewPassword(userData) {
    console.log(""+userData.id+userData.password);
    const user = await PasswordDAO.putNewPassword(userData.id, hashString(userData.password));
    console.log("check1-7");
    return user;
  }
  async function removeById(userId) {
    const user = await userDAO.removeById(userId)
    return user;
  }
  return {
    authenticate: authenticate,
    createNewOrUpdate: createNewOrUpdate,
    removeHashSession: removeHashSession,
    putNewPassword:putNewPassword,
    putNewName:putNewName,
    putNewEmail:putNewEmail,
    removeById:removeById,
  };
}

export default {
  create: create
};
