import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

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


async function carregarProdutos() {
  // Seleciona a .product-list da seção "Todos os produtos"
  const allSections = document.querySelectorAll('section');
  let listaProdutos = null;
  allSections.forEach(section => {
    const h2 = section.querySelector('h2');
    if (h2 && h2.textContent.trim() === "Todos os produtos") {
      listaProdutos = section.querySelector('.product-list');
    }
  });
  if (!listaProdutos) return;

  listaProdutos.innerHTML = ""; 

  const querySnapshot = await getDocs(collection(db, "catalogo"));

  querySnapshot.forEach((doc) => {
    const produto = doc.data();

    const item = document.createElement('div');
    item.className = 'product-item';
    item.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h4>${produto.nome}</h4>
      <span class="product-price">R$ ${produto.preco.toFixed(2)}</span>
      <p>${produto.descricao}</p>
      <button class="buy-btn" data-nome="${produto.nome}" data-preco="${produto.preco}" data-imagem="${produto.imagem}" data-descricao="${produto.descricao}">
        Adicionar ao carrinho
      </button>
    `;
    listaProdutos.appendChild(item);
  });
}

carregarProdutos();