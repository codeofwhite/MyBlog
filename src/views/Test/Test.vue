<template>
  <swiper
      class="swiper"
      :modules="modules"
      :space-between="30"
      :effect="'fade'"
      :navigation="false"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 2500, disableOnInteraction: false }"
  >
    <swiper-slide class="slide" v-for="index in 5" :key="index">
      <img :src="`src/assets/images/${index}.png`" alt=""/>
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {Pagination, Autoplay, EffectFade} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

export default defineComponent({
  name: 'Test',
  title: 'Fade effect',
  url: import.meta.url,
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    return {
      modules: [Pagination, Autoplay, EffectFade]
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';
@import './style.scss';

.swiper {
  @include swiper-wrapper($height: 360px);

  .slide {
    @include swiper-slide();

    img {
      display: block;
      width: 100%;
    }
  }
}
</style>