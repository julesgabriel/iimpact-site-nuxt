<template>
  <div class="mission">
    <img :src="image" :alt="alt" class="logo">
    <p class="missionName">{{title}}</p>
  </div>
</template>

<script>
export default {
  name: "Missions",
  props:{
    image: String,
    alt: String,
    title: String
  }
}
</script>
