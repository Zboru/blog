<template>
    <div>
      <Hero class='container mb-8'/>
      <template v-for='(article, index) in articles'>
        <Post
          :key='article.slug'
          :link='article.slug'
          :class='{"post-background": index % 2 === 0}'
          :title='article.title'
          :description='article.description'/>
      </template>
    </div>
</template>

<script>
import Hero from '../components/Hero'
import Post from '../components/Post'
export default {
  components: { Post, Hero },
  layout: 'Default',
  async asyncData({ $content }) {
    const articles = await $content()
      .only(['title', 'description', 'image', 'slug', 'author'])
      .sortBy('createdAt', 'asc')
      .fetch()
    return {
      articles,
    }
  },
}
</script>
