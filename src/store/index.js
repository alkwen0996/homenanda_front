import Vue from "vue";
import Vuex from "vuex";
// module import
import boardStore from "@/store/modules/boardStore";
import qnaStore from "@/store/modules/qnaStore";
import memberStore from "@/store/modules/memberStore";
import MarkInfo from "@/store/modules/MarkInfo";
import ApartInfo from "@/store/modules/ApartInfo";
import AroundInfo from "@/store/modules/AroundInfo";
import DealMapInit from "@/store/modules/DealMapInit";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    APIKey: "5e0611bca47cd2e27cdfec522bab2371",
  },
  getters: {
    getterAPIKey(state) {
      return state.APIKey;
    },
  },
  modules: {
    boardStore,
    memberStore,
    MarkInfo,
    ApartInfo,
    AroundInfo,
    DealMapInit,
    qnaStore,
  },

  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ], // 로그인 유지.
});