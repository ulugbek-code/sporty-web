<template>
  <div class="create-wrap">
    <div>
      <h3 v-if="isEmpty && !value.length" class="mb-3 text-danger">
        Пожалуйста, добавьте студентов!
      </h3>
      <h1 v-else class="mb-3">Добавить студентов</h1>
      <form @submit.prevent="" @keydown.enter="saveModule">
        <div class="mb-3 int-wrap">
          <Multiselect
            v-model="value"
            mode="tags"
            :close-on-select="false"
            :searchable="true"
            :options="getUsers"
            label="name"
          />
        </div>
        <div class="d-flex gap-3">
          <button
            @click="closeCreateGroup"
            class="btn btn-secondary w-50"
            type="button"
          >
            Отмена
          </button>
          <button @click="addStudents" class="btn btn-primary w-50">
            Добавлять
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import customAxios from "../../api";
import Multiselect from "@vueform/multiselect";
export default {
  props: ["currentGr"],
  components: {
    Multiselect,
  },
  data() {
    return {
      isEmpty: false,
      grId: this.currentGr.id,
      value: [],
      allStudents: [],
    };
  },
  computed: {
    getUsers() {
      return this.allStudents.map((user) => {
        return {
          value: user.id,
          name: user.full_name,
        };
      });
    },
  },
  methods: {
    closeCreateGroup() {
      this.$store.dispatch("getIsGroup", "details");
    },
    async getStudents() {
      try {
        const res = await customAxios.get(
          `group-erp/get_students_all/?group_id=${this.grId}&module_id=${
            JSON.parse(localStorage.getItem("info")).user.id
          }`
        );
        this.allStudents = res.data;
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    async addStudents() {
      if (!this.value.length) {
        this.isEmpty = true;
        return;
      }
      try {
        await customAxios.post("group-erp/add_student/", {
          group_id: this.grId,
          user_id: this.value,
        });

        await this.$store.dispatch("getCurrentGroup", this.grId);
        await this.$store.dispatch("getGroupList");
        this.closeCreateGroup();
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
  },
  async created() {
    await this.getStudents();
  },
  unmounted() {
    this.$store.dispatch("getIsGroup", "details");
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.create-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding-left: 1rem;
}
h1,
h3 {
  font-weight: 700;
  text-align: center;
}
.int-wrap {
  max-width: 500px;
}
.btn-secondary {
  background: #b6bccb;
  border: 1px solid #b6bccb;
}
button {
  border-radius: 8px;
}
.btn-secondary:hover {
  background: #8f929a;
}
</style>
