<template>
  <v-app light>
    <v-app-bar
      class="py-1"
      scroll-behavior="fade-image"
      name="header"
      app
      color="sand"
    >
      <v-app-bar-title>
        Title
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>

    <v-footer name="footer" app>
      Footer
    </v-footer>
  </v-app>
</template>

