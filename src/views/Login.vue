<template>
  <v-card-text>
            <v-container>
              <v-form>
                <!-- Text -->
                <v-spacer/>

                <!-- Field : Username -->
                <v-text-field
                  class="pa-4"
                  v-model="loginUsername"
                  label="Username"
                  prepend-icon="mdi-face"
                  clearable
                  counter
                  maxlength="15"
                />

                <!-- Field : Password -->
                <v-text-field
                  class="pa-4"
                  v-model="loginPassword"
                  label="Password"
                  type="password"
                  prepend-icon="mdi-lock"
                  required
                />
                <v-btn color="success" @click="connexion">LOGIN</v-btn>
              </v-form>

              <br><br><br>

              <!-- ALERT - displayed if the credentials are incorrect -->
              <v-alert
                :value="loginFailed"
                dense
                outlined
                dismissible
                prominent
                type="error"
                transition="scale-transition"
              >
                Please fill the form accordingly
              </v-alert>
            </v-container>
          </v-card-text>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    loginUsername: '',
    loginPassword: '',
    loginFailed: false
  }),
  computed: {
    ...mapGetters('user', ['getLogin']),

    log () {
      return this.getLogin
    }
  },
  mounted: async function () {
    var logged = this.getLogin()
    if (logged === true) {
      this.$router.push({ name: 'Home' })
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    connexion: async function () {
      var _this = this
      var user = {
        username: this.loginUsername,
        password: this.loginPassword
      }
      this.login(user)
        .then(function (response) { _this.$router.push({ name: 'Home' }) })
        .catch(function (err) {
          console.log(err)
          _this.loginFailed = true
        })
    }
  }
}
</script>

<style>

</style>
