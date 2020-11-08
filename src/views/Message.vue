<template>
  <v-card>
      <v-row>
          <v-col lg=1></v-col>
          <v-col>
              <v-text-field v-model="email" :disabled="true"></v-text-field>
          </v-col>
          <v-col lg=1></v-col>
      </v-row>
      <v-row>
          <v-col lg=1></v-col>
          <v-col>
              <v-textarea v-model="text" :disabled="true"></v-textarea>
          </v-col>
          <v-col lg=1></v-col>
      </v-row>
      <v-row>
          <v-col lg=1></v-col>
          <v-col>
              <v-btn color="warning" @click="traiter">TRAITER?</v-btn>
          </v-col>
          <v-col lg=1></v-col>
      </v-row>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    email: '',
    text: '',
    id: 0
  }),
  computed: {
    ...mapGetters('user', ['getLogin']),
    ...mapGetters('message', ['getMessage'])
  },
  mounted: async function () {
    var logged = this.getLogin()
    if (logged === false) {
      this.$router.push({ name: 'Login' })
    }
    var message = null
    if (this.$router.app._route.params.id !== undefined) {
      this.id = parseInt(this.$router.app._route.params.id)
      if (this.id > 0) {
        message = this.getMessage(this.id)
      }
    }
    if (message != null) {
      this.email = message.emailenvoyeur
      this.text = message.message
    }
  },
  methods: {
    ...mapActions('message', ['traiterMessage']),
    traiter: async function () {
      var _this = this
      await this.traiterMessage(this.id)
        .then(function (response) {
          _this.$router.push({ name: 'Messages' })
        })
    }
  }
}
</script>

<style>

</style>
