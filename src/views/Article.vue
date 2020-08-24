<template>
    <v-card>
        <v-form v-model="valid">
            <v-container>
                <v-row>
                    <v-text-field label="titre" v-model="titre" required></v-text-field>
                </v-row>
                <v-row>
                    <v-col lg=1></v-col>
                    <v-col><ckeditor :editor="editor" v-model="editorData" :config="editorConfig" width='100%' @ready="prefill"></ckeditor></v-col>
                    <v-col lg=1></v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-checkbox v-model="featured" label="Featured?"></v-checkbox>
                    </v-col>
                    <v-col>
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="date"
                                    label="publication"
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
                </v-row>
                <v-row>
                    <v-file-input
                        v-model="files"
                        color="deep-purple accent-4"
                        counter
                        label="File input"
                        multiple
                        placeholder="Select your files"
                        prepend-icon="mdi-paperclip"
                        outlined
                        :show-size="1000"
                    >
                        <template v-slot:selection="{ index, text }">
                        <v-chip
                            v-if="index < 2"
                            color="deep-purple accent-4"
                            dark
                            label
                            small
                        >
                            {{ text }}
                        </v-chip>

                        <span
                            v-else-if="index === 2"
                            class="overline grey--text text--darken-3 mx-2"
                        >
                            +{{ files.length - 2 }} File(s)
                        </span>
                        </template>
                    </v-file-input>
                </v-row>
                <v-row>
                  <v-col lg=2></v-col>
                  <v-col>
                    <v-sheet
                      class="mx-auto"
                      elevation="8"
                    >
                      <v-slide-group
                        v-model="model"
                        class="pa-4"
                        multiple
                        show-arrows
                      >
                        <v-slide-item
                          v-for="data in dataImages"
                          :key="data.idphoto"
                          v-slot:default="{ active, toggle }"
                          :value="data.idphoto"
                        >
                          <v-card
                            :color="active ? 'primary' : 'grey lighten-1'"
                            class="ma-4"
                            height="210px"
                            width="210px"
                            @click="toggle"
                          >
                            <v-img
                              :src="data.src"
                              height="200px"
                              width="200px"
                            />
                            <v-row
                              class="fill-height"
                              align="center"
                              justify="center"
                            >
                              <v-scale-transition>
                                <v-icon
                                  v-if="active"
                                  color="white"
                                  size="48"
                                  v-text="'mdi-close-circle-outline'"
                                ></v-icon>
                              </v-scale-transition>
                            </v-row>
                          </v-card>
                        </v-slide-item>
                      </v-slide-group>
                    </v-sheet>
                  </v-col>
                  <v-col lg=2></v-col>
                </v-row>
                <v-row>
                  <div v-if="id===0">
                    <v-btn
                        color="success"
                        class="mr-4"
                        @click="submitFile"
                        >
                        ajouter
                    </v-btn>
                  </div>
                  <div v-else>
                    <v-btn
                        color="warning"
                        class="mr-4"
                        @click="updateArticle"
                        >
                        modifier
                    </v-btn>
                  </div>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    titre: '',
    files: [],
    date: null,
    menu: null,
    valid: true,
    editor: ClassicEditor,
    tmp: '',
    editorData: '<p>Rich-text editor content.</p>\n',
    editorConfig: {
      // The configuration of the rich-text editor.
    },
    featured: false,
    id: 1,
    dataImages: [{
      id: '1',
      src: 'http://localhost:8080/api/Image/',
      alt: 'Alt Image 1'
    }],
    model: []
  }),
  computed: {
    ...mapGetters('article', ['getArticle']),
    ...mapGetters('photo', ['getPhotos'])

  },
  mounted: function () {
    console.log(this.$router.app._route.params.id)
    var article = null
    var list = this.getPhotos()
    this.dataImages = list.map((Element) => {
      return { idphoto: Element.idphoto, src: 'http://localhost:8080/api/Image/' + Element.url, alt: Element.url }
    })
    if (this.$router.app._route.params.id !== undefined) {
      this.id = parseInt(this.$router.app._route.params.id)
      if (this.id > 0) {
        article = this.getArticle(this.id)
      }
    }
    if (article != null) {
      console.log(article.content)
      this.titre = article.titre
      this.date = article.publication
      this.tmp = article.content
      this.featured = article.featured
      if (article.photos.length > 0) {
        this.model = article.photos.map((Element) => { return Element.idphoto })
      }
    }
  },
  methods: {
    ...mapActions('article', ['createArticle']),
    ...mapActions('article', ['modifyArticle']),
    submitFile: async function () {
      console.log(this.files)
      const formData = new FormData()
      var photos = []
      var optionAxios = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      const _this = this
      for (let i = 0; i < this.files.length; i++) {
        console.log(this.files[i])
        formData.append('file', this.files[i])
        await this.axios.post('/api/Image/', formData, optionAxios
        ).then(function (response) {
          console.log(response)
          photos.push(response.data)
          formData.delete('file')
        })
          .catch(function (err) {
            console.log(err)
          })
      }
      this.model.forEach((Element) => { photos.push({ idphoto: Element }) })
      console.log(this.model)
      console.log(photos)
      console.log(this.titre + '\n' + this.editorData + '\n' + this.date + '\n' + this.featured + '\n' + photos)
      await this.createArticle({ publication: this.date, content: this.editorData, titre: this.titre, featured: this.featured, photos: photos })
        .then(function (response) {
          console.log(response)
          _this.$router.push({ name: 'Articles' })
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    prefill: function (editor) {
      this.editorData = this.tmp
    },
    updateArticle: async function () {
      console.log(this.files)
      const formData = new FormData()
      var photos = []
      var optionAxios = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      // const _this = this
      for (let i = 0; i < this.files.length; i++) {
        console.log(this.files[i])
        formData.append('file', this.files[i])
        await this.axios.post('/api/Image/', formData, optionAxios
        ).then(function (response) {
          console.log(response)
          photos.push(response.data)
          formData.delete('file')
        })
          .catch(function (err) {
            console.log(err)
          })
      }
      this.model.forEach((Element) => { photos.push({ idphoto: Element }) })
      console.log(this.model)
      console.log(photos)
      console.log(this.titre + '\n' + this.editorData + '\n' + this.date + '\n' + this.featured + '\n' + photos)
      const article = { publication: this.date, content: this.editorData, titre: this.titre, featured: this.featured, photos: photos }
      console.log(article)
      await this.modifyArticle({ id: this.id, article: article })
        .then(function (response) {
          console.log(response)
          console.log('redirection imminente')
        })
        .catch(function (err) {
          console.log(err)
        })
      this.$router.push({ name: 'Articles' })
    }
  }
}
</script>
