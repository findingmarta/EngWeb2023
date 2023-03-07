exports.genMainPage = function(lista , data) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>About people...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue">
                    <h1>Pessoas</h1>
                    <a href="http://localhost:7777/pessoas" class="w3-btn w3-round">Página Inicial</a>
                    <a href="http://localhost:7777/pessoas/sexo" class="w3-btn w3-round">Distribuição Por Sexo</a>
                    <a href="http://localhost:7777/pessoas/desportos" class="w3-btn w3-round">Distribuição Por Desporto</a>
                    <a href="http://localhost:7777/pessoas/profissoes" class="w3-btn w3-round">TOP 10 Profissões</a>

                    <a href="http://localhost:7777/pessoas" class="w3-btn w3-round">Asc</a>
                    <a href="http://localhost:7777/pessoasOrdenadas" class="w3-btn w3-round">Desc</a>

                </header>
                
                <div class="w3-container">
                <table class="w3-table-all">
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Sexo</th>
                        <th>Cidade</th>
                    </tr>
        `
                for(let i = 0; i < lista.length; i++){
                    pagHTML += `
                        <tr>
                            <td>${lista[i].id}</td>
                            <td>
                                <a href ="/pessoas/${lista[i].id}">${lista[i].nome}</a>
                            </td>   
                            <td>${lista[i].idade}</td>
                            <td>${lista[i].sexo}</td>
                            <td>${lista[i].morada.cidade}</td>
                        </tr>
                        `
                }
    
    pagHTML += `
                </table>
                </div>
            </div>
            <footer class="w3-container w3-blue">
                <h5>Generated in EngWeb2023 ${data}</h5>
            </footer>
        </body>
    </html>
    `
    return pagHTML
}


exports.genPersonPage = function(p, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>About people...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue">
                    <h1>${p.nome}</h1>
                    <a href="http://localhost:7777/pessoas" class="w3-btn w3-round">Página Inicial</a>
                    <a href="http://localhost:7777/pessoas/sexo" class="w3-btn w3-round">Distribuição Por Sexo</a>
                    <a href="http://localhost:7777/pessoas/desportos" class="w3-btn w3-round">Distribuição Por Desporto</a>
                    <a href="http://localhost:7777/pessoas/profissoes" class="w3-btn w3-round">TOP 10 Profissões</a>
                </header>
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <td>${p.id}</td>
                        </tr>
                        <tr>
                            <th>Idade</th>
                            <td>${p.idade}</td>
                        </tr>
                        <tr>
                            <th>Sexo</th>
                            <td>${p.sexo}</td>
                        </tr>
                        <tr>
                            <th>Morada</th>
                            <td>${p.morada.cidade}, ${p.morada.distrito}</td>
                        </tr>
                        <tr>
                            <th>BI / CC</th>`
                            if (p.BI){
                                pagHTML += `<td>${p.BI}</td>`
                            }
                            else if (p.CC){
                                pagHTML += `<td>${p.CC}</td>`
                            }


            pagHTML += `
                        </tr>
                        <tr>
                            <th>Profissão</th>
                            <td>${p.profissao}</td>
                        </tr>
                        <tr>
                            <th>Partido Politico</th>
                            <td>${p.partido_politico.party_abbr} - ${p.partido_politico.party_name}</td>
                        </tr>
                        <tr>
                            <th>Religião</th>
                            <td>${p.religiao}</td>
                        </tr>
                        <tr>
                            <th>Desportos</th>
                            <td>${p.desportos}</td>
                        </tr>
                        <tr>
                            <th>Animais</th>
                            <td>${p.animais}</td>
                        </tr>
                        <tr>
                            <th>Figuras Públicas</th>
                            <td>${p.figura_publica_pt}</td>
                        </tr>
                        <tr>
                            <th>Marca de Carro</th>
                            <td>${p.marca_carro}</td>
                        </tr>
                        <tr>
                            <th>Destinos Favoritos</th>
                            <td>${p.destinos_favoritos}</td>
                        </tr>`

                        for (let atrib in p.atributos){
                            pagHTML += `
                                <tr>  
                                    <th>${atrib}</td>
                                    <td>${p.atributos[atrib]}</td>
                                </tr>
                            `
                        }

            pagHTML += `
                                                      
                    </table>
                </div>  
            </div>
            <footer class="w3-container w3-blue">
                <h5>Generated in EngWeb2023 ${d}</h5>
            </footer>
        </body>
    </html>      
    `
    return pagHTML
}



