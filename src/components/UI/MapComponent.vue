<template>
  <yandex-map :settings="settings" :coords="nCoords" :zoom="zoomN">
    <ymap-marker
      v-for="eachClass in allClasses"
      :key="eachClass.id"
      :marker-id="eachClass.id"
      :coords="eachClass.location"
      :marker-events="['click']"
      @click="getEachClass(eachClass.id)"
    ></ymap-marker>
  </yandex-map>
</template>

<script>
import { yandexMap, ymapMarker } from "vue-yandex-maps";
export default {
  components: { yandexMap, ymapMarker },
  props: ["allClasses", "nCoords", "zoomN"],
  emits: ["sendCoords"],
  data() {
    return {
      settings: {
        apiKey: process.env.VUE_APP_YANDEX_API,
        lang: "ru_RU",
        coordorder: "latlong",
        enterprise: false,
        version: "2.1",
      },
    };
  },
  methods: {
    getEachClass(e) {
      this.$emit("sendCoords", e);
    },
  },
};
</script>

<style scoped>
.ymap-container {
  height: 600px;
}
/*  <ymap-marker 
      marker-type="circle"
      :coords="[54.62896654088406, 39.731893822753904]"
      circle-radius="1600"
      hint-content="Hint content 1"
      :marker-fill="{color: '#000000', opacity: 0.4}"
      :marker-stroke="{color: '#ff0000', width: 5}"
      :balloon="{header: 'header', body: 'body', footer: 'footer'}"
    ></ymap-marker>
    <ymap-marker
      :coords="[41.62896654088406, 69.731893822753904]"
    ></ymap-marker>
    <ymap-marker
      :coords="[41.62896654088406, 66.731893822753904]"
    ></ymap-marker>
    <ymap-marker
      :coords="[42.62896654088406, 67.731893822753904]"
    ></ymap-marker>
    <ymap-marker
      :coords="[43.62896654088406, 68.731893822753904]"
    ></ymap-marker> */
</style>
