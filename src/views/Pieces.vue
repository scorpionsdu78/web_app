<template>
    <v-card>
        <h1 style="text-align:center">Pieces</h1>
        <v-btn
                color="pink"
                dark
                small
                absolute
                bottom
                right
                fab
                router to = '/piece/0'
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-container
            id="scroll-target"
            style="max-height: 800px"
            class="overflow-y-auto"
        >
            <v-list v-for="piece in pieces" :key="piece.idrepertoire">
                <v-card>
                    <v-list-item>
                        <v-row>
                            <v-col>
                                {{ piece.nom }}
                            </v-col>
                            <v-col md=3></v-col>
                            <v-col md=1>
                                <v-btn  color="warning" link router :to ="'/piece/' + piece.idrepertoire" >
                                    <v-icon>mdi-pen</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col md=1>
                                <v-btn  color="error" @click="supprPiece(piece.idrepertoire)">
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
    ...mapGetters('piece', ['getPieces']),

    pieces () {
      return this.getPieces()
    }
  },
  async mounted () {
    await this.fetchPiece()
  },
  methods: {
    ...mapActions('piece', ['fetchPiece']),
    ...mapActions('piece', ['deletePiece']),
    supprPiece: async function (idrepertoire) {
      this.deletePiece(idrepertoire)
    }
  }
}
</script>
