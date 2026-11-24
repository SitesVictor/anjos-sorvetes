// ================== CONFIGURAÇÃO ==================
const WHATSAPP = "5528999682200";
// Horários do Empório: dia da semana (0 = domingo) -> [abre, fecha]
// Feriados (o Empório segue o horário de domingo nesses dias). Formato AAAA-MM-DD.
const FERIADOS = ["2026-01-01","2026-04-03","2026-04-21","2026-05-01","2026-09-07","2026-10-12","2026-11-02","2026-11-15","2026-11-20","2026-12-25",
  "2027-01-01","2027-03-26","2027-04-21","2027-05-01","2027-09-07","2027-10-12","2027-11-02","2027-11-15","2027-11-20","2027-12-25"];
const HORARIO = { 0:["13:00","18:00"], 1:["09:00","18:00"], 2:["09:00","18:00"], 3:["09:00","18:00"], 4:["09:00","18:00"], 5:["09:00","18:00"], 6:["09:00","18:00"] };

// ================== CATÁLOGO ==================
// Sabores com * aparecem com o selo "Novo"
const CATS = [
  { id:"potes", foto:"img/potes.webp", nome:"Potes", forma:"pote", cor:"#f28aa8", desc:"Potes de 1/2 litro e 1 litro, para levar para casa.", tam:"1/2 L e 1 L",
    s:["Abacaxi","Banana","Bombom","Brigadeiro","Chocolate","Chokito","Coco","Creme","Flocos","Frutas do Bosque","Iogurte Grego","Kinder Ovo","Malt Ovo","Morango","Napolitano","Ninho Trufado","Ouro Branco","Pavê","Prestígio","Sonho de Valsa","Tentação","Torta de Limão"] },
  { id:"cobertura", foto:"img/cobertura.webp", nome:"Picolé de cobertura", forma:"cob", cor:"#f8c21d", desc:"Picolés com casquinha crocante de chocolate.",
    s:["Bombom","Brigadeiro*","Crocante","Maltovo","Tentação","Skimo","Skimo Coco","Skimo Branco","Pé de Moleque","Torta de Limão","Chokiss","Suflê de Morango","Delírio*"] },
  { id:"recheados", foto:"img/recheados.webp", nome:"Picolé recheado", forma:"rech", cor:"#9bd47a", desc:"Cremosos por fora, recheados por dentro.",
    s:["Abacaxi Suíço","Limão Suíço","Mousse de Maracujá","Romeu e Julieta","Chocomenta","Tapioca com Doce de Leite","Ninho Trufado"] },
  { id:"leite", foto:"img/leite.webp", nome:"Picolé ao leite", forma:"pic", cor:"#f7d54a", desc:"Os clássicos cremosos de todo dia.",
    s:["Milho Verde","Biscoito","Abacate","Amendoim","Banana","Chiclete","Chocolate","Coco","Jaca","Abacaxi com Coco","Morango","Flocos","Graviola","Leite Condensado","Mini Saia","Pistache*"] },
  { id:"frutados", foto:"img/frutados.webp", nome:"Picolé frutado", forma:"fruta", cor:"#8d5bb5", desc:"Feitos com fruta, leves e refrescantes.",
    s:["Abacaxi","Uva","Goiaba","Açaí","Limão","Jabuticaba","Manga","Tangerina"] },
  { id:"zero", foto:"", nome:"Zero açúcar", forma:"pic", cor:"#fbf3e2", desc:"Todo o sabor, sem adição de açúcar.", s:["Coco","Chocolate"] },
  { id:"paletas", foto:"img/paleta-avela.webp", nome:"Paletas", forma:"paleta", cor:"#f28aa8", desc:"Paletas mexicanas recheadas e generosas.",
    s:["Ninho Trufado","Ovomaltine","Kinder Bueno","Coco com Nutella","Iogurte Grego com Frutas Vermelhas","Bombom com Nutella","Morango com Leite Condensado","Avelã*"] },
  { id:"cones", foto:"img/cones.webp", nome:"Cones", forma:"cone", cor:"#8a5a3f", desc:"Casquinha crocante com cobertura.", s:["Chocolate","Morango","Ovomaltine"] },
  { id:"sundae", foto:"img/sundae.webp", nome:"Sundae", forma:"sundae", cor:"#ef6b7c", desc:"Copo com sorvete e calda, cremosidade 5 estrelas.", s:["Morango","Chocolate","Maracujá","Limão","Uva","Ninho Trufado"] },
  { id:"copinho", foto:"img/copinho.webp", nome:"Copinho", forma:"copo", cor:"#5bb6cc", desc:"Copinhos individuais, ótimos para festas e lanches.", s:["Sabor a combinar"] },
];

