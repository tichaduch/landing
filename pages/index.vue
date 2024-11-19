
<template>
  <v-container>
    <v-row no-gutters justify="center">
      <my-psi-animated />
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default defineComponent({
  middleware() {
    //
  },
  setup() {
    definePageMeta({
      // layout: 'landing',
      pageTransition: {
        name: 'scroll-x-transition',
      },
      layoutTransition: {
        name: 'scroll-x-transition',
      },
      // middleware: [
      //   'auth',
      // ],
      // middleware(ctx) {
      //   const authStore = useAuthStore();
      //   if (authStore.loggedIn) {
      //     navigateTo('/my');
      //   }
      // }
    });

    return {};
  },
})
</script>

<style lang="scss" scoped>
</style>
