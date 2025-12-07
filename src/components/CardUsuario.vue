<template>
  <div class="card-usuario">
    <img
      :src="usuario.foto || '/perfil1.png'"
      alt="Foto do usuário"
      class="foto"
    />
    <p class="nome">{{ usuario.nome }}</p>
  </div>
</template>

<script setup>
defineProps({
  usuario: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');

.card-usuario {
  width: 100%;
  max-width: 180px;
  background: white;
  border-radius: 12px;
  border-left: 4px solid var(--cor-principal);
  padding: 18px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.foto {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.nome {
  font-family: 'Sora', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--cor-principal);
}
</style>
