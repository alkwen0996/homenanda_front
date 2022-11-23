<template>
  <div>
    <b-table style="width: 100%" striped hover :items="houseDeal">
      <template #head(dealCode)>
        <span class="text-info">{{ label[0] }}</span>
      </template>
      <template #head(dealPrice)>
        <span class="text-info">{{ label[1] }}</span>
      </template>
      <template #head(dealYear)>
        <span class="text-info">{{ label[2] }}</span>
      </template>
      <template #head(dealMonth)>
        <span class="text-info">{{ label[3] }}</span>
      </template>
      <template #head(dealDay)>
        <span class="text-info">{{ label[4] }}</span>
      </template>
      <template #head(area)>
        <span class="text-info">{{ label[5] }}</span>
      </template>
      <template #head(floor)>
        <span class="text-info">{{ label[6] }}</span>
      </template>
      <template #head(houseCode)>
        <span class="text-info">{{ label[7] }}</span>
      </template>
      <template #head(type)>
        <span class="text-info">{{ label[8] }}</span>
      </template>
      <template #head(rentMoney)>
        <span class="text-info">{{ label[9] }}</span>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

const ApartInfo = "ApartInfo";

export default {
  name: "DetailList",

  data() {
    return {
      houseDeal: null,
      label: [
        "거래코드",
        "거래금액",
        "거래연도",
        "거래",
        "거래일",
        "면적",
        "층수",
        "집코드",
        "타입",
        "월세",
      ],
    };
  },
  created() {
    this.houseDeal = this.getHouseDeal;
  },
  computed: {
    ...mapGetters(ApartInfo, ["getHouseDeal"]),
  },
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
