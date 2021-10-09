<template>
  <div class="mission">
    <img :src="image" :alt="alt" class="logo">
    <p class="missionName">{{name}}</p>
  </div>
</template>

<script>
export default {
  name: "Missions",
  props:{
    image: String,
    alt: String,
    name: String
  }
}
</script>
