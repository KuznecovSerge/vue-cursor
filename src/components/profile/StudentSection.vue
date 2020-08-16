<template>
  <v-card flat>
    <v-row class="mb-6" no-gutters>
      <b-col class="pr-3">
        <Carousel
          title="Мои покупки"
          titleLink="/profile/purchases"
          placeholder="Начни учиться новому"
          v-bind:items="boughtItems"
          :onClickItem="handleClickProduct"
          nameProperty="title"
          key="__student$products"
        >
        <template v-slot:additional>
          <v-btn
            small
            color="success"
            @click="$router.push(`/catalog`)"
            > <i class="fas fa-plus-circle"></i>
          </v-btn>
        </template>
      </Carousel>
      </b-col>
      <b-col class="pr-3">
        <Carousel
          title="Избранное"
          placeholder="Место твоих желаний"
          v-bind:items="favoriteItems"
          :onClickItem="handleClickInCatalog"
          nameProperty="title"
          key="__student$favorites"
        >
        <template v-slot:additional>
          <v-btn
            small
            color="success"
            @click="$router.push(`/catalog`)"
            > <i class="fas fa-plus-circle"></i>
          </v-btn>
        </template>
      </Carousel>
      </b-col>
      <b-col class="pr-3">
        <Carousel
          title="Недавние"
          placeholder="Вы не посмотрели еще не одного продукта!"
          v-bind:items="seenproducts"
          :onClickItem="(p) => $router.push(`/catalog/${p.entityId}`)"
          nameProperty="title"
          key="__student$recent"
        />
      </b-col>
    </v-row>
    <v-row class="mb-6" no-gutters>
      <b-col class="pr-3">
        <Carousel
          title="Комментарии"
          placeholder="Твое мнение настолько ценно, что ты решил пока не делиться им ни с кем"
          v-bind:items="comments"
          :onClickItem="handleSwitchToComment"
          :nameGetter="(n) => `' ${n.comment} '` "
          nameProperty="comment"
          key="__student$comments"
        />
      </b-col>
      <b-col class="pr-3">
        <Carousel
          title="Новинки"
          placeholder="Новые курсы из ваших подписок и хештегов"
          v-bind:items="totalnews"
          :onClickItem="handleClickInCatalog"
          nameProperty="title"
          key="__student$newproducts"
        />
      </b-col>
      <b-col class="pr-3">
        <!-- еще не сделано -->
        <Carousel
          title="Подборки курсов"
          placeholder="Подборки из журналов"
          v-bind:items="[]"
          :onClickItem="handleClickSeenProducts"
          nameProperty="title"
          key="__student$selection"
        />
      </b-col>
      </v-row>
       <v-row class="mb-6" no-gutters>
    <b-col class="pr-3">
        <Carousel
          title="Любимые авторы"
          placeholder="Вы еще не нашли подходящих вам авторов"
          v-bind:items="subscriptions"
          :onClickItem="handleClickAuthors"
          :nameGetter="(item) => `${item.author.firstName} ${item.author.lastName}`"
          key="__student$favoriteauthors"
        />
      </b-col>
      <b-col class="pr-3">
        <Carousel
          title="Новости"
          placeholder="Здесь будут новости"
          v-bind:items="journalEntries"
          :onClickItem="handleClickToJournals"
          nameProperty="title"
          key="__student$news"
        >
         <template v-slot:newsDescription>
          {{ journalDesc }}
        </template>
        <template v-slot:newsPicture>
          <div>
            <img :src="`/public/assets/media/${journalPhoto}`" alt="">
          </div>
        </template>
      </Carousel>
      </b-col>
      </v-row>
    <v-row class="mb-6" no-gutters>
      <b-col class="pr-12">
        <Links :user="currentUser" />
        <Reposts :reposts="reposts" />
        <Tags :subscribedTags="subscribedTags" />
      </b-col>
    </v-row>
  </v-card>
</template>

<script>
import Links from "@/components/profile/student/Links";
import Reposts from "@/components/profile/student/Reposts";
import Tags from "@/components/profile/student/Tags";
import NotificationNewJournal from "@/components/NotificationNewJournal";
import UserInfo from "@/components/profile/student/UserInfo";
import Carousel from "@/components/Carousel";
import Profile from "@/pages/Profile";
import { Constants } from "../../constants";

