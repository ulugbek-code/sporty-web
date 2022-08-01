<template>
  <div class="tt-wrapper">
    <base-dialog :show="deleteRoom" @close="cancelRoom">
      <template #default>
        <div class="form-task text-center">
          <h4 class="mt-2">Вы действительно хотите удалить?</h4>
        </div>
        <div class="d-flex justify-content-evenly mt-3 w-100">
          <button @click="cancelRoom" class="btn btn-danger py-2 px-5">
            Нет
          </button>
          <button @click="removeRoom" class="btn btn-outline-primary py-2 px-5">
            Да
          </button>
        </div>
      </template>
    </base-dialog>
    <!-- gr delete -->
    <base-dialog :show="deleteGr" @close="cancelRoom">
      <template #default>
        <div class="form-task text-center">
          <h4 class="mt-2">Вы действительно хотите удалить?</h4>
        </div>
        <div class="d-flex justify-content-evenly mt-3 w-100">
          <button @click="cancelRoom" class="btn btn-danger py-2 px-5">
            Нет
          </button>
          <button @click="removeGr" class="btn btn-outline-primary py-2 px-5">
            Да
          </button>
        </div>
      </template>
    </base-dialog>
    <!--  -->
    <div class="t2-head">
      <div class="box-header-2">
        <div class="box"></div>
        <div class="box">
          <p>9:00</p>
          <p>10:00</p>
        </div>
        <div class="box">
          <p>10:00</p>
          <p>11:00</p>
        </div>
        <div class="box">
          <p>11:00</p>
          <p>12:00</p>
        </div>
        <div class="box">
          <p>12:00</p>
          <p>13:00</p>
        </div>
        <div class="box">
          <p>13:00</p>
          <p>14:00</p>
        </div>
        <div class="box">
          <p>14:00</p>
          <p>15:00</p>
        </div>
        <div class="box">
          <p>15:00</p>
          <p>16:00</p>
        </div>
        <div class="box">
          <p>16:00</p>
          <p>17:00</p>
        </div>
        <div class="box">
          <p>17:00</p>
          <p>18:00</p>
        </div>
        <div class="box">
          <p>18:00</p>
          <p>19:00</p>
        </div>
        <div class="box">
          <p>19:00</p>
          <p>20:00</p>
        </div>
        <div class="box">
          <p>20:00</p>
          <p>21:00</p>
        </div>
        <div class="box">
          <p>21:00</p>
          <p>22:00</p>
        </div>
      </div>
    </div>
    <div class="t-container">
      <div class="t-head">
        <div class="box-header">
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
        </div>
      </div>
      <div class="t-body">
        <template v-for="item in arr" :key="item">
          <div class="content-wrap d-flex">
            <div class="box-content">
              <div
                class="d-flex justify-content-end gap-2 align-items-center room-info mb-3 mx-1"
              >
                <p>{{ item.name }}</p>
                <button class="m-0 p-0" @click="triggerRemoveRoom(item.id)">
                  <svg
                    width="24"
                    height="24"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 11V20.4C19 20.7314 18.7314 21 18.4 21H5.6C5.26863 21 5 20.7314 5 20.4V11"
                      stroke="#b1b1b1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10 17V11"
                      stroke="#b1b1b1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14 17V11"
                      stroke="#b1b1b1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M21 7L16 7M3 7L8 7M8 7V3.6C8 3.26863 8.26863 3 8.6 3L15.4 3C15.7314 3 16 3.26863 16 3.6V7M8 7L16 7"
                      stroke="#b1b1b1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <!-- <img src="../../assets/trash.svg" alt="" /> -->
                </button>
              </div>
              <div>
                <group-dropdown
                  :options="grArr"
                  default="Добавить группу"
                  @input="addGroup({ gr: $event, room: item.id })"
                ></group-dropdown>
              </div>
            </div>
            <div class="abs-wrap border">
              <template v-for="(date, idx) in item.groups" :key="idx">
                <div
                  v-if="date"
                  class="abs"
                  :style="{
                    flexDirection:
                      calcTotal({ groups: item.groups, group: date }) > 6
                        ? 'row'
                        : 'column',
                    top:
                      (rowHeight /
                        calcTotal({ groups: item.groups, group: date })) *
                        calcTop({
                          groups: item.groups,
                          group: date,
                          index: idx,
                        }) +
                      'px',
                    height:
                      rowHeight /
                        calcTotal({ groups: item.groups, group: date }) +
                      'px',
                    background: `${generateColor(date?.group_name)}`,
                    left: `calc(100% / 13 * ${calcStart(date?.start_date)})`,
                    width: `calc(100% / 13 * ${calcFinish({
                      start: date?.start_date,
                      finish: date?.finish_date,
                    })})`,
                  }"
                >
                  <span
                    @click="
                      triggerGrDelete({
                        roomId: item.id,
                        grId: date.group_id,
                      })
                    "
                    id="delGr"
                    ><img src="../../assets/multiply.svg" alt=""
                  /></span>
                  <p class="mx-1"><span>Гр:</span> {{ date?.group_name }}</p>
                  <p class="mx-1"><span>Лвл:</span> {{ date.level_name }}</p>
                  <p id="week" class="mx-1">
                    <span v-for="(week, i) in weekArr(date.week)" :key="week"
                      >{{ getWeek(week)
                      }}{{
                        i == weekArr(date.week).length - 1 ? "" : "-"
                      }}</span
                    >
                  </p>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import customAxios from "../../api";
