<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Presença</h2>

      <div class="tabela-presenca">
        <div class="tabela-cabecalho">
          <span>Aluno</span>
          <span>Presente</span>
        </div>

        <div v-if="alunosComPresenca.length === 0" class="linha-aluno">
          <span>Nenhum aluno encontrado.</span>
        </div>

        <div v-for="aluno in alunosComPresenca" :key="aluno.id" class="linha-aluno">
          <span>{{ aluno.displayName }}</span>
          <input type="checkbox" v-model="aluno.presente" @change="togglePresenca(aluno)" />
        </div>
      </div>

      <Botao2 variant="secundario" @click="$emit('close')">Fechar</Botao2>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import Botao2 from './Botao2.vue'
import { verificarInscricaoAlunoCurso } from '../services/inscricaoService'
import { marcarPresenca, obterPorInscricaoEAula, deletarPresenca } from '../services/presencaService'

const props = defineProps({
  aula: { type: Object, required: true },
  alunos: { type: Array, required: true }             
})

const alunosComPresenca = ref([])

async function carregarPresencas() {
  if (!props.alunos || props.alunos.length === 0) {
    alunosComPresenca.value = []
    return
  }

  alunosComPresenca.value = await Promise.all(
    props.alunos.map(async aluno => {
      const inscricao = await verificarInscricaoAlunoCurso(aluno.id, props.aula?.cursoId)
      if (!inscricao) return { ...aluno, presente: false, inscricaoId: null, presencaId: null, displayName: aluno.nome || aluno.name || aluno.nomeCompleto || aluno.username || 'Aluno sem nome' }

      let presenca = { presente: false, id: null }
      try {
        presenca = await obterPorInscricaoEAula(inscricao.id, props.aula.id)
      } catch {
        presenca = { presente: false, id: null }
      }

      return { ...aluno, presente: presenca.presente || false, inscricaoId: inscricao.id, presencaId: presenca.id || null, displayName: aluno.nome || aluno.name || aluno.nomeCompleto || aluno.username || 'Aluno sem nome' }
    })
  )
}

async function togglePresenca(aluno) {
  if (!aluno.inscricaoId) return

  try {
    if (aluno.presente) {
      // marcar presença: cria o registro e guarda o id
      const created = await marcarPresenca({
        inscricaoId: aluno.inscricaoId,
        aulaId: props.aula.id,
        presente: true
      })
      aluno.presencaId = created?.id || aluno.presencaId || null
    } else {
      // desmarcar presença: remover registro caso exista
      if (aluno.presencaId) {
        await deletarPresenca(aluno.presencaId)
        aluno.presencaId = null
      } else {
        try {
          const pres = await obterPorInscricaoEAula(aluno.inscricaoId, props.aula.id)
          if (pres && pres.id) {
            await deletarPresenca(pres.id)
            aluno.presencaId = null
          }
        } catch (e) {
          // sem registro, nada a fazer
        }
      }
    }
  } catch (err) {
    console.error('Erro ao marcar presença:', err)
  }
}

onMounted(() => carregarPresencas())
watch(() => props.alunos, () => carregarPresencas(), { deep: true })
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-sizing: border-box;
}

.tabela-presenca {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 15px;
}

.tabela-cabecalho, .linha-aluno {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
  border-bottom: 1px solid #ddd;
}

.tabela-cabecalho {
  font-weight: 600;
  background-color: #f0f0f0;
}

.linha-aluno:last-child {
  border-bottom: none;
}
</style>