export default {
  components: {
    Links,
    Reposts,
    Tags,
    NotificationNewJournal,
    UserInfo,
    Carousel,
    Profile
  },

  data: () => {
    return {
      subscriptions: [],
      preload: true,
      reposts: [],
      subscribedTags: [],
      journalEntries: [],
      boughtItems: new Array(),
      favoriteItems: new Array(),
      seenproducts: new Array(),
      comments: new Array(),
      productsnew: new Array(),
      journalDesc: [],
      journalPhoto: [],
      tagsName: [],
      topOnly: Boolean,
      overlaps: [],
      totalnews: []
    };
  },

  beforeCreate() {
    // аперкейс первой буквы, чтобы не было гемороя с регистром
    String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
    };
    this.$http
      .get(`/api/users/section/student`)
      .then(res => {
        const model = res.data.viewmodel;
        if (!!model) {
          this.boughtItems = model.sales;
          this.favoriteItems = model.favorites;
          this.seenproducts = model.seen;
          this.comments = model.comments;
          this.subscriptions = model.authorsSubscribe;
          this.subscribedTags = model.tagsSubscribe;
          this.tagsName = model.tagsSubscribe.map(obj=>{
              return obj.tagName.capitalize();
          });
          this.productsnew = model.productsnew;
}
      })
      .then(tags => {
        this.$http
          .get('/api/catalog/category/', {
            params: {
              topOnly: false
            }
          })
      .then(res => {
        this.categories = res.data.items;
          const parent = res.data.items.categories.filter(object =>
          this.tagsName.includes(object.name));
          const children = res.data.items.sub.filter(obj=>
             this.tagsName.includes(obj.name));
             let parentId = parent.map(v=>{
              return v.id; // id категории, название которой совпало с хештегом из подписок
            });
            let childId = children.map(v=>{
              return v.id; // id подкатегории, название которой совпало с хештегом из подписок
            });
            let coincidences = parentId.concat(childId);
      })
      .then(coincidences => { // получить товары категорий которые определили выше
         this.$http
          .get('/api/catalog', {
            params: {
              categoryId: coincidences,
              limit: 15
            }
          })
           .then(res => {
             this.overlaps = res.data.items;
             let totalnew = this.overlaps.concat(this.productsnew);
             this.totalnews = totalnew.sort(function(a,b){return a.id < b.id ? -1 : 1;}).reduce(function(totalnew, el){
              if(!totalnew.length || totalnew[totalnew.length - 1].id != el.id) {
                totalnew.push(el);
              }
              return totalnew;
            }, []);
           })
      })
    })

      .catch(err => {
        console.log(err);
      });
  },

  mounted() {
    // получение репостов журналов
    this.$http
      .get("/api/journal/get-repost/" + this.currentUser.id)
      .then(reposts => {
        this.reposts = reposts.data.items;
        this.preload = false;
      })
      .catch(error => {
        console.log(error);
      });

    // созданые журналы
    this.$http
      .get("/api/journal/get-journal-user/" + this.currentUser.id)
      .then(journal => {
        this.journalEntries = journal.data.items;
        this.journalDesc = journal.data.items.map(obj => {
            return obj.description;
          });
        this.journalPhoto = journal.data.items.map(obj => {
            return obj.mainPhoto;
          });
        this.preload = false;
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    handleSwitchToComment(comment) {
      const TYPE = this.CONST.Entities;
      switch (comment.entityId) {
        case TYPE.Product: {
          this.$router.push(`/catalog/${comment.referenceId}?c=${comment.id}`);
          break;
        }
        case TYPE.Blog: {
          this.$router.push(`/blog/${comment.referenceId}?c=${comment.id}`);
          break;
        }
      }
    },

    handleClickProduct(p) {
      this.$router.push(`/product/${p.id}/details`);
    },
    handleClickInCatalog(p) {
      this.$router.push(`/catalog/${p.id}`);
    },
    handleClickSeenProducts(p) {
      this.$router.push(`/catalog/${p.entityId}`);
    },
    handleClickAuthors(p) {
      this.$router.push(`/authors/${p.authorId}`);
    },
    handleClickToJournals(p) {
      this.$router.push(`/journal/${p.id}`);
    },
  }
};
</script>

<style scoped>
</style>
