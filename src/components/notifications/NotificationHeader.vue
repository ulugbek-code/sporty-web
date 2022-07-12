<template>
  <div class="n-header">
    <div class="left">
      <div class="img-left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Wikimedia-logo.png/768px-Wikimedia-logo.png"
          alt=""
        />
      </div>
      <div class="content-left">
        <h4>MySchool</h4>
        <span>
          Учебно Образовательный центр. Центр, где есть все для того, чтобы вы
          насладились проведенным временем со своими любимыми.
        </span>
      </div>
    </div>
    <div class="right">
      <div class="right-top">
        <div
          @click="getCircle(true)"
          class="base circle1"
          :class="triggerCircle ? 'active-bg' : ''"
        ></div>
        <div
          @click="getCircle(false)"
          class="base circle2"
          :class="!triggerCircle ? 'active-bg' : ''"
        >
          <span id="small-circle">9</span>
        </div>
        <div class="admin">
          <div class="admin-title">
            <h5 class="mb-0">Александр Третьяков</h5>
            <span>Администратор</span>
          </div>
          <div class="admin-img"></div>
        </div>
      </div>
      <div class="right-bottom">
        <div class="btn-group" role="group">
          <button type="button" class="btn">Сегодня</button>
          <button type="button" class="btn">Вчера</button>
          <button type="button" class="btn">Неделя</button>
          <button type="button" class="btn">Месяц</button>
          <button type="button" class="btn">Квартал</button>
          <button type="button" class="btn">Год</button>
        </div>
        <div class="calendar-wrap">
          <div class="cal"></div>
          <div class="info">01 июль - 07 июль</div>
          <div class="triangle mx-2">
            <img src="../../assets/polygon.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["getNotification"],
  data() {
    return {
      triggerCircle: false,
    };
  },
  methods: {
    getCircle(val) {
      this.triggerCircle = !this.triggerCircle;
      this.$emit("getNotification", val);
    },
  },
};
</script>

<style scoped>
.n-header {
  margin-top: 1rem;
  max-height: 15vh;
  display: flex;
  justify-content: space-between;
}
.left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 2;
  padding: 8px;
  border-radius: 15px;
  background: #fff;
}
.right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  flex: 3;
}
.img-left {
  width: 20%;
  height: 14vh;
  border-radius: 8px;
}
.content-left {
  width: 70%;
  line-height: 16px;
}
img {
  height: 100%;
  width: 100%;
}
h4 {
  font-size: 22px;
  margin-bottom: 4px;
  color: #1b1b1d;
  font-weight: bold;
}
.content-left span {
  font-size: 14px;
  margin-bottom: 0;
  color: #aeaeae;
}
.right-top,
.right-bottom {
  display: flex;
  gap: 8px;
}
.calendar-wrap {
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
  background: #fff;
  cursor: pointer;
}
.info {
  font-size: 13px;
}
.base {
  border-radius: 50%;
  width: 45px;
  height: 45px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.base:active {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.circle1 {
  background: #fff url("../../assets/calendar.svg") no-repeat center;
  background-size: 50%;
}
.circle1.active-bg {
  background: #016bd4 url("../../assets/calendar.svg") no-repeat center;
  background-size: 50%;
}
.circle2 {
  position: relative;
  background: #fff url("../../assets/bell.svg") no-repeat center;
  background-size: 50%;
}
.circle2.active-bg {
  background: #016bd4 url("../../assets/bell.svg") no-repeat center;
  background-size: 50%;
}
#small-circle {
  height: 16px;
  font-size: 10px;
  position: absolute;
  right: 12%;
  top: 10%;
  padding: 1.5px 4px 0;
  border-radius: 20px;
  color: #fff;
  background: #ea4335;
}
.admin-img {
  width: 40px;
  height: 40px;
  background: url("https://images.pexels.com/photos/1161267/pexels-photo-1161267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
    no-repeat center;
  background-size: cover;
  border-radius: 50%;
}
.admin {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  text-align: end;
  padding: 1rem 6px 1rem 1rem;
  border-radius: 40px;
  align-items: center;
  height: 45px;
  line-height: 18px;
  background: #fff;
}
.admin h5 {
  font-size: 13px;
  font-weight: 600;
}
.admin span {
  font-size: 12px;
  color: #9d9d9d;
}
.admin-img img {
  width: 100%;
}
button {
  font-size: 13px;
  background: #fff;
  color: #1b1b1d;
  padding: 8px 12px;
  transition: all 0.3 s ease;
}
button:hover {
  background: #016bd4;
  color: #fff;
}
.cal {
  width: 40px;
  height: 40px;
  background: url("../../assets/calendar2.svg") no-repeat center;
}
</style>
