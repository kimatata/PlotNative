<template>
  <v-app>
    <v-app-bar density="compact">
      <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-toolbar-title>
        <v-app-bar-nav-icon>
          <img src="/android-chrome-96x96.png" alt="icon" width="30" />
        </v-app-bar-nav-icon>
        nativePlot

        <v-btn href="/" nuxt>top</v-btn>
        <v-btn href="/views" nuxt>views</v-btn>
      </v-toolbar-title>
    </v-app-bar>
    <slot />
  </v-app>
</template>