const ITENS = [];
CATS.forEach(c => c.s.forEach(n => { const novo = n.endsWith("*"); const sabor = n.replace("*",""); ITENS.push({ id: c.id + "|" + sabor, cat: c, sabor, novo }); }));
const TOTAL_SABORES = ITENS.filter(i => i.cat.id !== "copinho").length;
const SABORES_UNICOS = new Set(ITENS.filter(i => i.cat.id !== "copinho").map(i => i.sabor.toLowerCase())).size;

// cor principal por sabor
const CORES = [
  [/morango|frutas vermelhas|frutas do bosque|suflê/i,"#f28aa8"],
  [/skimo branco/i,"#fbf3e2"],
  [/chocolate|brigadeiro|bombom|chokito|chokiss|tentação|maltovo|malt|ovomaltine|delírio|crocante|kinder|skimo|sonho|ouro|prestígio|pavê|chocomenta|biscoito/i,"#8a5a3f"],
  [/limão|abacate|pistache|menta/i,"#9bd47a"],[/uva|açaí|jabuticaba|romeu/i,"#8d5bb5"],
  [/coco|creme|ninho|iogurte|leite|tapioca|graviola|napolitano|flocos/i,"#fbf3e2"],
  [/abacaxi|maracujá|milho|banana|jaca/i,"#f7d54a"],[/manga|tangerina|pé de moleque|amendoim|avelã/i,"#f2a141"],[/goiaba|mini saia|chiclete/i,"#ef6b7c"],
];
const corDe = n => (CORES.find(([r]) => r.test(n)) || [0,"#f6e2c2"])[1];
const escurecer = (hex, f=.78) => "#" + hex.slice(1).match(/../g).map(h => Math.round(parseInt(h,16)*f).toString(16).padStart(2,"0")).join("");

