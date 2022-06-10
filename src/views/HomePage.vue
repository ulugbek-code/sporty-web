<template>
  <section id="showcase">
    <show-case></show-case>
  </section>
  <section id="map">
    <div class="container">
      <div class="row first-row">
        <div class="col-md-6">
          <div class="map-wrap">
            <h3>Популярные залы</h3>
            <p>Залы, завоевавшие доверие пользователей</p>
            <div>
              <button>Посмотреть все залы</button>
            </div>
          </div>
        </div>
        <div class="col-md-6 text-end">
          <div class="map-wrap">
            <h3>Новые залы</h3>
            <p>Недавно открывшиеся и самые новые добавленные залы</p>
            <div>
              <button>Посмотреть все залы</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="yandex-map-wrap text-center mt-3">
            <h2 class="fw-bold">Залы возле дома, работы и учебы</h2>
            <p>
              Залы возле дома, работы и учебы Занимайся когда угодно, где угодно
              и сколько угодно
            </p>
            <div>
              <img src="../assets/yandex-map.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="row price-row">
        <div class="col-12 text-center mb-4">
          <h2 class="fw-bold">Почему абонемент Sporty?</h2>
          <p>Потому что у нас самые выгодные абонементы</p>
        </div>
        <div class="col-12">
          <div class="prices d-flex justify-content-center">
            <div class="price text-center">
              <h5>Абонемент Sporty</h5>
              <h3 class="fw-bold">1 200 000 сум / год</h3>
              <p class="mt-4">100+ заведений</p>
              <p>Рассрочка на 3 месяца</p>
              <p>Безлимит</p>
            </div>
            <div class="or"><h2 class="fw-bold">Или</h2></div>
            <div class="price text-center">
              <h5>Обычный абонемент</h5>
              <h3 class="fw-bold">2 000 000 сум / год</h3>
              <p class="mt-4">1 заведение</p>
              <p>Единоразовая плата</p>
              <p>12 занятий в месяц</p>
            </div>
          </div>
          <div class="price-check text-center">
            <button class="px-5 py-2">Узнать цены</button>
          </div>
        </div>
      </div>
    </div>
    <div id="footer">
      <div class="container">
        <div class="row">
          <div class="col-10 form-wrap m-auto">
            <form @submit.prevent="">
              <h3 class="fw-bold">
                Получите рекомендации по тренировкам от экспертов
              </h3>
              <p>
                Мы с радостью поможем вам подобрать наиболее подходящий для вас
                абонемент
              </p>
              <input
                type="text"
                class="form-control w-75 mb-3"
                placeholder="Ваше имя"
              />
              <input
                type="text"
                class="form-control w-75 mb-3"
                placeholder="Ваш номер телефона"
              />
              <button class="btn btn-primary">Получить рекомендации</button>
            </form>
          </div>
        </div>
        <div class="row column-5 mt-5">
          <div class="col-md-3">
            <div class="first-col">
              <img class="mb-2" src="../assets/light-logo.svg" alt="" />
              <h5 class="fw-bold text-light">+998 (99) 544 5394</h5>
              <p>Узбекистан Г. Ташкент.</p>
              <p>Юнусабадский район</p>
              <p>БОГИШАМОЛ 21Б</p>
            </div>
          </div>
          <div class="col-md-2">
            <div class="second-col">
              <h6 class="mb-2">Компания “Sporty”</h6>
              <p>О нас</p>
              <p>Залы и студии</p>
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
            <h6>© {{ year }} ЧП “Sporty” | info@sporty.uz</h6>
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
</template>

<script>
import ShowCase from "../components/HomePage/ShowCase.vue";
export default {
  components: {
    ShowCase,
  },
  data() {
    return {
      year: "",
    };
  },
  methods: {
    getYear() {
      this.year = new Date().getFullYear();
    },
  },
  created() {
    this.getYear();
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
}
.map-wrap button:hover {
  box-shadow: 0px 0px 25px rgba(96, 167, 238, 0.7);
}
.yandex-map-wrap div {
  width: 85%;
  margin: 0 auto;
}
.yandex-map-wrap p,
.price-row p {
  color: #016bd4;
}
.yandex-map-wrap div img {
  width: 100%;
}
.price {
  padding: 4rem 2rem;
  border-radius: 10px;
}
.price p {
  margin-bottom: 4px;
}
.prices .price:first-child {
  color: #fff;
  background: linear-gradient(180deg, #016bd4 0%, #003cbf 100%);
}
.prices .price:first-child p {
  color: #fff;
}
.prices .price:last-child {
  border: 1px solid rgba(1, 107, 212, 0.3);
}
.prices .price:last-child p {
  color: #212529;
}
.or {
  display: flex;
  align-items: center;
  margin: 0 2rem;
}
.price-check {
  padding-top: 4rem;
  height: 200px;
  background: url("../assets/v-sign.svg") center;
  background-size: 200px;
  background-repeat: no-repeat;
}
.price-row button {
  outline: none;
  border: none;
  background: #016bd4;
  color: #fff;
  transition: all 0.3s ease;
}
.price-row button:hover {
  box-shadow: 0px 0px 25px rgba(96, 167, 238, 0.7);
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
@media screen and (max-width: 1200px) {
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
    background: #0189e1;
  }
  #map .first-row {
    background: none;
  }
}
@media screen and (max-width: 576px) {
  #map {
    height: 65vh;
    background: #0189e1;
  }
  .prices {
    flex-direction: column;
    align-items: center;
  }
  .or {
    margin: 1rem 0 0.5rem;
  }
  input {
    width: 100% !important;
  }
  .form-wrap {
    padding: 2rem;
    border-radius: 10px;
  }
  .last-footer p {
    margin-bottom: 6px;
  }
  .last-footer img {
    margin: 4px 0;
  }
}
</style>
