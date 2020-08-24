<template>
    <v-card>
        <h1 style="text-align:center">Spectacle</h1>
        <v-btn
                color="pink"
                dark
                small
                absolute
                bottom
                right
                fab
                router to = '/spectacle/0'
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-container
            id="scroll-target"
            style="max-height: 800px"
            class="overflow-y-auto"
        >
            <v-list v-for="spectacle in spectacles" :key="spectacle.idspectacle">
                <v-card>
                    <v-list-item>
                        <v-row>
                            <v-col>
                                {{ spectacle.nom }}
                            </v-col>
                            <v-col md=3></v-col>
                            <v-col md=1>
                                <v-btn  color="warning" link router :to ="'/spectacle/' + spectacle.idspectacle" >
                                    <v-icon>mdi-pen</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col md=1>
                                <v-btn  color="error" @click="supprSpectacle(spectacle.idspectacle)">
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
    ...mapGetters('spectacle', ['getSpectacles']),

    spectacles () {
      return this.getSpectacles()
    }
  },
  async mounted () {
    await this.fetchSpectacle()
    await this.fetchPiece()
  },
  methods: {
    ...mapActions('spectacle', ['fetchSpectacle']),
    ...mapActions('piece', ['fetchPiece']),
    ...mapActions('spectacle', ['deleteSpectacle']),
    supprSpectacle: async function (idspectacle) {
      console.log(idspectacle)
      this.deleteSpectacle(idspectacle)
    }
  }
}
</script>
