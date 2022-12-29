import {
  apiInstance
} from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/users/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userId, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/users/info/${userId}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  api.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
  await api.post(`/users/refresh`, user).then(success).catch(fail);
}

async function logout(userId, success, fail) {
  await api.get(`/users/logout/${userId}`).then(success).catch(fail);
}

async function register(user, success, fail) {
  await api.post(`/users`, JSON.stringify(user)).then(success).catch(fail);
}

async function findPassword(user, success, fail) {
  await api.post(`/users/password`, JSON.stringify(user)).then(success).catch(fail);
}

async function remove(userId, success, fail) {
  await api.delete(`/users/${userId}`).then(success).catch(fail);
}

async function updateUser(user, success, fail) {
  await api.put(`/users`, JSON.stringify(user)).then(success).catch(fail);
}

export {
  login,
  findById,
  tokenRegeneration,
  logout,
  register,
  findPassword,
  remove,
  updateUser
};