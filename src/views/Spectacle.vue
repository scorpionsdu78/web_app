<template>
  <v-card>
      <v-form>
          <v-row>
              <v-col lg=1></v-col>
              <v-col lg=2>
                   <v-text-field
                    v-model="name"
                    label="titre du spectacte"
                    required
                ></v-text-field>
              </v-col>
              <v-col >
                  <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="date"
                                    label="date du spectacle"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                            </v-date-picker>
                    </v-menu>
              </v-col>
              <v-col lg=1></v-col>
          </v-row>
          <v-row>
              <v-col lg=1></v-col>
              <v-col lg=2>
                <v-text-field
                    v-model="numberValue"
                    :rules = "[numberRule]"
                    label="nmbre de place"
                    hide-details
                    single-line
                    type="number"
                />
              </v-col>
              <v-col lg=2>
                <v-text-field
                    v-model="placeRest"
                    :rules = "[numberRule]"
                    label="place restante"
                    hide-details
                    single-line
                    type="number"
                />
              </v-col>
              <v-col lg=2>
                  <v-text-field
                    v-model="prix"
                    label="prix"
                    hide-details
                    single-line
                />
              </v-col>
          </v-row>
          <v-row>
              <v-col lg=1></v-col>
              <v-col>
                <v-select
                    v-model="value"
                    :items="items"
                    label="piece"
                    item-text="nom"
                    dense
                    return-object
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
    date: '',
    name: 'nom du spectacle',
    numberValue: 0,
    placeRest: 0,
    prix: '0 euros',
    id: -1,
    numberRule: v => {
      if (!isNaN(parseInt(v)) && v >= 0 && v <= 999) return true
      return 'Number has to be between 0 and 999'
    },
    items: [],
    value: {},
    menu: null
  }),
  computed: {
    ...mapGetters('piece', ['getPieces']),
    ...mapGetters('spectacle', ['getSpectacle'])
  },
  mounted: function () {
    this.items = this.getPieces()
    var spectacle = null
    if (this.$router.app._route.params.id !== undefined) {
      this.id = parseInt(this.$router.app._route.params.id)
      if (this.id > 0) {
        spectacle = this.getSpectacle(this.id)
      }
    }
    if (spectacle != null) {
      this.date = spectacle.dates
      this.name = spectacle.nom
      this.numberValue = spectacle.nbplace
      this.placeRest = spectacle.place_restante
      this.prix = spectacle.prix
      this.value = spectacle.repertoire
    }
  },
  methods: {
    ...mapActions('spectacle', ['ajoutSpectacle']),
    ...mapActions('spectacle', ['modifSpectacle']),
    submit: function () {
      console.log(this.date)
      const place = parseInt(this.placeRest)
      const number = parseInt(this.numberValue)
      this.ajoutSpectacle({
        nom: this.name,
        dates: this.date,
        nbplace: number,
        place_restante: place,
        prix: this.prix,
        repertoire: this.value
      })
    },
    update: function () {
      console.log(this.date)
      const place = parseInt(this.placeRest)
      const number = parseInt(this.numberValue)
      var modif = {
        nom: this.name,
        dates: this.date,
        nbplace: number,
        place_restante: place,
        prix: this.prix,
        repertoire: this.value
      }
      this.modifSpectacle({ id: this.id, spectacle: modif })
    }
  }
}
</script>

<style>

</style>
