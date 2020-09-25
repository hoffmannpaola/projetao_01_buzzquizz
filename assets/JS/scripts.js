var idEmail;
var idSenha;
var tokenUsuario;
var config;
var meusQuizzes;
var todosQuizzes;
var totalQuizz;
var meuQuiz = [];
var titleQuizz;
var titulo;
var respostas = [];
var resposta;
var nivel = {};

var rodadaPergunta = 0;
var quizz = {perguntas: [], niveis: []};
var quizzDados;
var qtdPergunta = 1;
var qtdBoxPergunta = 1;
var qtdNivel = 1;
var mainCard = document.querySelector(".main-cards");
var numPergunta = document.querySelector(".numero-pergunta");
var numNivel = document.querySelector(".numero-nivel");
var mainCriarQuizz = document.querySelector(".main-criar-quizz");
var divParaNovosNiveis = document.querySelector(".criar-novo-nivel");
var containerCriarPergunta = document.querySelector(".container-criar-pergunta");
var containerCriarNivel = document.querySelector(".container-criar-nivel");
var containerInterfaceUsuario = document.querySelector(".main-interface-usuario");



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
    meusQuizzes = resposta.data;
    
    
    for (var i = 0; i < meusQuizzes.length; i++) {
        meuQuiz.push(meusQuizzes[i])
        
        var divContainerCard = document.createElement("div"); 
        divContainerCard.setAttribute("class", "card meu-quizz");
        divContainerCard.setAttribute("id", meusQuizzes[i].id);
        divContainerCard.setAttribute("onclick", "abrirMeuQuizz(" +meusQuizzes[i].id+ ")");
        var divTituloCard = document.createElement("div"); 
        divTituloCard.setAttribute("class", "titulo-card-quizz");
        divTituloCard.innerHTML = meusQuizzes[i].title;
        divContainerCard.appendChild(divTituloCard);
        mainCard.appendChild(divContainerCard);
        
        
    }
    //console.log(meuQuiz);
   // window.location.reload();
}
console.log(meuQuiz);

//console.log("meuQuiz fora da variavel: " +meuQuiz)


function abrirMeuQuizz(idQuizz){
    for (var i = 0; i < meuQuiz.length; i++) {
        //console.log(meuQuiz[i]);
        if (meuQuiz[i].id === idQuizz) {
            var telaListaQuizzes = document.querySelector(".tela-lista-quizzes");
            telaListaQuizzes.style.display="none";
            var telaInterface = document.querySelector(".tela-interface-usuario ");
            telaInterface.style.display="flex";

            rodadaPergunta++

            console.log(meuQuiz[i]);
            var dataQuizz = meuQuiz[i].data;
            console.log(dataQuizz);
            var quizzPerguntas = dataQuizz.perguntas;
            
            

            var divRodadaPergunta = document.createElement("div");
            containerInterfaceUsuario.appendChild(divRodadaPergunta);
            divRodadaPergunta.classList.add("rodada-de-perguntas");
            divRodadaPergunta.setAttribute("id", rodadaPergunta);
            //divRodadaPergunta.setAttribute("class", rodadaPergunta);
            divRodadaPergunta.innerHTML = '<h1 class="titulo-quizz-interface">'+ meusQuizzes[i].title + '</h1>';
            
            
            var divBoxPergunta = document.createElement("div");
            divBoxPergunta.innerHTML = '<p class="primeira-pergunta">1.' + Object.values(quizzPerguntas[0]) + '</p>'; 
            divRodadaPergunta.appendChild(divBoxPergunta);
            divRodadaPergunta.innerHTML +=  '<ul class="box-respostas"><li class="A resposta" onclick="mostrarResposta(' +rodadaPergunta+ ')"><img src="https://bit.ly/32YqWrF"> <span>' + Object.values(quizzPerguntas[1])+ '</span></li><li class="B resposta" onclick="mostrarResposta(' +rodadaPergunta+ ')"><img src="https://bit.ly/3mIz0op"> <span>'+ dataQuizz.perguntas[2] + '</span></li></ul><ul class="box-respostas"><li class="C resposta" onclick="mostrarResposta(' +rodadaPergunta+ ')"><img src="https://bit.ly/33ZyzgI"> <span>' +dataQuizz.perguntas[3]+ '</span></li><li class="D resposta" onclick="mostrarResposta(' +rodadaPergunta+ ')"><img src="https://bit.ly/330eOWY"> <span>' +dataQuizz.perguntas[4]+ '</span> </li></ul>';
            //containerInterfaceUsuario.appendChild(divRodadaPergunta);

            
            
            


        }
    }
    
}

function mostrarResposta(id) {
    var divElemento = document.getElementById(id);
    var liElemento = divElemento.getElementsByTagName("li");
    console.log(divElemento)
    console.log(liElemento)



}

function renderizarTelaCriarQuizz() {
    var telaListaQuizzes = document.querySelector(".tela-lista-quizzes");
    telaListaQuizzes.style.display="none";
    var telaCriarQuizz = document.querySelector(".tela-criacao-de-quizz ");
    telaCriarQuizz.style.display="flex";
    
}

