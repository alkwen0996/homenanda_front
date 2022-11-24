<template>
  <div style="width: 30%; height: 90%; border: 4px solid #cccccc">
    <div style="display: flex; margin-top: 10px">
      <div style="width: 10%"></div>
      <div style="width: 80%">
        <h1>{{ curHouseInfo.houseName }}</h1>
      </div>
      <div style="width: 10%" @click="clickHeart">
        <b-icon v-show="!heart" icon="heart" font-scale="2"></b-icon>
        <b-icon v-show="heart" icon="heart-fill" font-scale="2"></b-icon>
      </div>
    </div>
    <b-tabs content-class="mt-3" sytle="width:100%">
      <b-tab title="아파트 정보" active><DetailApart></DetailApart></b-tab>
      <b-tab title="매매 내역"><DetailList></DetailList></b-tab>
      <b-tab title="주변 정도"><DetailArea></DetailArea></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import DetailApart from "@/pages/components/deal/DetailApart.vue";
import DetailList from "@/pages/components/deal/DetailList.vue";
import DetailArea from "@/pages/components/deal/DetailArea.vue";
import { mapActions, mapGetters } from "vuex";

const ApartInfo = "ApartInfo";
const memberStore = "memberStore";

export default {
  name: "DealDetail",
  components: { DetailApart, DetailList, DetailArea },
  data() {
    return {
      heart: false,
      curAttHouse: [],
      curHouseInfo: null,
    };
  },

  created() {
    this.curAttHouse = this.getAttHouse;
    this.curHouseInfo = this.getHouseInfo;
    for (let i = 0; i < this.curAttHouse.length; i++) {
      if (this.curAttHouse[i] == this.curHouseInfo.houseCode) {
        this.heart = true;
        // console.log("같나??");
        // console.log(this.curAttHouse[i]);
        // console.log(this.curHouseInfo);
      }
    }
  },
  mounted() {},

  computed: {
    ...mapGetters(ApartInfo, ["getAttHouse", "getHouseInfo"]),
    ...mapGetters(memberStore, ["checkUserInfo"]),
  },
  methods: {
    // ...mapMutations(ApartInfo, ["ADD_ATT_HOUSE", "SUB_ATT_HOUSE"]),
    ...mapActions(ApartInfo, ["addAttHouse", "subAttHouse"]),
    clickHeart() {
      this.heart = !this.heart;
      if (this.heart) {
        let userId = this.checkUserInfo.userId;
        let favoriteHouse = { houseCode: this.curHouseInfo.houseCode, userId: userId };
        this.addAttHouse(favoriteHouse);
        // this.ADD_ATT_HOUSE(this.curHouseInfo);
      } else {
        this.subAttHouse(this.curHouseInfo.houseCode);
        // this.SUB_ATT_HOUSE(this.curHouseInfo);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
