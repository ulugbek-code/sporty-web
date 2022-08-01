<template>
  <div class="qr-wrap">
    <div class="qr-pp">
      <img :src="'https://e-hub.uz' + getQr" alt="" />
      <a
        :href="`https://e-hub.uz/download/${moduleId}/`"
        download
        class="link hover-2"
        >Скачать</a
      >
      <!-- <button @click="downloadQR(getQR, 'img')">Скачать</button> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moduleId: JSON.parse(localStorage.getItem("info")).user.id,
    };
  },
  computed: {
    getQr() {
      return this.$store.getters.qr;
    },
  },
  methods: {
    // downloadQR(val, title) {
    //   const url = window.URL.createObjectURL(new Blob(val));
    //   console.log(url);
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.setAttribute("download", title);
    //   document.body.appendChild(link);
    //   link.click();
    // },
  },
  created() {
    this.$Progress.start();
  },
  mounted() {
    this.$Progress.finish();
  },
};
</script>

<style scoped>
.qr-wrap {
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.qr-pp {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
}
.link {
  display: inline-block;
  position: relative;
  text-decoration: none;
  padding: 8px 0;
  color: #016bd4;
}
.hover-2:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 1px;
  transform: scaleX(0);
  background-color: #016bd4;
  transition: transform 0.3s;
}

.hover-2:hover:after {
  transform: scaleX(1);
}
</style>
