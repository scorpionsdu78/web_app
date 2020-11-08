<template>
    <v-card>
        <h1 style="text-align:center">Reservation</h1>
        <v-btn
                color="pink"
                dark
                small
                absolute
                bottom
                right
                fab
                router to = "reservation/0"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-container
            id="scroll-target"
            style="max-height: 800px"
            class="overflow-y-auto"
        >
            <v-list v-for="reservation in reservations" :key="reservation.idresa">
                <v-card>
                    <v-list-item>
                        <v-row>
                            <v-col>
                                {{reservation.nom_reservation}}
                            </v-col>
                            <v-col md=3></v-col>
                            <v-col md=1>
                                <v-btn  color="warning" link router :to ="'reservation/' + reservation.idresa" >
                                    <v-icon>mdi-pen</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col md=1>
                                <v-btn  color="error" @click="supr(reservation.idresa)">
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
    ...mapGetters('reservation', ['getReservations']),

    reservations () {
      return this.getReservations()
    }
  },
  async mounted () {
    var logged = this.getLogin()
    if (logged === false) {
      this.$router.push({ name: 'Login' })
    }
    await this.fetchsReservation()
    await this.fetchSpectacle()
  },
  methods: {
    ...mapActions('reservation', ['fetchsReservation']),
    ...mapActions('reservation', ['supprReservation']),
    ...mapActions('spectacle', ['fetchSpectacle']),
    supr: async function (id) {
      const _this = this
      this.supprReservation(id)
        .then(function (response) {
          console.log(response)
          _this.$router.go()
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>
