

mysql = require('mysql');
connectionString = 'mysql://root:@localhost/javaScript';
db = {}
db.cnn = {};
db.cnn.exec = function (query, callback) {
    var connection = mysql.createConnection(connectionString);
    connection.query(query, function (err, rows) {
        if (err)
            throw err;
        callback(rows, err);
        connection.end();
    });
};

var App = {
    Banco_Arquivo: "BancoArquivo.js",
        db: db
}
module.exports = App;
