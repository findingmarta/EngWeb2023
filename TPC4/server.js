var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation
http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /users --------------------------------------------------------------------
                if((req.url == "/") || (req.url == "/tasks")){
                    axios.get("http://localhost:3000/tasks")
                        .then(response => {
                            var tasks = response.data
                            // Render page with the student's list
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.tasksListPage(tasks, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect the list of tasks... Erro: " + erro)
                            res.end()
                        })
                }
                // GET /tasks/done/:id --------------------------------------------------------------------
                else if(/\/tasks\/done\/[0-9]+$/i.test(req.url)){
                    var idTask = req.url.split("/")[3]    
                    axios.get('http://localhost:3000/tasks/' + idTask)                               // Vai buscar a tarefa e coloca um valor done=1
                        .then(resp => {
                            var task = resp.data
                            task.done = true
                            axios.put("http://localhost:3000/tasks/" + idTask, task)                 // Atualiza a tarefa com o novo valor done=1
                                .then(resp => {
                                    axios.get("http://localhost:3000/tasks")                         // Vai buscar todas as tarefas
                                        .then(resp => {
                                            var tasks = resp.data
                                            res.writeHead(301, { 'Location': '/'})
                                            res.end(templates.tasksListPage(tasks, d))    
                                        })
                                        .catch(error => {
                                            console.log('Erro: ' + error);
                                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.end(templates.errorPage("Unable to collect record: " + idTask, d))
                                        })
                                })
                                .catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end(templates.errorPage("Unable to collect record: " + idTask, d)) 
                                })
                        }).catch(error => {
                            console.log('Erro: ' + error);
                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.errorPage("Unable to collect record: " + idTask, d))
                        });
                }

                // GET /tasks/edit/:id --------------------------------------------------------------------
                else if(/\/tasks\/edit\/[0-9]+$/i.test(req.url)){
                    var idTask = req.url.split("/")[3]    
                    axios.get('http://localhost:3000/tasks/' + idTask)
                        .then(resp => {
                            var task = resp.data
                            axios.get("http://localhost:3000/tasks")
                                .then(resp => {
                                    var tasks = resp.data
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})                                
                                    res.end(templates.tasksListPage(tasks, d, task))    
                                })
                                .catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end(templates.errorPage("Unable to collect records to edit: " + idTask, d))
                                })
                        }).catch(error => {
                            console.log('Erro: ' + error);
                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.errorPage("Unable to collect record to edit: " + idTask, d))
                        });
                }
                else{
                    res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            

            case "POST":
                if(req.url == '/'){
                    collectRequestBodyData(req, function(result) {
                        if (result){
                            axios.post('http://localhost:3000/tasks', result)
                                .then(resp => {
                                    var task = resp.data
                                    console.log(task);
                                    axios.get('http://localhost:3000/tasks')
                                        .then(resp => {
                                            var tasks = resp.data
                                            res.writeHead(301, { 'Location': '/'})
                                            //res.end('<p>Registo inserido: ' + JSON.stringify(resp.data) + '</p>')        
                                            res.end(templates.tasksListPage(tasks, d))
                                        })
                                        .catch(error => {
                                            console.log('Erro: ' + error);
                                            res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write("<p>Unable to collect records...<p>")
                                            res.end()                                        
                                        })       
                                })
                                .catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Unable to insert record...<p>")
                                    res.end()
                                });
                        }
                        else {
                            res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...<p>")
                            res.end()
                        }
                    })
                }
                else if(/\/tasks\/edit\/[0-9]+$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/tasks/' + result.id, result)
                                .then(resp => {
                                    axios.get('http://localhost:3000/tasks')
                                        .then(resp => {
                                            var tasks = resp.data
                                            console.log(resp.data);
                                            res.writeHead(301, { 'Location': '/'})
                                            //res.end('<p>Regist alterado: ' + JSON.stringify(resp.data) + '</p>')  
                                            res.end(templates.tasksListPage(tasks,d))  
                                        })
                                        .catch(error => {
                                            console.log('Erro: ' + error);
                                            res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.end(templates.errorPage("Unable to update record...", d))                               
                                        })                                 
                                }).catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end(templates.errorPage("Unable to update record...", d))
                                });
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
}).listen(7777)
console.log("Servidor à escuta na porta 7777...")
