<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option }}
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
    default: {
      type: String,
      required: false,
      default: null,
    },
    isError: {
      required: false,
    },
    multiselect: {
      required: false,
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
      multiSelected: [],
    };
  },
  methods: {
    removeItem(val) {
      this.multiSelected = this.multiSelected.filter((item) => item !== val);
      this.$emit("multi", this.multiSelected);
    },
    isUnique(comparer) {
      for (var i = 0; i < this.multiSelected.length; i++) {
        if (comparer === this.multiSelected[i]) return false;
      }
      return true;
    },
    sendData(option) {
      if (this.multiselect && this.isUnique(option)) {
        this.multiSelected.push(option);
        this.$emit("multi", this.multiSelected);
      } else if (this.withObj && !this.multiselect) {
        this.selected = option.name;
      } else {
        this.selected = option;
        this.$emit("input", option);
        this.open = false;
      }
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
  line-height: 36px;
}

.custom-select .selected {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #ced4da;
  color: #212529;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}
.empty.custom-select .selected {
  color: #dc3545 !important;
  border: 1px solid #dc3545;
}
.custom-select .selected.default {
  color: #9d9d9d;
}
.custom-select .selected.open {
  border: 1px solid #016bd4;
  border-radius: 6px 6px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  transition: all 0.4s ease;
  top: 18px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #016bd4 transparent transparent transparent;
}
.custom-select .selected.open:after {
  top: 12px;
  transform: rotate(180deg);
}
.custom-select .items {
  max-height: 13rem;
  overflow-y: scroll;
  color: #212529;
  border-radius: 0px 0px 6px 6px;
  position: absolute;
  background-color: #fff;
  border: 1px solid #ced4da;
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
  border-top: 0.1px solid #ced4da;
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
#x-circle {
  background: #ced4da;
  font-size: 14px;
  padding: 1px 6px 2px;
}
</style>
