<template>
  <div>
    <div class="data-wrapper">
      <ReportsFilter :onSetFilter="handleSetFilter" :filters="filterItems" />
      <div v-if="loading" class="text-center">
        <b-spinner type="grow" label="Spinning"></b-spinner>
      </div>
      <div v-else>
        <ReportsTable v-if="dataItems.length" :dataItems="dataItems" :fields="fields" />
        <div v-else>
          <b-alert show variant="success">
            <h4 class="alert-heading">Нет не одной жалобы!</h4>
            <p>Продолжайте в том же духе!:)</p>
          </b-alert>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReportsTable from "./ReportsTable";
import ReportsFilter from "./ReportsFilter";

export default {
  name: "UsersReports",
  components: {
    ReportsTable,
    ReportsFilter
  },
  data: function() {
    return {
      loading: true,
      loadingItem: null,
      dataItems: Array,
      extendedFilters: [],
      fields: [
        { key: "user", label: "Инициатор" },
        { key: "date", label: "Дата жалобы" },
        { key: "message", label: "Сообщение" },
        { key: "actions", label: "Действия" }
      ]
    };
  },
  methods: {
    handleSetFilter(filter) {
      const table = this.CONST[filter.key];
        this.$http
          .get(`/api/reports/${table}`)
          .then(res => {
            return res.data.reports;
          })
          .then(reports => {
            return reports.map(r => {
              return {
                id: r.id,
                user: r["users.email"],
                date: new Date(r.createdAt).toDateString(),
                message: r.message,
                link: "",
                reference: r.reference,
                referenceId: r.referenceId
              };
            });
          })
          .then(dataItems => {
            this.dataItems = dataItems;
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
          });
    }
  },
  computed: {
    filterItems() {
      const keys = Object.keys(this.CONST);
      return ["Комментарии", "Блоги"]
        .concat(this.extendedFilters)
        .map((item, idx) => {
          return {
            id: idx,
            name: item,
            key:
              keys.length > idx
                ? keys[idx]
                : `unknown constant with index: ${idx}`
          };
        });
    }
  }
};
</script>

<style scoped>
.data-wrapper {
  margin: 10px;
}
</style>