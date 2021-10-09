<template>
  <div class="tag">
    <span class="tag-text">{{ tagname }}</span>
    <svg
      width="10"
      height="11"
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 1.5L1 9.5M1 1.5L9 9.5"
        stroke="#FECC50"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "ArticleTag",
  props: {
    id: Number,
    tagname: String,
    isActive: Boolean,
    clickable: Boolean,
    unclickable: Boolean,
    vertical: Boolean
  },
};
</script>
<style lang="scss">
</style>
