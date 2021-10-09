<template>
  <div class="event">
      <img class="thumbnail" :src="src" :alt="alt">
      <div class="text">
        <p class="name">{{title}}</p>
        <p class="date">{{date}}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: "event",
  props: {
    title: String,
    date: String,
    src: String,
    alt: String
  },
}
</script>

<style scoped>

</style>