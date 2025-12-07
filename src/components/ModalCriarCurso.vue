<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Criar Novo Curso</h2>

      <form @submit.prevent="criarCurso">
        <div class="form-group">
          <label for="nome">Nome do Curso</label>
          <input id="nome" v-model="form.nome" type="text" required />
        </div>

        <div class="form-group">
          <label for="descricao">Descrição</label>
          <textarea id="descricao" v-model="form.descricao" rows="3"></textarea>
        </div>


        <div class="form-group">
          <label for="dataInicio">Data de Início</label>
          <input id="dataInicio" v-model="form.dataInicio" type="datetime-local" required />
        </div>

        <div class="form-group">
          <label for="dataFim">Data de Fim</label>
          <input id="dataFim" v-model="form.dataFim" type="datetime-local" required />
        </div>

        <div class="buttons">
          <Botao2 variant="principal" type="submit">Criar</Botao2>
          <Botao2 variant="secundario" @click="$emit('close')">Cancelar</Botao2>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { criarCurso as criarCursoApi } from '../services/cursoService'
import Botao2 from './Botao2.vue'

const form = ref({
  nome: '',
  descricao: '',
  dataInicio: '',
  dataFim: ''
})

const emit = defineEmits(['curso-criado', 'close'])

async function criarCurso() {
  try {
    const payload = {
      nome: form.value.nome,
      descricao: form.value.descricao,
      dataInicio: new Date(form.value.dataInicio).toISOString(),
      dataFim: new Date(form.value.dataFim).toISOString()
    }

    const novoCurso = await criarCursoApi(payload)
    emit('curso-criado', novoCurso)
    emit('close')
  } catch (err) {
    console.error('Erro ao criar curso:', err)
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
}

h2 {
  margin-bottom: 20px;
  color: var(--cor-principal);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-group label {
  font-weight: 500;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
