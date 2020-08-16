<template>
  <b-table
    v-if="dataItems.length"
    striped
    bordered
    hover
    fixed
    :fields="fields"
    :items="dataItems"
    responsive="sm"
  >
    <template v-slot:cell(actions)="data">
      <b-dropdown id="dropdown-left" variant="outline-success" text="Действия" size="sm">
        <b-dropdown-item v-on:click="() => moveTo(data.item)">Перейти к записи</b-dropdown-item>
        <b-dropdown-item v-on:click="() => recordRemove(data.item)">Удалить запись</b-dropdown-item>
        <b-dropdown-item v-on:click="() => reportRemove(data.item)">Удалить жалобу</b-dropdown-item>
      </b-dropdown>
    </template>
  </b-table>
</template>

<script>

export default {
  props: {
    dataItems: Array,
    fields: Array
  },

  methods: {
    moveTo(dataItem) {
      this.loadingItem = dataItem;
      this.buildUrl(dataItem.reference, dataItem.referenceId)
        .then(url => {
          this.$store.dispatch(
            "reports/setReportedId",
            this.loadingItem.referenceId
          );
          this.$router.push(url);
        })
        .catch(err => (this.loading = false));
    },
    buildUrl(reference, id) {
      return this.$http
        .get(`/api/reports/reference`, {
          params: {
            reference: reference,
            referenceId: id
          }
        })
        .then(res => {
          return {
            item: res.data.item[0],
            reference: res.data.reference
          };
        })
        .then(dataItem => {
          console.log(dataItem)
        });
    },
    recordRemove(dataItem) {
      const id = dataItem.referenceId;
      if (!id) {
        console.error(`id is null`);
        return;
      }

      const that = this;
      this.$http
        .post(`/api/reports/deleteRecord`, {
          reference: dataItem.reference,
          referenceId: dataItem.referenceId
        })
        .then(res => {
          that.reportRemove(dataItem);
        })
        .catch(err => {
          console.error(err);
        });
    },
    reportRemove(dataItem) {
      const id = dataItem.id;
      if (!id) {
        console.error(`id is null`);
        return;
      }
      const that = this;
      this.$http
        .post(`/api/reports/delete`, {
          id: id
        })
        .then(res => {
          that.dataItems = that.dataItems.filter(i => i.id != id);
          return that.dataItems;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style scoped>
</style>