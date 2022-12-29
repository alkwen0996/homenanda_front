import axios from "axios";
const MarkInfo = {
  namespaced: true,
  state: {
    attLoc: [],
    curLocX: 0.0,
    curLocY: 0.0,
    hospitals: [],
    restaurants: [],
    schools: [],
    stores: [],
    subs: [],
    aparts: [],
  },
  getters: {
    getLocHospitalInfo: function (state) {
      return state.hospitals;
    },
    getLocRestaurantInfo: function (state) {
      return state.restaurants;
    },
    getLocSchoolInfo: function (state) {
      return state.schools;
    },
    getLocStoreInfo: function (state) {
      return state.stores;
    },
    getLocSubInfo: function (state) {
      return state.subs;
    },
    getLocApartInfo: function (state) {
      return state.aparts;
    },
    getLocAttLoc: function (state) {
      return state.attLoc;
    },
    getLocCurLocX: function (state) {
      return state.curLocX;
    },
    getLocCurLocY: function (state) {
      return state.curLocY;
    },
  },
  mutations: {
    SET_APART_INFO(state, info) {
      state.aparts = [].concat(state.aparts, info);
    },
    SET_APART_INIT(state) {
      state.aparts = null;
    },
    SET_HOSPITAL_INFO(state, info) {
      state.hospitals = [].concat(state.hospitals, info);
    },
    SET_HOSPITAL_INIT(state) {
      state.hospitals = null;
    },
    SET_RESTAURANT_INFO(state, info) {
      state.restaurants = [].concat(state.restaurants, info);
    },
    SET_RESTAURANT_INIT(state) {
      state.restaurants = null;
    },
    SET_SCHOOL_INFO(state, info) {
      state.schools = [].concat(state.schools, info);
    },
    SET_SCHOOL_INIT(state) {
      state.schools = null;
    },
    SET_STORE_INFO(state, info) {
      state.stores = [].concat(state.stores, info);
    },
    SET_STORE_INIT(state) {
      state.stores = null;
    },
    SET_SUB_INFO(state, info) {
      state.subs = [].concat(state.subs, info);
    },
    SET_SUB_INIT(state) {
      state.subs = null;
    },
    ADD_ATT_LOC(state, item) {
      let exist = false;
      for (let i = 0; i < state.attLoc.length; i++) {
        if (state.attLoc[i] == item) {
          exist = true;
        }
      }
      if (!exist) state.attLoc.push(item);
    },
    SUB_ATT_LOC(state, areaCode) {
      for (let i = 0; state.attLoc.length; i++) {
        if (state.attLoc[i] == areaCode) state.attLoc.splice(i, 1);
      }
    },

    SET_ATT_INIT(state) {
      state.attLoc = [];
    },
    SET_CUR_LOCX(state, x) {
      state.curLocX = x;
    },
    SET_CUR_LOCY(state, y) {
      state.curLocY = y;
    },
  },
  actions: {
    getAttInfo({ commit }, userId) {
      axios.get(`http://localhost:8080/users/area/${userId}`).then(({ data }) => {
        commit("SET_ATT_INIT");
        for (let i = 0; i < data.length; i++) commit("ADD_ATT_LOC", data[i].areaCode);
      });
    },
    subAttInfo({ commit }, areaCode) {
      axios
        .delete(`http://localhost:8080/users/area/${areaCode}`)
        .then((data) => {
          commit("SUB_ATT_LOC", areaCode);
          console.log(data);
        })
        .catch((e) => console.log(e));
    },
    addAttInfo({ commit, state }, favoriteArea) {
      for (let i = 0; i < state.attLoc.length; i++) {
        if (
          String(state.attLoc[i]).substring(0, 5) == String(favoriteArea.areaCode).substring(0, 5)
        )
          return;
      }
      axios
        .post(`http://localhost:8080/users/area`, favoriteArea)
        .then((data) => {
          commit("ADD_ATT_LOC", favoriteArea.areaCode);
          console.log(data);
        })
        .catch((e) => console.log(e));
    },
  },
};

export default MarkInfo;
