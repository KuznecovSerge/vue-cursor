<template>
  <b-modal v-model="visible" :id="containerId" centered :title="title" hide-footer>
    <b-form @submit.stop.prevent="() => onSubmit(reportInput)">
      <label for="text-password">Описание</label>
      <b-input type="text" v-model="reportInput"></b-input>
      <b-form-text id="password-help-block">Опишите проблему наиболее детально</b-form-text>
      <div class="form-actions">
        <b-button type="submit" variant="primary">Отправить</b-button>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
export default {
    props: {
        visible: Boolean,
        containerId: String,
        title: String,
        onSubmit: Function
    },

    data: function() {
        return {
            reportInput: ""
        }
    }
};
</script>

<style lang="scss" scoped>
</style>