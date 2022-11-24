import {
  writeArticle
} from "@/api/board";


const boardStore = {
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
    async writeArticle({
      commit
    }, param) {
      console.log('write article: ' + param.subject);
      writeArticle(
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
        },
        (error) => {
          console.log(error);
          commit("SET_IS_DUMMY", false);
        }
      );
    },
  },
};

export default boardStore;