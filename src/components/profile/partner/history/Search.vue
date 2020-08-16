<template>
  <div>
    <v-switch v-model="dateSearch" label="Поиск по дате"></v-switch>
    <b-row>
      <b-col cols="12" sm="12" md="8" v-if="!dateSearch">
        <v-text-field v-model="textSearch"></v-text-field>
      </b-col>
      <b-col cols="12" sm="6" md="4" v-if="dateSearch">
        <v-menu
          v-model="menufrom"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="from"
              label="Дата начала продажи"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="from" @input="menufrom = false"></v-date-picker>
        </v-menu>
      </b-col>
      <b-col cols="12" sm="6" md="4" v-if="dateSearch">
        <v-menu
          v-model="menuto"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="to"
              label="Конец продажи"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="to" @input="menuto = false"></v-date-picker>
        </v-menu>
      </b-col>
      <b-col cols="12" sm="12" md="2" class="d-flex align-center">
        <v-btn color="primary" class="search-btn" @click="handleSearch">Поиск</v-btn>
      </b-col>
      <b-col cols="12" sm="12" md="2" class="d-flex align-center">
        <v-btn color="error" class="search-btn" @click="handleReset">Сбросить</v-btn>
      </b-col>
      <v-spacer></v-spacer>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Search",

  props: {
    onSearch: Function,
    onReset: Function
  },

  data: () => ({
    from: new Date().toISOString().substr(0, 10),
    to: new Date().toISOString().substr(0, 10),
    menufrom: false,
    menuto: false,
    dateSearch: true,
    textSearch: ""
  }),

  methods: {
    handleSearch() {
      if (this.onSearch) {
        const model = {
          state: this.dateSearch ? "date" : "text",
          from: this.from,
          to: this.to,
          text: this.textSearch
        };
        this.onSearch(model);
      };
    },
    handleReset() {
      if (this.onReset) {
        this.from = new Date().toISOString().substr(0, 10);
        this.to = new Date().toISOString().substr(0, 10);
        this.textSearch = "";
        this.onReset();
      }
    }
  }
};
</script>

<style scoped>
.search-btn {
  width: 100%;
}
</style>