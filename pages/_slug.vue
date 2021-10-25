<template>
  <div class='dark:text-white'>
    <h1 class='text-4xl mb-8 container w-5/6 md:w-1/2'>{{article.title}}</h1>
    <div class='post-background'>
      <div class='container py-4 w-5/6 md:w-1/2'>
        <nuxt-content :document='article'></nuxt-content>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slug',
  layout: 'Default',
  async asyncData({ $content, params }) {
    const article = await $content(params.slug).fetch()
    return { article }
  },
}
</script>
