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


//Cadastro das mensagens (so pra deixar funcional)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById('contato');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('message').value;

    try {
        await addDoc(collection(db, "mensagem"), {
            nome,
            email,
            mensagem
        });
        alert("Obrigado pelo feedback, nossa equipe agradece :)");
        form.reset();
    } catch (error) {
        console.error("Erro ao enviar mensagem", error);
        alert("Erro ao cadastrar");
    }
});
//

