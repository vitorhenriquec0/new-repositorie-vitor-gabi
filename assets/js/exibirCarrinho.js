import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";
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
const auth = getAuth(app);

signInAnonymously(auth).catch(console.error);

onAuthStateChanged(auth, async (user) => {
  if (!user) return;
  const userId = user.uid;

  const carrinhoRef = collection(db, "carrinho");
  const q = query(carrinhoRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  const carrinhoList = document.getElementById("carrinho-list");
  carrinhoList.innerHTML = "";

  if (querySnapshot.empty) {
    carrinhoList.innerHTML = "<p>Seu carrinho está vazio.</p>";
    return;
  }

  querySnapshot.forEach((documento) => {
    const produto = documento.data();
    const docId = documento.id;

    const item = document.createElement("div");
    item.className = "product-item";
    item.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h4>${produto.nome}</h4>
      <p>${produto.descricao}</p>
      <span class="product-price">R$ ${produto.preco.toFixed(2)}</span>
      <button class="remove-btn" data-id="${docId}">Remover</button>
    `;

    carrinhoList.appendChild(item);
  });

//remover do carrinho - muda o css ai 
  carrinhoList.addEventListener("click", async (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const id = e.target.getAttribute("data-id");

      await deleteDoc(doc(db, "carrinho", id));
      e.target.parentElement.remove(); 

      if (carrinhoList.children.length === 0) {
        carrinhoList.innerHTML = "<p>Seu carrinho está vazio.</p>";
      }
    }
  });
});
