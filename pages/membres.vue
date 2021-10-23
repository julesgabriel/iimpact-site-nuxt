<template>
  <ComingSoon/>
</template>

<script>
import ComingSoon from "@/components/comingSoon";

export default {
  name: "Membres",
  components: {
    ComingSoon,
  },
  head() {
    return {
      title: "IIMPACT - Membres",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Membres description",
        }
      ]
    }
  },
};
</script>

<style scoped>

</style>
