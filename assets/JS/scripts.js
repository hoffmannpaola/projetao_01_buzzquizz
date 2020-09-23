var idEmail;
var idSenha;
var tokenUsuario;
var config;
var tituloQuizz;
var pergunta;
var perguntas = [];
var respostas = [];
var quizz = [];
var quizzDados;
var mainCard = document.querySelector(".main-cards");




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
    //window.location.reload();
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

 
function renderizarQuizzes(resposta) {
    var meusQuizzes = resposta.data;
    console.log(meusQuizzes);
    for (var i = 0; i <= meusQuizzes.length; i++) {
        var divContainerCard = document.createElement("div"); 
        divContainerCard.setAttribute("class", "card meu-quizz");
        divContainerCard.setAttribute("onclick", "abrirMeuQuizz()");
        var divTituloCard = document.createElement("div"); 
        divTituloCard.setAttribute("class", "titulo-card-quizz");
        divTituloCard.innerHTML = meusQuizzes[i].title;
        divContainerCard.appendChild(divTituloCard);
        mainCard.appendChild(divContainerCard);
        
        
    }

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


    
    quizz.push(perguntas);
    quizz.push(respostas);
    //console.log(perguntas);
    //console.log(quizz);
    
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
    config = {
        headers : {
        "User-Token": tokenUsuario }
       }
    var requisicao = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes', config);
    requisicao.then(renderizarQuizzes);

}

function enviarQuizzProServidor() {

    config = {
        headers: {
        "User-Token": tokenUsuario }
       }

    quizzDados = {
            "title": tituloQuizz,
	        "data": quizz
        }
       

    var requisicao = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes',  quizzDados, config);
    requisicao.then(liberarTelaListaDeQuizzes);

}