//firebase-
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
//

async function carregarProdutos() {
  const listaProdutos = document.querySelector(".product-list");
  listaProdutos.innerHTML = ""; 

  const querySnapshot = await getDocs(collection(db, "produtos"));
  querySnapshot.forEach((doc) => {
    const produto = doc.data();
    const itemHTML = `
    <div class="product-item">
      <img src="${produto.imagem || './assets/img/padrao.jpg'}" alt="${produto.nome}">
      <h4>${produto.nome}</h4>
      <p>${produto.descricao}</p>
      <span class="product-price">R$ <span class="produto-preco">${produto.preco.toFixed(2)}</span></span>
      <button class="buy-btn">Adicionar ao carrinho</button>
    </div>
  `;
    listaProdutos.innerHTML += itemHTML;
  });
}

// Executa ao carregar a página
carregarProdutos();