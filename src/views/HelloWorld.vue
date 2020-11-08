<template>
  <v-card>
    <h1 style="text-align:center">home</h1>
    <v-btn block color="primary" dark router :to="{name: 'Articles'}">ARTICLE</v-btn>
    <div class="my-2">
      <v-btn block color="cyan" dark router :to="{name: 'Membres'}">MEMBRE</v-btn>
    </div>
    <div class="my-2">
      <v-btn block color="success" dark router :to="{name: 'Spectacles'}">SPECTACLE</v-btn>
    </div>
    <div class="my-2">
      <v-btn block color="info" dark router :to="{name: 'Reservations'}">RESERVATION</v-btn>
    </div>
    <div class="my-2">
      <v-btn block color="warning" dark router :to="{name: 'Roles'}">ROLES</v-btn>
    </div>
    <div class="my-2">
      <v-btn block color="blue-grey" dark router :to="{name: 'Pieces'}">PIECES</v-btn>
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
