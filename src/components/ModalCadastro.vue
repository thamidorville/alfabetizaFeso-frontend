<template>
  <div class="overlay" @click.self="closeModal">
    <div class="modal">
      <h2 class="titulo">Criar Conta</h2>

      <div class="tabs">
        <button :class="['tab', tipo === 'aluno' && 'ativo']" variant="secundario" @click="tipo='aluno'">Aluno</button>
        <button :class="['tab', tipo === 'educador' && 'ativo']" variant="secundario" @click="tipo='educador'">Educador</button>
      </div>

      <form @submit.prevent="handleSubmit">
        <input v-model="form.nome" type="text" placeholder="Nome completo" required />
        <input v-model="form.email" type="email" placeholder="Email" required />
        <input v-model="form.telefone" type="text" placeholder="Telefone" required />
        <textarea v-model="form.descricao" placeholder="Descrição (opcional)" rows="2"></textarea>
        <input v-if="tipo==='educador'" v-model="form.especialidade" type="text" placeholder="Especialidade" required />
        <input v-model="form.senha" type="password" placeholder="Senha" required />
        <input v-model="form.confirmarSenha" type="password" placeholder="Confirmar senha" required />

        <p class="erro" v-if="erroMsg">{{ erroMsg }}</p>
        <Botao2 class="btn-submit" variant="principal" type="submit">Criar conta como {{ tipo }}</Botao2>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { cadastrarAluno, cadastrarEducador } from "../services/usuarioService";
import Botao2 from './Botao2.vue'

const emit = defineEmits(["close", "abrir-login"]);
const tipo = ref("aluno");
const erroMsg = ref("");

const form = reactive({
  nome: "",
  email: "",
  telefone: "",
  descricao: "",
  especialidade: "",
  senha: "",
  confirmarSenha: ""
});

function resetForm() {
  tipo.value = "aluno";
  form.nome = "";
  form.email = "";
  form.telefone = "";
  form.descricao = "";
  form.especialidade = "";
  form.senha = "";
  form.confirmarSenha = "";
  erroMsg.value = "";
}

function closeModal() {
  resetForm();
  emit("close");
}

async function handleSubmit() {
  erroMsg.value = "";
  if (form.senha !== form.confirmarSenha) {
    erroMsg.value = "As senhas não coincidem.";
    return;
  }

  const payload = { ...form };
  try {
    if (tipo.value === "aluno") await cadastrarAluno(payload);
    else await cadastrarEducador(payload);

    closeModal();
    emit("abrir-login");
  } catch {
    erroMsg.value = "Erro no cadastro, verifique os dados.";
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
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
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
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

.tabs {
  display: flex;
  margin-bottom: 20px;
}

.tab {
  flex: 1;
  padding: 12px;
  border: none;
  background: var(--cor-bg-2);
  cursor: pointer;
  font-weight: 600;
  color: var(--cor-principal);
}

.tab.ativo {
  background: var(--cor-secundaria);
  color: white;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input, textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

textarea { resize: none; }

.erro {
  color: var(--cor-alerta);
  font-size: 0.9rem;
  text-align: center;
  margin-top: -5px;
}
</style>
