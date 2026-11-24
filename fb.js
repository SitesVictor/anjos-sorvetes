// Configuração do Firebase (estas chaves são públicas por design; quem protege os dados são as regras do banco).
// Cole aqui o firebaseConfig do projeto da Anjos (Console do Firebase > Configurações do projeto > Seus apps > Web).
// Enquanto estiver com "COLE_AQUI", o painel roda em modo demonstração (dados só neste navegador).
const FB_CONFIG = {
  apiKey: "COLE_AQUI",
  authDomain: "COLE_AQUI.firebaseapp.com",
  databaseURL: "https://COLE_AQUI-default-rtdb.firebaseio.com",
  projectId: "COLE_AQUI",
  appId: "COLE_AQUI"
};
let DB = null;
const FB_CONFIGURADO = !/COLE_AQUI/.test(FB_CONFIG.apiKey);
if (FB_CONFIGURADO) {
  try { firebase.initializeApp(FB_CONFIG); DB = firebase.database(); } catch (e) { console.warn("Firebase indisponível", e); }
}
