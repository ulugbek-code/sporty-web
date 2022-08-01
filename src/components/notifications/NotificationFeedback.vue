<template>
  <div class="course-wrap table-responsive">
    <base-dialog :show="showEach" @close="cancelErr">
      <template #default>
        <div class="d-flex gap-4 dialog">
          <span @click="cancelErr" id="multiple">x</span>
          <div class="first-pp">
            <div>
              <h6>{{ eachReview.user_full_name }}</h6>
              <p>{{ enforcePhoneFormat(eachReview.phone_number) }}</p>
            </div>
            <div>
              <h6>
                {{
                  eachReview.module_name
                    ? eachReview.module_name
                    : "Курс не указан"
                }}
              </h6>
              <p>{{ formatDate(eachReview.create_at) }}</p>
            </div>
          </div>
          <div class="pp-comment">
            <div>
              <img
                v-for="i in eachReview.rating"
                :key="i"
                src="../../assets/yellow-star.svg"
                alt=""
                class="yellow-star"
              />
              <img
                v-for="j in calcSilverStar(eachReview.rating)"
                :key="j"
                src="../../assets/silver-star.svg"
                alt=""
              />
            </div>
            <div>
              <h6>Комментарии</h6>
              <span>{{ eachReview.comment }} </span>
            </div>
          </div>
        </div>
      </template>
    </base-dialog>
    <!--  -->
    <div class="header-tbl">
      <img src="../../assets/star.svg" alt="" />
      <h4 class="mb-0 mx-3">Отзывы</h4>
      <div>
        <p class="mb-0">
          {{ filteredNewReviews?.length }}
          <span v-if="filteredNewReviews?.length > 0" class="mx-1 new"
            >new</span
          >
        </p>
      </div>
    </div>
    <table v-if="reviews?.length" class="table table-hover">
      <tbody>
        <tr class="active">
          <td>ФИО</td>
          <td>Тел</td>
          <td>Курсы</td>
          <td>Рейтинг</td>
          <td>Отзывы</td>
        </tr>
        <tr
          v-for="review in sortedArr"
          :key="review"
          class="each-section"
          :class="review?.is_new === 'new' ? 'active' : ''"
          @click="showDialog(review)"
        >
          <td>{{ review.user_full_name }}</td>
          <td>{{ enforcePhoneFormat(review.phone_number) }}</td>
          <td>
            {{ review.module_name ? review.module_name : review.class_name }}
          </td>
          <td>
            <img
              v-for="i in review.rating"
              :key="i"
              src="../../assets/yellow-star.svg"
              alt=""
              class="yellow-star"
            />
            <img
              v-for="j in calcSilverStar(review.rating)"
              :key="j"
              src="../../assets/silver-star.svg"
              alt=""
            />
          </td>
          <td id="view-30">{{ minimizeDesc(review.comment) }}</td>
          <td class="text-center">
            <span v-if="review?.is_new === 'new'" class="new">new</span><br />
            <span>{{ filterDate(review.create_at) }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
const BaseDialog = defineAsyncComponent(() => import("../UI/BaseDialog.vue"));
export default {
  props: ["reviews", "period"],
  components: {
    BaseDialog,
  },
  data() {
    return {
      showEach: false,
      eachReview: {},
    };
  },
  computed: {
    filteredNewReviews() {
      if (this.reviews) {
        return this.reviews.filter((review) => review.is_new === "new");
      } else return null;
    },
    sortedArr() {
      if (this.reviews.length) {
        let arr = this.reviews;
        return arr.sort((a, b) => {
          return a.is_new < b.is_new ? -1 : a.is_new > b.is_new ? 1 : 0;
          // if (a.is_new < b.is_new) {
          //   return -1;
          // }
          // if (a.is_new > b.is_new) {
          //   return 1;
          // }
          // return 0;
        });
      } else {
        return null;
      }
    },
  },
  methods: {
    minimizeDesc(desc) {
      if (desc.length > 36) {
        return desc.slice(0, 36) + "...";
      } else {
        return desc;
      }
    },
    formatDate(date) {
      return (
        date.slice(8, 10) + "." + date.slice(5, 7) + " " + date.slice(11, 16)
      );
    },
    cancelErr() {
      this.showEach = false;
    },
    showDialog(review) {
      this.showEach = true;
      this.eachReview = review;
      if (review.is_new === "new") this.toggleStatus(review.review_id);
    },
    toggleStatus(id) {
      this.$store.dispatch("toggleStatus", {
        property: "review",
        id: id,
        period: this.period,
      });
    },
    calcSilverStar(yellowStars) {
      return 5 - yellowStars;
    },
    enforcePhoneFormat(phone) {
      if (phone) {
        return `(${phone.slice(4, 6)}) ${phone.slice(6, 9)}-${phone.slice(
          9,
          11
        )}-${phone.slice(11, 13)}`;
      } else {
        return "Не указано";
      }
    },
    filterDate(date) {
      let now = new Date();
      if (
        new Date(date).getDate() == now.getDate() &&
        new Date(date).getMonth() == now.getMonth() &&
        new Date(date).getFullYear() == now.getFullYear()
      ) {
        return date.substring(11, 16);
      } else {
        return (
          date.substring(8, 10) +
          "." +
          date.substring(5, 7) +
          " " +
          date.substring(11, 16)
        );
      }
    },
  },
};
</script>

<style scoped>
.header-tbl {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 14px 0;
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
}
tr:first-child {
  position: sticky;
  top: 64px;
  background: #fff;
}
tr:first-child::after {
  content: "";
  height: 0.5px;
  width: 100%;
  position: absolute;
  bottom: 2%;
  left: 0;
  z-index: 10;
  background: #010101;
}

p {
  font-size: 13px;
  color: #9d9d9d;
  margin-top: 6px;
}
tr {
  border-bottom: 1px solid #efefef;
}
td {
  font-size: 10px;
  color: #9d9d9d;
  padding: 4px;
}
.active td {
  color: #1b1b1d;
  font-weight: 600;
}
tr:first-child td {
  font-weight: bolder;
}
.new {
  background: #ed303b;
  color: #fff;
  border-radius: 9px;
  padding: 0px 8px 1px;
  cursor: pointer;
}
.new:active,
.new:hover {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
.yellow-star {
  width: 15px;
}
.each-section {
  cursor: pointer;
}
.each-section:active {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
#multiple {
  position: absolute;
  right: 8px;
  top: 0;
  color: #9d9d9d;
  cursor: pointer;
  padding: 4px 8px;
}
.dialog {
  width: 500px;
}
.first-pp {
  flex: 1;
}
.pp-comment {
  flex: 2;
}
.pp-comment span {
  color: #1b1b1d;
  font-size: 13px;
}
#view-30 {
  width: 30%;
}
</style>
