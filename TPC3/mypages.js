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
                    <h1>Lista de Pessoas</h1>
                </header>
                
                <div class="w3-container">
                <table class="w3-table-all">
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Sexo</th>
                        <th>Idade</th>
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
                            <td>${lista[i].cidade}</td>
                        </tr>
                        `
                pagHTML += `
                            </div>
                        </div>
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


exports.genPersonPage = function(p, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>Peron's Page</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue">
                    <h1>${p.nome}</h1>
                </header>
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Idade</th>
                            <th>Sexo</th>
                            <th>Morada</th>
                            <th>BI / CC</th>
                            <th>Pofissão</th>
                            <th>Partido Politico</th>
                            <th>Religião</th>
                            <th>Desportos</th>
                            <th>Animais</th>
                            <th>Figuras Públicas</th>
                            <th>Marca de Carro</th>
                            <th>Destinos Favoritos</th>
                        </tr>
                        <tr>
                            <td>${p.idade}</td>
                            <td>${p.sexo}</td>
                            <td>${p.morada.cidade}, ${p.morada.distrito}</td>`

                            if (p.BI){
                                pagHTML += `<td>${p.BI}</td>`
                            }
                            else if (p.CC){
                                pagHTML += `<td>${p.CC}</td>`
                            }
            pagHTML += `
                            <td>${p.profissao}</td>
                            <td>${p.partido_politico.party_abbr} - ${p.partido_politico.party_name}</td>
                            <td>${p.religiao}</td>
                            <td>${p.desportos}</td>
                            <td>${p.animais}</td>
                            <td>${p.figura_publica_pt}</td>
                            <td>${p.marca_carro}</td>
                            <td>${p.destinos_favoritos}</td>
                        </tr>
                    </table>

                    <table class="w3-table-all">
                        <tr>
                            <th>Atributos</th>
                            <th>Valor</th>
                        </tr>
                    `
                    for (let atrib in p.atributos){
                        pagHTML += `
                            <tr>  
                                <td>${atrib}</td>
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
                </header>
                
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                        `
                
                    for (let sexo in dict_sexos){
                        pagHTML += `
                            <th>${sexo}</th>
                        `
                    }

        pagHTML += `
                        </tr>
                        <tr>  

                        `
                for (let sexo in dict_sexos){
                    pagHTML += `
                            <td><a href ="/pessoas/${sexo}">${dict_sexos[sexo]}</a></td>
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
                    <h1>Distribuição por Sexo</h1>
                </header>
                
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Sexo</th>
                            <th>Idade</th>
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
                                <td>${pessoas[i].cidade}</td>
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