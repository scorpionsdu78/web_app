<template>
    <v-card color="transparent" flat>
        <v-row>
            <v-col lg=5></v-col>
            <v-col lg=2>
                <h1>{{ titre }}</h1>
            </v-col>
            <v-col lg=5></v-col>
        </v-row>
        <v-row>
            <v-container
            id="scroll-target"
            style="max-height: 800px"
            class="overflow-y-auto"
            >
                <p v-html="content"></p>
            </v-container>
        </v-row>
        <div v-if="photos.length > 0">
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
        </div>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters('article', ['getArticle'])
  },
  data: () => ({
    photos: [],
    titre: 'DEFAULT TITLE',
    content: '',
    id: 0
  }),
  mounted: function () {
    var article = null
    if (this.$router.app._route.params.id !== undefined) {
      this.id = parseInt(this.$router.app._route.params.id)
      if (this.id > 0) {
        article = this.getArticle(this.id)
      }
    }
    if (article != null) {
      console.log(article.content)
      this.titre = article.titre
      this.content = article.content
      if (article.photos.length > 0) {
        this.photos = article.photos.map((Element) => { return { idphoto: Element.idphoto, src: 'http:/37.187.119.144:8080/compagnieServer/api/Image/' + Element.url, alt: Element.url } })
      }
    }
  },
  methods: {
    ...mapActions('Article', ['fetchsArticles'])
  }
}
</script>

<style>

</style>
