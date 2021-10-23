<template>
    <ComingSoon/>
</template>

<script>
import ComingSoon from "@/components/comingSoon";
export default {
    name: "Events",
  components: {
      ComingSoon
  },
  head() {
    return {
      title: "IIMPACT - Evenements",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Evenements description",
        }
      ]
    }
  },
}
</script>

<style scoped>

</style>
