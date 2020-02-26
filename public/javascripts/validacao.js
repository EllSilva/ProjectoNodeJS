
var validar = function () {

    var nome = $("#nome").val();
    var CPF = $("#cpf").val();
 
//1ª tipo de validaçao dos campos 
    if (nome === "") {
        alert("Porfavor Digita o seu Nome");
        $("#nome").focus();
        return false;
    }
    ;

    if (CPF === "") {
        alert("Porfavor Digita o CPF");
        $("#cpf").focus();
        return false;
    }
    ;
return true; 
}

var excluirDados = function (cpf) {
    if (confirm("Deseja realmente Excluir")){
        window.location.href = "/excluir?cpf="+cpf ;
    }
}