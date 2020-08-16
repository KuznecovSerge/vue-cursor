<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th></th>
          <th class="text-left">Наименование продукта</th>
          <th class="text-left">Стоимость</th>
          <th class="text-left">Покупатель</th>
          <th class="text-left">Дата покупки</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(si, idx) in saleItems" :key="si.id">
          <td>{{ idx + 1 }}</td>
          <td>{{ si.name }}</td>
          <td>{{ si.cost }}p</td>
          <td>{{ si.sale.user.email }}</td>
          <td>{{ si.createdAt | moment("DD.MM.YYYY HH:MM") }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "SaleItems",

  props: {
    saleItems: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
</style>