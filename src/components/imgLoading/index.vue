<template>
    <div class="loading39">
      <span class="round39"> </span>
      <span class="one-sj39"> </span>
      <span class="two-sj39"> </span>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.loading39 {
  width: 80%;
  height: 80%;
  background-color: #ffffff;
  position: relative;
  // box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.round39 {
  width: 18px;
  height: 18px;
  border-radius: 15px;
  background-color: #d6d6d6;
  position: absolute;
  animation: round39-eff 3s both infinite;
}
.one-sj39 {
  border-bottom: 40px solid #ddd;
  border-left: 34px solid transparent;
  border-right: 34px solid transparent;
  position: absolute;
  animation: one-sj39-eff 3s both infinite;
}
.two-sj39 {
  border-bottom: 64px solid #d1d1d1;
  border-left: 35px solid transparent;
  border-right: 35px solid transparent;
  position: absolute;
  right: 0;
  animation: two-sj39-eff 3s both infinite;
  animation-delay: 0.2s;
}
@keyframes round39-eff {
  0% {
    top: 16px;
    left: 100%;
  }
  50% {
    top: 14px;
    left: 25%;
  }
  100% {
    top: 16px;
    left: -18px;
  }
}
@keyframes one-sj39-eff {
  0% {
    bottom: -32px;
  }
  50% {
    bottom: 0;
  }
  100% {
    bottom: -100%;
  }
}
@keyframes two-sj39-eff {
  0% {
    bottom: -100%;
  }
  50% {
    bottom: 0;
  }
  100% {
    bottom: -100%;
  }
}
</style>
