<template>
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
                v-for="data in dataImages"
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
        :dark="true">
            <sheet-footer >
                <h1>EDITO DE LA PRESIDENTE</h1>
                <div>
                    <h3>Bienvenue sur le nouveau site de notre compagnie !</h3>
                    <br>
                    <p>Fondée en 2019 , la Compagnie de la Borde est née de la passion pour le théâtre et le spectacle vivant, partagée par trois comédiennes et deux comédiens. Leur ambition ? Mettre en scène des textes du répertoire classique et contemporain, et les présenter à un public varié, sur scène ou en appartement.</p>
                    <br>
                    <p>Leur premier spectacle – Le Pain de ménage et Le Plaisir de rompre, de Jules Renard – a été joué une vingtaine de fois depuis 2018, chez des particuliers, au théâtre de l’Orme à Paris, les 5, 11 et 12 octobre 2019 et à l’auditorium de la médiathèque de Rueil-Malmaison le 22 novembre 2019.</p>
                    <br>
                    <p> Les répétitions d'Une Demande en Mariage et de L’Ours, d’Anton Tchékhov, ont été lancées fin 2019, et la Première d'Une Demande en Mariage a eu lieu le 11 juillet 2020, 31 route de la Borde, au Vésinet.</p>
                    <br>
                    <p> En dépit de la période bien chahutée que nous vivons, nous avons l'intention de continuer, tout au long de la saison 2020-2021 à vous présenter nos créations, chez vous ou sur les planches de salles de spectacle.</p>
                    <br>
                    <p>Au plaisir de vous retrouver bientôt,</p>
                    <p>Isabel Le Goff <br>
                    Présidente de la Compagnie de la Borde</p>
                </div>
            </sheet-footer>
        </v-sheet>
    </v-col>
    <v-col md="1">
    </v-col>
</v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    dataImages: [{
      id: '1',
      src: 'http://37.187.119.144:8080/compagnieServer/api/Image/',
      alt: 'Alt Image 1'
    }]
  }),
  computed: {
    ...mapGetters('photo', ['getPhotosTransform'])
  },
  mounted: async function () {
    var _this = this
    await this.fetchsPhotos().then(function (response) {
      _this.dataImages = _this.getPhotosTransform()
    })
  },
  methods: {
    ...mapActions('photo', ['fetchsPhotos'])
  }
}
</script>

<style>
</style>
