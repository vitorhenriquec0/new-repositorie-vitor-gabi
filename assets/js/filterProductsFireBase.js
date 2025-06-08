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

let todosProdutos = [];

async function carregarProdutosFirebase() {
  const querySnapshot = await getDocs(collection(db, "catalogo"));
  todosProdutos = [];
  querySnapshot.forEach((doc) => {
    const produto = doc.data();
    todosProdutos.push(produto);
  });
}

function renderizarResultados(produtos) {
  const resultsContainer = document.getElementById('search-results');
  if (!produtos.length) {
    resultsContainer.innerHTML = '<p>Nenhum produto encontrado.</p>';
    resultsContainer.classList.add('active');
    return;
  }
  resultsContainer.innerHTML = produtos.map(prod => `
    <div class="product-item">
      <div class="product-row">
        <img src="${prod.imagem}" alt="${prod.nome}">
        <div class="product-texts">
          <h4>${prod.nome}</h4>
          <p>${prod.descricao}</p>
        </div>
      </div>
      <div class="product-bottom">
        <span class="product-price">R$ ${Number(prod.preco).toFixed(2)}/span>
        <div class="product-actions">
          <button class="add-to-cart"><span class="fa fa-shopping-cart"></span></button>
          <button class="view-details"><span class="fa fa-plus"></span></button>
        </div>
      </div>
    </div>
  `).join('');
  resultsContainer.classList.add('active');
}

document.addEventListener('DOMContentLoaded', async () => {
  await carregarProdutosFirebase();

  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');

  searchInput.addEventListener('input', function () {
    const termo = this.value.trim().toLowerCase();
    if (!termo) {
      resultsContainer.classList.remove('active');
      resultsContainer.innerHTML = '';
      return;
    }
    const filtrados = todosProdutos.filter(prod =>
      prod.nome.toLowerCase().includes(termo) ||
      prod.descricao.toLowerCase().includes(termo)
    );
    renderizarResultados(filtrados);
  });

  // Esconde a caixa se clicar fora
  document.addEventListener('click', (e) => {
    if (!resultsContainer.contains(e.target) && e.target !== searchInput) {
      resultsContainer.classList.remove('active');
      resultsContainer.innerHTML = '';
    }
  });
});