<template>
  <v-card class="mt-4 pa-4">
    <v-row no-gutters>
      <svg width="400" height="400" version="1.1" viewBox="0 0 105.83 105.83" xmlns="http://www.w3.org/2000/svg">
        <g ref="psi" fill="#f00">
          <circle @mouseover="onHover(circle, index, $event)" v-for="({circle, animation}, index) in circlesListAnimated" :cx="circle.cx"
            :cy="circle.cy" :r="circle.r">
            <animate :attributeName="animation.attributeName" :values="animation.values" :dur="animation.duration" :repeatCount="animation.repeatCount" />
          </circle>
        </g>
      </svg>
    </v-row>
    <v-row no-gutters>
      <div>
        {{ circleIndexInFocus }}
        |*****|
        <div v-if="circleInFocus">{{ circlesListAnimated[circleIndexInFocus].meta }}</div>
      </div>
    </v-row>

  </v-card>
</template>

<script lang="ts">
import { defineComponent, computed, useTemplateRef } from 'vue';
import { useDisplay, useLayout } from 'vuetify';

type Circle = {
  cx: string,
  cy: string,
  r: string,
}
type Animation = {
  attributeName: string,
  values: string,
  repeatCount: string,
  duration: string,
}

type Meta = {
  proximityToFocus: number,
}

type CircleAnimated = {
  circle: Circle,
  animation: Animation,
  meta: Meta,
}

