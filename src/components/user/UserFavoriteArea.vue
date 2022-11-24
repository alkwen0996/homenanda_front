<template>
  <div class="album py-5 bg-light">
    <div class="container">
      <div class="py-5 text-center">
        <img class="d-block mx-auto mb-4" src="img/area.png" style="width: 150px; height: 150px" />
        <h1><b>관심지역</b></h1>
      </div>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="item in attList" :key="item.areaCode">
          <div class="card shadow-sm">
            <img
              class="bd-placeholder-img card-img-top"
              width="100%"
              height="225"
              src="img/areaDetail.png"
              aria-label="Placeholder: Thumbnail"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            />

            <div class="card-body">
              <p class="card-text">{{ item.sidoName }} {{ item.gugunName }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                    @click="moveMap(item)"
                  >
                    지도가기
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                    @click="deleteArea(item)"
                  >
                    삭제하기
                  </button>
                </div>
                <small class="text-muted">9 mins</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import axios from "axios";

const MarkInfo = "MarkInfo";
const memberStore = "memberStore";
const DealMapInit = "DealMapInit";
export default {
  name: "UserFavoriteArea",
  data() {
    return {
      attList: [],
      areaImage: "@/assets/images/areaDetail.png",
    };
  },
  created() {
    let userId = this.checkUserInfo.userId;
    axios.get(`http://localhost:8080/users/area/${userId}`).then(({ data }) => {
      console.log(data);
      this.attList = data;
    });
  },
  computed: {
    ...mapGetters(memberStore, ["checkUserInfo"]),
  },
  methods: {
    ...mapMutations(DealMapInit, ["SET_INIT_LOCX", "SET_INIT_LOCY"]),
    ...mapActions(MarkInfo, ["subAttInfo"]),
    moveMap(e) {
      this.SET_INIT_LOCX(e.lat);
      this.SET_INIT_LOCY(e.lng);
      this.$router.push("/landing");
      // console.log(e);
    },
    deleteArea(e) {
      this.subAttInfo(e.areaCode);
      this.$router.go();
    },
  },
};
</script>

<style>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1), inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
</style>
