<template>
  <div class="blog">
    <div class="background">
      <BackgroundBlog/>
    </div>
    <div class="blog-text-bestOfContainer">
      <div class="leftText">
        <h1 class="title">BLOG</h1>
        <p>
          Vous cherchez de la lecture ? Ça se passe ici...
          <br/>
          Réservé uniquement pour les curieux
        </p>
      </div>
      <div
        class="bestOfContainer"
        v-for="(article, index) in articles.filter((item) => item.bestOf)"
        :key="index">
        <NuxtLink :to="article.slug">
          <ArticleCard
            :mainPhoto="article.mainPhoto"
            :title="article.title"
            :date="article.date"
            :description="article.preview"
            :author="article.authors"
            :tagname="article.category.name"
            :bestOf="article.bestOf"
            v-bind:class="{
            bestOf,
            }"
          />
        </NuxtLink>
      </div>
    </div>
    <div class="allArticles">
      <p class="title">Découvrez nos articles</p>
      <div class="themes">
        <p class="text">Nos thèmes</p>
        <div class="tags">
          <ArticleTag
            v-for="filter in filters"
            :key="filter.id"
            v-bind:class="{
              active: filter.isActive,
              clickable: clickableFilters,
            }"
            v-on:click.native="changeClassAndHandleActiveFilters(filter.id)"
            :tagname="filter.name"
            :clickable="clickableFilters"
          />
        </div>
      </div>
      <template v-if="filtersActive.length > 0">
        <div
          v-for="filter in filtersActive"
          :key="'filter-' + filter.id"
          class="container-tags-cards">
          <div class="container-tags">
            <ArticleTag
              :tagname="filter"
              :vertical="vertical"
              v-bind:class="{
                vertical,
              unclickable,
              }"
            />
          </div>
          <template v-for="article in articles">
            <div v-if="!article.bestOf">
              <NuxtLink v-if="article.category.name === filter" :to="article.slug">
                <ArticleCard
                  :mainPhoto="article.mainPhoto"
                  :title="article.title"
                  :date="article.date"
                  :description="article.preview"
                  :author="article.authors"
                  :tagname="article.category.name"
                  :bestOf="article.bestOf"
                />
              </NuxtLink>
            </div>
          </template>
        </div>
      </template>
      <template v-else>
        <div
          v-for="filter in filters"
          :key="'filter-' + filter.id"
          class="container-tags-cards">
          <div class="container-tags" v-if="filter.articles.length > 0">
            <ArticleTag
              :tagname="filter.name"
              :vertical="vertical"
              v-bind:class="{
                vertical,
                unclickable,
              }"
            />
          </div>
          <template v-for="article in articles">
            <div v-if="!article.bestOf">
              <NuxtLink v-if="article.category.name === filter.name" :to="article.slug">
                <ArticleCard
                  :mainPhoto="article.mainPhoto"
                  :title="article.title"
                  :date="article.date"
                  :description="article.preview"
                  :author="article.authors"
                  :tagname="article.category.name"
                  :bestOf="article.bestOf"
                />
              </NuxtLink>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ArticleCard from "@/components/articleCard.vue";
import ArticleTag from "@/components/articleTag.vue";

export default {
  name: "Blog",
  async fetch() {
    this.filters = await fetch(`${process.env.baseUrl}/categories`).then(res => res.json());
    this.filters.forEach((el, index) => {
      el.isActive = false;
      el.id = index;
    })
    const fetchedArticles = await fetch(`${process.env.baseUrl}/articles`).then(res => res.json());
    this.articles = fetchedArticles;
    this.initialArticles = fetchedArticles;
  },
  components: {
    BackgroundBlog: () => import('@/components/backgroundBlog.vue'),
    ArticleCard,
    ArticleTag,
  },
  head() {
    return {
      title: "IIMPACT - Blog",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Blog description",
        }
      ]
    }
  },
  data() {
    return {
      vertical: true,
      articles: [],
      initialArticles: [],
      filters: [],
      filtersActive: [],
      clickableFilters: true,
      unclickable: true,
      bestOf: true,
      noArticle: "Pas d'articles"
    };
  },
  methods: {
    changeClassAndHandleActiveFilters(id) {
      this.filters[id].isActive = !this.filters[id].isActive;
      let indexOfFilterClicked = this.filtersActive.indexOf(this.filters[id].name);
      indexOfFilterClicked === -1 ? this.filtersActive.push(this.filters[id].name) : this.filtersActive.splice(indexOfFilterClicked, 1);
    },
    bestOfResponsive() {
      window.innerWidth < 550 ? (this.bestOf = false) : (this.bestOf = true);
    },
  },
  mounted() {
    this.bestOfResponsive();
    window.addEventListener("resize", () => {
      this.bestOfResponsive();
    });
  },
  watch: {
    filtersActive: function () {
      if (this.filtersActive.length === 0) return this.articles = this.initialArticles;
      let array = [];
      this.filtersActive.forEach(el => array = [...array, ...this.initialArticles.filter(element => element.category.name === el)])
      this.articles = array;
    },
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>
