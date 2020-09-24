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
var qtdPergunta = 1;
var qtdNivel = 1;
var mainCard = document.querySelector(".main-cards");
var numPergunta = document.querySelector(".numero-pergunta");
var numNivel = document.querySelector(".numero-nivel");
var mainCriarQuizz = document.querySelector(".main-criar-quizz");

var divParaNovosNiveis = document.querySelector(".criar-novo-nivel");
var containerCriarPergunta = document.querySelector(".container-criar-pergunta");
var containerCriarNivel = document.querySelector(".container-criar-nivel");




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
    window.location.reload();
}

function renderizarTelaCriarQuizz() {
    var telaListaQuizzes = document.querySelector(".tela-lista-quizzes");
    telaListaQuizzes.style.display="none";
    var telaCriarQuizz = document.querySelector(".tela-criacao-de-quizz ");
    telaCriarQuizz.style.display="flex";
    
}

function adicionarBoxDePergunta() {
    qtdPergunta++
    var containerTotalPergunta = document.querySelector(".container-total-pergunta");
    var divPergunta = document.createElement("div");
    divPergunta.classList.add("container-pergunta");
    divPergunta.innerHTML='<h2 class="numero-pergunta"> Pergunta ' + qtdPergunta + '</h2>';
    divPergunta.innerHTML += '<input type="text" id="titulo-questao" name="pergunta"  placeholder="Digite a pergunta">'; 
    divPergunta.innerHTML += '<ul class="perguntas"><li class="li"><input type="text" class="correta" name="pergunta"  placeholder="Digite a resposta correta"><input type="text" class="correta" name="pergunta" placeholder="Link para imagem correta"></li><li><input type="text" class="errada" name="pergunta"  placeholder="Digite a resposta errada 1"><input type="text" class="errada" name="pergunta" placeholder="Link para imagem errada 1"></li><li><input type="text" class="errada" name="pergunta"  placeholder="Digite a resposta errada 2"><input type="text" class="errada" name="pergunta" placeholder="Link para imagem errada 2"></li><li><input type="text" class="errada" name="pergunta"  placeholder="Digite a resposta errada 3"><input type="text" class="errada" name="pergunta" placeholder="Link para imagem errada 3"></li></ul>'
 
    containerTotalPergunta.appendChild(divPergunta);
}


function adicionarBoxDeNivel() {
    qtdNivel++
    var containerTotalNivel = document.querySelector(".container-total-nivel");
    var divNivel= document.createElement("div");
    divNivel.classList.add("container-nivel");
    divNivel.innerHTML='<h2 class="numero-pergunta"> Nível ' + qtdNivel + '</h2>';
    divNivel.innerHTML +='<ul class="niveis"><li class="li"><input type="text" class="porcentagem" name="minima"  placeholder="% Mínima de Acerto do nível"><input type="text" class="porcentagem" name="maxima"  placeholder="% Máxima de Acerto do nível"></li><li><input type="text" class="titulo-nivel" name="titulo-nivel"  placeholder="Título do nível"></li><li><input type="text" class="imagem-nivel" name="link-img-nivel"  placeholder="Link da imagem do nível"></li><li><input type="text" class="descricao-nivel" name="descricao-nivel"  placeholder="Descrição do nível"></li></ul>';

    containerTotalNivel.appendChild(divNivel);
 
}

function pegarDadosDoQuizz() {
    var inputTituloQuizz = document.getElementById("titulo-do-seu-quizz");
    tituloQuizz = inputTituloQuizz.value;
    tituloQuizz = tituloQuizz.substring(0,1).toUpperCase().concat(tituloQuizz.substring(1));
    tituloQuizz.trim();

    var inputPergunta = document.getElementById("pergunta-zero"); 
    pergunta = inputPergunta.value; //Nome da mae do Harry?
    pergunta = pergunta.substring(0,1).toUpperCase().concat(pergunta.substring(1));
    pergunta.trim();

    perguntas.push(pergunta);

    var inputRespostaCorreta = document.getElementById("resposta-correta"); 
    respostaCorreta = inputRespostaCorreta.value; //Lili Potter
    respostaCorreta = respostaCorreta.substring(0,1).toUpperCase().concat(respostaCorreta.substring(1));
    respostaCorreta.trim();
    respostas.push(respostaCorreta);

    var inputErradaUm = document.getElementById("resposta-errada-um"); 
    respostaErradaUm = inputErradaUm.value; 
    respostaErradaUm = respostaErradaUm.substring(0,1).toUpperCase().concat(respostaErradaUm.substring(1)); 
    respostaErradaUm.trim();
    respostas.push(respostaErradaUm);

    var inputErradaDois = document.getElementById("resposta-errada-dois"); 
    respostaErradaDois = inputErradaDois.value; 
    respostaErradaDois = respostaErradaDois.substring(0,1).toUpperCase().concat(respostaErradaDois.substring(1));
    respostaErradaDois.trim();  
    respostas.push(respostaErradaDois);

    var inputErradaTres = document.getElementById("resposta-errada-tres"); 
    respostaErradaTres = inputErradaTres.value; 
    respostaErradaTres = respostaErradaTres.substring(0,1).toUpperCase().concat(respostaErradaTres.substring(1)); 
    respostaErradaTres.trim();    
    respostas.push(respostaErradaTres);


    
    quizz.push(perguntas);
    quizz.push(respostas);
    //console.log(perguntas);
    //console.log(quizz);
    
    enviarQuizzProServidor();

}

function validarInterrogacao (){
    


    
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