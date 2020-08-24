<template>
  <v-card>
      <v-form>
          <v-row>
              <v-col lg=1></v-col>
                <v-col>
                    <v-text-field
                    v-model="titre"
                    label="Titre"
                    required
                ></v-text-field>
                </v-col>
                <v-col lg=1></v-col>
          </v-row>
          <v-row>
             <v-col lg=1></v-col>
                <v-col>
                    <v-text-field
                    v-model="auteur"
                    label="Auteur"
                    required
                ></v-text-field>
                </v-col>
                <v-col lg=3>
                    <v-checkbox label="active?" v-model="active"></v-checkbox>
                </v-col>
          </v-row>
          <v-row>
            <v-col lg=1></v-col>
            <v-col>
                <v-select
                    v-model="value"
                    :items="items"
                    item-text="prenom"
                    attach
                    chips
                    label="membre"
                    multiple
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
    titre: 'titre',
    auteur: 'Auteur',
    active: false,
    items: [],
    value: [],
    id: -1
  }),
  computed: {
    ...mapGetters('membre', ['getMembres']),
    ...mapGetters('piece', ['getPiece'])

  },
  async mounted () {
    await this.fetchMembre()
    this.items = this.getMembres()
    var piece = null
    if (this.$router.app._route.params.id !== undefined) {
      this.id = parseInt(this.$router.app._route.params.id)
      if (this.id > 0) {
        piece = this.getPiece(this.id)
      }
    }
    if (piece != null) {
      this.titre = piece.nom
      this.auteur = piece.auteur
      this.active = piece.active
      this.value = piece.membres
    }
  },
  methods: {
    ...mapGetters('membre', ['getMembres']),
    ...mapActions('piece', ['ajoutPiece']),
    ...mapActions('piece', ['modifyPiece']),
    ...mapActions('membre', ['fetchMembre']),
    submit: function () {
      console.log(this.value)
      console.log(this.titre + this.auteur + this.active)
      this.ajoutPiece({
        nom: this.titre,
        auteur: this.auteur,
        active: this.active,
        membres: this.value
      })
    },
    update: function () {
      const modif = {
        nom: this.titre,
        auteur: this.auteur,
        active: this.active,
        membres: this.value
      }
      this.modifyPiece({ id: this.id, piece: modif })
    }
  }
}
</script>

<style>

</style>
