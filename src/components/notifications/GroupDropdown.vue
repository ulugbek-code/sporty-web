<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div
      class="selected"
      :class="{
        open: open,
        disabled: notAllow && !options.length,
        isempty: isEmpty && !selected,
      }"
      @click="toggle"
    >
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <template v-if="withObj">
        <div
          v-for="option of options"
          :key="option.id"
          @click="sendData(option)"
        >
          {{ option.name }}
          <!-- {{ `${option.firstName} ${option.lastName}` }} -->
        </div>
      </template>
      <template v-else>
        <div
          v-for="(option, i) of options"
          :key="i"
          @click="
            selected = option.name;
            open = false;
            $emit('input', option.id);
          "
        >
          {{ option.name }}
        </div>
      </template>
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
    notAllow: {
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
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  methods: {
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
.selected.isempty {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset,
    0 0 8px rgba(239, 104, 104, 1);
}
.selected.disabled:hover {
  cursor: not-allowed;
}
.custom-select {
  position: relative;
  width: 90%;
  margin: 0 auto;
  text-align: left;
  outline: none;
  font-size: 13px;
  line-height: 28px;
  font-family: sans-serif;
  font-weight: 400;
}

.custom-select .selected {
  background: #fff;
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
  color: #495057;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  /* border: 1px solid #ad8225; */
  border-radius: 6px 6px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 13px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #7d8790 transparent transparent transparent;
}

.custom-select .items {
  /* was 14rem below */
  max-height: 8rem;
  overflow-y: scroll;
  color: rgb(68, 68, 68);
  border: 1px solid #ced4da;
  border-radius: 0px 0px 6px 6px;
  position: absolute;
  background-color: #fff;
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
  padding-left: 1em;
  transition: all 0.2s ease;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: rgba(19, 23, 40, 0.1);
}

.selectHide {
  display: none;
}
</style>
