<template>
  <v-card color="transparent" width="70%" height="50%" :light="true" class="mx-auto" >
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
        </v-toolbar>
        <v-calendar type="month" ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange">
        </v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              color="blue"
            >
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <h3 v-html="selectedEvent.details"></h3>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        <v-card>
            <v-card-title>
                <h2>Reserver</h2>
            </v-card-title>
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
                      label="nombre de place"
                      placeholder="nombre de place"
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
                <v-col lg=1></v-col>
                <v-col>
                  <v-text-field
                      v-model="email"
                      label="email"
                      required
                  ></v-text-field>
                </v-col>
                <v-col lg=1></v-col>
              </v-row>
              <v-row>
                <v-col lg=5></v-col>
                <v-col>
                  <div>
                    <v-btn
                      color="success"
                      @click="submit"
                      >
                      RESERVER
                    </v-btn>
                  </div>
                </v-col>
                <v-col lg=5></v-col>
              </v-row>
            </v-form>
          </v-card>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    focus: '',
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    name: 'nom de la reservation',
    numberValue: 0,
    numberRule: v => {
      if (!isNaN(parseInt(v)) && v >= 0 && v <= 999) return true
      return 'Number has to be between 0 and 999'
    },
    items: [],
    value: undefined,
    id: -1,
    disabled: false,
    email: ''
  }),
  computed: {
    ...mapGetters('spectacle', ['getDates']),
    ...mapGetters('reservation', ['getReservations']),
    ...mapGetters('spectacle', ['getFutur']),

    places () {
      if (this.value !== undefined) {
        console.log(this.value.place_restante)
        return this.value.place_restante
      }
      return 0
    }

  },
  mounted () {
    var _this = this
    this.$refs.calendar.checkChange()
    this.fetchSpectacle().then(() => {
      _this.events = _this.getDates()
      _this.items = _this.getFutur()
    })
  },
  methods: {
    ...mapActions('spectacle', ['fetchSpectacle']),
    ...mapActions('reservation', ['newReservation']),
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      this.events = this.getDates()
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    submit: function () {
      this.newReservation({ nom_reservation: this.name, nb_place: this.numberValue, spectacle: this.value })
        .then(function (response) {
        })
        .catch(function (error) {
          console.error(error)
        })
    }
  }
}
</script>

<style>

</style>
