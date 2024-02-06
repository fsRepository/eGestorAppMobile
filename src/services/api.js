import axios from "axios";

const api = axios.create({
    baseURL: 'http://egestor.focosistemas.net/api/'
})
export default api;

//http://devgestorweb.focosistemas.net/api/atendimentos1?dataInicial=2024.01.01&dataFinal=2024.01.02
const apiUsuarios = 'http://devgestorweb.focosistemas.net/api/usuarios';
const apiAtendimentos = 'http://devgestorweb.focosistemas.net/api/atendimentos1';
const apiAtendimentosOcorrencias = 'http://devgestorweb.focosistemas.net/api/atendimentosocorrencias'
const apiMotivos = 'http://devgestorweb.focosistemas.net/api/motivos';
const apiSituacoes = 'http://devgestorweb.focosistemas.net/api/situacaos';
const apiSistemas = 'http://devgestorweb.focosistemas.net/api/sistemas';
const apiTelasSistema = 'http://devgestorweb.focosistemas.net/api/sistemastelas'
const apiClientes = 'http://devgestorweb.focosistemas.net/api/clientes';
const apiMeiosDeContato = 'http://devgestorweb.focosistemas.net/api/meiocontatoes';
const apiMotivosAtendimentos = 'http://devgestorweb.focosistemas.net/api/motivosatendimentos';
const apiCRMAtendimentos = 'http://devgestorweb.focosistemas.net/api/crmatendimentos';
const apiToken = 'http://egestor.focosistemas.net/token';
const apiLogAtendimentos = 'http://devgestorweb.focosistemas.net/api/logatendimentos';
const apiLembretes = 'http://devgestorweb.focosistemas.net/api/lembretes';
const apiVisitaTecnica = 'http://devgestorweb.focosistemas.net/api/visitatecnicas';
const apiVisitaApresentacao = 'http://devgestorweb.focosistemas.net/api/visitaapresentacaos';
const apiProjecao = 'http://devgestorweb.focosistemas.net/api/projecaos';
const apiAgendaTelefonica = 'http://devgestorweb.focosistemas.net/api/agendatelefonica'
const apiDash = 'http://devgestorweb.focosistemas.net/api/dash'

//atendimentosocorrencias
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
    apiProjecao,
    apiAgendaTelefonica,
    apiTelasSistema,
    apiAtendimentosOcorrencias,
    apiDash
}