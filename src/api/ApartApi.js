import axios from "axios";

const apartApi = axios.create({
  baseURL: `http://localhost:8080/aparts`, //?apartCode=2`,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

export default apartApi;