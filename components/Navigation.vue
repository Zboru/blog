<template>
  <div
    class='flex sticky top-0 justify-between py-4 px-4 bg-white md:bg-transparent dark:bg-primary md:dark:bg-transparent z-10 md:px-0'>
    <NuxtLink to='/' class='font-semibold text-xl text-indigo-600 dark:text-indigo-400'>Zboru</NuxtLink>
    <DarkModeSwitch />
  </div>
</template>

<script>
import DarkModeSwitch from './DarkModeSwitch'

export default {
  name: 'Navigation',
  components: { DarkModeSwitch }
}
</script>
