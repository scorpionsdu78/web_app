<template>
    <v-container class="pa-1">
      <v-item-group
        multiple
      >
        <v-row>
          <v-col
            v-for="article in articles" :key="article.idarticle"
            cols="12"
            md="6"
          >
            <v-item>
                <v-card>
                    <v-row>
                        <v-card-title> <h1>{{article.titre}}</h1> </v-card-title>
                    </v-row>
                    <v-row>
                        <v-col md=7></v-col>
                        <v-col md=2><v-btn link router :to ="'article/' + article.idarticle"> lire l'article </v-btn></v-col>
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
  data: () => ({
    Articles: []
  }),
  computed: {
    ...mapGetters('article', ['getArticles']),

    articles () {
      return this.getArticles()
    }
  },
  mounted: async function () {
    await this.fetchsArticles()
  },
  methods: {
    ...mapActions('article', ['fetchsArticles']),
    test: function () {
      this.Articles = this.getArticles()
      this.Articles.forEach((Element) => {
        if (Element.photos !== undefined && Element.photos.length > 0) {
          console.log(Element.photos[0])
        }
      })
    }
  }

}
</script>

<style>
.text {
  display: block;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

</style>