export default defineComponent({
  setup(props, ctx) {
    const message = ref('This is a message')
    const display = useDisplay();
    const layout = useLayout();
    const psi = useTemplateRef('psi');

    const circleIndexInFocus = ref(-1);

    const onHover = (circle: Circle, index: number, event: Event) => {
      circleIndexInFocus.value = index;
      if (!event.target) {
        return;
      }
      const circleNode = event.target as SVGCircleElement;
      const animateNode = circleNode.firstChild as SVGAnimateElement;

      animateNode.beginElement();
    };

    const circleInFocus = computed(() => {
      if (circleIndexInFocus.value < 0) {
        return null;
      }

      return circlesList[circleIndexInFocus.value];
    });

    const circlesListAnimated = computed(() => {
      return circlesList.map((circle, index) => {
        const modifiedCircle: Circle = { ...circle };

        const baseMultiplyer = 1000;
        const canvasSize = 110 * 1000;

        let proximityToFocus = 1;
        if (circleInFocus.value) {
          const proximityX = Math.abs((Number(circleInFocus.value.cx) * baseMultiplyer) - (Number(circle.cx) * baseMultiplyer)) / canvasSize;
          const proximityY = Math.abs((Number(circleInFocus.value.cy) * baseMultiplyer) - (Number(circle.cy) * baseMultiplyer)) / canvasSize;
          proximityToFocus = Math.sqrt(proximityX ** 2 + proximityY ** 2);
        }

        let realSize = (Number(circle.r) * baseMultiplyer * 0.2) / baseMultiplyer;

        if (index === circleIndexInFocus.value) {
          modifiedCircle.r = `${(Number(circle.r) * 1000 / 2) / 1000}`;
        } else if (proximityToFocus < 0.2) {
          modifiedCircle.r = `${(Number(circle.r) * 1000 * (proximityToFocus * 10)) / 1000}`;
          realSize = realSize * 2;
        }


        // const duration = `${2 - ((Number(circle.cy) * 1000) / 110000)}s`;
        const duration = `${3 - ((Number(circle.cy) * 1000) / 110000) + ((Number(circle.cx) * 1000) / 110000)}s`;

        const animation: Animation = {
          attributeName: 'r',
          values: [
            circle.r,
            realSize,
            circle.r,
            //realSize,
          ].join(';'),
          duration,
          // repeatCount: '1'
          repeatCount: 'indefinite'
        };

        const result: CircleAnimated = {
          circle: modifiedCircle,
          animation,
          meta: {
            proximityToFocus,
          }
        }

        return result;

      });

    })

    const circlesList: Circle[] = [
      { cx: '3.5719', cy: '3.5719', r: '3.5719' },
      { cx: '3.5719', cy: '10.186', r: '3.5719' },
      { cx: '3.5719', cy: '16.801', r: '3.5719' },
      { cx: '3.5719', cy: '23.416', r: '3.5719' },
      { cx: '3.5719', cy: '30.03', r: '3.5719' },
      { cx: '3.5719', cy: '36.645', r: '3.5719' },
      { cx: '3.5594', cy: '43.247', r: '3.4038' },
      { cx: '3.5179', cy: '49.82', r: '2.8435' },
      { cx: '3.4401', cy: '56.357', r: '1.7929' },
      { cx: '3.3291', cy: '62.86', r: '.29415' },
      { cx: '10.186', cy: '3.5719', r: '3.5719' },
      { cx: '10.186', cy: '10.186', r: '3.5719' },
      { cx: '10.186', cy: '16.801', r: '3.5719' },
      { cx: '10.186', cy: '23.416', r: '3.5719' },
      { cx: '10.186', cy: '30.03', r: '3.5719' },
      { cx: '10.186', cy: '36.645', r: '3.5719' },
      { cx: '10.186', cy: '43.259', r: '3.5719' },
      { cx: '10.186', cy: '49.874', r: '3.5719' },
      { cx: '10.186', cy: '56.489', r: '3.5719' },
      { cx: '10.161', cy: '63.077', r: '3.2217' },
      { cx: '9.9841', cy: '69.515', r: '.84044' },
      { cx: '16.801', cy: '3.5719', r: '3.5719' },
      { cx: '16.801', cy: '10.186', r: '3.5719' },
      { cx: '16.801', cy: '16.801', r: '3.5719' },
      { cx: '16.801', cy: '23.416', r: '3.5719' },
      { cx: '16.801', cy: '30.03', r: '3.5719' },
      { cx: '16.801', cy: '36.645', r: '3.5719' },
      { cx: '16.801', cy: '43.259', r: '3.5719' },
      { cx: '16.801', cy: '49.874', r: '3.5719' },
      { cx: '16.801', cy: '56.489', r: '3.5719' },
      { cx: '16.801', cy: '63.103', r: '3.5719' },
      { cx: '16.78', cy: '69.697', r: '3.2917' },
      { cx: '16.567', cy: '76.098', r: '.40621' },
      { cx: '23.258', cy: '3.4142', r: '1.4428' },
      { cx: '23.258', cy: '10.029', r: '1.4428' },
      { cx: '23.258', cy: '16.643', r: '1.4428' },
      { cx: '23.258', cy: '23.258', r: '1.4428' },
      { cx: '23.258', cy: '29.872', r: '1.4428' },
      { cx: '23.26', cy: '36.489', r: '1.4708' },
      { cx: '23.284', cy: '43.128', r: '1.7929' },
      { cx: '23.352', cy: '49.811', r: '2.7174' },
      { cx: '23.416', cy: '56.489', r: '3.5719' },
      { cx: '23.416', cy: '63.103', r: '3.5719' },
      { cx: '23.416', cy: '69.718', r: '3.5719' },
      { cx: '23.305', cy: '76.221', r: '2.0731' },
      { cx: '29.888', cy: '56.346', r: '1.6529' },
      { cx: '30.03', cy: '63.103', r: '3.5719' },
      { cx: '30.03', cy: '69.718', r: '3.5719' },
      { cx: '30.005', cy: '76.307', r: '3.2357' },
      { cx: '29.769', cy: '82.685', r: '.042022' },
      { cx: '36.383', cy: '56.227', r: '.042022' },
      { cx: '36.608', cy: '63.067', r: '3.0816' },
      { cx: '36.645', cy: '69.718', r: '3.5719' },
      { cx: '36.645', cy: '76.332', r: '3.5719' },
      { cx: '36.415', cy: '82.718', r: '.47625' },
      { cx: '43.17', cy: '3.4826', r: '2.3672' },
      { cx: '43.17', cy: '10.097', r: '2.3672' },
      { cx: '43.17', cy: '16.712', r: '2.3672' },
      { cx: '43.17', cy: '23.326', r: '2.3672' },
      { cx: '43.17', cy: '29.941', r: '2.3672' },
      { cx: '43.17', cy: '36.556', r: '2.3672' },
      { cx: '43.17', cy: '43.17', r: '2.3672' },
      { cx: '43.17', cy: '49.785', r: '2.3672' },
      { cx: '43.17', cy: '56.399', r: '2.3672' },
      { cx: '43.233', cy: '63.077', r: '3.2217' },
      { cx: '43.259', cy: '69.718', r: '3.5719' },
      { cx: '43.259', cy: '76.332', r: '3.5719' },
      { cx: '43.179', cy: '82.867', r: '2.4933' },
      { cx: '43.159', cy: '89.461', r: '2.2132' },
      { cx: '43.159', cy: '96.075', r: '2.2132' },
      { cx: '43.159', cy: '102.69', r: '2.2132' },
      { cx: '49.874', cy: '3.5719', r: '3.5719' },
      { cx: '49.874', cy: '10.186', r: '3.5719' },
      { cx: '49.874', cy: '16.801', r: '3.5719' },
      { cx: '49.874', cy: '23.416', r: '3.5719' },
      { cx: '49.874', cy: '30.03', r: '3.5719' },
      { cx: '49.874', cy: '36.645', r: '3.5719' },
      { cx: '49.874', cy: '43.259', r: '3.5719' },
      { cx: '49.874', cy: '49.874', r: '3.5719' },
      { cx: '49.874', cy: '56.489', r: '3.5719' },
      { cx: '49.874', cy: '63.103', r: '3.5719' },
      { cx: '49.874', cy: '69.718', r: '3.5719' },
      { cx: '49.874', cy: '76.332', r: '3.5719' },
      { cx: '49.874', cy: '82.947', r: '3.5719' },
      { cx: '49.874', cy: '89.561', r: '3.5719' },
      { cx: '49.874', cy: '96.176', r: '3.5719' },
      { cx: '49.874', cy: '102.26', r: '3.5719' },
      { cx: '56.489', cy: '3.5719', r: '3.5719' },
      { cx: '56.489', cy: '10.186', r: '3.5719' },
      { cx: '56.489', cy: '16.801', r: '3.5719' },
      { cx: '56.489', cy: '23.416', r: '3.5719' },
      { cx: '56.489', cy: '30.03', r: '3.5719' },
      { cx: '56.489', cy: '36.645', r: '3.5719' },
      { cx: '56.489', cy: '43.259', r: '3.5719' },
      { cx: '56.489', cy: '49.874', r: '3.5719' },
      { cx: '56.489', cy: '56.489', r: '3.5719' },
      { cx: '56.489', cy: '63.103', r: '3.5719' },
      { cx: '56.489', cy: '69.718', r: '3.5719' },
      { cx: '56.489', cy: '76.332', r: '3.5719' },
      { cx: '56.489', cy: '82.947', r: '3.5719' },
      { cx: '56.489', cy: '89.561', r: '3.5719' },
      { cx: '56.489', cy: '96.176', r: '3.5719' },
      { cx: '56.489', cy: '102.26', r: '3.5719' },
      { cx: '63.024', cy: '3.493', r: '2.5073' },
      { cx: '63.024', cy: '10.108', r: '2.5073' },
      { cx: '63.024', cy: '16.722', r: '2.5073' },
      { cx: '63.024', cy: '23.337', r: '2.5073' },
      { cx: '63.024', cy: '29.951', r: '2.5073' },
      { cx: '63.024', cy: '36.566', r: '2.5073' },
      { cx: '63.024', cy: '43.181', r: '2.5073' },
      { cx: '63.024', cy: '49.795', r: '2.5073' },
      { cx: '63.024', cy: '56.41', r: '2.5073' },
      { cx: '63.08', cy: '63.08', r: '3.2637' },
      { cx: '63.103', cy: '69.718', r: '3.5719' },
      { cx: '63.103', cy: '76.332', r: '3.5719' },
      { cx: '63.032', cy: '82.875', r: '2.6054' },
      { cx: '63.013', cy: '89.471', r: '2.3532' },
      { cx: '63.013', cy: '96.086', r: '2.3532' },
      { cx: '63.013', cy: '102.7', r: '2.3532' },
      { cx: '69.455', cy: '56.226', r: '.028015' },
      { cx: '69.678', cy: '63.064', r: '3.0396' },
      { cx: '69.718', cy: '69.718', r: '3.5719' },
      { cx: '69.718', cy: '76.332', r: '3.5719' },
      { cx: '69.49', cy: '82.72', r: '.50426' },
      { cx: '76.181', cy: '56.337', r: '1.5268' },
      { cx: '76.332', cy: '63.103', r: '3.5719' },
      { cx: '76.332', cy: '69.718', r: '3.5719' },
      { cx: '76.309', cy: '76.309', r: '3.2637' },
      { cx: '76.071', cy: '82.685', r: '.042022' },
      { cx: '82.779', cy: '3.4038', r: '1.3027' },
      { cx: '82.779', cy: '10.018', r: '1.3027' },
      { cx: '82.779', cy: '16.633', r: '1.3027' },
      { cx: '82.779', cy: '23.248', r: '1.3027' },
      { cx: '82.779', cy: '29.862', r: '1.3027' },
      { cx: '82.782', cy: '36.48', r: '1.3447' },
      { cx: '82.806', cy: '43.118', r: '1.6669' },
      { cx: '82.874', cy: '49.801', r: '2.5914' },
      { cx: '82.946', cy: '56.488', r: '3.5579' },
      { cx: '82.947', cy: '63.103', r: '3.5719' },
      { cx: '82.947', cy: '69.718', r: '3.5719' },
      { cx: '82.839', cy: '76.224', r: '2.1151' },
      { cx: '89.561', cy: '3.5719', r: '3.5719' },
      { cx: '89.561', cy: '10.186', r: '3.5719' },
      { cx: '89.561', cy: '16.801', r: '3.5719' },
      { cx: '89.561', cy: '23.416', r: '3.5719' },
      { cx: '89.561', cy: '30.03', r: '3.5719' },
      { cx: '89.561', cy: '36.645', r: '3.5719' },
      { cx: '89.561', cy: '43.259', r: '3.5719' },
      { cx: '89.561', cy: '49.874', r: '3.5719' },
      { cx: '89.561', cy: '56.489', r: '3.5719' },
      { cx: '89.561', cy: '63.103', r: '3.5719' },
      { cx: '89.544', cy: '69.7', r: '3.3337' },
      { cx: '89.33', cy: '76.101', r: '.44824' },
      { cx: '96.176', cy: '3.5719', r: '3.5719' },
      { cx: '96.176', cy: '10.186', r: '3.5719' },
      { cx: '96.176', cy: '16.801', r: '3.5719' },
      { cx: '96.176', cy: '23.416', r: '3.5719' },
      { cx: '96.176', cy: '30.03', r: '3.5719' },
      { cx: '96.176', cy: '36.645', r: '3.5719' },
      { cx: '96.176', cy: '43.259', r: '3.5719' },
      { cx: '96.176', cy: '49.874', r: '3.5719' },
      { cx: '96.176', cy: '56.489', r: '3.5719' },
      { cx: '96.155', cy: '63.082', r: '3.2917' },
      { cx: '95.981', cy: '69.523', r: '.93849' },
      { cx: '102.26', cy: '3.5719', r: '3.5719' },
      { cx: '102.26', cy: '10.186', r: '3.5719' },
      { cx: '102.26', cy: '16.801', r: '3.5719' },
      { cx: '102.26', cy: '23.416', r: '3.5719' },
      { cx: '102.26', cy: '30.03', r: '3.5719' },
      { cx: '102.26', cy: '36.645', r: '3.5719' },
      { cx: '102.43', cy: '43.247', r: '3.4038' },
      { cx: '102.74', cy: '49.822', r: '2.8715' },
      { cx: '102.66', cy: '56.362', r: '1.863' },
    ];

    return {
      message,
      display,
      layout,
      circlesList,
      circlesListAnimated,
      circleIndexInFocus,
      circleInFocus,
      onHover,
    }
  },
})
</script>

<style lang="scss" scoped>
circle {
  transition: transform .2s ease;
}
</style>
