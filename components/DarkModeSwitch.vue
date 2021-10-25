<template>
  <div>
    <svg v-if='darkMode' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'
         aria-hidden='true' role='img' class='iconify iconify--ph w-6 h-6 cursor-pointer dark:text-white'
         preserveAspectRatio='xMidYMid meet' viewBox='0 0 256 256' @click='toggleMode(false)'>
      <path
        d='M248 88a8 8 0 0 1-8 8h-16v16a8 8 0 0 1-16 0V96h-16a8 8 0 0 1 0-16h16V64a8 8 0 0 1 16 0v16h16a8 8 0 0 1 8 8zm-96-40h8v8a8 8 0 0 0 16 0v-8h8a8 8 0 0 0 0-16h-8v-8a8 8 0 0 0-16 0v8h-8a8 8 0 0 0 0 16zm64.457 96.65a7.985 7.985 0 0 0-2.156.352A84.031 84.031 0 0 1 111.015 41.638a8.002 8.002 0 0 0-9.965-9.962a100.014 100.014 0 1 0 123.29 123.221a8.001 8.001 0 0 0-7.883-10.248z'
        fill='currentColor'></path>
    </svg>
    <svg v-if='!darkMode' class='iconify iconify--ph w-6 h-6 cursor-pointer' preserveAspectRatio='xMidYMid meet'
         xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true'
         role='img' viewBox='0 0 256 256' @click='toggleMode(true)'>
      <path
        d='M128 56a72 72 0 1 0 72 72a72.081 72.081 0 0 0-72-72zm0 120a48 48 0 1 1 48-48a48.054 48.054 0 0 1-48 48zM116 28v-8a12 12 0 0 1 24 0v8a12 12 0 0 1-24 0zm74.225 37.774a12 12 0 0 1 0-16.97l5.658-5.657a12 12 0 1 1 16.97 16.971l-5.658 5.657a12 12 0 0 1-16.97 0zM248 128a12 12 0 0 1-12 12h-8a12 12 0 0 1 0-24h8a12 12 0 0 1 12 12zm-35.147 67.882a12 12 0 0 1-16.97 16.971l-5.658-5.657a12 12 0 1 1 16.97-16.97zM140 228v8a12 12 0 0 1-24 0v-8a12 12 0 0 1 24 0zm-74.225-37.775a12 12 0 0 1 0 16.97l-5.657 5.658a12 12 0 0 1-16.971-16.97l5.657-5.658a12 12 0 0 1 16.97 0zM40 128a12 12 0 0 1-12 12h-8a12 12 0 0 1 0-24h8a12 12 0 0 1 12 12zm3.147-67.882a12 12 0 1 1 16.97-16.971l5.657 5.657a12 12 0 1 1-16.97 16.97z'
        fill='currentColor'></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'DarkModeSwitch',
  data() {
    return {
      darkMode: true
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: this.darkMode ? 'dark' : null
      }
    }
  },
  methods: {
    toggleMode(bool) {
      this.darkMode = bool
    }
  }
}
</script>
