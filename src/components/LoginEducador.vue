<template>
    <section class="login">
        <h2>Login Educador</h2>

        <form @submit.prevent="onLogin">
            <div>
                <label>Email</label>
                <input type="email" v-model="email" required />
            </div>

            <div>
                <label>Senha</label>
                <input type="password" v-model="password" required />
            </div>

            <div style="margin-top:12px;">
                <button type="submit" :disabled="loading">Entrar</button>
                <span v-if="loading">Validando...</span>
            </div>

            <div v-if="error" style="color:red;margin-top:8px">{{ error }}</div>
        </form>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)

async function onLogin() {
    error.value = null
    loading.value = true
    try {

        console.log(email.value)

        loading.value = false

    } catch (err) {
        loading.value = false
        error.value = err?.message || String(err)
    }
}
</script>

<style scoped>
.login {
    max-width: 420px;
    margin: 20px auto;
}

form>div {
    margin-bottom: 8px;
}

label {
    display: block;
    font-weight: 600;
    margin-bottom: 4px;
}

input {
    width: 100%;
    padding: 6px 8px;
    box-sizing: border-box;
}

button {
    padding: 8px 12px;
}
</style>
