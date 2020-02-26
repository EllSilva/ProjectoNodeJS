var express = require('express');
var router = express.Router();
var Pessoa = require('../modelos/pessoa');
/* GET home page. */
router.get('/', function (request, response, next) {

    Pessoa.todos(function (pessoas) {
        response.render('index', {
            title: 'Node js com framework Express',
            pessoas: pessoas
        });
    })
});
/* ROTA DE CADASTRO DE ARQUIVO. */
router.post("/Cadastrar-Pessoa", function (request, response, next) {
    
     var pessoa = new Pessoa();
    pessoa.cpf = request.body.cpf;
    pessoa.nome = request.body.nome;
    pessoa.sobrenome = request.body.sobrenome;
    pessoa.telef = request.body.telef;
    pessoa.endereco = request.body.endereco;
    pessoa.salvar(function () {
        response.redirect("/");
    });
});
/* FIM DA ROTA DE CADASTRO DE ARQUIVO. */


/* ROTA DE PESQUISA DE ARQUIVO. */
router.get('/pesquisar', function (request, response, next) {
    Pessoa.buscarPorNome(request.query.nome, function(pessoas) {
        response.render('index', {
            title: 'Pesquisando em Arquivo',
            pessoas: pessoas
        });
    });
});

/*FIM DA ROTA DE PESQUISA DE ARQUIVO. */


/* ROTA DE ALTERAR  */
router.post("/Alterar-Pessoa", function (request, response, next) {

    var pessoa = new Pessoa();
    pessoa.cpf = request.body.cpf;
    pessoa.nome = request.body.nome;
    pessoa.sobrenome = request.body.sobrenome;
    pessoa.telef = request.body.telef;
    pessoa.endereco = request.body.endereco;
    pessoa.salvar(function () {
        response.redirect("/");
    }, request.query.cpfAlterar);
});
/*FIM DA ROTA DE aLTERAR  */

/* ADICIONAR NA ROTA DE ALTERACAO DE PESSOA. */
router.get("/alterar", function (request, response, next) {

    Pessoa.buscar(request.query.cpf, function (pessoa) {
        if (pessoa == null) {
            console.log("Pessoa nao encontrada");
            response.render('alterar', {'pessoa': {}});
        } else {
            response.render('alterar', {'pessoa': pessoa});
        }
    });
});
/* FIM DA ROTA DE ALTERACAO DE ARQUIVO. */


/* ROTA DE EXCLUIR PESSOA DE ARQUIVO. */
router.get("/excluir", function (request, response, next) {

    var pessoa = new Pessoa();
    pessoa.cpf = request.query.cpf;
    pessoa.excluir(function () {
      response.redirect("/");
  
    });
});

module.exports = router;