import { apiGet, apiPost } from "./api";


export function getEducadores() {
    return (apiGet('/educador') || []);
}

export function CriarEducador(payload){
    return (apiPost('/educador', payload) || []);
}