// ilustrações desenhadas em SVG
function arte(forma, cor) {
  const c2 = escurecer(cor), choc = "#6a4029", pau = "#e9c48f";
  const S = (w,h,b) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${b}</svg>`;
  switch (forma) {
    case "pote": return S(100,90,`<ellipse cx="50" cy="20" rx="42" ry="10" fill="${c2}"/><path d="M10 22h80l-7 56a6 6 0 0 1-6 5H23a6 6 0 0 1-6-5z" fill="#fff" stroke="#d6e9ee" stroke-width="2"/><path d="M14 34h72l-2 16H16z" fill="${cor}"/><path d="M10 18h80v6H10z" fill="#f8c21d"/><rect x="38" y="56" width="24" height="12" rx="6" fill="#5bb6cc"/>`);
    case "cob": return S(60,110,`<rect x="25" y="70" width="10" height="38" rx="4" fill="${pau}"/><rect x="8" y="4" width="44" height="74" rx="20" fill="${cor}"/><path d="M8 24a20 20 0 0 1 44 0v34a20 20 0 0 1-44 0z" fill="${choc}"/><path d="M14 20c6-6 18-8 28-2" stroke="#8d5d42" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="20" cy="42" r="2" fill="${cor}"/><circle cx="36" cy="52" r="2" fill="${cor}"/><circle cx="30" cy="34" r="2" fill="${cor}"/>`);
    case "rech": return S(60,110,`<rect x="25" y="70" width="10" height="38" rx="4" fill="${pau}"/><rect x="8" y="4" width="44" height="74" rx="20" fill="${cor}"/><rect x="20" y="16" width="20" height="50" rx="10" fill="${c2}"/><path d="M14 18c5-5 12-6 18-4" stroke="#fff" stroke-opacity=".6" stroke-width="4" fill="none" stroke-linecap="round"/>`);
    case "fruta": return S(60,110,`<rect x="25" y="70" width="10" height="38" rx="4" fill="${pau}"/><path d="M8 24a22 22 0 0 1 44 0v50H8z" fill="${cor}" opacity=".92"/><path d="M8 50h44v24H8z" fill="${c2}" opacity=".5"/><path d="M15 18c5-6 12-7 18-5" stroke="#fff" stroke-opacity=".7" stroke-width="4" fill="none" stroke-linecap="round"/>`);
    case "paleta": return S(70,110,`<rect x="30" y="72" width="10" height="36" rx="4" fill="${pau}"/><rect x="6" y="4" width="58" height="76" rx="12" fill="${cor}"/><path d="M6 46h58v22a12 12 0 0 1-12 12H18A12 12 0 0 1 6 68z" fill="${c2}"/><path d="M6 44c10 6 20-4 29 2s19-4 29 2" stroke="${choc}" stroke-width="5" fill="none"/>`);
    case "cone": return S(70,110,`<path d="M12 44h46L37 106a2 2 0 0 1-4 0z" fill="#e2a15c"/><path d="M18 52l30 30M30 46l22 22M16 66l20 20M44 46l-24 24M54 52l-30 30" stroke="#c07b3a" stroke-width="2"/><path d="M8 46c0-22 54-22 54 0 0 6-54 6-54 0z" fill="${cor}"/><path d="M12 38c6-16 40-18 46 0" fill="${c2}"/><circle cx="35" cy="12" r="7" fill="#d23c4b"/>`);
    case "sundae": return S(80,110,`<path d="M10 40h60l-8 50H18z" fill="#fff" opacity=".85" stroke="#d6e9ee" stroke-width="2"/><path d="M14 52h52l-2 14H16z" fill="${cor}"/><path d="M8 40c4-24 60-24 64 0z" fill="#fbf3e2"/><path d="M14 36c8 6 16-6 26 0s18-6 26 0" stroke="${c2}" stroke-width="6" fill="none" stroke-linecap="round"/><rect x="24" y="90" width="32" height="8" rx="3" fill="#d6e9ee"/><path d="M52 6l-6 30" stroke="#8a5a3f" stroke-width="4" stroke-linecap="round"/>`);
    case "copo": return S(80,90,`<path d="M12 24h56l-6 56H18z" fill="#fff" stroke="#d6e9ee" stroke-width="2"/><ellipse cx="40" cy="22" rx="30" ry="8" fill="#f8c21d"/><rect x="24" y="44" width="32" height="18" rx="6" fill="#5bb6cc"/>`);
    default: return S(60,110,`<rect x="25" y="70" width="10" height="38" rx="4" fill="${pau}"/><rect x="8" y="4" width="44" height="74" rx="20" fill="${cor}"/><path d="M15 18c5-6 12-7 18-5" stroke="#fff" stroke-opacity=".7" stroke-width="4" fill="none" stroke-linecap="round"/>`);
  }
}

// ================== UTILIDADES ==================
const $ = s => document.querySelector(s);
const norm = t => t.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();
const zap = txt => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`;
function toast(t){ const e=$("#toast"); if (!e) return; e.textContent=t; e.classList.add("on"); clearTimeout(toast.t); toast.t=setTimeout(()=>e.classList.remove("on"),1800); }

// cabeçalho e rodapé compartilhados
const LOGO = (asa="#5bb6cc", cone="#8a5a3f", meio="#fff") => `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M8 26c6-9 14-8 18-3-6 1-11 5-12 11-4-1-6-4-6-8z" fill="${asa}"/><path d="M56 26c-6-9-14-8-18-3 6 1 11 5 12 11 4-1 6-4 6-8z" fill="${asa}"/><path d="M20 30h24L33 60a1.2 1.2 0 0 1-2 0z" fill="${cone}"/><circle cx="32" cy="18" r="13" fill="#f8c21d"/><circle cx="32" cy="18" r="6.5" fill="${meio}"/></svg>`;
const ZAP_SVG = `<svg viewBox="0 0 32 32"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6c-2 0-3.9-.5-5.6-1.5l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.2 2.2.9 3 1 4.1.8.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z"/></svg>`;

function montarLayout(pagina) {
  const topo = document.createElement("header"); topo.className = "topo";
  topo.innerHTML = `<div class="wrap">
    <a class="logo" href="index.html" aria-label="Anjos, início"><img src="img/logo-h.webp" alt="Anjos" width="139" height="48"></a>
    <nav class="menu">
      <a href="index.html" class="so-pc ${pagina==="inicio"?"on":""}">Início</a>
      <a href="pedidos.html" class="${pagina==="pedidos"?"on":""}">Pedidos</a>
      <a href="revenda.html" class="rev ${pagina==="revenda"?"on":""}">Seja revendedor</a>
    </nav></div>`;
  document.body.prepend(topo);

  const rod = document.createElement("footer");
  rod.innerHTML = `<div class="wrap"><div class="cols">
    <div><a class="logo-rod" href="index.html"><img src="img/logo-h.webp" alt="Anjos" width="174" height="60"></a>
      <p style="margin-top:.8rem">Sorvetes, picolés e paletas produzidos em Anchieta (ES).</p></div>
    <div><h4>Navegue</h4><ul><li><a href="index.html">Início</a></li><li><a href="pedidos.html">Fazer pedido</a></li><li><a href="revenda.html">Seja revendedor</a></li><li><a href="index.html#visite">Horários e endereço</a></li></ul></div>
    <div><h4>Contato</h4><ul><li><a href="${zap("Olá, Anjos! 🍦 Vim pelo site.")}" target="_blank" rel="noopener">WhatsApp (28) 99968-2200</a></li><li><a href="https://www.instagram.com/anjossorvetes/" target="_blank" rel="noopener">Instagram @anjossorvetes</a></li><li>Rua Projetada, s/n — Baixo Pongal, Anchieta (ES)</li></ul></div>
  </div><p class="demo">Versão de demonstração do site.</p>
    <div class="credito-dev"><a href="https://wa.me/5528992795614" target="_blank" rel="noopener" aria-label="Site desenvolvido por GriffoVictor"><span>Desenvolvido por</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 215 72" role="img" aria-label="GriffoVictor"><title>GriffoVictor</title><style>.gv-i{fill:var(--griffo-tinta,currentColor)}.gv-a{fill:var(--griffo-destaque,#C9922B)}.gv-t1{fill:var(--griffo-tinta,currentColor)}.gv-t2{fill:var(--griffo-tinta,currentColor);fill-opacity:.62}</style><g transform="translate(2,0) scale(0.0346)"><path class="gv-a" d="M853,1341 C852,1339 852,1336 854,1333 C856,1329 856,1328 867,1311 C872,1303 915,1230 923,1216 C924,1215 930,1204 937,1194 L948,1174 L1119,1174 C1277,1174 1555,1174 1566,1174 C1578,1174 1575,1177 1471,1287 L1417,1344 L1135,1344 C882,1344 854,1344 853,1341 Z M1612,1088 C1612,1086 1614,1080 1616,1077 C1639,1044 1642,1011 1625,996 C1599,974 1546,964 1448,964 L1392,964 L1378,953 C1351,932 1305,913 1258,902 C1241,898 1240,897 1240,892 C1240,888 1243,884 1254,876 C1272,860 1397,756 1428,730 C1452,710 1526,648 1558,622 C1567,616 1575,610 1577,610 C1578,610 1586,616 1593,624 C1663,698 1709,781 1722,858 C1740,959 1704,1052 1633,1087 C1616,1096 1612,1096 1612,1088 Z M560,532 C429,519 325,456 251,345 C219,297 184,210 197,210 C198,210 232,223 272,239 C311,255 357,273 375,280 C393,287 438,305 477,320 C580,359 606,370 653,388 C676,397 701,407 709,410 C731,419 730,422 701,441 C666,463 636,487 608,512 C591,528 583,534 580,534 C577,534 568,533 560,532 Z" fill-rule="evenodd"/><path class="gv-i" d="M804,2022 C481,2000 206,1768 129,1451 C100,1331 102,1201 136,1082 C148,1038 167,991 187,949 C194,935 200,922 200,921 C199,920 191,911 181,902 C137,862 105,820 80,771 C69,749 58,722 58,717 C58,713 70,714 102,719 C125,723 127,724 141,725 C148,726 159,727 166,728 C182,731 182,731 214,735 C228,737 254,740 273,743 C292,746 312,748 318,749 C324,750 338,752 348,753 C358,755 376,757 386,758 C396,759 414,761 424,763 C446,766 442,769 465,737 C584,573 759,458 953,417 C1127,380 1322,413 1468,504 C1501,524 1564,572 1564,577 C1564,578 1554,586 1543,595 C1531,603 1522,611 1522,612 C1522,613 1518,616 1514,618 C1504,625 1440,677 1395,716 C1384,725 1369,738 1361,744 C1353,751 1345,758 1343,761 C1341,763 1332,771 1324,778 C1316,784 1305,794 1300,799 C1290,810 1291,810 1271,802 C1146,755 983,750 845,789 C545,874 329,1147 363,1400 C390,1600 554,1775 753,1816 C925,1850 1083,1805 1214,1683 C1254,1646 1274,1622 1400,1463 C1438,1415 1461,1387 1488,1358 C1515,1327 1588,1254 1591,1254 C1596,1254 1594,1320 1587,1372 C1535,1761 1189,2048 804,2022 Z M827,1665 C764,1654 711,1630 662,1588 C577,1518 525,1392 545,1309 C566,1227 620,1141 701,1062 C775,990 859,945 955,924 C997,915 1015,913 1067,913 C1160,913 1223,926 1327,966 C1354,976 1347,979 1292,978 C1098,976 956,1046 849,1197 C814,1246 773,1319 752,1369 C701,1490 713,1541 795,1562 C844,1574 948,1576 1092,1565 C1113,1563 1131,1563 1132,1563 C1135,1565 1130,1570 1110,1586 C1060,1626 1012,1649 953,1661 C921,1668 855,1670 827,1665 Z M388,720 C313,708 254,684 199,641 C175,621 138,583 120,557 C98,524 70,469 74,465 C75,464 94,467 115,472 C137,477 161,482 169,483 C177,485 185,486 187,487 C189,487 203,490 217,493 C231,496 244,499 245,499 C246,499 251,500 255,501 C261,502 320,514 381,527 C383,528 398,531 413,534 C428,538 447,542 455,543 C524,557 552,564 552,566 C552,567 543,576 533,586 C491,627 457,667 435,700 C427,712 420,722 419,722 C416,724 418,724 388,720 Z M1223,689 C1245,684 1271,670 1285,654 C1288,650 1288,650 1284,648 C1186,589 1159,575 1127,567 C1087,557 1036,560 1004,574 L997,577 L1015,578 C1044,581 1053,586 1092,626 C1133,668 1145,677 1170,685 C1191,692 1204,693 1223,689 Z M739,390 C567,345 455,235 423,80 C418,56 418,56 441,74 C552,162 727,250 909,311 C965,330 968,331 959,333 C922,342 855,363 806,382 C767,398 768,398 739,390 Z" fill-rule="evenodd"/></g><path class="gv-t1" d="M92.5 33.2C97.6 33.2 101.3 30.0 101.3 24.6V22.1H92.8V25.3H97.2C97.1 27.9 95.4 29.5 92.5 29.5C89.2 29.5 87.1 27.1 87.1 22.8C87.1 18.4 89.3 16.0 92.4 16.0C94.7 16.0 96.2 17.2 96.8 19.1H101.1C100.5 15.1 97.0 12.3 92.4 12.3C87.0 12.3 82.9 16.2 82.9 22.8C82.9 29.2 86.8 33.2 92.5 33.2Z M108.4 33.0H112.5V25.7H115.8L119.7 33.0H124.3L120.0 25.0C122.3 24.0 123.6 22.0 123.6 19.2C123.6 15.2 121.0 12.6 116.3 12.6H108.4ZM112.5 22.3V16.0H115.5C118.1 16.0 119.3 17.2 119.3 19.2C119.3 21.2 118.1 22.3 115.6 22.3Z M134.9 12.6H130.7V33.0H134.9Z M142.5 33.0H146.6V25.1H155.0V21.7H146.6V16.0H155.9V12.6H142.5Z M162.8 33.0H167.0V25.1H175.3V21.7H167.0V16.0H176.2V12.6H162.8Z M192.1 33.2C197.5 33.2 201.6 29.4 201.6 22.8C201.6 16.1 197.5 12.3 192.1 12.3C186.7 12.3 182.6 16.1 182.6 22.8C182.6 29.4 186.7 33.2 192.1 33.2ZM192.1 29.5C189.0 29.5 186.9 27.1 186.9 22.8C186.9 18.4 189.0 16.0 192.1 16.0C195.3 16.0 197.4 18.4 197.4 22.8C197.4 27.1 195.3 29.5 192.1 29.5Z"/><path class="gv-t2" d="M89.9 63.0H92.2L99.7 42.6H97.6L92.9 55.9C92.4 57.2 91.8 58.9 91.1 61.4C90.3 59.0 89.7 57.2 89.3 55.9L84.4 42.6H82.4Z M109.0 42.6H107.1V63.0H109.0Z M126.3 63.2C130.6 63.2 133.7 60.3 134.3 56.6H132.4C131.8 59.3 129.4 61.4 126.3 61.4C122.4 61.4 119.3 58.4 119.3 52.8C119.3 47.2 122.4 44.1 126.3 44.1C129.4 44.1 131.8 46.2 132.4 49.0H134.3C133.7 45.2 130.6 42.3 126.3 42.3C121.1 42.3 117.4 46.4 117.4 52.8C117.4 59.2 121.1 63.2 126.3 63.2Z M141.4 44.3H147.9V63.0H149.8V44.3H156.3V42.6H141.4Z M172.3 63.2C177.5 63.2 181.1 59.1 181.1 52.8C181.1 46.4 177.5 42.3 172.3 42.3C167.1 42.3 163.5 46.4 163.5 52.8C163.5 59.1 167.1 63.2 172.3 63.2ZM172.3 61.4C168.3 61.4 165.3 58.2 165.3 52.8C165.3 47.3 168.3 44.1 172.3 44.1C176.3 44.1 179.2 47.3 179.2 52.8C179.2 58.2 176.3 61.4 172.3 61.4Z M189.5 63.0H191.5V54.8H196.2C196.4 54.8 196.7 54.7 196.9 54.7L201.3 63.0H203.6L198.9 54.4C201.4 53.5 202.7 51.4 202.7 48.7C202.7 45.1 200.5 42.6 196.2 42.6H189.5ZM191.5 53.0V44.3H196.1C199.3 44.3 200.8 46.1 200.8 48.7C200.8 51.3 199.3 53.0 196.1 53.0Z"/></svg></a></div></div>`;
  document.body.append(rod);

  const z = document.createElement("a"); z.className = "zapfix"; z.target = "_blank"; z.rel = "noopener";
  z.href = zap("Olá, Anjos! 🍦 Vim pelo site."); z.setAttribute("aria-label","Falar no WhatsApp"); z.innerHTML = ZAP_SVG;
  document.body.append(z);
  const t = document.createElement("div"); t.className = "toast"; t.id = "toast"; document.body.append(t);

  // animação ao rolar
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("vis"); io.unobserve(e.target); } }), { threshold: .1 });
  document.querySelectorAll(".rv").forEach(el => io.observe(el));
}

