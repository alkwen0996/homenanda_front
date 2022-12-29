import {
  apiInstance
} from "./index.js";

const api = apiInstance();

function listArticle(param, success, fail) {
  api.get(`/board/community`, {
    params: param
  }).then(success).catch(fail);
}

function writeArticle(article, success, fail) {
  api.post(`/board/community`, JSON.stringify(article)).then(success).catch(fail);
}

function getArticle(articleId, success, fail) {
  api.get(`/board/community/${articleId}`).then(success).catch(fail);
}

function modifyArticle(article, success, fail) {
  api.put(`/board/community`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteArticle(articleId, success, fail) {
  api.delete(`/board/community/${articleId}`).then(success).catch(fail);
}

export {
  listArticle,
  writeArticle,
  getArticle,
  modifyArticle,
  deleteArticle
};