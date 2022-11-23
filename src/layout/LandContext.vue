<template>
  <div style="width: 100%; margin-top: 100px">
    <div style="width: 100%; display: flex">
      <div style="width: 30%">&nbsp;</div>
      <input
        @keyup.enter="moveMap"
        v-model="searchAddress"
        style="font-size: 15pt; width: 30%; height: 40px; margin-top: 20px; margin-bottom: 5px"
        type="text"
      />
      <b-button
        variant="secondary"
        @click="moveMap"
        style="font-size: 15pt; width: 10%; height: 40px; margin-top: 20px; margin-bottom: 5px"
      >
        검색
      </b-button>
      <div style="width: 30%">&nbsp;</div>
    </div>
    <div style="display: flex; width: 100%">
      <div style="width: 915px; height: 750px; width: 50%" ref="land"></div>
      <iframe style="width: 915px; height: 750px; width: 50%" v-bind:src="changeUrl"></iframe>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Proj4js from "proj4";
const DealMapInit = "DealMapInit";

// let EPSG_5179 =
//   "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs"; //행정안전부 오픈API 좌표계

// let EPSG_5181 =
//   "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs"; //카카오API 좌표계
let EPSG_5174 =
  "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
let WGS84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
export default {
  data() {
    return {
      locX: 0, //초기값. 단 한 번 사용함. map 생성시에만
      locY: 0, //초기값. 단 한 번 사용함. map 생성시에만};
      firstX: 0,
      firstY: 0,
      lastX: 0,
      lastY: 0,
      transFirstX: 0,
      transFirstY: 0,
      transLastX: 0,
      transLastY: 0,
      map: null,
      changeUrl: "",
      searchAddress: "",
    };
  },
  mutations: {},

  computed: {
    ...mapGetters(DealMapInit, ["getInitLocX", "getInitLocY"]),
  },
  created() {
    // let tranfirst = Proj4js(EPSG_5174, WGS84, [447511, 217636]);
    // let tranlast = Proj4js(EPSG_5174, WGS84, [447701, 217635]);
    // console.log(tranfirst);
    // console.log(tranlast); //test
    this.locX = this.getInitLocX; //"217365,447511,217636,447701"
    this.locY = this.getInitLocY;
  },
  mounted() {
    let kakao = window.kakao;
    // console.log(this.$refs.map); //should be not null
    let mapContainer = this.$refs.land;
    let startX = this.locX;
    let startY = this.locY;

    let mapOption = {
      center: new kakao.maps.LatLng(startX, startY), // 지도의 중심좌표
      level: 2, // 지도의 확대 레벨
    };

    const mapInstance = new kakao.maps.Map(mapContainer, mapOption);
    // console.log(mapInstance);
    this.map = mapInstance;

    this.getChangeUrl();
    kakao.maps.event.addListener(mapInstance, "dragend", () => {
      this.getChangeUrl();
    });
  },
  methods: {
    getChangeUrl() {
      let bounds = this.map.getBounds();
      this.firstX = bounds.qa; //left down
      this.firstY = bounds.ha; //left down
      this.lastX = bounds.pa; //right up
      this.lastY = bounds.oa; //right up

      //   let p = new Proj4js.Point(37.528, 126.9207);

      let tranfirst = Proj4js(WGS84, EPSG_5174, [this.firstY, this.firstX]);
      let tranlast = Proj4js(WGS84, EPSG_5174, [this.lastY, this.lastX]);
      // console.log(tranfirst);
      // console.log(tranlast);
      let url =
        "http://apis.data.go.kr/1611000/nsdi/ReferLandPriceService/wms/getReferLandPriceWMS"; /*URL*/
      let queryParams =
        "?" +
        encodeURIComponent("serviceKey") +
        "=" +
        "AvsVSVyIZjnEkASZCQGECOgYmxgmnLdl9lfTZIrhzWFxDnDgl9DHuJRB23jSK3KQPzGNXJPiTFmrf3969vq43g%3D%3D"; /*Service Key*/
      queryParams += "&" + encodeURIComponent("layers") + "=" + encodeURIComponent("166"); /**/
      queryParams += "&" + encodeURIComponent("crs") + "=" + encodeURIComponent("EPSG:5174"); /**/
      queryParams +=
        "&" +
        encodeURIComponent("bbox") +
        "=" +
        // encodeURIComponent("217365,447511,217636,447701");
        encodeURIComponent(`${tranfirst[0]},${tranfirst[1]},${tranlast[0]},${tranlast[1]}`);
      queryParams += "&" + encodeURIComponent("width") + "=" + encodeURIComponent("915"); /**/
      queryParams += "&" + encodeURIComponent("height") + "=" + encodeURIComponent("750"); /**/
      queryParams +=
        "&" + encodeURIComponent("format") + "=" + encodeURIComponent("image/png"); /**/
      queryParams +=
        "&" + encodeURIComponent("transparent") + "=" + encodeURIComponent("false"); /**/
      queryParams +=
        "&" + encodeURIComponent("bgcolor") + "=" + encodeURIComponent("0xFFFFFF"); /**/
      queryParams +=
        "&" + encodeURIComponent("exceptions") + "=" + encodeURIComponent("blank"); /**/

      this.changeUrl = url + queryParams;
    },
    moveMap() {
      // console.log("move");
      let kakao = window.kakao;
      // let geocoder = new kakao.maps.services.Geocoder();

      // console.log(this.searchAddress);
      // geocoder.addressSearch(String(this.searchAddress), (result, status) => {
      //   if (status === kakao.maps.services.Status.OK) {
      //     var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      //     console.log(result[0]);
      //     this.map.setCenter(coords);
      //     this.getChangeUrl();
      //   }
      // });

      let ps = new kakao.maps.services.Places();
      ps.keywordSearch(this.searchAddress, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // console.log(result[0]);
          this.map.setCenter(coords);
          this.getChangeUrl();
        }
      });
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
