<template>
  <v-card>
      <v-form>
          <v-row>
              <v-col lg=1></v-col>
              <v-col lg=6>
                   <v-text-field
                    v-model="name"
                    label="nom de la reservation"
                    required
                ></v-text-field>
              </v-col>
              <v-col lg=2>
                <v-text-field
                    v-model="numberValue"
                    :rules = "[numberRule]"
                    label="nmbre de place"
                    hide-details
                    single-line
                    type="number"
                    :max="places"
                />
              </v-col>
          </v-row>
            <v-row>
              <v-col lg=1></v-col>
              <v-col>
                <v-select
                    v-model="value"
                    :items="items"
                    label="Spectacle"
                    item-text="nom"
                    dense
                    return-object
                    :disabled="disabled"
                 ></v-select>
              </v-col>
              <v-col lg=1></v-col>
          </v-row>
          <v-row>
            <div v-if="id===0">
              <v-btn
                  color="success"
                  class="mr-4"
                  @click="submit"
                  >
                  ajouter
              </v-btn>
            </div>
            <div v-else>
              <v-btn
                  color="warning"
                  class="mr-4"
                  @click="update"
                  >
                  modifier
              </v-btn>
            </div>
          </v-row>
      </v-form>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    name: 'nom de la reservation',
    numberValue: 0,
    place: 0,
    numberRule: v => {
      if (!isNaN(parseInt(v)) && v >= 0 && v <= 999) return true
      return 'Number has to be between 0 and 999'
    },
    items: [],
    value: undefined,
    id: -1,
    disabled: false
  }),
  computed: {
    ...mapGetters('spectacle', ['getSpectacles']),
    ...mapGetters('reservation', ['getResa']),

    places () {
      if (this.value !== undefined) {
        console.log(this.value.place_restante)
        return this.value.place_restante
      }
      return 0
    }
  },
  mounted: function () {
    this.items = this.getSpectacles()
    var reservation = null
    if (this.$router.app._route.params.id !== undefined) {
      this.id = parseInt(this.$router.app._route.params.id)
      if (this.id > 0) {
        this.disabled = true
        reservation = this.getResa(this.id)
        console.log(reservation)
      }
    }
    if (reservation != null) {
      this.name = reservation.nom_reservation
      this.numberValue = reservation.nb_place
      this.value = reservation.spectacle
    }
  },
  methods: {
    ...mapActions('reservation', ['newReservation']),
    ...mapActions('reservation', ['updateReservation']),
    submit: function () {
      const _this = this
      this.newReservation({ nom_reservation: this.name, nb_place: this.numberValue, spectacle: this.value })
        .then(function (response) {
          _this.$router.push({ name: 'Reservations' })
        })
        .catch(function (error) {
          console.error(error)
        })
    },
    update: function () {
    }
  }
}
</script>

<style>

</style>
