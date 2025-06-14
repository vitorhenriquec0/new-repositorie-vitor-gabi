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
const auth = getAuth(app);

let userId = null;


signInAnonymously(auth).catch(console.error);


onAuthStateChanged(auth, (user) => {
  if (user) {
    userId = user.uid;

    document.addEventListener("click", async (event) => {
      const btn = event.target.closest(".buy-btn");
      if (!btn) return;

      const produto = {
        nome: btn.dataset.nome,
        preco: parseFloat(btn.dataset.preco),
        imagem: btn.dataset.imagem,
        descricao: btn.dataset.descricao,
        userId: userId,
      };

      try {
        await addDoc(collection(db, "carrinho"), produto);
        alert("Produto adicionado ao carrinho!");
      } catch (error) {
        console.error("Erro ao adicionar ao carrinho:", error);
      }
    });
  }
});
