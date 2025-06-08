//firebase-
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";
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
//


//Cadastro dos produtos
const form = document.getElementById('produtos');
form.addEventListener('submit', async (e) =>{
    e.preventDefault();

const imagem = document.getElementById("imagem").value;
const nome = form.nome.value;
const preco = parseFloat(form.preco.value);
const descricao = form.descricao.value;

try {
    await addDoc(collection(db, "produtos"),{
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

// login anonimo 

function autenticarUsuarioAnonimamente() {
    return new Promise ((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                resolve(user);
            } else {
                try {
                    const result = await signInAnonymously(auth);
                    resolve(result.user);
                }catch(error) {
                    reject(error);
                }
            }
        });
    });
}

document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('buy-btn')) {
    const btn = e.target;
    
    const produto = {
      nome: btn.dataset.nome,
      preco: parseFloat(btn.dataset.preco),
      imagem: btn.dataset.imagem,
      descricao: btn.dataset.descricao,
    };

    try {
      const user = await autenticarUsuarioAnonimamente();
      const userId = user.uid;


      const docRef = await addDoc(collection(db, "carrinhos", userId, "itens"), produto);
      alert("Produto adicionado ao carrinho!");
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
    }
  }
});