// horário do empório
const DIAS = ["domingo","segunda","terça","quarta","quinta","sexta","sábado"];
const fmtH = h => h.replace(/^0/,"").replace(":00","h").replace(":","h");
const ymdLocal = d => d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
const ehFeriado = d => FERIADOS.includes(ymdLocal(d));
const horarioDo = d => ehFeriado(d) ? HORARIO[0] : HORARIO[d.getDay()];
function statusEmporio() {
  const d = new Date(), h = horarioDo(d), min = d.getHours()*60 + d.getMinutes();
  const m = s => { const [a,b] = s.split(":").map(Number); return a*60+b; };
  if (h && min >= m(h[0]) && min < m(h[1])) return { aberto:true, txt:`Empório aberto agora · até ${fmtH(h[1])}` };
  if (h && min < m(h[0])) return { aberto:false, txt:`Empório fechado · abre hoje às ${fmtH(h[0])}` };
  for (let k = 1; k <= 7; k++) { const dd = new Date(d.getFullYear(), d.getMonth(), d.getDate()+k), hh = horarioDo(dd);
    if (hh) return { aberto:false, txt:`Empório fechado · abre ${k===1?"amanhã":DIAS[dd.getDay()]} às ${fmtH(hh[0])}` }; }
  return { aberto:false, txt:"Empório fechado" };
}
function desenharStatus(sel) {
  const el = $(sel); if (!el) return;
  const s = statusEmporio(); el.classList.toggle("fech", !s.aberto); el.querySelector("span").textContent = s.txt;
}
function desenharHorarios(sel) {
  const el = $(sel); if (!el) return; const hoje = new Date(), dia = hoje.getDay(), fer = ehFeriado(hoje);
  el.innerHTML = [["Segunda a sábado","9h às 18h",dia>=1 && !fer],["Domingos e feriados","13h às 18h",dia===0 || fer]]
    .map(([a,b,hj]) => `<li class="${hj?"hoje":""}"><span>${a}${hj?" (hoje)":""}</span><span>${b}</span></li>`).join("");
}
function fotoCat(c, cls="") {
  if (c.foto) return `<img class="${cls}" src="${c.foto.replace("img/","img/sm-")}" alt="${c.nome}" loading="lazy">`;
  return `<div class="${cls} sem-foto zero" role="img" aria-label="${c.nome}"><b>0%</b><span>açúcar</span></div>`;
}
function arteHero(sel, itens) {
  const el = $(sel); if (!el) return;
  el.innerHTML = itens.map(([f,c,st]) => arte(f,c).replace("<svg", `<svg style="${st}"`)).join("");
}
