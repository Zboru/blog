<template>
  <div class="dark:text-white">
    <Navigation class='container'/>
    <Nuxt/>
    <Footer class='container'/>
  </div>
</template>

<script>
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
export default {
  name: 'Default',
  components: { Footer, Navigation }
}
</script>
