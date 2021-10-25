<template>
  <div class='flex flex-col py-6 px-4'>
    <NuxtLink :to='link' class='container'>
      <span>{{getLocalizedDate}}</span>
      <h2 class='text-3xl font-semibold my-1'>{{title}}</h2>
      <p>{{description}}</p>
      <span class='text-gray-500 font-semibold text-sm text-indigo-600 dark:text-indigo-400'>Czytaj więcej ¬</span>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    link: {
      type: String,
      default: "/"
    },
    title: {
      type: String,
      default: "Post"
    },
    date: {
      type: Number,
      default: new Date().getTime()
    },
    description: {
      type: String,
      default: "Description"
    }
  },
  computed: {
    getLocalizedDate() {
      const date = new Date(this.date);
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric"
      };
      return date.toLocaleDateString('pl', options);
    }
  }
}
</script>
