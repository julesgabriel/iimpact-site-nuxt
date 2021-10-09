<template>
  <nav class="nav" :style="deviceHeight" :class="navClass">
    <div class="logo">
      <img src="../assets/logos/logo.svg" alt="Logo iimpact"/>
    </div>
    <ul class="container-links">
      <NuxtLink to="/">
        <li
          ref="index"
          @mouseenter="setIndicatorPosition('Home')"
          @mouseleave="setIndicatorPosition($route.name)"
        >
          Accueil
        </li>
      </NuxtLink>
      <NuxtLink to="membres">
        <li
          ref="Membres"
          @mouseenter="setIndicatorPosition('Membres')"
          @mouseleave="setIndicatorPosition($route.name)"
        >
          Membres
        </li>
      </NuxtLink>
      <NuxtLink to="evenements">
        <li
          ref="Evenements"
          @mouseenter="setIndicatorPosition('Evenements')"
          @mouseleave="setIndicatorPosition($route.name)"
        >
          Évènements
        </li>
      </NuxtLink>
      <NuxtLink to="blog">
        <li
          ref="Blog"
          @mouseenter="setIndicatorPosition('Blog')"
          @mouseleave="setIndicatorPosition($route.name)"
        >
          Blog
        </li>
      </NuxtLink>
      <div :style="indicatorStyle" class="indicator"></div>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    open: Boolean,
  },
  data() {
    return {
      indicatorStyle: "",
      navClass: "",
    };
  },
  computed: {
    deviceHeight() {
      if (process.browser) return window.innerWidth < 810 && "height: " + window.innerHeight + "px";
    },
  },
  methods: {
    setIndicatorPosition(route, widthValue = 90) {
      if (this.$refs[route]) {
        let width = "width: " + (this.$refs[route].offsetWidth - widthValue) + "px;";
        let position = "left: " + (this.$refs[route].offsetLeft + 95) + "px;";
        this.indicatorStyle = width + position;
      }
    },
    changeIndicatorColorAccordingToRouteContext() {
      this.$route.name === "singleArticle"
        ? (this.indicatorStyle = "background: #FECC50")
        : (this.indicatorStyle = "background: #FFFFFF");
    },
  },
  watch: {
    open: function (val) {
      if (val) this.navClass = "nav-open";
    },
    $route() {
      this.setIndicatorPosition(this.$route.name === "singleArticle" ? "Blog" : this.$route.name)
      this.changeIndicatorColorAccordingToRouteContext();
    },
  },
};
</script>
<style lang="scss">
</style>
