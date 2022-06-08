<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
        <span class="navbar-toggler-icon"></span>
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#">
        <img src="../../assets/sporty-logo.svg" alt="" />
      </a>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item mx-3">
            <a class="nav-link" href="#">Залы и студии</a>
          </li>
          <li class="nav-item mx-3">
            <a class="nav-link" href="#">Как это работает</a>
          </li>
          <li class="nav-item mx-3">
            <a class="nav-link" href="#">Цены</a>
          </li>
        </ul>
        <div class="nav-wrap">
          <div class="me-2" style="width: 230px">
            <base-dropdown
              :options="cities"
              default="Ваш город"
            ></base-dropdown>
          </div>
          <div class="d-flex">
            <button
              class="btn btn-light text-primary mx-lg-4 px-4"
              type="button"
            >
              Вход
            </button>
            <button class="btn btn-primary px-4" type="button">
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import BaseDropdown from "./BaseDropdown.vue";
export default {
  components: {
    BaseDropdown,
  },
  data() {
    return {
      cities: [
        "Ташкент",
        "Ташкентская область",
        "Андижанская область",
        "Бухарская область",
        "Джизакская область",
        "Кашкадарьинская область",
        "Навоийская область",
        "Наманганская область",
        "Самаркандская область",
        "Сурхандарьинская область",
        "Сырдарьинская область",
        "Ферганская область",
        "Хорезмская область",
        "Республика Каракалпакстан",
      ],
    };
  },
};
</script>

<style scoped>
.navbar {
  border-bottom: 1px solid rgba(1, 111, 212, 0.15);
}
.navbar-brand img {
  width: 112px;
}
li a {
  color: #1b1b1d;
}
.navbar-toggler-icon {
  width: 1.5rem;
  height: 1.2px;
  margin: 3px 0;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.55);
}
.nav-wrap {
  display: flex;
}
.nav-wrap button {
  font-size: 15px;
}
@media (max-width: 992px) {
  .navbar-toggler {
    display: flex;
    flex-direction: column;
    box-shadow: none;
    border-color: rgba(0, 0, 0, 0.1);
  }
}
@media (max-width: 576px) {
  .nav-wrap {
    display: flex;
    flex-direction: column;
  }
  .nav-wrap div {
    margin: 4px 0;
  }
  .nav-wrap div button {
    margin: 0 4px;
  }
}
</style>
