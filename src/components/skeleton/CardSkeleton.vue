<template>
  <div v-for="(item, idx) in 21" :key="idx" class="card-skeleton"></div>
</template>

<style lang="scss">
.card-skeleton {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-decoration: none;
  cursor: pointer;
  height: 325px;
  background-repeat: no-repeat;
  flex-grow: 1;
  max-width: 170px;
  width: 100%;
  margin: 0 auto;

  background-image:
    linear-gradient(var(--color-skeleton) 100%, transparent 0%),
    linear-gradient(var(--color-skeleton) 100%, transparent 0%);

  background-size:
    100% 80%,
    100% 5%;

  background-position:
    0 0,
    0 90%;

  animation: fade 1s linear infinite alternate;
}

@keyframes fade {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
</style>
