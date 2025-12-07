<template>
  <div class="card">
    <span v-if="especialidade" class="tag">{{ especialidade }}</span>

    <div class="foto-wrapper">
      <img :src="foto" alt="Foto do Educador" class="foto" />
    </div>

    <h3 class="nome">{{ nome }}</h3>
    <p class="descricao">{{ descricao }}</p>

    <button class="btn" @click="$emit('verDetalhes')">
      Ver detalhes
    </button>
  </div>
</template>

<script setup>
defineProps({
  nome: String,
  descricao: String,
  foto: {
    type: String,
    default: "/src/assets/perfil1.png",
  },
  especialidade: String,
});

defineEmits(["verDetalhes"]);
</script>

<style scoped>
.card {
  position: relative;
  background: white;
  border-radius: 14px;
  padding: 20px;
  width: 260px;
  box-shadow: var(--sombra);
  display: flex;
  flex-direction: column;
}

/* TAG SUPERIOR DIREITA */
.tag {
  position: absolute;
  right: 12px;
  top: 12px;
  background: var(--cor-principal);
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: bold;
}

/* FOTO */
.foto-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
.foto {
  width: 110px;
  height: 110px;
  border-radius: 12px;
  object-fit: cover;
}

/* TEXTO */
.nome {
  margin-top: 14px;
  font-family: "Sora", sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: var(--cor-principal);
}
.descricao {
  margin-top: 6px;
  color: #555;
  font-size: 14px;
  font-family: "Sora", sans-serif;
}

/* BOTÃO */
.btn {
  margin-top: 18px;
  padding: 8px 16px;
  border: none;
  background: var(--cor-secundaria);
  color: white;
  font-family: "Sora", sans-serif;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  align-self: flex-end;
}
.btn:hover {
  opacity: 0.9;
}
</style>
