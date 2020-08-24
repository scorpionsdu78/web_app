<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link router to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link router to="/articles">
          <v-list-item-action>
            <v-icon>mdi-book-open-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>articles</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link router to="/membres">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>membres</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link router to="/roles">
          <v-list-item-action>
            <v-icon>mdi-air-horn</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Roles</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link router to="/pieces">
          <v-list-item-action>
            <v-icon>mdi-bank</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>pieces</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link router to="/spectacles">
          <v-list-item-action>
            <v-icon>mdi-creation</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>spectacles</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link router to="/reservations">
          <v-list-item-action>
            <v-icon>mdi-clock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>reservation</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon router to ="/">
        <v-icon>mdi-home-circle</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  })
}
</script>
