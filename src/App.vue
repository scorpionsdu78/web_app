<template>
  <router-view></router-view>
</template>

<script>
// import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  })
}
</script>
