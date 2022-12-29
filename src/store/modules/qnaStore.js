import {
  writeQna
} from "@/api/qna";

const qnaStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    isValidToken: false,
    dummy: null
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
    checkToken: function (state) {
      return state.isValidToken;
    },
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
    SET_IS_DUMMY: (state, dummy) => {
      state.dummy = dummy;
    },
    SET_IS_VALID_TOKEN: (state, isValidToken) => {
      state.isValidToken = isValidToken;
    }
  },
  actions: {
    async writeQna({
      commit
    }, param) {
      console.log('write qna: ' + param.subject);
      writeQna(
        param,
        ({
          data
        }) => {
          console.log(data.message);
          if (data.message === "success") {
            console.log("글작성 성공 성공");
          } else {
            console.log("글작성 실패");
          }
          return "success"
        },
        (error) => {
          console.log(error);
          commit("SET_IS_DUMMY", false);
        }
      );
    },
  },
};

export default qnaStore;