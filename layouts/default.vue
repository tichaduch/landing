<template>
  <v-app v-scroll="onScroll" light>
    <v-system-bar :height="scrollTop > 10 ? 0 : 8" color="red-darken-3">
      <v-divider v-if="scrollTop < 10" color="white" thickness="1" class="border-opacity-100 mt-8 mx-3"></v-divider>
    </v-system-bar>

    <v-app-bar
      class="py-1"
      scroll-behavior="elevate"
      name="header"
      app
      color="red-darken-3"
    >

      <v-app-bar-title>
        Title
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <div class="mr-4">
      <client-only>
      <my-google-sign-in-btn/>
      </client-only>
      </div>

    </v-app-bar>

    <v-main>
      <slot />
    </v-main>

    <v-footer name="footer" color="red-darken-3">
      Footer
    </v-footer>
  </v-app>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const scrollTop = ref(0);

    const onScroll = (e: Event) => {
      const target = e.target as Document;
      scrollTop.value = target.scrollingElement?.scrollTop || 0;
    }
    return {
      onScroll,
      scrollTop,
    };
  },
})
</script>
