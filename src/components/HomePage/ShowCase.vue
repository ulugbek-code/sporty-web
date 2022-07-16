<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-7 showcase-content">
        <h1 class="fw-bold">Учитесь когда угодно,</h1>
        <h1 class="fw-bold">и где угодно</h1>
        <p class="my-3">
          Обучение без ограничений в более 100 учебных заведениях
        </p>
        <div class="up-button">
          <h6 class="mb-1">Вы студент?</h6>
          <span
            >Пройдите опрос, чтобы мы смогли подобрать наиболее подходящие для
            вас курсы</span
          >
        </div>
        <a href="https://survey.ehub.uz/clients">
          <button class="btn btn-primary px-4">Перейти к опросу</button></a
        >
      </div>
      <div class="col-lg-5 running-man d-none d-lg-block">
        <img src="../../assets/girl.png" alt="" />
      </div>
      <div class="d-flex justify-content-between">
        <div class="scroll-down d-none d-md-block">
          <img src="../../assets/scroll.png" alt="" />
        </div>
        <div class="write-down">
          <button class="btn btn-primary">
            <span class="circle">oo</span> Напишите нам
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.showcase-content {
  height: 75vh;
  padding: 8rem 0 0 6rem;
  background: url("../../assets/v-sign.svg");
  background-size: contain;
  background-repeat: no-repeat;
}
.write-down {
  position: fixed;
  right: 2rem;
  z-index: 10;
}
.showcase-content button,
.write-down button {
  font-size: 15px;
}

.running-man img {
  width: 120%;
  top: 1rem;
  position: relative;
  z-index: -1;
}
.scroll-down {
  background: rgba(1, 107, 212, 0.1);
  padding: 8px;
  border-radius: 50%;
  animation-name: animate;
  animation-timing-function: cubic-bezier(0.26, 0.53, 0.74, 1.48);
  animation-duration: 2.2s;
  animation-iteration-count: infinite;
}
.scroll-down img {
  padding: 4px;
  background: rgba(1, 107, 212, 0.1);
  border-radius: 50%;
  width: 54px;
}
.circle {
  position: relative;
  font-size: 11px;
  background: #fff;
  border-radius: 50%;
  margin: 2px;
}
h1 {
  font-size: 3.6rem;
}
.up-button {
  line-height: 19px;
  width: 60%;
  margin-bottom: 12px;
}
.up-button span {
  font-size: 14px;
}
@keyframes animate {
  0% {
    opacity: 0;
    transform: scale(0.5, 0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1, 1);
  }
  100% {
    opacity: 0;
    transform: scale(0.5, 0.5);
  }
}
@media screen and (max-width: 992px) {
  h1 {
    font-size: 3rem;
  }
  .write-down {
    font-size: 14px;
    bottom: 5%;
  }
  .write-down button {
    font-size: 13px;
    padding: 4px 8px;
  }
}
@media screen and (max-width: 576px) {
  h1 {
    font-size: 2rem;
  }
  .showcase-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    background: url("../../assets/mobile-back.png");
    background-size: cover;
    background-repeat: no-repeat;
    max-height: max-content;
    padding-bottom: 0;
    color: #fff;
    text-align: center;
  }
}
</style>
