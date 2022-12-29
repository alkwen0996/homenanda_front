import {
  apiInstance
} from "./index.js";

const api = apiInstance();

function listQna(param, success, fail) {
  api.get(`/board/qna`, {
    params: param
  }).then(success).catch(fail);
}

function writeQna(article, success, fail) {
  api.post(`/board/qna`, JSON.stringify(article)).then(success).catch(fail);
}

function getQna(articleId, success, fail) {
  api.get(`/board/qna/${articleId}`).then(success).catch(fail);
}

function modifyQna(article, success, fail) {
  api.put(`/board/qna`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteQna(articleId, success, fail) {
  api.delete(`/board/qna/${articleId}`).then(success).catch(fail);
}

export {
  listQna,
  writeQna,
  getQna,
  modifyQna,
  deleteQna
};