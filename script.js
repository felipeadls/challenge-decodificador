// Seleciona o elemento textarea com a classe '.text-area' para capturar a entrada do usuário
const textArea = document.querySelector('.text-area');

// Seleciona o elemento textarea com a classe '.mensagem' onde será exibida a saída
const mensagem = document.querySelector('.mensagem');

// Adiciona um evento de input ao textarea para impedir a entrada de acentos e caracteres especiais
textArea.addEventListener('input', function () {
    // Normaliza o texto para decompor acentos e remove-os
    this.value = this.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // Remove qualquer caractere que não seja uma letra minúscula ou espaço
    this.value = this.value.replace(/[^a-z\s]/g, "");
});

// Função chamada ao clicar no botão de encriptar
function btnEncriptar() {
    // Chama a função encriptar e passa o valor do textarea, armazenando o resultado
    const textoEncriptado = encriptar(textArea.value);
    // Exibe o texto encriptado na área de mensagem
    mensagem.value = textoEncriptado;
    // Limpa o textarea após a encriptação
    textArea.value = "";
}

// Função que realiza a encriptação da string fornecida
function encriptar(stringEncriptada) {
    // Matriz que mapeia cada vogal a uma string correspondente
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    // Converte a string para minúsculas
    stringEncriptada = stringEncriptada.toLowerCase();

    // Loop para substituir cada vogal pela string correspondente na matriz
    for (let i = 0; i < matrizCodigo.length; i++) {
        // Verifica se a vogal está presente na string
        if (stringEncriptada.includes(matrizCodigo[i][0])) {
            // Substitui a vogal pela string correspondente
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    }

    // Retorna a string encriptada
    return stringEncriptada;
}

// Função chamada ao clicar no botão de desencriptar
function btnDesencriptar() {
    // Chama a função desencriptar e passa o valor do textarea, armazenando o resultado
    const textoDesencriptado = desencriptar(textArea.value);
    // Exibe o texto desencriptado na área de mensagem
    mensagem.value = textoDesencriptado;
    // Limpa o textarea após a desencriptação (erro aqui: deveria ser textArea.value = "";)
    textArea = "";
}

// Função que realiza a desencriptação da string fornecida
function desencriptar(stringDesencriptada) {
    // Mesma matriz utilizada na encriptação, mas invertendo os papéis
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    // Converte a string para minúsculas
    stringDesencriptada = stringDesencriptada.toLowerCase();

    // Loop para substituir cada string encriptada pela vogal correspondente
    for (let i = 0; i < matrizCodigo.length; i++) {
        // Verifica se a string encriptada está presente na string
        if (stringDesencriptada.includes(matrizCodigo[i][1])) {
            // Substitui a string encriptada pela vogal correspondente
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
        }
    }

    // Retorna a string desencriptada
    return stringDesencriptada;
}


function btnCopiar() {
    mensagem.select(); // Seleciona o conteúdo da área de texto
    mensagem.setSelectionRange(0, 99999); // Para dispositivos móveis
    document.execCommand('copy'); // Executa o comando de cópia
    window.location.reload();
}