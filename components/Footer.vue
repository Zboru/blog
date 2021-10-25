<template>
  <div class='flex justify-between w-full py-4 px-4 md:px-0'>
    <div>
      <span class='text-gray-400'>© {{ fullYear }}</span>
      <span>Sebastian Zborowski</span>
    </div>
    <div>
      <a href='mailto:sebastianzborowski99@gmail.com' class='text-indigo-600 dark:text-indigo-400'>Email</a>
      <span class='dark:text-gray-200 text-gray-400 mx-2'>/</span>
      <a href='https://github.com/zboru' class='text-indigo-600 dark:text-indigo-400' target='_blank'>GitHub</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    fullYear() {
      return new Date().getFullYear();
    }
  }
}
</script>
