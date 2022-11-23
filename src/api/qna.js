import { apiInstance } from "./index.js";

const api = apiInstance();

function listQna(param, success, fail) {
  api.get(`/qna`, { params: param }).then(success).catch(fail);
}

function writeQna(article, success, fail) {
  api.post(`/qna`, JSON.stringify(article)).then(success).catch(fail);
}

function getQna(articleno, success, fail) {
  api.get(`/qna/${articleno}`).then(success).catch(fail);
}

function modifyQna(article, success, fail) {
  api.put(`/qna`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteQna(articleno, success, fail) {
  api.delete(`/qna/${articleno}`).then(success).catch(fail);
}

export { listQna, writeQna, getQna, modifyQna, deleteQna };
