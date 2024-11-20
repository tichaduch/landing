
<template>
  <v-sheet height="80vh" color="red-darken-3">
      <v-row no-gutters justify="end">
        <v-sheet color="transparent" height="70vh" class="d-flex align-end mr-4">
          <my-psi-animated class="position-fixed right-0 mr-4" />
        </v-sheet>
      </v-row>
  </v-sheet>

  <v-card class="mt-n8 pa-4" tonal elevation="6" color="white" height="120vh" rounded="xl">
    test
  </v-card>

  <v-sheet color="red-darken-3" class="mt-n8" height="100px">

  </v-sheet>
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
