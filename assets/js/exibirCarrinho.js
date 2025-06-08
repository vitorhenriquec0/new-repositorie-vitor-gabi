import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

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
const auth = getAuth();

function autenticarUsuarioAnonimamente() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        resolve(user);
      } else {
        try {
          const result = await signInAnonymously(auth);
          resolve(result.user);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
}

async function carregarCarrinho() {
  const user = await autenticarUsuarioAnonimamente();
  const userId = user.uid;

  const listaCarrinho = document.querySelector(".product-list");
  listaCarrinho.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "carrinhos", userId, "itens"));
  querySnapshot.forEach((doc) => {
    const produto = doc.data();
    const itemHTML = `
      <div class="product-item">
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h4>${produto.nome}</h4>
        <span class="product-price">R$ ${produto.preco.toFixed(2)}</span>
        <p>${produto.descricao}</p>
      </div>
    `;
    listaCarrinho.innerHTML += itemHTML;
  });
}

carregarCarrinho();