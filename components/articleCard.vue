<template>
  <div class="card" @click="clicked">
    <div :class="ifBestOfDisplayBadge(bestOf)">
      <p>Best of</p>
    </div>
    <div class="top">
      <img class="thumbnail" :src="envApiUrl + mainPhoto.url" alt="miniature"/>
      <p>
        {{ new Date(date).getDay() }} / {{ new Date(date).getMonth() }} /
        {{ new Date(date).getFullYear() }}
      </p>
    </div>
    <div class="bottom">
      <div class="content">
        <h2>{{ title }}</h2>
        <ArticleTag
            :tagname="tagname"
            :isActive="isActive"
            v-bind:class="{
            unclickable: unclickable,
          }"
            :unclickable="unclickable"
        />
        <svg
            :class="bestOf ? 'bestOfArrow' : 'arrow'"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M16.6177 14.9803L16.5061 2.36402M16.5061 2.36402L3.88978 2.25237M16.5061 2.36402L2.36392 16.5062"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
        </svg>
        <p class="description">{{ description }}</p>
      </div>
      <div class="authors">
        <img
            v-for="(item, index) in author"
            :src="envApiUrl + item.avatar.formats.thumbnail.url"
            alt="ok"
            :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ArticleTag from "./articleTag";

export default {
  name: "ArticleCard",
  props: {
    id: Number,
    title: String,
    tagname: String,
    bestOf: Boolean,
    date: String,
    description: String,
    mainPhoto: Object,
    author: Array,
  },
  components: {
    ArticleTag,
  },
  methods: {
    clicked() {
      this.$emit("clicked");
    },
    ifBestOfDisplayBadge(bestOf) {
      let finalClasses = "badge";
      if (bestOf) finalClasses += " badgeMobile";
      return finalClasses;
    },
  },
  mounted() {
  },
  data() {
    return {
      envApiUrl: process.env.baseUrl,
      isActive: true,
      clickable: false,
      unclickable: true,
    };
  },
};
</script>
<style lang="scss">
</style>
