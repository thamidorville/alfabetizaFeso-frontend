<template>
  <button
    :class="['botao-custom', type]"
    :style="width ? { width: width + 'px' } : {}"
  >
    <span class="conteudo">
      <template v-if="texto">{{ texto }}</template>
      <slot v-else />

      <template v-if="icon">
        <i :class="iconClass" :style="{ color: iconColor }"></i>
      </template>
      <slot name="icon" v-else />
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'principal',
    validator: (value) => ['principal', 'secundario', 'alerta'].includes(value)
  },
  width: {
    type: Number,
    default: null
  },
  texto: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
})

const iconClass = computed(() => {
  if (!props.icon) return ''
  // allow passing either full class (e.g. 'fa-solid fa-circle-info') or short name 'user-plus'
  if (props.icon.includes('fa-')) return props.icon
  return `fa-solid fa-${props.icon}`
})

const iconColor = computed(() => {
  if (props.type === 'principal') return 'var(--cor-bg)'
  if (props.type === 'secundario') return 'var(--cor-secundaria)'
  if (props.type === 'alerta') return 'var(--cor-alerta)'
  return 'inherit'
})
</script>

<style scoped>
.botao-custom {
  font-family: "Sora", sans-serif;
  font-size: 25px;
  font-weight: 500;
  border-radius: 16px;
  padding: 20px 40px;
  transition: all 300ms ease;
  text-align: center;
  border: 3px solid transparent;
}

.botao-custom.principal {
  background: var(--gradiente-principal) padding-box, 
  var(--gradiente-principal) border-box;   
  color: var(--cor-bg);
}

.botao-custom.secundario {
  background: 
    linear-gradient(var(--cor-bg), var(--cor-bg)) padding-box,
    var(--gradiente-principal) border-box; 
  color: var(--cor-secundaria);
}

.botao-custom.alerta {
  background: 
    linear-gradient(var(--cor-bg), var(--cor-bg)) padding-box,
    var(--gradiente-alerta) border-box; 
  color: var(--cor-alerta);
}

.botao-custom.principal:hover {
  filter: brightness(120%); 
}


.botao-custom.secundario:hover,
.botao-custom.alerta:hover {
  filter: brightness(90%); 
}

.conteudo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
</style>