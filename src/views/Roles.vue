<template>
    <v-card>
        <h1 style="text-align:center">Roles</h1>
        <v-card>
            <v-row>
                <v-col md=1></v-col>
                <v-col>
                    <v-text-field
                        v-model="name"
                        label="role name"
                        required
                    ></v-text-field>
                </v-col>
                <v-col md=1></v-col>
            </v-row>
            <v-row>
                <v-col lg=1></v-col>
                <v-col>
                    <v-btn color="success"
                        class="mr-4" @click="addRole">new role</v-btn>
                </v-col>
            </v-row>
        </v-card>
        <br/>
        <h1 style="text-align:center">Manage Roles</h1>
        <v-container
            id="scroll-target"
            style="max-height: 800px"
            class="overflow-y-auto"
        >
            <v-list v-for="role in roles" :key="role.idrole">
                <v-card>
                    <v-list-item>
                        <v-row>
                            <v-col>
                                {{role.nom}}
                            </v-col>
                            <v-col md=3></v-col>
                            <v-col md=1>
                                <v-btn  color="error" @click="supr(role.idrole)">
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
  data: () => ({
    name: ''
  }),
  computed: {
    ...mapGetters('role', ['getRoles']),

    roles () {
      return this.getRoles()
    }
  },
  async mounted () {
    await this.fetchsRoles()
  },
  methods: {
    ...mapActions('role', ['fetchsRoles']),
    ...mapActions('role', ['supprRole']),
    ...mapActions('role', ['newRole']),
    supr: async function (id) {
      const _this = this
      this.supprRole(id)
        .then(function (response) {
          console.log(response)
          _this.$router.go()
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    addRole: async function () {
      const _this = this
      this.newRole({ nom: this.name })
        .then(function (response) {
          console.log(response)
          _this.$router.go()
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>
