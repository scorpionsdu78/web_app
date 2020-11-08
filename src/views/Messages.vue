<template>
  <v-card>
        <h1 style="text-align:center">Message</h1>
        <v-container
            id="scroll-target"
            style="max-height: 800px"
            class="overflow-y-auto"
        >
            <v-list v-for="message in messages" :key="message.idmessage">
                <div v-if="message.traite">
                    <v-card color="grey">
                        <v-list-item >
                            <v-row>
                                <v-col>
                                    {{ message.emailenvoyeur }}
                                </v-col>
                                <v-col md=3></v-col>
                                <v-col md=1>
                                    <v-btn  color="warning" link router :to ="'message/' + message.idmessage" >
                                        <v-icon>mdi-pen</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-list-item>
                    </v-card>
                </div>
                <div v-else>
                    <v-card >
                        <v-list-item >
                            <v-row>
                                <v-col>
                                    {{ message.emailenvoyeur }}
                                </v-col>
                                <v-col md=3></v-col>
                                <v-col md=1>
                                    <v-btn  color="warning" link router :to ="'message/' + message.idmessage" >
                                        <v-icon>mdi-pen</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-list-item>
                    </v-card>
                </div>
            </v-list>
        </v-container>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters('message', ['getMessages']),
    ...mapGetters('user', ['getLogin']),

    messages () {
      return this.getMessages()
    }
  },
  mounted: async function () {
    var logged = this.getLogin()
    if (logged === false) {
      this.$router.push({ name: 'Login' })
    }
    await this.fetchMessages()
  },
  methods: {
    ...mapActions('message', ['fetchMessages'])
  }
}
</script>

<style>

</style>
