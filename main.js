const container = document.getElementById("container");
const bau = document.getElementById("bau");
const txtMoney = document.getElementById("txtMoney");
const txtErro = document.getElementById("txtErro");

let posBau = 200,
  moneyCount = 0,
  erroCount = 0,
  itemAtivo = null,
  movimento = null;

const iniciarMovimento = (dx) => {
  if (!movimento) movimento = setInterval(() => moverBau(dx), 30);
};

const pararMovimento = () => {
  clearInterval(movimento);
  movimento = null;
};

const moverBau = (dx) => {
  posBau = Math.min(Math.max(0, posBau + dx), container.clientWidth - 100);
  bau.style.left = posBau + "px";
};

const criarItem = () => {
  if (!itemAtivo) {
    const item = document.createElement("img");
    item.className = Math.random() > 0.8 ? "tijolo" : "money";
    item.src = item.className === "tijolo" ? "img/tijolo.png" : "img/money.png";
    item.style.left = Math.floor(Math.random() * (container.clientWidth - 60)) + "px";

    container.appendChild(item);
    itemAtivo = item;
    moverItem(item);
  }
};

const moverItem = (item) => {
  const intervalo = setInterval(() => {
    item.style.top = parseInt(item.style.top) + 5 + "px";
    if (parseInt(item.style.top) >= container.clientHeight - 60 || verificarColeta(item)) {
      item.remove();
      itemAtivo = null;
      clearInterval(intervalo);
    }
  }, 30);
};

const verificarColeta = (item) => {
  const posItem = item.getBoundingClientRect();
  const posBauRect = bau.getBoundingClientRect();

  if (
    posBauRect.left < posItem.right &&
    posBauRect.right > posItem.left &&
    posBauRect.bottom > posItem.top &&
    posBauRect.top < posItem.bottom
  ) {
    item.className === "money" ? (moneyCount++, txtMoney.textContent = `Money: ${moneyCount}`, bau.src = "img/bauMoney.png") :
      (erroCount++, txtErro.textContent = `Erro: ${erroCount}/10`, erroCount >= 10 && reiniciarJogo());
    return true;
  }
  return false;
};

const reiniciarJogo = () => {
  moneyCount = erroCount = 0;
  txtMoney.textContent = `Money: ${moneyCount}`;
  txtErro.textContent = `Erro: ${erroCount}/10`;
  itemAtivo = null;
};

["touchstart", "mousedown"].forEach(evt => {
  document.getElementById("btnEsquerdo").addEventListener(evt, () => iniciarMovimento(-10));
  document.getElementById("btnDireito").addEventListener(evt, () => iniciarMovimento(10));
});

["touchend", "mouseup"].forEach(evt => {
  document.getElementById("btnEsquerdo").addEventListener(evt, pararMovimento);
  document.getElementById("btnDireito").addEventListener(evt, pararMovimento);
});

setInterval(criarItem, 2000);