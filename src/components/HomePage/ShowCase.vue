<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-7 showcase-content">
        <h1 class="fw-bold">Один абонемент</h1>
        <h1 class="fw-bold">100+ залов</h1>
        <p class="my-3">
          Занятия без ограничений в фитнес-клубах и спортивных комплексах
        </p>
        <button class="btn btn-primary px-4">Купить абонемент</button>
      </div>
      <div class="col-lg-5 running-man d-none d-lg-block">
        <img src="../../assets/ovals-behindrunninman.svg" alt="" />
      </div>
      <div class="d-flex justify-content-between">
        <div class="scroll-down">
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
  height: 80vh;
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
.running-man {
  background: url("../../assets/runninman.png") 1rem 4rem;
  background-size: 28rem;
  background-repeat: no-repeat;
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
  animation-duration: 2s;
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
  font-size: 4rem;
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
    padding: 4rem 0 0 2rem;
  }
}
</style>
