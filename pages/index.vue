<template>

  <client-only>
    <v-sheet :width="psiWidth" max-height="80vh" :class="`position-fixed right-0 ${psiClass} mr-4`" color="transparent">
      <my-psi-animated :svg-to-display="svgToDisplay" />
    </v-sheet>
  </client-only>

  <v-sheet v-intersect="{
    handler: onIntersectFirstSection,
    options: {
      threshold: [0, 0.5, 1.0]
    }
  }" height="80vh" color="background">
    <v-row no-gutters justify="end">
      <v-sheet color="transparent" height="70vh" class="d-flex align-end mr-4 pt-10">
      </v-sheet>
    </v-row>
  </v-sheet>

  <v-card class="mt-n8 pa-4" tonal elevation="6" color="white" height="120vh" rounded="xl">
    test
    {{ mdAndUp }}
  </v-card>

  <client-only>
    <v-sheet color="background" class="mt-n8" :height="mdAndUp ? 200 : 100">
    </v-sheet>
  </client-only>
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
      if (display.smAndUp.value) {
        return '20vw';
      }

      return '50vw';
    });

    const psiClass = computed(() => {
      switch (svgToDisplay.value) {
        case 'psi':
          if (display.mdAndUp.value) {
            return 'bottom-0';
          }

          return 'bottom-0 mb-n3';
        case 'tail':
          return 'bottom-0 mb-10';
      }

    });

    const firstSectionInView = ref(true);
    const onIntersectFirstSection = (isIntersected: boolean) => {
      firstSectionInView.value = isIntersected;
    };

    const svgToDisplay = computed(() => {
      return firstSectionInView.value ? 'psi' : 'tail';
    });

    return {
      svgToDisplay,
      psiWidth,
      psiClass,
      onIntersectFirstSection,
      mdAndUp: display.mdAndUp,
    };
  },
})
</script>

<style lang="scss" scoped></style>
