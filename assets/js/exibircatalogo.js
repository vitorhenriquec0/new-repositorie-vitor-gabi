import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAeRFLRmFhTujKWZuW2UndQj_jqu4_JJSU",
  authDomain: "new-repositore-vitor-gabi.firebaseapp.com",
  projectId: "new-repositore-vitor-gabi",
  storageBucket: "new-repositore-vitor-gabi.appspot.com",
  messagingSenderId: "744773116089",
  appId: "1:744773116089:web:f82dcb394e29394c84bb68"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


function carregarProdutos() {
  const allSections = document.querySelectorAll('section');
  let listaProdutos = null;

  allSections.forEach(section => {
    const h2 = section.querySelector('h2');
    if (h2 && h2.textContent.trim() === "Todos os produtos") {
      listaProdutos = section.querySelector('.product-list');
    }
  });

  if (!listaProdutos) return;

  const refCatalogo = collection(db, "catalogo");

  onSnapshot(refCatalogo, (snapshot) => {
    listaProdutos.innerHTML = ""; 

    snapshot.forEach((doc) => {
      const produto = doc.data();

      const item = document.createElement('div');
      item.className = 'product-item';
      item.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h4>${produto.nome}</h4>
        <p>${produto.descricao}</p>
        <span class="product-price">R$ <span class="produto-preco">${produto.preco.toFixed(2)} </span></span>
        <button class="buy-btn" data-nome="${produto.nome}" data-preco="${produto.preco}" data-imagem="${produto.imagem}" data-descricao="${produto.descricao}">
          Adicionar ao carrinho
        </button>
      `;
      listaProdutos.appendChild(item);
    });
  });
}


function carregarPromocoes() {
  const allSections = document.querySelectorAll('section');
  let listaPromocoes = null;

  allSections.forEach(section => {
    const h2 = section.querySelector('h2');
    if (h2 && h2.textContent.trim() === "Produtos em Promoção") {
      listaPromocoes = section.querySelector('.product-list');
    }
  });

  if (!listaPromocoes) return;

  const refPromocoes = collection(db, "promocao");

  onSnapshot(refPromocoes, (snapshot) => {
    listaPromocoes.innerHTML = ""; 

    snapshot.forEach((doc) => {
      const produto = doc.data();

      const item = document.createElement('div');
      item.className = 'product-item';
      item.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h4>${produto.nome}</h4>
        <p>${produto.descricao}</p>
        <span class="product-price">R$ <span class="produto-preco">${produto.preco.toFixed(2)} </span></span>
        <button class="buy-btn" data-nome="${produto.nome}" data-preco="${produto.preco}" data-imagem="${produto.imagem}" data-descricao="${produto.descricao}">
          Adicionar ao carrinho
        </button>
      `;
      listaPromocoes.appendChild(item);
    });
  });
}


carregarProdutos();
carregarPromocoes();