exports.genSexDistrib = function(pessoas , data) {
    var dict_sexos = {}
    for(let i = 0; i < pessoas.length; i++){
        if (pessoas[i].sexo in dict_sexos){
            dict_sexos[pessoas[i].sexo] += 1
        }
        else {
            dict_sexos[pessoas[i].sexo] = 1
        }
    }

    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>About people...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue">
                    <h1>Distribuição por Sexo</h1>
                    <a href="http://localhost:7777/pessoas" class="w3-btn w3-round">Página Inicial</a>
                    <a href="http://localhost:7777/pessoas/sexo" class="w3-btn w3-round">Distribuição Por Sexo</a>
                    <a href="http://localhost:7777/pessoas/desportos" class="w3-btn w3-round">Distribuição Por Desporto</a>
                    <a href="http://localhost:7777/pessoas/profissoes" class="w3-btn w3-round">TOP 10 Profissões</a>
                </header>
                
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Sexo</th>
                            <th>Frequência</th>
                        </tr>
                        `

                for (let sexo in dict_sexos){
                    pagHTML += `
                        <tr>
                            <td>
                                ${sexo}
                            </td>
                            <td>
                                <a href ="/pessoas/sexo/${sexo}">${dict_sexos[sexo]}</a>
                            </td>
                        </tr>
                    `
                }
    
    pagHTML += `
                        </tr>
                    </table>
                </div>
            <footer class="w3-container w3-blue">
                <h5>Generated in EngWeb2023 ${data}</h5>
            </footer>
        </body>
    </html>
    `
    return pagHTML
}

exports.genSexDistribList = function(pessoas , data, sexo) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>About people...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue">
                    <h1>Pessoas do sexo ${sexo}</h1>
                    <a href="http://localhost:7777/pessoas" class="w3-btn w3-round">Página Inicial</a>
                    <a href="http://localhost:7777/pessoas/sexo" class="w3-btn w3-round">Distribuição Por Sexo</a>
                    <a href="http://localhost:7777/pessoas/desportos" class="w3-btn w3-round">Distribuição Por Desporto</a>
                    <a href="http://localhost:7777/pessoas/profissoes" class="w3-btn w3-round">TOP 10 Profissões</a>
                </header>
                
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Sexo</th>
                        </tr>   
                `
                
                for(let i = 0; i < pessoas.length; i++){
                    if(pessoas[i].sexo == sexo){
                        pagHTML += `
                            <tr>
                                <td>${pessoas[i].id}</td>
                                <td>
                                    <a href ="/pessoas/${pessoas[i].id}">${pessoas[i].nome}</a>
                                </td>   
                                <td>${pessoas[i].idade}</td>
                                <td>${pessoas[i].sexo}</td>
                            </tr>
                            `
                    }
                }
    
    pagHTML += `
                    </table>
                </div>
            </div>
            <footer class="w3-container w3-blue">
                <h5>Generated in EngWeb2023 ${data}</h5>
            </footer>
        </body>
    </html>
    `
    return pagHTML
}



exports.genDespDistrib = function(pessoas , data) {
    var dict_desportos = {}
    for(let i = 0; i < pessoas.length; i++){
        for (desporto of pessoas[i].desportos){
            if (desporto in dict_desportos){
                dict_desportos[desporto] += 1
            }
            else {
                dict_desportos[desporto] = 1
            }
        }
    }

    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>About people...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue">
                    <h1>Distribuição por Desporto</h1>
                    <a href="http://localhost:7777/pessoas" class="w3-btn w3-round">Página Inicial</a>
                    <a href="http://localhost:7777/pessoas/sexo" class="w3-btn w3-round">Distribuição Por Sexo</a>
                    <a href="http://localhost:7777/pessoas/desportos" class="w3-btn w3-round">Distribuição Por Desporto</a>
                    <a href="http://localhost:7777/pessoas/profissoes" class="w3-btn w3-round">TOP 10 Profissões</a>
                </header>
                
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Desporto</th>
                            <th>Frequência</th>
                        </tr>
                        `

                for (let desporto in dict_desportos){
                    pagHTML += `
                        <tr>
                            <td>
                                ${desporto}
                            </td>
                            <td>
                                <a href ="/pessoas/desportos/${desporto}">${dict_desportos[desporto]}</a>
                            </td>
                        </tr>
                    `
                }
    
    pagHTML += `
                    </table>
                </div>
            <footer class="w3-container w3-blue">
                <h5>Generated in EngWeb2023 ${data}</h5>
            </footer>
        </body>
    </html>
    `
    return pagHTML
}

exports.genDespDistribList = function(pessoas , data, desporto) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>About people...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue">
                    <h1>Pessoas que praticam ${desporto}</h1>
                    <a href="http://localhost:7777/pessoas" class="w3-btn w3-round">Página Inicial</a>
                    <a href="http://localhost:7777/pessoas/sexo" class="w3-btn w3-round">Distribuição Por Sexo</a>
                    <a href="http://localhost:7777/pessoas/desportos" class="w3-btn w3-round">Distribuição Por Desporto</a>
                    <a href="http://localhost:7777/pessoas/profissoes" class="w3-btn w3-round">TOP 10 Profissões</a>
                </header>
                
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Desportos</th>
                        </tr>   
                `
                
                for(let i = 0; i < pessoas.length; i++){
                    for(desp of pessoas[i].desportos)
                        if(desp == desporto){
                            pagHTML += `
                                <tr>
                                    <td>${pessoas[i].id}</td>
                                    <td>
                                        <a href ="/pessoas/${pessoas[i].id}">${pessoas[i].nome}</a>
                                    </td>   
                                    <td>${pessoas[i].idade}</td>
                                    <td>${pessoas[i].desportos}</td>
                                </tr>
                                `
                        }
                }

    
    pagHTML += `
                    </table>
                </div>
            <footer class="w3-container w3-blue">
                <h5>Generated in EngWeb2023 ${data}</h5>
            </footer>
        </body>
    </html>
    `
    return pagHTML
}



