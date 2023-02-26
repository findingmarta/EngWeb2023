var http = require('http')
var url = require('url')
var fs = require('fs')

http.createServer(function (req, res) {
    console.log(req.method + " " + req.url)
    
    var pedido = url.parse(req.url, true).pathname

    fs.readFile('pag' + pedido.substring(1) + '.html', function(err, data){ 
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}) // tem que estar aqui com o res.end() dentro porque senão ele fecha logo o pacote com o res.end devido à parelizacao
        if(err){
            res.write("Erro: na leitura do ficheiro :: "  + err)
        }
        else {
            res.write(data)
        }
        res.end()
    })

}).listen(7777)

console.log("Servidor à escuta na porta 7777")

