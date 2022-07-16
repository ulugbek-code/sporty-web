<template>
  <div>
    <base-dialog :show="isSubmitted">
      <template #default>
        <div class="form-task text-center">
          <img src="../assets/correct.png" alt="" />
          <h4 style="color: #222">Спасибо за ваш вклад!</h4>
          <p>Вам остается только ждать, все остальное сделаем сами</p>
        </div>
        <div class="d-grid text-center mt-5">
          <button
            @click="isSubmitted = false"
            class="w-100 btn btn-primary py-2 px-5"
          >
            Готово
          </button>
        </div>
      </template>
    </base-dialog>
    <!--  -->
    <nav-bar></nav-bar>
    <section id="showcase">
      <show-case></show-case>
    </section>
    <section id="map">
      <div class="container">
        <div class="row first-row">
          <div class="col-md-6">
            <div class="map-wrap">
              <h3>Популярные заведения</h3>
              <p>Заведения, завоевавшие доверие пользователей</p>
              <div>
                <a href="#places">
                  <button>Посмотреть все заведения</button>
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-6 text-end">
            <div class="map-wrap">
              <h3>Новые заведения</h3>
              <p>Недавно открывшиеся и самые новые добавленные заведения</p>
              <div>
                <a href="#places">
                  <button>Посмотреть все заведения</button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-5" id="places">
          <div class="yandex-map-wrap text-center mt-3">
            <h2 class="fw-bold">Заведения возле дома, учебы и работы</h2>
            <p>
              Найдите учебные заведения неподалеку от вашего дома, учебы и
              работы
            </p>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-md-3 p-0 mb-4 mb-md-0">
                <all-classes
                  :all="classesShort"
                  :eachPlace="foundClass"
                  @sendEach="getEach"
                ></all-classes>
              </div>
              <div class="col-md-9 map-wrap p-0">
                <map-component
                  :allClasses="classesShort"
                  :zoomN="zNumber"
                  :nCoords="newCoords"
                  @sendCoords="getCoords"
                ></map-component>
              </div>
            </div>
          </div>
        </div>
        <price-section></price-section>
      </div>
      <div id="footer">
        <div class="container">
          <div class="row">
            <div class="col-10 form-wrap m-auto">
              <form @submit.prevent="">
                <h3 class="fw-bold">Получите рекомендации по партнерству</h3>
                <p>Мы с радостью поможем вам стать нашим партнером</p>
                <input
                  v-model.trim="firstName"
                  type="text"
                  class="form-control w-75 mb-3 border"
                  :class="isEmpty && !firstName ? 'border-danger' : ''"
                  placeholder="Ваше имя"
                  tabindex="0"
                  @blur="isEmpty = false"
                />
                <input
                  v-model.trim="phoneNumber"
                  @input="enforcePhoneFormat"
                  type="tel"
                  class="form-control w-75 mb-3 border"
                  :class="isEmpty && !phoneNumber ? 'border-danger' : ''"
                  placeholder="Ваш номер телефона"
                  tabindex="0"
                  @blur="isEmpty = false"
                />
                <button @click="createRec" class="btn btn-primary">
                  Получить рекомендации
                </button>
              </form>
            </div>
          </div>
          <div class="row column-5 mt-5">
            <div class="col-md-3">
              <div class="first-col">
                <img class="mb-2" src="../assets/light-logo.svg" alt="" />
                <h5>
                  <a href="tel:+998995445394" class="fw-bold text-light">
                    +998 (99) 544 5394
                  </a>
                </h5>
                <p>Узбекистан Г. Ташкент.</p>
                <p>Юнусабадский район</p>
                <p>БОГИШАМОЛ 21Б</p>
              </div>
            </div>
            <div class="col-md-2">
              <div class="second-col">
                <h6 class="mb-2">Компания “E-Hub”</h6>
                <p>О нас</p>
                <p>Учебные заведения</p>
                <p>Контакты</p>
              </div>
            </div>
            <div class="col-md-2">
              <div class="second-col">
                <h6 class="mb-2">Сотрудничество</h6>
                <p>Стать нашим партнером</p>
                <p>Корпоративные клиенты</p>
              </div>
            </div>
            <div class="col-md-3">
              <div class="second-col">
                <h6 class="mb-2">Разное</h6>
                <p>Публичная оферта</p>
                <p>Правила пользования</p>
                <p>Политика конфиденциальности</p>
                <p>FAQ</p>
              </div>
            </div>
            <div class="col-md-2 text-end play-market">
              <div class="third-col float-end">
                <img src="../assets/app-store.svg" alt="" />
              </div>
              <img src="../assets/google-play.svg" alt="" />
            </div>
          </div>
          <hr class="custom-hr my-4" />
          <div class="row last-footer">
            <div class="col-9">
              <h6>© {{ year }} ЧП “E-Hub” | info@ehub.uz</h6>
              <p>Все работы защищены авторскими правами.</p>
              <p>Копирование и использование материалов</p>
              <p>только с разрешения компании</p>
            </div>
            <div class="col-3 text-end">
              <img src="../assets/telegram.svg" alt="" />
              <img class="mx-lg-3" src="../assets/instagram.svg" alt="" />
              <img src="../assets/facebook.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import customAxios from "../api";
