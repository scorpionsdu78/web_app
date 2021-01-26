<template >
    <v-app>
        <v-card :dark="true" color="black" height="100%">
            <v-card
            color="grey lighten-4"
            flat
            height="100px"
            >
                <v-app-bar
                dense
                color="grey darken-3"
                height="100px"
                >
                    <v-row>
                        <v-col md="3">
                            <v-card color="transparent" flat router :to="{name: 'default'}">
                                <img src="http://37.187.119.144:8080/compagnieServer/api/Image/logo.png"/>
                            </v-card>
                        </v-col>
                        <v-col md="2">
                            <v-btn text large router :to="{name: 'ArticleClient'}" >
                                ARTICLES
                            </v-btn>
                        </v-col>
                        <v-col md="2">
                            <v-btn text large router :to="{name: 'MembresClient'}">
                            MEMBRES
                            </v-btn>
                        </v-col>
                        <v-col md="2">
                            <v-btn text large router :to="{name: 'SpectaclesClient'}">
                            SPECTACLE
                            </v-btn>
                        </v-col>
                        <v-col md="2">
                            <v-btn text large router :to="{name: 'MessageClient'}">
                            MESSAGES
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-app-bar>
            </v-card>
            <v-card color="black">
                <router-view/>
            </v-card>
        </v-card>
    </v-app>
</template>

<script>
export default {

}
</script>

<style>

</style>
