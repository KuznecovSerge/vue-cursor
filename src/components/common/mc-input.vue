<template>
    <div class="mc-input">
        <div class="mc-input__label_wrap"><span class="mc-input__label">{{label}}</span></div>
        <el-input
            class="mc-input__input" 
            :class="errorClass"
            :placeholder="placeholder"
            v-model="input"
            @blur="change"
            form="ruleForm"
        />
        <div 
            class="mc-input__feedback"
            :class="errorClass"
        >{{errorMsg}}
        </div>
    </div>
</template>

<script>
import { Input } from 'element-ui';
export default {
  props: ['value', 'readonly', 'placeholder', 'label', 'error'],

  data() {
      return {
          errorClass: '',
          errorMsg: '',
      }
  },

  components: { Input },

  computed: {
    input: {
      get() {
        return this.value;
      },

      set(value) {
        this.$emit("input", value);
      }
    }
  },

  methods: {
      change() {
          this.errorClass = this.error ? 'mc-input--error' : '';
          this.errorMsg = this.error; 
      }
  }

};
</script>

<style lang="less">
.mc-input {
    margin-top: 10px;

    &__label_wrap {
        position: absolute;
    }
    &__label {
        position: relative;
        left: 16px; /* 24-8 */
        top: -11px;
        font-size: 12px;
        line-height: 14px;
        padding: 2px 8px;
        background-color: @white;
        z-index: 1;
    }
    &__input .el-input__inner {
        border: 1px solid @border-color;
        border-radius: unset;
        width: 100%;
        padding: 17px 24px 14px 24px;
        font-size: 16px;
        line-height: 19px;
    }
    &__input&--error .el-input__inner {
        border: 1px solid @red-300;
    }

    &__feedback {
        padding-left: 16px;
        font-size: 12px;
        height: 15px;
    }
    &__feedback&--error {
        color: @red-300;
    }

}
</style>