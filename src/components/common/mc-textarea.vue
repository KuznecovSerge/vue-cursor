<template>
    <div class="mc-textarea">
        <div class="mc-textarea__label_wrap"><span class="mc-textarea__label">{{label}}</span></div>
        <textarea 
            class="mc-textarea__input"
            :placeholder="placeholder"
            :rows="rows"
            :value="value"
            @change="$emit('change', $event.target.value)"
            @input="$emit('input', $event.target.value)"
        />
    </div>
</template>

<script>
export default {
  props: ['value', 'readonly', 'placeholder', 'label', 'rows']
};
</script>

<style lang="less">
.mc-textarea {
    border: 1px solid @border-color;
    margin-top: 10px;

    &__label_wrap {
        position: absolute;
    }
    &__label {
        position: relative;
        left: 16px; /* 24-8 */
        top: -14px;
        padding: 2px 8px;
        background-color: @white;
    }
    &__input {
        width: 100%;
        padding: 17px 24px 14px 24px;
    }

}
</style>