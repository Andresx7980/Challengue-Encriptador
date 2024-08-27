//-------Selección de Elementos-------//
const btnEncriptar = document.querySelector(".btn-encriptar");
const txtEncriptar = document.querySelector(".encriptar");
const aviso = document.querySelector(".texto-aviso");
const respuesta = document.querySelector(".evaluar");
const contenido = document.querySelector(".tarjeta-contenedor");
const btnCopiar = document.querySelector(".btn-copiar");
const btnDesencriptar = document.querySelector(".btn-desencriptar");

//-------Funciones Utilitarias-------//
const mostrarAviso = (mensaje) => {
    aviso.textContent = mensaje;
    aviso.classList.add("aviso-activo");
    setTimeout(() => aviso.classList.remove("aviso-activo"), 1500);
};

const validarTexto = (texto) => {
    let txt = texto.normalize("NFD").replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]>\<:"`;,\u0300-\u036f']/g, "");
    if (texto === "") {
        mostrarAviso("El campo de texto no debe estar vacío");
        return false;
    }
    if (texto !== txt) {
        mostrarAviso("No debe tener acentos y caracteres especiales");
        return false;
    }
    if (texto !== texto.toLowerCase()) {
        mostrarAviso("El texto debe ser todo en minúscula");
        return false;
    }
    return true;
};

const encriptarTexto = (texto) => {
    return texto.replace(/e/g, "enter")
                .replace(/i/g, "imes")
                .replace(/a/g, "ai")
                .replace(/o/g, "ober")
                .replace(/u/g, "ufat");
};

const desencriptarTexto = (texto) => {
    return texto.replace(/enter/g, "e")
                .replace(/imes/g, "i")
                .replace(/ai/g, "a")
                .replace(/ober/g, "o")
                .replace(/ufat/g, "u");
};

const actualizarRespuesta = (texto) => {
    respuesta.innerHTML = texto;
    btnCopiar.style.visibility = "visible";
    document.querySelector(".container-tarjeta").classList.add("oculto");
};

//-------Eventos-------//
btnEncriptar.addEventListener("click", e => {
    e.preventDefault();
    let texto = txtEncriptar.value;
    if (validarTexto(texto)) {
        const textoEncriptado = encriptarTexto(texto);
        actualizarRespuesta(textoEncriptado);
    }
});

btnDesencriptar.addEventListener("click", e => {
    e.preventDefault();
    let texto = txtEncriptar.value;
    if (validarTexto(texto)) {
        const textoDesencriptado = desencriptarTexto(texto);
        actualizarRespuesta(textoDesencriptado);
    }
});

btnCopiar.addEventListener("click", e => {
    e.preventDefault();
    const textoACopiar = respuesta.textContent;
    navigator.clipboard.writeText(textoACopiar)
        .then(() => mostrarAviso("Texto copiado"))
        .catch(err => mostrarAviso("Error al copiar el texto"));
});