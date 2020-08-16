<template>
  <div>
    <b-button v-if="this.user.active" v-on:click="this.handleLock" variant="danger">Заблокировать</b-button>
    <b-button v-else v-on:click="this.handleUnlock" variant="success">Разблокировать</b-button>
  </div>
</template>

<script>
export default {
  props: {
    user: Object
  },

  methods: {
    handleLock() {
      this.lockUnlock(false);
    },

    handleUnlock() {
      this.lockUnlock(true);
    },

    lockUnlock(locked) {
      this.$http
        .post("/api/users/lockunlock", {
          id: this.user.id,
          locked: locked
        })
        .then(res => {
          this.user.active = locked;
          return res;
        })
        .catch(err => {
          return err;
        });
    }
  }
};
</script>

<style scoped>
.action-pointer {
  cursor: pointer;
}
</style>