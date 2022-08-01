<template>
  <div class="custom-select" :tabindex="tabindex" @blur="closeDD">
    <div
      class="selected"
      :class="{
        open: open,
        isempty: isEmpty && !selected,
        defaultColor: selected == 'Не Выбрано',
      }"
      @click="toggle"
    >
      <span>{{ title ? title : "Категория" }}</span>
      <input
        v-model="selected"
        class="search-input"
        type="text"
        :placeholder="defaultVal"
      />
      <div class="icon">
        <img src="../../assets/drop-down.svg" alt="" />
      </div>
      <!-- {{ selected }} -->
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of filteredOptions"
        :key="i"
        @click.stop="
          selected = option.name;
          open = false;
          $emit('input', option.id);
        "
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    defaultVal: {
      required: false,
    },
    edit: {
      required: false,
    },
    title: {
      required: false,
    },
    isEmpty: {
      required: false,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    withObj: {
      required: false,
    },
    submitted: {
      required: false,
    },
  },
  data() {
    return {
      selected: this.edit ? this.defaultVal : "",
      // selected: "",
      open: false,
    };
  },
  computed: {
    filteredOptions() {
      return this.options?.filter((option) => {
        return option.name.toLowerCase().includes(this.selected.toLowerCase());
      });
    },
  },
  methods: {
    closeDD() {
      this.open = false;
    },
    toggle() {
      if (this.notAllow && !this.options.length) return;
      this.open = !this.open;
    },
    sendData(option) {
      if (this.withObj) {
        this.selected = option.name;
      } else {
        this.selected = option;
      }

      this.open = false;
      this.$emit("input", option);
    },
  },
  watch: {
    submitted() {
      if (this.submitted === true) {
        this.selected = this.default;
        this.$emit("changee");
      }
    },
  },
};
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  font-size: 14px;
  line-height: 32px;
  font-family: sans-serif;
  font-weight: 400;
  margin-bottom: 12px;
}

.custom-select .selected {
  background: #f6f6f6;
  border-radius: 8px;
  padding: 1.4rem 8px 2px 10px;
  cursor: pointer;
  user-select: none;
}
.defaultColor input {
  color: #939498;
}
.custom-select .selected.open {
  /* border: 1px solid #ad8225; */
  border-radius: 6px 6px 0px 0px;
}

.custom-select .items {
  /* was 14rem below */
  max-height: 11.5rem;
  overflow-y: scroll;
  color: rgb(68, 68, 68);
  border: 1px solid #ced4da;
  border-radius: 0px 0px 6px 6px;
  position: absolute;
  background-color: #f6f6f6;
  left: 0;
  right: 0;
  z-index: 100;
}
::-webkit-scrollbar {
  display: none;
}
.custom-select .items div {
  position: relative;
  color: rgb(68, 68, 68);
  border-top: 0.1px solid rgba(68, 68, 68, 0.1);
  padding: 2px 1rem;
  transition: all 0.2s ease;
  cursor: pointer;
  user-select: none;
}
span {
  color: #b6bccb;
  font-size: 13px;
  font-weight: 600;
  top: 0;
  left: 10px;
  position: absolute;
}
.custom-select .items div:hover {
  background-color: rgba(19, 23, 40, 0.1);
}

.selectHide {
  display: none;
}
.search-input {
  background: transparent;
  border: none;
  outline: none;
}
.icon {
  position: absolute;
  right: 14px;
  top: 14px;
}
.icon img {
  width: 90%;
  transition: all 0.2s ease;
}
.selected.open .icon img {
  transform: rotateZ(180deg);
}
input {
  width: 95%;
}
</style>
