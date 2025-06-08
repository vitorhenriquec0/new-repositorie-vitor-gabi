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

const form = document.getElementById('catalogo');
const btnCatalogo = document.getElementById('btnCatalogo');
const btnPromocao = document.getElementById('btnPromocao');

async function cadastrarProduto(colecao) {
  const nome = form.nome.value.trim();
  const descricao = form.descricao.value.trim();
  const preco = parseFloat(form.preco.value);
  const imagem = form.imagem.value.trim();

  if (!nome || !descricao || isNaN(preco) || !imagem) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  try {
    await addDoc(collection(db, colecao), {
      nome,
      descricao,
      preco,
      imagem
    });
    alert(`Produto cadastrado com sucesso em "${colecao}".`);
    form.reset();
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    alert("Erro ao cadastrar o produto.");
  }
}


btnCatalogo.addEventListener('click', () => cadastrarProduto("catalogo"));
btnPromocao.addEventListener('click', () => cadastrarProduto("promocao"));
