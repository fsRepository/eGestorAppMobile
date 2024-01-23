import axios from "axios";

const api = axios.create({
    baseURL: 'http://egestor.focosistemas.net/api/'
})
export default api;


const apiUsuarios = 'http://egestor.focosistemas.net/api/usuarios';
const apiAtendimentos = 'http://egestor.focosistemas.net/api/atendimentos1';
const apiMotivos = 'http://egestor.focosistemas.net/api/motivos';
const apiSituacoes = 'http://egestor.focosistemas.net/api/situacaos';
const apiSistemas = 'http://egestor.focosistemas.net/api/sistemas';
const apiClientes = 'http://egestor.focosistemas.net/api/clientes';
const apiMeiosDeContato = 'http://egestor.focosistemas.net/api/meiocontatoes';
const apiMotivosAtendimentos = 'http://egestor.focosistemas.net/api/motivosatendimentos';
const apiCRMAtendimentos = 'http://egestor.focosistemas.net/api/crmatendimentos';
const apiToken = 'http://egestor.focosistemas.net/token';
const apiLogAtendimentos = 'http://egestor.focosistemas.net/api/logatendimentos';
const apiLembretes = 'http://egestor.focosistemas.net/api/lembretes';
const apiVisitaTecnica = 'http://egestor.focosistemas.net/api/visitatecnicas';
const apiVisitaApresentacao = 'http://egestor.focosistemas.net/api/visitaapresentacaos';
const apiProjecao = 'http://egestor.focosistemas.net/api/projecaos';


export {
    apiUsuarios,
    apiAtendimentos,
    apiMotivos,
    apiSituacoes,
    apiSistemas,
    apiClientes,
    apiMeiosDeContato,
    apiMotivosAtendimentos,
    apiCRMAtendimentos,
    apiToken,
    apiLogAtendimentos,
    apiLembretes,
    apiVisitaTecnica,
    apiVisitaApresentacao,
    apiProjecao
}