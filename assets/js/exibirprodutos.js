//firebase-
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

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

const container = document.querySelector('.product-list');
async function carregarProdutos() {
    const querySnapshot = await getDocs(collection(db, 'produtos'));

    querySnapshot.forEach((doc) => {
        const produto = doc.data();
        const div = document.createElement('div');
        div.classList.add('product-item');

        div.innerHTML = `
            <img src="${produto.imagem || './assets/img/default.jpg'}" alt="${produto.nome}">
            <h4>${produto.nome}</h4>
            <p>${produto.descricao}</p>
            <span>R$ ${parseFloat(produto.preco).toFixed(2)}</span>
        `;
        container.appendChild(div);
    });
}

carregarProdutos();

