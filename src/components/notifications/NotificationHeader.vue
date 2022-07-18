<template>
  <div class="n-header">
    <div v-if="Object.keys(business).length !== 0" class="left">
      <div v-if="business?.user?.logo" class="img-left">
        <img :src="'https://e-hub.uz' + business.user.logo" alt="" />
      </div>
      <div v-else class="img-left">
        <img
          src="https://icon-library.com/images/no-image-available-icon/no-image-available-icon-11.jpg"
          alt=""
        />
      </div>
      <div class="content-left">
        <h4>{{ business.user.name }}</h4>
        <span>
          {{ business.user.description }}
        </span>
      </div>
    </div>
    <div class="right">
      <div class="right-top">
        <div
          @click="getCircle('qr')"
          class="base circle1"
          :class="showBelow === 'qr' ? 'active-bg' : ''"
        ></div>
        <div
          @click="getCircle('ntf')"
          class="base circle2"
          :class="showBelow === 'ntf' ? 'active-bg' : ''"
        >
          <span id="small-circle">{{ notifications }}</span>
        </div>
        <div @click.stop="showSignOut" class="admin">
          <div class="admin-title">
            <h5 class="mb-0">Aдмин Aдмин</h5>
            <span>Администратор</span>
          </div>
          <div class="admin-img"></div>
          <transition name="dd">
            <div v-if="isSignOutVisible" @click.stop="" class="sign-out">
              <div @click="signOut" class="dd d-flex align-items-center gap-2">
                <p class="mb-0">Выйти</p>
                <img src="../../assets/user.svg" alt="" />
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div v-if="showBelow === 'ntf'" class="right-bottom">
        <div class="btn-group" role="group">
          <button
            @click="filterNotifications('today')"
            type="button"
            class="btn"
            :class="activeTab === 'today' ? 'active-tab' : ''"
          >
            Сегодня
          </button>
          <button
            @click="filterNotifications('yesterday')"
            type="button"
            class="btn"
            :class="activeTab === 'yesterday' ? 'active-tab' : ''"
          >
            Вчера
          </button>
          <button
            @click="filterNotifications('week')"
            type="button"
            class="btn"
            :class="activeTab === 'week' ? 'active-tab' : ''"
          >
            Неделя
          </button>
          <button
            @click="filterNotifications('month')"
            type="button"
            class="btn"
            :class="activeTab === 'month' ? 'active-tab' : ''"
          >
            Месяц
          </button>
          <button
            @click="filterNotifications('quarter')"
            type="button"
            class="btn"
            :class="activeTab === 'quarter' ? 'active-tab' : ''"
          >
            Квартал
          </button>
          <button
            @click="filterNotifications('year')"
            type="button"
            class="btn"
            :class="activeTab === 'year' ? 'active-tab' : ''"
          >
            Год
          </button>
        </div>
        <div @click.stop="showCalendar" class="calendar-wrap">
          <div class="cal"></div>
          <div class="info position-relative">
            {{ startDate }} - {{ finishDate }}
            <transition name="dd">
              <div
                v-if="isCalendarOpen"
                @click.stop=""
                class="calendar-pp d-flex gap-3 text-center"
              >
                <div>
                  <h6>Дата начала</h6>
                  <input
                    v-model="startDate"
                    type="date"
                    class="form-control"
                    placeholder="home"
                  />
                </div>
                <div>
                  <h6>Дата окончания</h6>
                  <input
                    v-model="finishDate"
                    type="date"
                    class="form-control"
                    placeholder="home"
                  />
                </div>
              </div>
            </transition>
          </div>
          <div class="triangle mx-2">
            <img src="../../assets/polygon.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customAxios from "../../api";
