<template>
  <div>
    <Navbar :open="openMenu" @close-menu="openMenu = false"/>
    <BurgerButton @Open-nav="openMenu = true"/>
    <Nuxt/>
    <Footer/>
  </div>
</template>
<script>
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default {
  components: {Navbar, Footer},
  data() {
    return {
      openMenu: false,
    }
  },

}
</script>
