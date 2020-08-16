<template>
  <v-card class="mx-auto" color="#26c6da">
    <v-data-table
      caption="Входящие"
      :headers="headers"
      :items="messages"
      :items-per-page="5"
      class="messages-data-table"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            :class="!item.read ? 'message-item new-message' : 'message-item'"
            @click="read(item)"
            v-for="item in items"
            :key="item.id"
          >
            <td>{{ item.senderText }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.message }}</td>
            <td v-if="item.date">{{ item.date | moment("dddd, MMMM Do YYYY") }}</td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
const moment = require("moment");

export default {
  name: "MessagesDataTable",

  data: function() {
    return {
      headers: [
        {
          text: "Отправитель",
          align: "left",
          sortable: false,
          value: "senderText"
        },
        { text: "Тема", value: "title" },
        { text: "Сообщение", value: "message" },
        { text: "Дата сообщения", value: "date" }
      ]
    };
  },

  methods: {
    async read(item) {
      const result = await this.$http.post(`/api/inbox/markasread`, {
        inboxId: item.id
      });

      this.$store.dispatch("sockets/SOCKET_NOTIFY_READ", item.id);
    }
  },

  props: {
    messages: Array
  }
};
</script>

<style scoped>
.new-message {
  background-color: #fff9c4;
}

.message-item {
    cursor: pointer;
}
</style>