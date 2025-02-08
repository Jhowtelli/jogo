let numeroSecreto = gerarNumeroAleatorio(); 
let tentativas = 0;
let recordes = JSON.parse(localStorage.getItem('recordes')) || []; // Carregar recordes do localStorage

// Função para exibir texto na tela
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    if (campo) {
        campo.innerHTML = texto;
    } else {
        console.error(`Elemento '${tag}' não encontrado.`);
    }
}

// Função para verificar o chute
function verificarChute() {
    let nome = document.getElementById('nome').value;
    let chute = parseInt(document.getElementById('chute').value);

    if (!nome || isNaN(chute)) {
        alert("Por favor, insira seu nome e um chute válido.");
        return;
    }

    tentativas++;

    if (chute === numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', `Parabéns, ${nome}! Você acertou em ${tentativas} tentativas.`);
        salvarRecorde(nome, tentativas);
    } else {
        let dica = chute < numeroSecreto ? "Tente um número maior!" : "Tente um número menor!";
        exibirTextoNaTela('p', `Tentativas: ${tentativas}`);
        exibirTextoNaTela('p', `${dica}`);
    }

    document.getElementById('chute').value = '';
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 0;
    document.getElementById('nome').value = '';
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 10');
    document.getElementById('reiniciar').disabled = true;
}

// Função para gerar um número aleatório
function gerarNumeroAleatorio() {
    return parseInt(Math.random() * 10000 + 1);
}

// Função para salvar o recorde
function salvarRecorde(nome, tentativas) {
    recordes.push({ nome, tentativas });
    recordes.sort((a, b) => a.tentativas - b.tentativas); // Ordena pela menor quantidade de tentativas

    // Salva os recordes no localStorage
    localStorage.setItem('recordes', JSON.stringify(recordes));

    exibirRecordes();
}

// Função para exibir os recordes
function exibirRecordes() {
    const recordesList = document.getElementById('recordesList');
    recordesList.innerHTML = '';
    recordes.forEach(recorde => {
        let li = document.createElement('li');
        li.textContent = `${recorde.nome}: ${recorde.tentativas} tentativas`;
        recordesList.appendChild(li);
    });
}

// Função para mostrar a lista de recordes
function mostrarRecordes() {
    document.querySelector('.container__recordes').style.display = 'block';
}

// Carregar os recordes ao carregar a página
window.onload = function() {
    exibirRecordes();
};


// A música de fundo será tocada automaticamente ao carregar a página
let musicBackground = document.getElementById('musicBackground');

// Definir o volume (de 0 a 1)
musicBackground.volume = 0.1; // Volume baixo (ajuste conforme necessário)
