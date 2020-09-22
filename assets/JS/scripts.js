var idEmail;
var idSenha;
var tokenUsuario;
var tokenDados;
var tituloQuizz;
var pergunta;
var perguntas = [];
var respostas = [];
var quizzDados = [];




function enviarLogin() {
    document.getElementById("botao-enviar-login").disabled = true;

    var inputEmail = document.getElementById("email");
    idEmail = inputEmail.value;
    var inputSenha = document.getElementById("senha");
    idSenha = inputSenha.value;
    
    if (idEmail === "" || idSenha === "" ) {
        alert("Preencha todos os campos para fazer login!");
    }

    enviarLoginProServidor();
}

function loginIncorreto(){
    alert("Login ou Senha incorreto!");
    window.location.reload();
}

function liberarTelaListaDeQuizzes(resposta) {
    tokenUsuario = resposta.data.token;
    //console.log(tokenUsuario);
    var telaLogin = document.querySelector(".tela-login");
    telaLogin.style.display="none";
    var telaListaQuizzes = document.querySelector(".tela-lista-quizzes");
    telaListaQuizzes.style.display="flex";

    pegarListaDeQuizzes();
    
}

function renderizarQuizzes() {
    //jogar os quizzes como cards no html

}

function renderizarTelaCriarQuizz() {
    var telaListaQuizzes = document.querySelector(".tela-lista-quizzes");
    telaListaQuizzes.style.display="none";
    var telaCriarQuizz = document.querySelector(".tela-criacao-de-quizz");
    telaCriarQuizz.style.display="flex";
}

function pegarDadosDoQuizz() {
    var inputTituloQuizz = document.getElementById("titulo-do-seu-quizz");
    tituloQuizz = inputTituloQuizz.value;


    var inputPergunta = document.getElementById("pergunta-zero"); 
    pergunta = inputPergunta.value; //Nome da mae do Harry?
    perguntas.push(pergunta);

    var inputRespostaCorreta = document.getElementById("resposta-correta"); 
    respostaCorreta = inputRespostaCorreta.value; //Lili Potter
    respostas.push(respostaCorreta);

    var inputErradaUm = document.getElementById("resposta-errada-um"); 
    respostaErradaUm = inputErradaUm.value;  
    respostas.push(respostaErradaUm);

    var inputErradaDois = document.getElementById("resposta-errada-dois"); 
    respostaErradaDois = inputErradaDois.value;  
    respostas.push(respostaErradaDois);

    var inputErradaTres = document.getElementById("resposta-errada-tres"); 
    respostaErradaTres = inputErradaTres.value;  
    respostas.push(respostaErradaTres);


    
    quizzDados.push(perguntas);
    quizzDados.push(respostas);
    console.log(perguntas);
    console.log(quizzDados);
    
    enviarQuizzProServidor();

}


//Conversas com o servidor

function enviarLoginProServidor() {
    var dadosLogin = {
        "email": idEmail,
        "password": idSenha
    }

    var requisicao = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users', dadosLogin);
    requisicao.then(liberarTelaListaDeQuizzes).catch(loginIncorreto);
}

function pegarListaDeQuizzes() {
    tokenDados = {
        headers : {
        "User-Token": tokenUsuario }
       }
    var requisicao = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes', tokenDados);
    requisicao.then(renderizarQuizzes);

}

function enviarQuizzProServidor() {
    tokenDados = {
        headers : {
        "User-Token": tokenUsuario }
       }

    var requisicao = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes', tokenDados);
    requisicao.then(renderizarQuizzes);

}