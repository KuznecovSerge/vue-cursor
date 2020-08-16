<template>
  <div class="accordion" id="tags-accordion" v-if="subscribedTags.length">
    <br />
    <h4>Подписки на теги</h4>
    <div class="card" v-for="tag in subscribedTags" v-bind:key="tag.id">
      <div class="card-header d-flex justify-content-between" id="headingOne">
        <h2 class="mb-0">
          <button
            class="btn btn-link"
            type="button"
            data-toggle="collapse"
            :data-target="'#' + tag.id"
            aria-expanded="true"
            :aria-controls="tag.id"
            @click="toggle(tag)"
          >{{tag.tagName}}</button>
        </h2>
        <b-button size="sm" variant="outline-primary" @click="handleUnsubscribe(tag)">Отписаться</b-button>
      </div>

      <div
        :id="'expanded_item_' + tag.id"
        class="collapse"
        aria-labelledby="headingOne"
        data-parent="#tags-accordion"
      >
        <div class="card-body">
          <b-spinner variant="success" label="Spinning" v-if="pollingItem === tag.id"></b-spinner>
          <div v-else>
            <div v-if="expandedItems[tag.id] && expandedItems[tag.id].length">
              <b-table
                class="fetch-data"
                small
                hover
                :items="expandedItems[tag.id]"
                @row-clicked="handleSelect"
              ></b-table>
            </div>
            <div v-else>
              <b-alert show variant="info">Нет обновлений по тегам!</b-alert>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subscribedTags: Array,
    demo: Boolean
  },

  data: function() {
    return {
      expandedItems: {},
      pollingItem: -1
    };
  },

  computed: {
    fetching(id) {
      return this.expandedItems[id] && this.expandedItems[id].length;
    }
  },

  methods: {
    handleUnsubscribe(tag) {
      this.$http.post("/api/journal/subscribing-tag", {
        name: tag.tagName,
        userId: this.currentUser.id
      }).then(res => {
        this.subscribedTags = this.subscribedTags.filter(t => t.tagName != tag.tagName);
      }).catch(err => {
        console.log(err);
      });
    },

    handleSelect(e) {
      const id = e[Object.keys(e)[0]];
      if (id) {
        this.$router.push(`/blog/${id}`);
      }
    },

    toggle(tag) {
      if (!this.expandedItems[tag.id]) {
        this.pollingItem = tag.id;
        this.$http
          .get("/api/blog/get-note-subscribtions", {
            params: {
              tag: tag.tagName,
              userId: this.currentUser.id
            }
          })
          .then(res => {
            return res.data.items;
          })
          .then(items => {
            this.pollingItem = -1;
            const tableItems = items.map((val, idx) => {
              return {
                "Номер записи": val.id,
                Пользователь: val.users.email,
                Тема: val.title,
                "Дата создания": new Date(val.createdAt).toDateString()
              };
            });
            this.expandedItems[tag.id] = tableItems;
          })
          .catch(err => {
            console.log(err);
          });
      }

      const item = `expanded_item_${tag.id}`;
      const el = document.getElementById(item);
      if (el.classList.contains("show")) {
        el.classList.remove("show");
      } else {
        el.classList.add("show");
      }
    }
  },

  created() {}
};
</script>

<style scoped>
.subscribed-item {
  font-weight: 600;
}

.fetch-data tbody tr {
  cursor: pointer;
}
</style>