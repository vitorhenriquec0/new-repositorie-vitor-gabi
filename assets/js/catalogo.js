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


//Cadastro dos produtos
const form = document.getElementById('catalogo');
form.addEventListener('submit', async (e) =>{
    e.preventDefault();

const imagem = document.getElementById("imagem").value;
const nome = form.nome.value;
const preco = parseFloat(form.preco.value);
const descricao = form.descricao.value;

try {
    await addDoc(collection(db, "catalogo"),{
     imagem,
     nome,
     descricao,
     preco
    });
    alert("Produto cadastrado com sucesso.");
    form.reset();
}catch (error) {
    console.error ("Erro ao cadastrar produto", error);
    alert("erro ao cadastrar");
}
})
//