export default {
  props: [
    "notifications",
    "isCalendarOpen",
    "isSignOutVisible",
    "period",
    "showBelow",
  ],
  emits: ["getNotification", "toggleCalendar", "getInnerSignOut", "sendDates"],
  data() {
    return {
      startDate: "",
      finishDate: "",
      activeTab: "today",
      triggerCircle: false,
      business: JSON.parse(localStorage.getItem("info")),
    };
  },
  methods: {
    getQrCode() {
      this.$router.push("/qr-code");
    },
    showCalendar() {
      this.$emit("toggleCalendar");
    },
    signOut() {
      localStorage.removeItem("info");
      localStorage.removeItem("userId");
      localStorage.removeItem("phone-number");
      window.close();
    },
    showSignOut() {
      this.$emit("getInnerSignOut");
    },
    async filterNotifications(day, st, fi) {
      let start, finish;
      if (!st && !fi) {
        this.startDate = "";
        this.finishDate = "";
        let tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10);

        if (day === "today") {
          this.activeTab = "today";
          let today = new Date().toISOString().slice(0, 10);
          start = today;
          finish = tomorrow;
        } else if (day === "yesterday") {
          this.activeTab = "yesterday";
          let yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10);
          start = yesterday;
          finish = tomorrow;
        } else if (day === "week") {
          this.activeTab = "week";
          let week = new Date(new Date().getTime() - 168 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10);
          let tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10);
          start = week;
          finish = tomorrow;
        } else if (day === "month") {
          this.activeTab = "month";
          let month = new Date(new Date().getTime() - 720 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10);
          start = month;
          finish = tomorrow;
        } else if (day === "quarter") {
          this.activeTab = "quarter";
          let quarter = new Date(new Date().getTime() - 2160 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10);
          start = quarter;
          finish = tomorrow;
        } else if (day === "year") {
          this.activeTab = "year";
          let year = new Date(new Date().getTime() - 8760 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10);
          start = year;
          finish = tomorrow;
        } else {
          console.log(start);
          console.log(finish);
        }
      } else {
        start = st;
        finish = fi;
      }
      this.$emit("sendDates", { startDate: start, finishDate: finish });
      try {
        // console.log(start, finish);
        const res = await customAxios.get(
          `subscription-list/filter_notification/?module_id=${
            JSON.parse(localStorage.getItem("info")).user.id
          }&start_date=${start}&finish_date=${finish}`,
          {
            headers: {
              Authorization: `token ${
                JSON.parse(localStorage.getItem("info"))?.token
              }`,
            },
          }
        );
        this.$store.commit("getNotifications", res);
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    async getCircle(val) {
      if (val === "qr") {
        try {
          const res = await customAxios.post(
            "operation/create_qr_image/",
            {
              module_id: JSON.parse(localStorage.getItem("info"))?.user.id,
            },
            {
              headers: {
                Authorization: `token ${
                  JSON.parse(localStorage.getItem("info"))?.token
                }`,
              },
            }
          );
          this.$store.dispatch("getQR", res.data[0]);
        } catch (e) {
          this.$store.dispatch("errorHandle", e);
        }
      }
      this.$emit("getNotification", val);
    },
  },
  watch: {
    async startDate(val) {
      if (this.finishDate && val) {
        this.activeTab = "";
        this.filterNotifications(null, val, this.finishDate);
        // try {
        //   const res = await customAxios.get(
        //     `subscription-list/filter_notification/?module_id=${
        //       JSON.parse(localStorage.getItem("info"))?.user.id
        //     }&start_date=${val}&finish_date=${this.finishDate}`,
        //     {
        //       headers: {
        //         Authorization: `token ${
        //           JSON.parse(localStorage.getItem("info"))?.token
        //         }`,
        //       },
        //     }
        //   );
        //   this.$store.commit("getNotifications", res);
        // } catch (e) {
        //   this.$store.dispatch("errorHandle", e);
        // }
      }
    },
    async finishDate(val) {
      if (val && this.startDate) {
        this.activeTab = "";
        this.filterNotifications(null, this.startDate, val);
        // try {
        //   const res = await customAxios.get(
        //     `subscription-list/filter_notification/?module_id=${
        //       JSON.parse(localStorage.getItem("info"))?.user.id
        //     }&start_date=${this.startDate}&finish_date=${val}`,
        //     {
        //       headers: {
        //         Authorization: `token ${
        //           JSON.parse(localStorage.getItem("info"))?.token
        //         }`,
        //       },
        //     }
        //   );
        //   this.$store.commit("getNotifications", res);
        // } catch (e) {
        //   this.$store.dispatch("errorHandle", e);
        // }
      }
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
  position: relative;
}
.img-left {
  width: 20%;
  height: 14vh;
}
.img-left img {
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
  background: #fff url("../../assets/qr.svg") no-repeat center;
  background-size: 70%;
}
.circle1.active-bg {
  background: #016bd4 url("../../assets/qr-white.svg") no-repeat center;
  background-size: 70%;
}
.circle2 {
  position: relative;
  background: #fff url("../../assets/silver-bell.svg") no-repeat center;
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
  cursor: pointer;
}
.sign-out {
  position: absolute;
  top: 45%;
  right: 55px;
  z-index: 10;
  background: #fff;
  padding: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 4px;
}
.sign-out .dd p {
  font-size: 14px;
  padding: 8px;
}
.sign-out .dd:hover {
  background: #eeeeee;
}
.dd-enter-from,
.dd-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.dd-enter-to,
.dd-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
.dd-enter-active,
.dd-leave-active {
  transition: all 0.3s ease;
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
button:hover,
button.active-tab {
  background: #016bd4;
  color: #fff;
}
.cal {
  width: 40px;
  height: 40px;
  background: url("../../assets/calendar2.svg") no-repeat center;
}
.calendar-pp {
  position: absolute;
  top: 2rem;
  right: -1.5rem;
  background: #fff;
  padding: 1rem;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 4px;
  border-radius: 6px;
}
.calendar-pp h6 {
  font-size: 15px;
}
::-webkit-calendar-picker-indicator {
  filter: invert(0.5);
}
input[type="date"] {
  font-size: 14px;
  color: #1b1b1d;
}
</style>
