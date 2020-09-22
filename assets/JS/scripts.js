var idEmail;
var idSenha;
var tokenUsuario;
var tokenDados;


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
    var telaCriarQuizz = document.querySelector("");
    telaLogin.style.display="none";
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