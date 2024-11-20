<template>
  <svg @pointermove.self="onPointer" width="100%" version="1.1" :viewBox="svgToDisplay.viewBox" xmlns="http://www.w3.org/2000/svg">
    <g ref="psi" fill="#333333">
      <circle v-for="({circle, animation}, index) in circlesListAnimated" :cx="circle.cx"
        :cy="circle.cy" :r="circle.r">
        <animate :attributeName="animation.attributeName" :values="animation.values" :dur="animation.duration" :repeatCount="animation.repeatCount" />
      </circle>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useDisplay, useLayout } from 'vuetify';
import * as svgPsi from './psiTailed';
import * as svgTail from './psiOnlyTail';
//  @mouseover="onHover(circle, index, $event)"
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

    const svgToDisplay = computed(() => {
      return svgPsi;
    });

    const widthComputed = computed(() => {
      return svgToDisplay.value.width;
    });

    const heightComputed = computed(() => {
      return svgToDisplay.value.height;
    });

    const message = ref('This is a message')
    const display = useDisplay();
    const layout = useLayout();

    const pointerLastPositionX = ref(-1);
    const pointerLastPositionY = ref(-1);

    const boundSvg = ref({});
    const onPointer = (event: PointerEvent) => {
      const svgNode = event.target as SVGElement;

      console.log(event);
      console.log(svgNode.getBoundingClientRect());

      pointerLastPositionX.value = event.clientX - svgNode.getBoundingClientRect().x - svgNode.clientLeft;
      pointerLastPositionY.value = event.clientY - svgNode.getBoundingClientRect().y - svgNode.clientTop;
      boundingWidth.value = svgNode.getBoundingClientRect().width;
      boundSvg.value = svgNode.getBoundingClientRect();
    }

    const boundingWidth = ref(11);

    const svgFocus = computed(() => {
      if (pointerLastPositionX.value < 0) {
        return null;
      }

      const baseDelimeter = boundingWidth.value - 10;

      return {
        cx: Math.round((pointerLastPositionX.value / baseDelimeter) * 110),
        cy: Math.round((pointerLastPositionY.value / baseDelimeter) * 110),
        // cx: Math.round((pointerLastPositionX.value / widthComputed.value) * 110),
        // cy: Math.round((pointerLastPositionY.value / widthComputed.value) * 110),
        // cx: pointerLastPositionX.value,
        // cy: pointerLastPositionY.value,
      }
    });

    // const circleInFocus = computed(() => {
    //   if (circleIndexInFocus.value < 0) {
    //     return null;
    //   }

    //   return circlesList[circleIndexInFocus.value];
    // });

    const circlesListAnimated = computed(() => {
      return svgToDisplay.value.circlesList.map((circle, index) => {
        const modifiedCircle: Circle = { ...circle };

        const baseMultiplyer = 1000;
        const canvasSize = 110 * baseMultiplyer;

        let proximityToFocus = 1;
        if (svgFocus.value) {
          const proximityX = Math.abs((Number(svgFocus.value.cx) * baseMultiplyer) - (Number(circle.cx) * baseMultiplyer)) / canvasSize;
          const proximityY = Math.abs((Number(svgFocus.value.cy) * baseMultiplyer) - (Number(circle.cy) * baseMultiplyer)) / canvasSize;
          proximityToFocus = Math.sqrt(proximityX ** 2 + proximityY ** 2);
        }

        let realSize = (Number(circle.r) * baseMultiplyer * 0.2) / baseMultiplyer;

        if (proximityToFocus < 0.2) {
          // modifiedCircle.r = `${(Number(circle.r) * 1000 / 1.5) / 1000}`;
          modifiedCircle.r = `${(Number(circle.r) * baseMultiplyer * (proximityToFocus * 10)) / baseMultiplyer}`;
          // realSize = realSize + 10 * proximityToFocus;
          // realSize = (Number(circle.r) * 1000 * (proximityToFocus * 10)) / 1000;
        }


        // const duration = `${2 - ((Number(circle.cy) * 1000) / 110000)}s`;
        const duration = `${3 - ((Number(circle.cy) * baseMultiplyer) / canvasSize) + ((Number(circle.cx) * baseMultiplyer) / canvasSize)}s`;

        const animation: Animation = {
          attributeName: 'r',
          values: [
            modifiedCircle.r,
            realSize,
            modifiedCircle.r,
            realSize,
            // modifiedCircle.r,
            // realSize,
            // modifiedCircle.r,
            // realSize,
            // modifiedCircle.r,
            circle.r,

            // circle.r,
            // realSize,
            // circle.r,

            // modifiedCircle.r,
            // realSize,
            // modifiedCircle.r,
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

    return {
      message,
      display,
      layout,
      svgToDisplay,
      circlesListAnimated,
      // circleInFocus,
      onPointer,
      pointerLastPositionX,
      pointerLastPositionY,
      svgFocus,
      heightComputed,
      widthComputed,
      boundSvg,
    }
  },
})
</script>

<style lang="scss" scoped>
circle {
  transition: transform .2s ease;
}
</style>
