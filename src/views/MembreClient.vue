<template>
  <v-card color="transparent" flat>
      <template>
            <v-row>
                <v-col lg=5></v-col>
                <v-col lg=2>
                    <h1>{{firstname}} {{lastname}}</h1>
                </v-col>
                <v-col lg=5></v-col>
            </v-row>
            <v-row>
                <v-col lg=1></v-col>
                <v-col lg=6>
                    <v-card color="black" :dark="true">
                        <v-carousel
                        cycle
                        hide-delimiter-background
                        show-arrows-on-hover
                        height="800px"
                        :dark="true"
                        :show-arrows="false"
                        color="black"
                        >
                            <v-carousel-item
                            v-for="data in photos"
                            :key="data.idphoto"
                            reverse-transition="fade-transition"
                            transition="fade-transition"
                            >
                                <v-img :src="data.src" :contain="true" height="800px" ></v-img>
                            </v-carousel-item>
                        </v-carousel>
                    </v-card>
                </v-col>
                <v-col lg=4>
                    <v-sheet :tile="tile"
                    color="black"
                    :dark="true"
                    center>
                        <sheet-footer >
                            <p v-html="roles"></p>
                            <p v-html="description"></p>
                        </sheet-footer>
                    </v-sheet>
                </v-col>
                <v-col lg=1>
                </v-col>
            </v-row>
      </template>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    lastname: 'nom',
    firstname: 'prenom',
    description: 'description',
    photo: [],
    id: 0,
    roles: 'roles associatif: '
  }),
  computed: {
    ...mapGetters('photo', ['getPhotos']),
    ...mapGetters('role', ['getRoles']),
    ...mapGetters('membre', ['getMembre'])
  },
  mounted: function () {
    var membre = null
    if (this.$router.app._route.params.id !== undefined) {
      this.id = parseInt(this.$router.app._route.params.id)
      if (this.id > 0) {
        membre = this.getMembre(this.id)
        console.log(membre)
      }
    }
    if (membre !== null) {
      this.firstname = membre.prenom
      this.lastname = membre.nom
      this.description = membre.description
      membre.roles.forEach(element => {
        this.roles = this.roles + ' ' + element.nom
      })
      console.log(membre.photos.length)
      if (membre.photos.length > 0) {
        console.log('set image')
        this.photos = membre.photos.map((Element) => { return { idphoto: Element.idphoto, src: 'http://localhost:8080/api/Image/' + Element.url, alt: Element.url } })
      }
    }
    console.log(this.items)
  },
  methods: {
    ...mapActions('photo', ['fetchsPhotos']),
    ...mapActions('membre', ['addMembre']),
    ...mapActions('membre', ['editMembre'])
  }
}
</script>

<style>

</style>
