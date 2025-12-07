<template>
    <button :class="['botao2', variant, $attrs.class]" :style="computedWidth" v-bind="$attrs"
        @click="$emit('click', $event)">
        <slot>{{ texto }}</slot>
    </button>
</template>

<script setup>
const props = defineProps({
    variant: {
        type: String,
        default: 'principal',
        validator: (v) => ['principal', 'secundario', 'alerta'].includes(v)
    },
    texto: { type: String, default: '' },
    width: { type: [Number, String], default: null }
})

const emit = defineEmits(['click'])

import { computed } from 'vue'

const computedWidth = computed(() => {
    if (!props.width) return null
    return typeof props.width === 'number' ? { width: props.width + 'px' } : { width: props.width }
})
</script>

<style scoped>
.botao2 {
    font-family: "Sora", sans-serif;
    padding: 10px 18px;
    border-radius: 8px;
    border: 2px solid transparent;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    gap: 10px;
    transition: all 300ms ease;
    justify-content: center;
}

.botao2.principal {
    background:
        var(--gradiente-principal) padding-box,
        var(--gradiente-principal) border-box;
    color: var(--cor-bg);
}

.botao2.secundario {
    background:
        linear-gradient(var(--cor-bg), var(--cor-bg)) padding-box,
        var(--gradiente-principal) border-box;
    color: var(--cor-secundaria);
}

.botao2.alerta {
    background:
        var(--gradiente-alerta) padding-box,
        var(--gradiente-alerta) border-box;
    color: var(--cor-bg);
}

.botao2.botao2.principal:hover,
.botao2.alerta:hover {
    filter: brightness(120%);
}

.botao2.secundario:hover {
    filter: brightness(90%);
}
</style>
