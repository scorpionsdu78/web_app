<template>
    <v-card>
        <h1 style="text-align:center">Articles</h1>
        <v-btn
                color="pink"
                dark
                small
                absolute
                bottom
                right
                fab
                router to="/article/0"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-container
            id="scroll-target"
            style="max-height: 800px"
            class="overflow-y-auto"
        >
            <v-list v-for="article in articles" :key="article.idarticle">
                <v-card>
                    <v-list-item >
                        <v-row>
                            <v-col>
                                {{ article.titre }}
                            </v-col>
                            <v-col md=3></v-col>
                            <v-col md=1>
                                <v-btn  color="warning" link router :to ="'/article/' + article.idarticle" >
                                    <v-icon>mdi-pen</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col md=1>
                                <v-btn  color="error" @click="supprimerArticle(article.idarticle)" >
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
    ...mapGetters('article', ['getArticles']),

    articles () {
      return this.getArticles()
    }
  },
  async mounted () {
    await this.fetchsArticles()
    await this.fetchsPhotos()
  },
  methods: {
    ...mapActions('article', ['fetchsArticles']),
    ...mapActions('article', ['deleteArticle']),
    ...mapActions('photo', ['fetchsPhotos']),
    supprimerArticle: async function (idarticle) {
      const _this = this
      await this.deleteArticle(idarticle)
        .then(function (response) {
          _this.$router.go()
        })
    }

  }
}
</script>