exports.genTopProfissoes = function(pessoas , data) {
    var dict_profissoes = {}
    for(let i = 0; i < pessoas.length; i++){
        if (pessoas[i].profissao in dict_profissoes){
            dict_profissoes[pessoas[i].profissao] += 1
        }
        else {
            dict_profissoes[pessoas[i].profissao] = 1
        }
    }

    // Cria um array de items
    var items = Object.keys(dict_profissoes).map(function(key) {
        return [key, dict_profissoes[key]];
    });
    
    // Ordena o array a partir do segundo elemento
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>About people...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue">
                    <h1>TOP 10 Profissões</h1>
                    <a href="http://localhost:7777/pessoas" class="w3-btn w3-round">Página Inicial</a>
                    <a href="http://localhost:7777/pessoas/sexo" class="w3-btn w3-round">Distribuição Por Sexo</a>
                    <a href="http://localhost:7777/pessoas/desportos" class="w3-btn w3-round">Distribuição Por Desporto</a>
                    <a href="http://localhost:7777/pessoas/profissoes" class="w3-btn w3-round">TOP 10 Profissões</a>
                </header>
                
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Profissão</th>
                            <th>Frequência</th>
                        </tr>
                        `

                for (profissao of items.slice(0, 10)){
                    pagHTML += `
                        <tr>
                            <td>
                                ${profissao[0]}
                            </td>
                            <td>
                                <a href ="/pessoas/profissoes/${profissao[0]}">${profissao[1]}</a>
                            </td>
                        </tr>
                    `
                }
    
    pagHTML += `
                    </table>
                </div>
            <footer class="w3-container w3-blue">
                <h5>Generated in EngWeb2023 ${data}</h5>
            </footer>
        </body>
    </html>
    `
    return pagHTML
}

exports.genTopProfissoesList = function(pessoas , data, profissao) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>About people...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue">
                    <h1>Pessoas que exercem a profissão de ${profissao}</h1>
                    <a href="http://localhost:7777/pessoas" class="w3-btn w3-round">Página Inicial</a>
                    <a href="http://localhost:7777/pessoas/sexo" class="w3-btn w3-round">Distribuição Por Sexo</a>
                    <a href="http://localhost:7777/pessoas/desportos" class="w3-btn w3-round">Distribuição Por Desporto</a>
                    <a href="http://localhost:7777/pessoas/profissoes" class="w3-btn w3-round">TOP 10 Profissões</a>
                </header>
                
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Profissão</th>
                        </tr>   
                `
                
                for(let i = 0; i < pessoas.length; i++){
                    if(pessoas[i].profissao == profissao){
                        pagHTML += `
                            <tr>
                                <td>${pessoas[i].id}</td>
                                <td>
                                    <a href ="/pessoas/${pessoas[i].id}">${pessoas[i].nome}</a>
                                </td>   
                                <td>${pessoas[i].idade}</td>
                                <td>${pessoas[i].profissao}</td>
                            </tr>
                            `
                    }
                }

    pagHTML += `
                    </table>
                </div>
            <footer class="w3-container w3-blue">
                <h5>Generated in EngWeb2023 ${data}</h5>
            </footer>
        </body>
    </html>
    `
    return pagHTML
}