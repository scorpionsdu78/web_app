<template>
  <v-card>
      <v-form>
          <v-row>
            <v-col lg=1></v-col>
            <v-col>
                <v-text-field
                v-model="firstname"
                label="First name"
                required
             ></v-text-field>
            </v-col>
            <v-col>
                <v-text-field
                v-model="lastname"
                label="Last name"
                required
             ></v-text-field>
            </v-col>
            <v-col lg=1></v-col>
          </v-row>
          <v-row>
            <v-col lg=1></v-col>
            <v-col>
              <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" width='100%' @ready="prefill" ></ckeditor>
            </v-col>
            <v-col lg=1></v-col>
          </v-row>
          <v-row>
            <v-col lg=1></v-col>
            <v-col>
                <v-select
                    v-model="value"
                    :items="items"
                    item-text="nom"
                    attach
                    chips
                    label="roles"
                    multiple
                    return-object
                ></v-select>
            </v-col>
            <v-col lg=1></v-col>
          </v-row>
          <v-row>
            <v-col lg=1></v-col>
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
            <v-col lg=1></v-col>
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
              <v-col lg=1></v-col>
              <v-col></v-col>
          </v-row>
          <v-row>
            <v-col lg=1></v-col>
            <v-col>
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
            </v-col>
          </v-row>
      </v-form>
  </v-card>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    firstname: 'prenom',
    lastname: 'nom',
    editor: ClassicEditor,
    editorData: '<p>Rich-text editor content.</p>\n',
    editorConfig: {
      // The configuration of the rich-text editor.
    },
    dataImages: [{
      id: '1',
      src: 'http://localhost:8080/api/Image/',
      alt: 'Alt Image 1'
    }],
    items: ['foo', 'bar', 'fizz', 'buzz'],
    value: [],
    initialSelected: [],
    model: [],
    id: -1,
    tmp: '',
    files: []
  }),
  computed: {
    ...mapGetters('photo', ['getPhotos']),
    ...mapGetters('role', ['getRoles']),
    ...mapGetters('membre', ['getMembre']),
    ...mapGetters('user', ['getLogin'])

  },
  mounted: function () {
    var logged = this.getLogin()
    if (logged === false) {
      this.$router.push({ name: 'Login' })
    }
    var membre = null
    var list = this.getPhotos()
    this.dataImages = list.map((Element) => {
      return { idphoto: Element.idphoto, src: 'http://localhost:8080/api/Image/' + Element.url, alt: Element.url }
    })
    this.items = this.getRoles()
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
      this.tmp = membre.description
      console.log(membre.photos.length)
      if (membre.photos.length > 0) {
        console.log('set image')
        this.model = membre.photos.map(Element => { return Element.idphoto })
      }
      this.value = membre.roles
    }
    console.log(this.items)
  },
  methods: {
    ...mapActions('photo', ['fetchsPhotos']),
    ...mapActions('membre', ['addMembre']),
    ...mapActions('membre', ['editMembre']),
    submit: async function () {
      console.log(this.model)
      console.log(this.value)
      console.log(this.firstname + this.lastname + this.editorData)
      var _this = this
      const formData = new FormData()
      var photos = []
      var optionAxios = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
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
      this.addMembre({ nom: this.lastname, prenom: this.firstname, description: this.editorData, photos: photos, roles: this.value })
        .then(function () {
          _this.$router.push({ name: 'Membres' })
        })
    },
    update: async function () {
      var _this = this
      console.log(this.model)
      console.log(this.value)
      console.log(this.firstname + this.lastname + this.editorData)
      const formData = new FormData()
      var photos = []
      var optionAxios = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
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
      var membre = { nom: this.lastname, prenom: this.firstname, description: this.editorData, photos: photos, roles: this.value }
      this.editMembre({ id: this.id, membre: membre })
        .then(function () {
          _this.$router.push({ name: 'Membres' })
        })
    },
    prefill: function (editor) {
      this.editorData = this.tmp
    }

  }
}
</script>

<style>

</style>
