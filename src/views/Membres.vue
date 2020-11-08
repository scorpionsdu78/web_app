<template>
    <v-card>
        <h1 style="text-align:center">Membres</h1>
        <v-btn
                color="pink"
                dark
                small
                absolute
                bottom
                right
                fab
                router to="membre/0"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-container
            id="scroll-target"
            style="max-height: 800px"
            class="overflow-y-auto"
        >
            <v-list v-for="membre in membres" :key="membre.idMembre">
                <v-card>
                    <v-list-item>
                        <v-row>
                            <v-col>
                                {{membre.prenom}} {{ membre.nom }}
                            </v-col>
                            <v-col md=3></v-col>
                            <v-col md=1>
                                <v-btn  color="warning" link router :to ="'membre/' + membre.idMembre" >
                                    <v-icon>mdi-pen</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col md=1>
                                <v-btn  color="error" @click="supr(membre.idMembre)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-list-item>
                </v-card>
            </v-list>
        </v-container>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters('user', ['getLogin']),
    ...mapGetters('membre', ['getMembres']),

    membres () {
      return this.getMembres()
    }
  },
  async mounted () {
    var logged = this.getLogin()
    if (logged === false) {
      this.$router.push({ name: 'Login' })
    }
    await this.fetchMembre()
    await this.fetchsPhotos()
    await this.fetchsRoles()
  },
  methods: {
    ...mapActions('membre', ['fetchMembre']),
    ...mapActions('photo', ['fetchsPhotos']),
    ...mapActions('role', ['fetchsRoles']),
    ...mapActions('membre', ['suprMembre']),
    supr: async function (id) {
      const _this = this
      this.suprMembre(id).then(() => { _this.$router.go() })
    }

  }
}
</script>
