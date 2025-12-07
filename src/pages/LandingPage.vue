<template>
  <section class="container">
    <div class="container__caixa">
      <h1 class="sora-big-freaking-text titulo-principal">
        Seu futuro começa aqui.
      </h1>

      <div class="container__caixa__botoes">
        <Botao type="principal" width="192" texto="Criar Conta" icon="user-plus" @click="mostrarModalCadastro = true" />
        <Botao type="secundario" width="192" texto="Entrar" icon="arrow-right-to-bracket"
          @click="mostrarModalLogin = true" />
      </div>
    </div>
    <ModalCadastro v-if="mostrarModalCadastro" @close="mostrarModalCadastro = false"
      @sucesso="console.log('Usuário cadastrado!')" @abrir-login="mostrarModalLogin = true" />
    <ModalLogin v-if="mostrarModalLogin" @close="mostrarModalLogin = false" @sucesso="handleLoginSucesso" />

  </section>

  <section class="sobre">
    <h2 class="sobre__titulo">Por que AlfabetizaFeso?</h2>

    <div class="sobre__cards">
      <div class="card">
        <h3>Recursos pensados para maximizar o aprendizado</h3>
        <p class="card__subtitulo">Aprendizado Estruturado</p>
        <p>Metodologia comprovada com acompanhamento personalizado para cada aluno.</p>
      </div>

      <div class="card">
        <h3>Flexibilidade Total</h3>
        <p>Estude no seu ritmo, quando e onde quiser, com horários flexíveis.</p>
      </div>

      <div class="card">
        <h3>Comunidade Ativa</h3>
        <p>Conecte-se com educadores experientes e outros alunos em nossa rede.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import Botao from "../components/Botao.vue";
import ModalCadastro from "../components/ModalCadastro.vue";
import ModalLogin from "../components/ModalLogin.vue";
import { useRouter } from 'vue-router'

const router = useRouter()

function handleLoginSucesso() {
  mostrarModalLogin.value = false
  router.push('/') // redireciona para a barra
}


const mostrarModalCadastro = ref(false);
const mostrarModalLogin = ref(false);
</script>

<style scoped>
.container {
  background-image: url("../assets/logo.png");
  background-repeat: no-repeat;
  background-size: 50%;
  background-position: right center;
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  text-align: center;
  height: 70vh;
  font-family: 'Sora', sans-serif;
}

.titulo-principal {
  color: var(--cor-principal);
}

.container__caixa__botoes {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  margin: 32px;
}

.sobre {
  width: 100%;
  padding: 50px 0;
  background-color: var(--cor-bg);
  text-align: center;
  font-family: 'Sora', sans-serif;
}

.sobre__titulo {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 40px;
  color: var(--cor-principal);
}

.sobre__cards {
  width: 80%;
  margin: 0 auto;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.card {
  background: var(--cor-bg);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  text-align: left;
  transition: 0.2s ease;
}

.card h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--cor-principal);
  margin-bottom: 8px;
}

.card__subtitulo {
  font-weight: 600;
  color: var(--cor-secundaria);
  margin-bottom: 8px;
}

.card p {
  color: #333;
  line-height: 1.4;
}
</style>