function adicionarBoxDePergunta() {
    qtdPergunta++
    qtdBoxPergunta++
    var containerTotalPergunta = document.querySelector(".container-total-pergunta");
    var divPergunta = document.createElement("div");
    divPergunta.classList.add("container-pergunta");
    divPergunta.innerHTML='<h2 class="numero-pergunta"> Pergunta ' + qtdPergunta + '</h2>';
    divPergunta.innerHTML += '<ul class="perguntas" id="ul-perguntas' +qtdBoxPergunta+'"><li><input type="text" id="titulo-questao" name="pergunta"  placeholder="Digite a pergunta"></li><li class="li"><input type="text" class="correta" id="resposta-1"    name="pergunta"  placeholder="Digite a resposta correta"><input type="url" id="link-1" class="correta"   name="pergunta" placeholder="Link para imagem correta"></li><li><input type="text" class="errada" id="resposta-2" name="resposta"  placeholder="Digite a resposta errada 1"><input type="url" id="link-2" id="link-2" class="errada" name="resposta" placeholder="Link para imagem errada 1"></li><li><input type="text" class="errada" id="resposta-3" name="resposta"  placeholder="Digite a resposta errada 2"><input type="url" id="link-3" class="errada" name="resposta" placeholder="Link para imagem errada 2"></li><li><input type="text" class="errada" id="resposta-4" name="resposta"  placeholder="Digite a resposta errada 3"><input type="url" id="link-4" class="errada" name="resposta" placeholder="Link para imagem errada 3"></li></ul>';
 
    containerTotalPergunta.appendChild(divPergunta);
}


function adicionarBoxDeNivel() {
    qtdNivel++
    var containerTotalNivel = document.querySelector(".container-total-nivel");
    var divNivel= document.createElement("div");
    divNivel.classList.add("container-nivel");
    divNivel.innerHTML='<h2 class="numero-pergunta"> Nível ' + qtdNivel + '</h2>';
    divNivel.innerHTML +='<ul class="niveis"><li class="li"><input type="text" class="porcentagem" name="minima"  placeholder="% Mínima de Acerto do nível"><input type="text" class="porcentagem" name="maxima"  placeholder="% Máxima de Acerto do nível"></li><li class="proximo"><input type="text" class="titulo-nivel" name="titulo-nivel"  placeholder="Título do nível"></li><li class="proximo"><input type="text" class="imagem-nivel" name="link-img-nivel"  placeholder="Link da imagem do nível"></li><li class="proximo"><input type="text" class="descricao-nivel" name="descricao-nivel"  placeholder="Descrição do nível"></li></ul>';

    containerTotalNivel.appendChild(divNivel);
 
}

function pegarDadosDoQuizz() {
    var inputTitleQuizz  = document.getElementById("titulo-quizz");
    titleQuizz = inputTitleQuizz .value;
    titleQuizz = titleQuizz .substring(0,1).toUpperCase().concat(titleQuizz .substring(1));
    titleQuizz.trim();
    
    var arrayUl = document.querySelectorAll(".perguntas");
    //console.log(arrayUl); //cada bloco de ul criado;
    //console.log(arrayUl.length); //cada bloco de ul criado;
    
    // a cada rodada ele pega bloquinho de input, depois pega o valor do primeiro e coloca em resposta e o segundo em imagem;
    
    for (var j = 0; j <= arrayUl.length - 1; j++) {
        var li = arrayUl[j].getElementsByTagName("LI");
        console.log(li);
        for (var i = 0; i < li.length; i++) {
            console.log(li[i]);
            var opcao = {}
            if (i === 0) {
                opcao.pergunta = li[i].children[0].value;
            } if (i === 1) {
                opcao.resposta1 = li[i].children[0].value;
                opcao.imagem1 = li[i].children[1].value;
                opcao.classe1 = li[i].children[0].className; 
            } if (i === 2) {
                opcao.resposta2 = li[i].children[0].value;
                opcao.imagem2 = li[i].children[1].value;
                opcao.classe2 = li[i].children[0].className; 
            } if (i === 3) {
                opcao.resposta3 = li[i].children[0].value;
                opcao.imagem3 = li[i].children[1].value;
                opcao.classe3 = li[i].children[0].className; 
            } else if (i === 4) {
                opcao.resposta4 = li[i].children[0].value;
                opcao.imagem4 = li[i].children[1].value;
                opcao.classe4 = li[i].children[0].className; 
            }  
            quizz.perguntas.push(opcao);
            console.log(opcao);
            console.log(quizz);
        }

    }
    var ulNivel = document.querySelector(".niveis");
    var liNivel = ulNivel.getElementsByTagName('input');
        
    for (var i = 0; i < liNivel.length; i++) {
        
        
        if (i === 0) {
            nivel.minimo = liNivel[i].value;
        } if (i === 1) {
            nivel.maximo = liNivel[i].value;
        } if (i === 2) {
            nivel.titulo = liNivel[i].value;
        } if (i === 3) {
            nivel.imagem = liNivel[i].value;
        } else if (i === 4) {
            nivel.descricao = liNivel[i].value;
        }  
        quizz.niveis.push(nivel);  
    }

    enviarQuizzProServidor();
}


//console.log(quizz);


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
        "User-Token": tokenUsuario}  //"5e9dc431-ff0f-45d9-a66f-6181f422ba32" 
       }

    quizzDados = {
            "title": titleQuizz,
	        "data": quizz
        }
       

    var requisicao = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes',  quizzDados, config);
    requisicao.then(liberarTelaListaDeQuizzes);

}