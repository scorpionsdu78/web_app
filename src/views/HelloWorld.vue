<template>
  <v-card>
    <h1 style="text-align:center">home</h1>
    <v-btn block color="primary" dark router to="/articles">ARTICLE</v-btn>
    <div class="my-2">
      <v-btn block color="cyan" dark router to="/membres">MEMBRE</v-btn>
    </div>
    <div class="my-2">
      <v-btn block color="success" dark router to="/spectacles">SPECTACLE</v-btn>
    </div>
    <div class="my-2">
      <v-btn block color="info" dark router to="/reservations">RESERVATION</v-btn>
    </div>
    <div class="my-2">
      <v-btn block color="warning" dark router to="/roles">ROLES</v-btn>
    </div>
    <div class="my-2">
      <v-btn block color="blue-grey" dark router to="/pieces">PIECES</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'Home',
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  })
}
</script>
