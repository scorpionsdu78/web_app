<template>
    <v-card color="transparent" flat>
        <v-row>
            <v-col lg=5></v-col>
            <v-col lg=2>
                <h1>nous contactez</h1>
            </v-col>
            <v-col lg=5></v-col>
        </v-row>
        <v-row>
            <v-col lg=1></v-col>
            <v-col>
                <v-card color="grey darken-3" >
                    <v-container>
                        <v-row>
                            <v-text-field
                            v-model="email"
                            label="email"
                            required
                            ></v-text-field>
                        </v-row>
                        <v-row>
                            <v-textarea
                            solo
                            v-model="message"
                            label="message"
                            ></v-textarea>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn
                                color="success"
                                @click="submit"
                                width="100%"
                                >
                                ENVOIE
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
            <v-col lg=1></v-col>
        </v-row>
    </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    email: '',
    message: ''
  }),
  methods: {
    ...mapActions('message', ['newMessage']),
    submit: async function () {
      var _this = this
      this.newMessage({
        emailenvoyeur: this.email,
        message: this.message,
        traite: false
      }).then(function (response) {
        _this.$router.go()
      })
    }
  }

}
</script>

<style>

</style>
