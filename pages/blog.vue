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
        :key="index"
      >
        <NuxtLink :to="'article/'+article.slug">
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
            v-on:click.native="changeClass(filter.id)"
            :tagname="filter.name"
            :clickable="clickableFilters"
          />
        </div>
      </div>
      <div
        v-for="filter in filters"
        :key="'filter-' + filter.id"
        class="container-tags-cards">
        <div class="container-tags">
          <ArticleTag
            v-if="getActiveFilter(filter.name)"
            :tagname="filter.name"
            :vertical="vertical"
            v-bind:class="{
              vertical,
              unclickable,
            }"
          />
        </div>
        <div v-if="getActiveFilter(filter.name)" class="container-cards">
          <div v-for="article in articles" :key="'article-' + article.id">
            <div v-if="!article.bestOf">
              <NuxtLink :to="'article/'+article.slug">
                <ArticleCard
                  v-if="filter.name === article.category.name"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleCard from "@/components/articleCard.vue";
import ArticleTag from "@/components/articleTag.vue";
import GetDataFetchedFromApi from "../logic/httpClient/getDataFetchFromApi";

export default {
  name: "Blog",
  async fetch() {
    await this.fetchCategories();
    await this.fetchArticles();
  },
  components: {
    BackgroundBlog: () => import('@/components/backgroundBlog.vue'),
    ArticleCard,
    ArticleTag,
  },
  data() {
    return {
      vertical: true,
      articles: [],
      filters: [],
      clickableFilters: true,
      unclickable: true,
      bestOf: true,
      noArticle: "Pas d'articles"
    };
  },
  methods: {
    // Get only the articles if the filter is active or if as article
    getActiveFilter(filterName) {
      if (this.filters.find((filter) => filter.isActive)) {
        let currentFilter = this.filters.find(
          (filter) => filter.name === filterName
        );
        if (currentFilter.isActive)
          return !!this.articles.find(
            (article) => article.category.name === filterName
          );
        else return false;
      } else
        return !!this.articles.find(
          (article) => article.category.name === filterName
        );
    },
    fetchCategories() {
      GetDataFetchedFromApi("categories").then((res) =>
        res.data.forEach((el, index) => {
          el.isActive = false;
          el.id = index;
          this.filters.push(el);
        })
      );
    },
    fetchArticles() {
      GetDataFetchedFromApi("articles").then((res) => {
        console.log(res)
        res.data.forEach((el) => {
          this.articles.push(el);
        });
      });
    },
    changeClass(id) {
      this.filters[id].isActive = !this.filters[id].isActive;
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
