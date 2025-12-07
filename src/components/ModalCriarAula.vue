<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Criar Nova Aula</h2>

      <form @submit.prevent="criarAula">
        <div class="form-group">
          <label for="titulo">Título</label>
          <input id="titulo" v-model="form.titulo" type="text" required />
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
          <label for="dataFinal">Data de Término</label>
          <input id="dataFinal" v-model="form.dataFinal" type="datetime-local" required />
        </div>

        <div class="form-group">
          <label for="linkAula">Link da Aula</label>
          <input id="linkAula" v-model="form.linkAula" type="url" placeholder="https://..." />
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
import { criarAula as criarAulaApi } from '../services/aulaService'
import Botao2 from './Botao2.vue'

const props = defineProps({
  cursoId: { type: Number, required: true }
})

const form = ref({
  titulo: '',
  descricao: '',
  dataInicio: '',
  dataFinal: '',
  linkAula: ''
})

const emit = defineEmits(["aula-criada", "close"]);

async function criarAula() {
  try {
    const payload = {
      titulo: form.value.titulo,
      descricao: form.value.descricao,
      dataInicio: new Date(form.value.dataInicio).toISOString(),
      dataFinal: new Date(form.value.dataFinal).toISOString(),
      linkAula: form.value.linkAula || ''
    }

    const novaAula = await criarAulaApi(props.cursoId, payload)
    emit('aula-criada', novaAula)
    emit('close')
  } catch (err) {
    console.error('Erro ao criar aula:', err)
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
  padding: 25px;
  border-radius: 12px;
  max-width: 450px;
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
