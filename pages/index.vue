
<template>
    <v-sheet :width="psiWidth" :class="`position-fixed right-0 ${psiClass} mr-4`" color="transparent">
    <my-psi-animated />
    </v-sheet>
    <v-sheet height="80vh" color="red-darken-3">
        <v-row no-gutters justify="end">
          <v-sheet color="transparent" height="70vh" class="d-flex align-end mr-4 pt-10">
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
import { useDisplay, useLayout } from 'vuetify';

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

    const display = useDisplay();
    const layout = useLayout();

    const psiWidth = computed(() => {
      if (display.mdAndUp.value) {
        return '20vw';
      }

      return '50vw';
    });

    const psiClass = computed(() => {
      if (display.mdAndUp.value) {
        return 'mt-10';
      }

      return 'bottom-0 mb-10';
    });

    return {
      psiWidth,
      psiClass,
    };
  },
})
</script>

<style lang="scss" scoped>
</style>
