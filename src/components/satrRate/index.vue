<template>
  <div class="text-[#f0b455]" style="font-style: italic; letter-spacing: 2px">
    <!-- <span class="text-[12px]">Bangumi 评分：</span> -->
    <span v-for="iconStar in Math.floor(data.score / 2)" :key="iconStar">
      <span v-if="data.score" class="iconfont icon-star02 text-[10px]"></span
    ></span>
    <span
      v-if="Number((data.score / 2).toFixed(1).toString().split('.')[1]) * 2 >= 5"
      class="iconfont icon-star04 text-[11px]"
    ></span>
    <span
      v-for="starItem in 5 - Math.ceil(data.score / 2)"
      :key="starItem"
      class="iconfont icon-star01 text-[11px]"
    ></span>
    <span
      v-if="Number((data.score / 2).toFixed(1).toString().split('.')[1]) * 2 < 5"
      class="iconfont icon-star01 text-[11px]"
    ></span>
    <span class="ml-1">{{
      data.score.toString().split('.')[1] ? data.score : data.score + '.0'
    }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    default: {}
  }
})
const data = props.data || { score: 0 }
</script>

<style lang="scss" scoped></style>
