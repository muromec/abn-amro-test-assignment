<template>
  <div class="skeleton" />
</template>
<style scoped>
.skeleton {
  margin: 0 0.3rem;
  background-color: color-mix(in srgb, var(--color-background) 90%, gray);
  display: block;
  min-width: 210px;
  min-height: 295px;
  position: relative;
  overflow: hidden;
}
.skeleton::after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-image: linear-gradient(
    90deg,
    color-mix(in srgb, currentColor 90%, black),
    currentColor
  );

  animation: beam;
  animation-duration: 3s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
@keyframes beam {
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.3;
  }
  0% {
    opacity: 0.2;
  }
}
</style>
