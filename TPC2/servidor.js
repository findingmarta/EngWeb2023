var http = require('http')
var url = require('url')
var fs = require('fs')

http.createServer(function (req, res){
    console.log(req.method + " " + req.url)
    
    var pedido = url.parse(req.url, true).pathname
    
    if (pedido == '/'){
        fs.readFile('TPC2/index.html', function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            if(err){
                res.write(err)
            }
            else {
                res.write(data)
            }
            res.end()
        })   
    }
    else {
        fs.readFile('TPC2/' + pedido.substring(1) + '.html', function(err, data){ 
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            if(err){
                res.write("Erro na leitura:" + err)  
            }
            else {
                res.write(data)
            }
            res.end()
        })
    }
}).listen(7777)

console.log("Servidor à escuta na porta 7777")
