
var App = require('../config/app');

var pessoa = function () {
    this.nome = "";
    this.sobrenome = "";
    this.cpf = "";
    this.telef = "";
    this.endereco = "";

    this.salvar = function (callback, cpfAlteracao) {
        
   var query = "";     
   if (cpfAlteracao == undefined) {
       query = "insert into pessoa (cpf, nome, sobrenome, telef, endereco) values \n\
( '"+ this.cpf +"','"+ this.nome +"','" +this.sobrenome +"','"+ this.telef +"','"+ this.endereco +"')";
        
   }else{
         query = "update pessoa set cpf='"+ this.cpf +"', nome= '"+ this.nome +"', sobrenome= '" +this.sobrenome +"', telef= '"+ this.telef +"', endereco= '"+ this.endereco +"'\n\
where cpf='"+cpfAlteracao +"'";
     
   }
          console.log(query);
        App.db.cnn.exec(query, function (DadosRetornadoDaTabela, erro) {
            if (erro) {
                console.log("erro ao executar a query (" + query + ")");
                callback.call();
            } else {
                callback.call();
            }
        });
    };

    this.excluir = function (callback) {

        var query = "delete from pessoa where cpf='"+this.cpf +"'";
     
          console.log(query);
        App.db.cnn.exec(query, function (DadosRetornadoDaTabela, erro) {
            if (erro) {
                console.log("erro ao executar a query (" + query + ")");
                callback.call();
            } else {
                callback.call();
            }
        });
    };
}

pessoa.buscar = function (cpf, callback) {
    
 var query = "select * from pessoa where cpf= '" + cpf + "'";
    App.db.cnn.exec(query, function (DadosRetornadoDaTabela, erro) {
        if (erro) {
            console.log("erro ao executar a query (" + query + ")");
            callback.call(null, null);
        } else {
            if(DadosRetornadoDaTabela.length>0){
            callback.call(null, DadosRetornadoDaTabela[0]);
        }else{
           callback.call(null, null); 
        }
        }
    });
};

pessoa.buscarPorNome = function (nome, callback) {

    var query = "select * from pessoa where nome like '%" + nome + "%'";
    App.db.cnn.exec(query, function (DadosRetornadoDaTabela, erro) {
        if (erro) {
            console.log("erro ao executar a query (" + query + ")");
            callback.call(null, []);
        } else {
            callback.call(null, DadosRetornadoDaTabela);
        }
    });
};

pessoa.salvarTodos = function (pessoas) {
    var fs = require('fs');

    fs.writeFile(App.Banco_Arquivo, JSON.stringify(pessoas), function (err) {
        if (err) {
            console.log(err);
        }
    });
};

pessoa.todos = function (callback) {

    var query = "select * from pessoa ";
    App.db.cnn.exec(query, function (DadosRetornadoDaTabela, erro) {
        if (erro) {
            console.log("erro ao executar a query (" + query + ")");
            callback.call(null, []);
        } else {
            callback.call(null, DadosRetornadoDaTabela);
        }
    });
}

module.exports = pessoa;