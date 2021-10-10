<template>
  <div class="singleArticle" v-if="article">
    <div class="article">
      <div class="banner" :style="article && {maxHeight: Math.abs(60 +  -scroll * 0.1) + 'vh' }">
        <img
          :src="article.mainPhoto.formats.large !== undefined ? envApiUrl + article.mainPhoto.formats.large.url : envApiUrl + article.mainPhoto.url"
          alt=""/>
      </div>
      <div class="content">
        <div class="top">
          <div class="left">
            <a href="#">
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
                <path
                  d="M0.368652 5L4.15146 9.08937C4.32443 9.28203 4.58881 9.36781 4.84334 9.31156C5.09647 9.25531 5.30037 9.06687 5.37631 8.81797C5.45225 8.56906 5.38897 8.29906 5.20896 8.11062L2.99693 5.72L16.9202 5.72C17.1804 5.72422 17.4208 5.58781 17.5516 5.36281C17.6838 5.13922 17.6838 4.86078 17.5516 4.63719C17.4208 4.41219 17.1804 4.27578 16.9202 4.28L2.99693 4.28L5.20896 1.88937C5.38896 1.70094 5.45225 1.43094 5.37631 1.18203C5.30037 0.933124 5.09646 0.744687 4.84334 0.688437C4.58881 0.632187 4.32443 0.717969 4.15146 0.910624L0.368652 5Z"
                  fill="#828282"
                />
              </svg>
            </a>
            <NuxtLink to="blog">Blog</NuxtLink>
            <p>></p>
            <div>{{ this.article.shortTitle }}</div>
          </div>
          <div class="right">
            <img
              v-for="(item, index) in article.authors"
              :key="index"
              :src="envApiUrl + item.avatar.formats.thumbnail.url"
              alt=""
            />
          </div>
        </div>
        <h2 id="title">{{ this.article.title }}</h2>
        <div class="tags">
          <div id="devData">{{ this.article.category.name }}</div>
        </div>
        <p class="text" v-html="renderMarkdown($md.render(article.content))"/>
        <div class="authors">
          Article publié le
          {{ renderDateToMonthAndDateLitterals(article.date) }}<br/>{{
            renderAuthorsSentence(this.article.authors)
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GetDataFetchedFromApi from "../../logic/httpClient/getDataFetchFromApi";

export default {
  async fetch() {
    await GetDataFetchedFromApi('articles', this.$route.params.slug).then(
      (res) => {
        this.title = res.data.title
        this.article = res.data
      })
  },
  name: "singleArticle",
  components: {},
  data() {
    return {
      envApiUrl: process.env.baseUrl,
      article: false,
      scroll: 0
    };
  },
  methods: {
    renderAuthorsSentence(authors) {
      let sentence = `Ecrit par ${authors[0].name}` + "\n";
      sentence += "avec la participation "
      if (authors.length > 1) {
        let arrayToConcatSentenceWith = [];
        for (let i = 1; i < authors.length; i++)
          arrayToConcatSentenceWith.push(`${/^[aeiou]$/i.test(authors[i].name[0].toLowerCase()) ? 'd\'' : 'de '}${authors[i].name}`);
        sentence += arrayToConcatSentenceWith.join(" et ");
      }
      return sentence;
    },
    renderDateToMonthAndDateLitterals(date) {
      let options = {year: "numeric", month: "long", day: "numeric"};
      let dateToConvert = new Date(date);
      return dateToConvert.toLocaleDateString("fr-FR", options);
    },
    animateArticleOnScroll() {
      return this.scroll = window.scrollY;
    },
    renderMarkdown(rendered) {
      let regex = /upload/g
      return rendered.replace(regex, process.env.baseUrl + "/upload").replace(/\/http/g, "http")
    },
  },
  mounted() {
    window.addEventListener('scroll', this.animateArticleOnScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.animateArticleOnScroll)
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@300;400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Saira:wght@400;500;600;700&display=swap");
</style>



