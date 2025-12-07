<template>
  <div class="overlay" @click.self="emit('close')">
    <div class="modal">
      <h2 class="titulo">Entrar</h2>

      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="senha" type="password" placeholder="Senha" required />

        <p class="erro" v-if="erroMsg">{{ erroMsg }}</p>
        <Botao2 variant="principal" type="submit">Entrar</Botao2>
      </form>

      <Botao2 variant="secundario" @click="emit('close')">Fechar</Botao2>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import Botao2 from './Botao2.vue'

const emit = defineEmits(["close", "sucesso"]);

const auth = useAuthStore();
const email = ref("");
const senha = ref("");
const erroMsg = ref("");


async function handleLogin() {
  erroMsg.value = "";
  try {
    const resp = await auth.login({ email: email.value, senha: senha.value });
    if (resp.success) {
      emit("sucesso");
      emit("close");
    }
  } catch {
    erroMsg.value = "Email ou senha inválidos.";
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal {
  background: var(--cor-bg);
  padding: 32px;
  border-radius: 12px;
  width: 420px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  font-family: "Sora", sans-serif;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.titulo {
  color: var(--cor-principal);
  margin: 0;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.erro {
  color: var(--cor-alerta);
  font-size: 0.9rem;
  text-align: center;
  margin-top: -5px;
}
</style>
