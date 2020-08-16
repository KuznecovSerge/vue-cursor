<template>
  <div class="messages-page-container">
    <div v-if="messages.length">
      <MessagesDataTable :messages="messages" />
    </div>
    <div v-else>
      <div v-if="polling">
        <v-subheader>Формируем список сообщений</v-subheader>
        <v-progress-linear indeterminate color="green" rounded />
      </div>
      <div v-else>
        <v-alert border="top" colored-border type="info" elevation="2">Нет входящих</v-alert>
      </div>
    </div>
  </div>
</template>

<script>
import MessagesDataTable from "@/components/inbox/MessagesDataTable";

export default {
  name: "Messages",

  data: function() {
    return {
      polling: true
    };
  },

  components: {
    MessagesDataTable
  },

  computed: {
    messages() {
      const notifies = this.$store.getters["sockets/notifies"].sort((a,b)=> b.date - a.date).reverse();
      this.polling = false;
      return notifies;
    }
  }
};
</script>

<style scoped>
</style>