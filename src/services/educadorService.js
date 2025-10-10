import { apiGet, apiPost } from "./api";

export async function getEducadores() {
    try {
        const res = await apiGet('/educador')
        return Array.isArray(res) ? res : (res?.data || [])
    } catch (err) {
        console.error('getEducadores error:', err)
        throw err
    }
}

export async function CriarEducador(payload){
    try {
        const res = await apiPost('/educador', payload)
        return res
    } catch (err) {
        console.error('CriarEducador error:', err)
        throw err
    }
}

export async function LoginEducador(payload) {
    try {
        const res = await apiPost('/educador/login', payload)
        return res
    } catch (err) {
        console.error('LoginEducador error:', err)
        throw err
    }
}