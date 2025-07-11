// Inicializar Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBIb0ojroM5OguSOPlqG-JwxowSjIpW1PY",
  authDomain: "ducknrollremeras.firebaseapp.com",
  projectId: "ducknrollremeras",
  storageBucket: "ducknrollremeras.firebasestorage.app",
  messagingSenderId: "957094409993",
  appId: "1:957094409993:web:4efe5b0f845ec548a085d8"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

function subirImagen() {
  const archivo = document.getElementById("fileInput").files[0];
  if (!archivo) return alert("⚠️ Seleccioná una imagen primero.");

  const nombre = Date.now() + "_" + archivo.name;
  const ref = storage.ref("images/" + nombre);

  ref.put(archivo)
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
      document.getElementById("resultado").innerHTML = `
        ✅ Imagen subida correctamente.<br><br>
        <strong>URL (copiada al portapapeles):</strong><br>
        <code>${url}</code><br><br>
        <img src="${url}" class="img-fluid border border-success" style="max-width:300px;" />
      `;
      navigator.clipboard.writeText(url);
    })
    .catch(err => {
      alert("❌ Error al subir imagen: " + err.message);
    });
}
