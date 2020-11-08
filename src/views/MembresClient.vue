<template>
    <v-container class="pa-1">
      <v-item-group
        multiple
      >
        <v-row>
          <v-col
            v-for="membre in membres" :key="membre.idMembre"
            cols="12"
            md="3"
          >
            <v-item>
                <v-card color="blue-grey darken-3">
                    <v-row>
                        <v-col></v-col>
                        <v-card-title> <h2>{{membre.nom}} {{membre.prenom}}</h2> </v-card-title>
                        <v-col></v-col>
                    </v-row>
                    <v-row>
                        <v-col></v-col>
                        <div v-if="membre.photos === undefined || membre.photos.length === 0">
                            <v-col ><v-img src="http://localhost:8080/api/Image/avatar.png" max-height="150px" max-width="150px"></v-img></v-col>
                        </div>
                        <div v-else>
                            <v-col ><v-img :src="'http://localhost:8080/api/Image/'+membre.photos[0].url" max-height="150px" max-width="150px"></v-img></v-col>
                        </div>
                        <v-col></v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=3></v-col>
                        <v-col cols=2><v-btn link router :to ="'membre/' + membre.idMembre"> voir le comedient </v-btn></v-col>
                    </v-row>
                </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters('membre', ['getMembres']),

    membres () {
      return this.getMembres()
    }
  },
  async mounted () {
    await this.fetchMembre()
  },
  methods: {
    ...mapActions('membre', ['fetchMembre'])

  }
}
</script>

<style>

</style>