import { defineAsyncComponent } from "vue";
const PriceSection = defineAsyncComponent(() =>
  import("../components/HomePage/PriceSection.vue")
);
const BaseDialog = defineAsyncComponent(() =>
  import("../components/UI/BaseDialog.vue")
);
const AllClasses = defineAsyncComponent(() =>
  import("../components/HomePage/AllClasses.vue")
);
const MapComponent = defineAsyncComponent(() =>
  import("../components/UI/MapComponent.vue")
);
import ShowCase from "../components/HomePage/ShowCase.vue";
export default {
  components: {
    PriceSection,
    ShowCase,
    MapComponent,
    AllClasses,
    BaseDialog,
  },
  data() {
    return {
      zNumber: 13,
      newCoords: [41.31481558486347, 69.24903592258136],
      isEmpty: false,
      isSubmitted: false,
      firstName: "",
      phoneNumber: "",
      year: "",
      foundClass: null,
    };
  },
  computed: {
    classesShort() {
      return this.$store.getters.moduleShort;
    },
    resolvedNumber() {
      return "+998" + this.phoneNumber.replace(/[() \s-]+/g, "");
    },
  },
  methods: {
    getEach(val) {
      if (val) {
        this.newCoords = val.location;
        setTimeout(() => (this.zNumber = 18), 1000);
      } else {
        this.newCoords = [41.31481558486347, 69.24903592258136];
        this.zNumber = 13;
      }
    },
    getYear() {
      this.year = new Date().getFullYear();
    },
    getCoords(id) {
      this.foundClass = this.classesShort.find((short) => short.id == id);
    },
    reset() {
      this.firstName = "";
      this.phoneNumber = "";
    },
    async createRec() {
      if (!this.firstName || !this.phoneNumber) {
        this.isEmpty = true;
        return;
      }
      try {
        await customAxios.post("recommendation/", {
          name: this.firstName,
          phone_number: this.resolvedNumber,
        });
        this.isSubmitted = true;
        this.reset();
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    enforcePhoneFormat() {
      let x = this.phoneNumber
        .replace(/\D/g, "")
        .match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
      this.phoneNumber = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
      if (this.phoneNumber.length > 11) {
        this.phoneNumber =
          this.phoneNumber.substring(0, 11) +
          "-" +
          this.phoneNumber.substring(11);
      }
    },
  },
  async created() {
    this.getYear();
    await this.$store.dispatch("getModuleShort");
    await this.$store.dispatch("getQuestions");
  },
};
</script>

<style scoped>
.custom-hr {
  height: 1.5px;
  background: #303034;
}
#showcase {
  height: 90vh;
  overflow: hidden;
}
#map {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background: url("../assets/blue-section.svg");
  background-repeat: no-repeat;
}
#map .first-row {
  background: url("../assets/map-icon.svg") bottom;
  background-position-y: 20rem;
  background-repeat: no-repeat;
}
.map-wrap {
  height: 33rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
}
.map-wrap h3 {
  font-weight: bold;
}
.map-wrap button {
  background: #fff;
  color: #016bd4;
  outline: none;
  border: none;
  padding: 10px 20px;
  transition: all 0.3s ease;
}
.map-wrap button:hover {
  box-shadow: 0px 0px 25px rgba(96, 167, 238, 0.7);
}
.yandex-map-wrap div {
  width: 85%;
  margin: 0 auto;
}
.yandex-map-wrap p {
  color: #016bd4;
}
.yandex-map-wrap div img {
  width: 100%;
}
#footer {
  background: #1b1b1d;
  padding: 4rem 2rem;
}
.column-5,
.last-footer {
  width: 85%;
  margin: 0 auto;
}
.column-5 p,
.last-footer p {
  font-size: 14px;
  margin-bottom: 0;
  color: #aaaaaa;
}
.form-wrap {
  background: #fff;
  padding: 2rem 4rem;
  border-radius: 25px;
}
.form-wrap button {
  font-size: 14px;
  margin-top: 10px;
  background: linear-gradient(180deg, #0189e1 0%, #016bd4 100%);
  border-radius: 6px;
}
.form-wrap button:hover {
  box-shadow: 0px 0px 15px rgba(1, 107, 212, 0.35);
}
input::placeholder {
  color: #9d9d9d;
}
.first-col img {
  width: 112px;
}
.second-col h6,
.last-footer h6 {
  font-size: 17px;
  color: #fff;
}
.play-market div,
.play-market img,
.last-footer .col-3 img {
  cursor: pointer;
}
h5 a {
  text-decoration: none;
}
.third-col {
  width: 150px;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 8px;
}
input.border-danger::placeholder {
  color: #dc3545;
}
.form-task img {
  min-width: 150px;
  margin: 2rem 0;
}
.form-task span img {
  width: 24px;
  padding-top: 12px;
}
.form-task p {
  color: #9d9d9d;
}
@media screen and (max-width: 1200px) {
  #map {
    background: #fff;
  }
  #map .first-row {
    display: none;
  }
  .first-row .map-wrap {
    height: 25rem;
  }
  .first-row .map-wrap h3 {
    font-size: 1.5rem;
  }
  .first-row .map-wrap p {
    font-size: 14px;
  }
  #map .first-row {
    background-position-y: 15rem;
  }
}
@media screen and (min-width: 1700px) {
  #map .first-row {
    background-position-y: 23rem;
  }
}
@media screen and (max-width: 995px) {
  .first-row .map-wrap {
    height: 18rem;
  }
  #map .first-row {
    background-position-y: 12rem;
    background-size: 5rem;
  }
}
@media screen and (max-width: 768px) {
  #map {
    height: 80vh;
    background: #ffffff;
  }
  #map .first-row {
    background: none;
  }
}
@media screen and (max-width: 576px) {
  #showcase {
    height: max-content;
  }
  #map {
    height: 65vh;
  }
  input {
    width: 100% !important;
  }
  .form-wrap {
    padding: 2rem 1rem;
    border-radius: 10px;
  }
  .form-wrap h3 {
    font-size: 20px;
  }
  .form-wrap p {
    font-size: 15px;
  }
  .last-footer p {
    margin-bottom: 6px;
  }
  .last-footer img {
    margin: 4px 0;
  }
  #footer {
    padding: 4rem 0;
  }
}
</style>
