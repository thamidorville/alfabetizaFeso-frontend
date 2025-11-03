<template>
  <div class="banner">
    <img src="/banner.jpg" alt="Banner" class="banner-image" />
    <div class="banner-overlay"></div>
    <div class="banner-content">
      <h2 class="banner-text">{{ text }}</h2>
    </div>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.banner {
  position: relative;
  width: 100%;
  height: clamp(400px, 50vh, 500px);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%);
  pointer-events: none;
}

.banner-content {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 1;
}

.banner-text {
  color: white;
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 800;
  font-family: 'Inter', system-ui, sans-serif;
  text-align: center;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
  margin: 0;
  max-width: 90%;
  line-height: 1.2;
}

@media (max-width: 768px) {
  .banner {
    height: clamp(300px, 40vh, 400px);
  }
}

@media (max-width: 480px) {
  .banner {
    height: clamp(250px, 35vh, 350px);
  }
}
</style>