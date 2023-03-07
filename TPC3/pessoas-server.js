var http = require('http')
var axios = require('axios')
var mypages = require('./mypages')
var fs = require('fs')

http.createServer(function (req, res) {    
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + " " + req.url + " " + d)
    
    if ((req.url == '/') || (req.url == '/pessoas')){
        axios.get('http://localhost:3000/pessoas?_sort=nome&_order=asc')
            .then(function(resp) { 
                var pesssoas = resp.data 
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(mypages.genMainPage(pesssoas, d))
                res.end()
            }) 
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url == '/pessoasOrdenadas'){
        axios.get('http://localhost:3000/pessoas?_sort=nome&_order=desc')
            .then(function(resp) {
                var pesssoas = resp.data 
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(mypages.genMainPage(pesssoas, d))
                res.end()
            }) 
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url.match(/\/pessoas\/p\d+/)){
        //console.log('Pedindo ' + req.url.substring(9)) debug
        axios.get('http://localhost:3000/pessoas/' + req.url.substring(9))
            .then(function(resp) {
                var pesssoa = resp.data 
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(mypages.genPersonPage(pesssoa, d))
                res.end()
            }) 
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
        
            })
    }
    else if(req.url.match(/w3\.css$/)){
        fs.readFile("w3.css", function(erro, dados){
            if(erro){
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na leitura de ficheiro: ' + erro + '</p>')
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/css'})
                res.end(dados)
            }
        })
    }
    // elif para servir os GET pessoas/w3.css
    else if(req.url.match(/w3\.\/p\d+/)){
        axios.get('http://localhost:3000/pessoas/' + req.url.substring(9)) 
            .then(function(resp) {
                var pesssoa = resp.data 
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(mypages.genPersonPage(pesssoa, d))
                res.end()
            }) 
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
        
            })
    }
    // elif para servir a distribuição por sexo
    else if(req.url == '/pessoas/sexo'){
        axios.get('http://localhost:3000/pessoas') 
            .then(function(resp) {
                var pesssoas = resp.data 
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(mypages.genSexDistrib(pesssoas, d))
                res.end()
            }) 
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
        
            })
    }
    // elif para servir a lista de pessoas por sexo
    else if(req.url.match(/\/pessoas\/sexo\/\w+/)){
        axios.get('http://localhost:3000/pessoas?sexo=' + req.url.substring(14)) 
            .then(function(resp) {
                var pesssoas = resp.data 
                var sexo = req.url.substring(14)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(mypages.genSexDistribList(pesssoas, d, sexo))
                res.end()
            }) 
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
        
            })
    }
    // elif para servir a distribuição por desportos
    else if(req.url == '/pessoas/desportos'){
        axios.get('http://localhost:3000/pessoas') 
            .then(function(resp) {
                var pesssoas = resp.data 
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(mypages.genDespDistrib(pesssoas, d))
                res.end()
            }) 
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
        
            })
    }
    // elif para servir a lista de pessoaos que praticam um desportos
    else if(req.url.match(/\/pessoas\/desportos\/\w+/)){
        axios.get('http://localhost:3000/pessoas') 
            .then(function(resp) {
                var pesssoas = resp.data 
                var desporto = decodeURI(req.url.substring(19))
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(mypages.genDespDistribList(pesssoas, d, desporto))
                res.end()
            }) 
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
        
            })
    }
    // elif para servir a distribuição por desportos
    else if(req.url == '/pessoas/profissoes'){
        axios.get('http://localhost:3000/pessoas') 
            .then(function(resp) {
                var pesssoas = resp.data 
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(mypages.genTopProfissoes(pesssoas, d))
                res.end()
            }) 
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
        
            })
    }
    // elif para servir a lista de pessoaos que praticam um desportos
    else if(req.url.match(/\/pessoas\/profissoes\/\w+/)){
        axios.get('http://localhost:3000/pessoas') 
            .then(function(resp) {
                var pesssoas = resp.data 
                var profissao = decodeURI(req.url.substring(20))
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(mypages.genTopProfissoesList(pesssoas, d, profissao))
                res.end()
            }) 
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
        
            })
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end('<p>Operação não suportada: ' + req.url + '</p>')
    }
}).listen(7777)

console.log("Servidor à escuta na porta 7777")