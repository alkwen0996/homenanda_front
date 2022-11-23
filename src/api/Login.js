import axios from "axios";

const userApi = axios.create({
  baseURL: `http://localhost:8080/users`, //?apartCode=2`,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

export default userApi;