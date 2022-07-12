<template>
  <div v-if="!each" class="class-wrapper">
    <h4>Учебные заведения</h4>
    <div
      v-for="eachClass in all"
      :key="eachClass.id"
      class="place-wrap d-flex justify-content-between gap-1"
      @click="getEachClass(eachClass)"
    >
      <div class="place-left">
        <div>
          <h5>{{ eachClass.legal_name }}</h5>
          <p>
            {{ eachClass.description }}
          </p>
        </div>
        <div class="rating d-flex align-items-center gap-1">
          <img src="../../assets/yellow-star.svg" alt="" />
          <span class="fw-bold">{{ eachClass.rating }}</span>
          <span>({{ eachClass.number_reviews }} отзывов)</span>
        </div>
      </div>
      <div class="place-right">
        <img :src="baseUrl + eachClass.logo" alt="" />
      </div>
    </div>
  </div>
  <div v-else class="each-class-wrapper">
    <div class="each-wrap">
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            v-for="(btn, idx) in each?.images"
            :key="idx"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            :data-bs-slide-to="idx"
            :class="idx == 0 ? 'active' : ''"
            :aria-current="idx == 0 ? true : false"
          ></button>
        </div>
        <div class="carousel-inner">
          <div
            v-for="(img, idx) in each?.images"
            :key="img"
            class="carousel-item"
            :class="idx == 0 ? 'active' : ''"
          >
            <img :src="baseUrl + img" class="w-100" alt="..." />
          </div>
        </div>
        <div id="title" class="text-center">
          <img @click="each = null" src="../../assets/left-sign.svg" alt="" />
          <h5 class="fw-bold mb-0">{{ each.legal_name }}</h5>
        </div>
      </div>
      <div class="each-content">
        <div class="place-left">
          <div>
            <h4>{{ each.legal_name }}</h4>
          </div>
          <div class="rating d-flex align-items-center gap-1">
            <img src="../../assets/yellow-star.svg" alt="" />
            <span class="fw-bold">{{ each.rating }}</span>
            <span>({{ each.number_reviews }} отзывов)</span>
          </div>
        </div>
        <hr />
        <div class="categories mb-3">
          <span v-for="(clas, idx) in each.classes" :key="clas.id">
            {{ clas?.category?.name
            }}{{ ++idx === each.classes.length ? "" : ", " }}
          </span>
        </div>
        <div class="facilities mb-3">
          <h5 class="mb-3">Какие удобства предлагает заведение</h5>
          <div v-if="filteredFacilities.length" class="inner-facilities">
            <div
              v-for="fac in filteredFacilities"
              :key="fac.name"
              class="facility"
            >
              <img :src="fac.photo" alt="" />
              <p>{{ fac.name }}</p>
            </div>
          </div>
        </div>
        <div class="description mb-3">
          <h5 class="mb-1">Описание заведения</h5>
          <div class="hide-desc" :class="isHidden ? 'show-desc' : ''">
            <p class="mb-0">
              {{ each.description }} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Molestias, quisquam? adipisicing elit.
              Molestias, quisquam?
            </p>
          </div>
          <p id="more" @click="ShowDesc" :class="isHidden ? 'text-danger' : ''">
            {{ dynamicDesc }}
          </p>
        </div>
        <div class="contacts mb-3">
          <h5 class="mb-1">Контакты</h5>
          <div class="d-flex align-items-center">
            <img src="../../assets/phone.svg" alt="" />
            <p class="mb-0">{{ this.formatPhone(each.phone_number) }}</p>
          </div>
        </div>
        <div class="reviews">
          <div
            class="r-title d-flex justify-content-between align-items-center mb-3"
          >
            <h5 class="mb-0">Последние отзывы</h5>
            <p class="mb-0">
              Все отзывы <img src="../../assets/right-sign.svg" alt="" />
            </p>
          </div>
          <div class="review my-2">
            <div
              class="review-header d-flex justify-content-between align-items-center mb-1"
            >
              <div class="review-left">
                <h5>Alex</h5>
                <p>06.06.2022</p>
              </div>
              <div class="review-right">
                <img
                  v-for="i in 5"
                  :key="i"
                  src="../../assets/yellow-star.svg"
                  alt=""
                />
              </div>
            </div>
            <div class="review-content">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus vitae nihil optio officia voluptas nobis dicta?
                Culpa suscipit sint dolore at, quia minima molestiae a
                cupiditate, necessitatibus, exercitationem ex facilis.
              </p>
            </div>
          </div>
          <div class="review my-2">
            <div
              class="review-header d-flex justify-content-between align-items-center mb-1"
            >
              <div class="review-left">
                <h5>Alex</h5>
                <p>06.06.2022</p>
              </div>
              <div class="review-right">
                <img
                  v-for="i in 5"
                  :key="i"
                  src="../../assets/yellow-star.svg"
                  alt=""
                />
              </div>
            </div>
            <div class="review-content">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus vitae nihil optio officia voluptas nobis dicta?
                Culpa suscipit sint dolore at, quia minima molestiae a
                cupiditate, necessitatibus, exercitationem ex facilis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["all", "eachPlace"],
  emits: ["sendEach"],
  data() {
    return {
      isHidden: false,
      each: null,
      baseUrl: process.env.VUE_APP_IMAGE_URL,
      facilitiesImage: [
        {
          name: "Бесплатная канцелярия",
          photo: require("../../assets/book.svg"),
        },
        {
          name: "Бесплатный Wi-Fi",
          photo: require("../../assets/wifi.svg"),
        },
        {
          name: "Кафе/бар/закусочная",
          photo: require("../../assets/cafe.svg"),
        },
        {
          name: "Парковка",
          photo: require("../../assets/parking.svg"),
        },
        {
          name: "Рядом с метро",
          photo: require("../../assets/subway.svg"),
        },
        {
          name: "Питьевая вода",
          photo: require("../../assets/water.svg"),
        },
        {
          name: "Зона отдыха",
          photo: require("../../assets/zone.svg"),
        },
      ],
    };
  },
  computed: {
    dynamicDesc() {
      return this.isHidden ? "Меньше" : "Подробнее";
    },
    allQuestions() {
      return this.$store.getters.questions;
    },
    getFacilities() {
      if (this.each) {
        return this.each.facilities
          .map((facility) =>
            this.allQuestions[7].variants.find((v) => v.id == facility)
          )
          .map((v) => v.name);
      } else {
        return null;
      }
    },
    filteredFacilities() {
      if (this.getFacilities.length) {
        return this.facilitiesImage.filter((fac) =>
          this.getFacilities.includes(fac.name)
        );
      } else {
        return null;
      }
    },
  },
  methods: {
    ShowDesc() {
      this.isHidden = !this.isHidden;
    },
    getEachClass(eachClass) {
      this.each = eachClass;
    },
    formatPhone(phone) {
      return (
        phone.slice(0, 4) +
        " (" +
        phone.slice(4, 6) +
        ") " +
        phone.slice(6, 9) +
        "-" +
        phone.slice(9, 11) +
        "-" +
        phone.slice(11, 13)
      );
    },
  },
  watch: {
    each(val) {
      this.$emit("sendEach", val);
    },
    eachPlace(val) {
      if (val) {
        this.each = val;
      }
    },
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}
hr {
  height: 1px;
  background: #c2a7a7;
}
.class-wrapper,
.each-class-wrapper {
  max-height: 530px;
  overflow-y: auto;
  padding: 12px;
  /* background: red; */
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 4px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
}
.each-class-wrapper {
  padding: 0;
}
.place-left {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.place-left h5 {
  font-size: 16px;
  margin-bottom: 6px;
}
.place-left p,
.categories span {
  font-size: 12px;
  color: #9d9d9d;
  line-height: 16px;
  margin: 0;
}
.categories span {
  font-size: 14px;
}
.place-right {
  width: 100px;
  height: 100px;
}
.place-right img {
  border-radius: 6px;
  width: 100%;
  height: 100%;
}
.place-wrap {
  margin: 6px 0;
  padding: 8px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.place-wrap:hover {
  background: #f7f7f7;
}
.rating span,
.description p,
.review-content p {
  font-size: 13px;
}
.rating span:last-child {
  color: #9d9d9d;
}
/*  */
.carousel-item {
  height: 200px;
}
#title {
  position: absolute;
  top: 5%;
  left: 5%;
  right: 5%;
  background: #fff;
  padding: 4px 12px;
  border-radius: 10px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.06);
}
#title img {
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  cursor: pointer;
}
.each-content {
  padding: 12px;
}
.facilities h5,
.description h5,
.contacts h5,
.reviews h5 {
  font-size: 15px;
  font-weight: 600;
}
.inner-facilities {
  display: flex;
}
.facility {
  max-width: 100px;
  border: 1px solid #bdbdbd;
  border-radius: 10px;
  margin: 0 2px;
  padding: 4px;
}
.facility:first-child {
  margin-left: 0;
}
.facility:last-child {
  margin-right: 0;
}
.facility img {
  width: 26px;
  height: 26px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.facility p {
  font-size: 12px;
  margin-bottom: 0;
  text-align: center;
  color: #1b1b1d;
  font-weight: 500;
}
.hide-desc {
  max-height: 36px;
  overflow: hidden;
}
.hide-desc.show-desc {
  max-height: initial;
}
#more {
  display: inline-block;
  /* margin-top: 1rem; */
  color: #0169c2;
  font-size: 14px;
  cursor: pointer;
}
.contacts p {
  font-weight: 600;
  font-size: 14px;
}
.review {
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  padding: 8px 6px;
}
.review-header h5,
.review-header p,
.review-content p {
  margin-bottom: 0;
}
.r-title p {
  color: #0169c2;
  font-size: 15px;
  font-weight: 500;
}
.review-header p {
  font-size: 13px;
  color: #bdbdbd;
}
</style>
