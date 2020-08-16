<template>
    <div class="mc-rate">
        <span class="mc-rate__ball">{{Number(this.value).toFixed(1)}}</span>
        <el-rate 
            :value="value"
            :colors="['#F58E15', '#F58E15', '#F58E15']"
            void-color="#F58E15"
            :low-threshold="0"
            :high-threshold="0"
            @change="$emit('change', $event)"
            @input="$emit('input', $event)"
            :disabled="readonly || value > 0"
        />
    </div>
</template>

<script>
export default {
  props: ['value', 'readonly']
};
</script>

<style lang="less">
.mc-rate {
    display: flex;
    align-items: center;
    color: @orange-100;
    font-weight: 500;
    font-size: 16px;

    &__ball {
        margin-right: 12px;
    }
    
    .el-rate__icon {
        margin-right: 4px;
    }

}
</style>