import GroupDropdown from "./GroupDropdown.vue";
import { defineAsyncComponent } from "vue";
const BaseDialog = defineAsyncComponent(() => import("../UI/BaseDialog.vue"));
export default {
  props: ["filteredTT"],
  components: {
    GroupDropdown,
    BaseDialog,
  },
  data() {
    return {
      deleteGr: false,
      deleteGrId: null,
      deleteRoom: false,
      deleteRoomId: null,
      rowHeight: 240,
      grArr: [],
      weeks: ["no", "пн", "вт", "ср", "чт", "пт", "сб", "вс"],
    };
  },
  computed: {
    arr() {
      return this.$store.getters.timeTable;
    },
  },
  methods: {
    weekArr(val) {
      if (val.length > 1) {
        return val.split(",");
      } else {
        return [val];
      }
    },
    getWeek(val) {
      return this.weeks[val];
    },
    async removeGr() {
      this.deleteGr = false;
      try {
        await customAxios.post(`group/remove_group_from_room/`, {
          room_id: this.deleteGrId.roomId,
          group_id: this.deleteGrId.grId,
        });
        await this.$store.dispatch("getFilteredTimeTable", this.filteredTT);
        this.deleteGrId = null;
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    triggerGrDelete(val) {
      this.deleteGr = true;
      this.deleteGrId = val;
    },
    cancelRoom() {
      this.deleteRoom = false;
      this.deleteGr = false;
      this.deleteGrId = null;
      this.deleteRoomId = null;
    },
    triggerRemoveRoom(roomId) {
      this.deleteRoomId = roomId;
      this.deleteRoom = true;
    },
    calcTop(val) {
      let beforeItem = 0;
      val.groups.forEach((group, i) => {
        if (
          (group.start_date.slice(0, 2) == val.group.start_date.slice(0, 2) ||
            group.finish_date.slice(0, 2) ==
              val.group.finish_date.slice(0, 2) ||
            (group.start_date.slice(0, 2) < val.group.start_date.slice(0, 2) &&
              group.finish_date.slice(0, 2) >
                val.group.start_date.slice(0, 2)) ||
            (group.start_date.slice(0, 2) < val.group.finish_date.slice(0, 2) &&
              group.finish_date.slice(0, 2) >
                val.group.finish_date.slice(0, 2)) ||
            (group.start_date.slice(0, 2) > val.group.start_date.slice(0, 2) &&
              group.finish_date.slice(0, 2) <
                val.group.finish_date.slice(0, 2)) ||
            (group.start_date.slice(0, 2) < val.group.start_date.slice(0, 2) &&
              group.finish_date.slice(0, 2) >
                val.group.finish_date.slice(0, 2))) &&
          i < val.index
        ) {
          beforeItem++;
        }
      });
      return beforeItem;
    },
    async addGroup(val) {
      try {
        await customAxios.post("group/add_group_to_room/", {
          room_id: val.room,
          group_id: val.gr,
        });
        await this.$store.dispatch("getFilteredTimeTable", this.filteredTT);
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    calcTotal(val) {
      let a = val.groups.filter((group) => {
        return (
          group.start_date.slice(0, 2) == val.group.start_date.slice(0, 2) ||
          group.finish_date.slice(0, 2) == val.group.finish_date.slice(0, 2) ||
          (group.start_date.slice(0, 2) < val.group.start_date.slice(0, 2) &&
            group.finish_date.slice(0, 2) > val.group.start_date.slice(0, 2)) ||
          (group.start_date.slice(0, 2) < val.group.finish_date.slice(0, 2) &&
            group.finish_date.slice(0, 2) >
              val.group.finish_date.slice(0, 2)) ||
          (group.start_date.slice(0, 2) > val.group.start_date.slice(0, 2) &&
            group.finish_date.slice(0, 2) <
              val.group.finish_date.slice(0, 2)) ||
          (group.start_date.slice(0, 2) < val.group.start_date.slice(0, 2) &&
            group.finish_date.slice(0, 2) > val.group.finish_date.slice(0, 2))
        );
      });
      if (a.length == 1) {
        return 2;
      } else {
        return a.length;
      }
    },
    hashCode(str) {
      let hash = 0;
      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return hash;
    },
    generateColor(val) {
      if (val) {
        return `hsl(${this.hashCode(val + "n") % 360}, 100%, 55%)`;
      }
    },
    calcStart(val) {
      let number1, number2, total;

      if (val) {
        number1 = parseInt(val.slice(0, 2));
        number2 = parseInt(val.slice(3, 5));
        number2 = number2 / 60;
        if (number1 === 9) {
          total = 0;
        } else if (number1 === 10) {
          total = 1;
        } else if (number1 === 11) {
          total = 2;
        } else if (number1 === 12) {
          total = 3;
        } else if (number1 === 13) {
          total = 4;
        } else if (number1 === 14) {
          total = 5;
        } else if (number1 === 15) {
          total = 6;
        } else if (number1 === 16) {
          total = 7;
        } else if (number1 === 17) {
          total = 8;
        } else if (number1 === 18) {
          total = 9;
        } else if (number1 === 19) {
          total = 10;
        } else if (number1 === 20) {
          total = 11;
        } else if (number1 === 21) {
          total = 12;
        } else if (number1 === 22) {
          total = 13;
        }

        total += number2;
        return total;
      }
    },
    calcFinish(val) {
      let sNumber1, sNumber2, fNumber1, fNumber2, total;
      if (val?.start && val?.finish) {
        sNumber1 = parseInt(val.start.slice(0, 2));
        sNumber2 = parseInt(val.start.slice(3, 5)) / 60;
        fNumber1 = parseInt(val.finish.slice(0, 2));
        fNumber2 = parseInt(val.finish.slice(3, 5)) / 60;
        total = fNumber1 + fNumber2 - (sNumber1 + sNumber2);
        return total;
      }
    },
    async removeRoom() {
      this.deleteRoom = false;
      try {
        await customAxios.delete(`room/${this.deleteRoomId}/`);
        await this.$store.dispatch("getFilteredTimeTable", this.filteredTT);
        this.deleteRoomId = null;
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    async getGroups() {
      try {
        // const res = await customAxios.get("group/get_group/?module_id=");
        const res = await customAxios.get(
          `group/get_group/?module_id=${
            JSON.parse(localStorage.getItem("info")).user.id
          }`
        );
        this.grArr = res.data;
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
  },
  async created() {
    this.$Progress.start();
    await this.$store.dispatch("getFilteredTimeTable", this.filteredTT);
    await this.getGroups();
  },
  mounted() {
    this.$Progress.finish();
  },
};
</script>

<style scoped>
.tt-wrapper {
  position: relative;
  padding: 1rem 1rem 0 1rem;
}
.t-container {
  padding-bottom: 2.7rem;
  overflow: hidden;
}
.box-header {
  display: flex;
}
.t2-head {
  position: sticky;
  top: 0;
  z-index: 10;
  left: 1rem;
  right: 1rem;
}
.box-header-2 {
  display: flex;
}

.box-content button {
  font-size: 13px;
  outline: none;
  border: none;
}
.box {
  position: relative;
  width: calc(87% / 13);
  text-align: center;
  /* border: 1px solid #ddd; */
  font-weight: 700;
  font-size: 14px;
  /* padding: 6px 0; */
}
.t2-head .box {
  position: relative;
  width: calc(87% / 13);
  text-align: center;
  border: 1px solid #ddd;
  border-bottom: 2px solid #ddd;
  font-weight: 600;
  font-size: 14px;
  background: #fff;
}
.box-header .box:not(:nth-child(1))::after,
.box-header .box:not(:last-child)::after {
  content: "";
  width: 1.5px;
  height: 1000vh;
  position: absolute;
  right: 0;
  top: 100%;
  transform: translateX(0.5px);
  background: #ddd;
}
.box:first-child {
  width: 13%;
}
.box-content {
  width: 13%;
  border: 1px solid #ddd;
  font-weight: 700;
  font-size: 14px;
  padding: 6px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.content-wrap {
  height: 240px;
}
.t-head p,
.t2-head p {
  margin-bottom: 0;
}
.t-body p {
  margin-bottom: 0;
  font-weight: 500;
}
.t-container button {
  background: #efefef;
}
.abs-wrap {
  position: relative;
  width: 87%;
  /* line-height: 0; */
  /* float: right; */
}
.room-info button {
  background: none;
}
.room-info svg path {
  transition: all 0.2s ease;
}
.room-info button:hover svg path {
  stroke: #dc3545;
}
.abs {
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 2px 12px;
  border-radius: 5px;
  color: #fff;
  border: 1px solid #fff;
  font-size: 11px;
  overflow: hidden;
}
.abs:hover {
  z-index: 10;
}
.abs p {
  font-weight: 600;
}
.abs span {
  font-weight: 400;
}
/* #trash img {
  width: 20px;
}
#trash {
  float: right;
  margin-right: 20px;
  background: rosybrown;
  transition: all 0.1s ease;
  width: fit-content;
  padding: 4px;
}
#trash:hover {
  background: #dc3545;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 4px 4px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 5px -3px;
} */
#delGr {
  width: 17px;
  height: 17px;
  text-align: center;
  border-radius: 50%;
  position: absolute;
  right: 0%;
  top: 0%;
  transition: all 0.1s ease;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 0px 5px;
}
#delGr img {
  width: 45%;
}
#delGr:hover {
  background: #dc3545;
}
#week {
  position: absolute;
  bottom: 4%;
  right: 15%;
}
</style>
