<template>
  <div class="button">
    <a :href="link" class="text">{{name}}</a>
  </div>
</template>

<script>
export default {
  name: "Button",
  props:{
    name: String,
    link: String,
    isYellow: Boolean,
    isBlack: Boolean
  }
}
</script>
