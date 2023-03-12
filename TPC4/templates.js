exports.tasksListPage = function(tasks, d, task){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Gestor de Tarefas</title>

            <style>
                * {
                    box-sizing: border-box;
                }
                
                .row {
                    display: flex;
                    margin-left:-5px;
                    margin-right:-5px;
                }
                
                .column {
                    flex: 50%;
                    padding: 5px;
                }
                
                table {
                    border-collapse: collapse;
                    border-spacing: 0;
                    width: 100%;
                    border: 1px solid #ddd;
                }
                
                th, td {
                    text-align: left;
                    padding: 16px;
                }
                
                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
            </style>

        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-cyan w3-text-white">
                    <h1>Task List</h1>
                </header>

                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Form</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id"/>
                        <label>Due Date</label>
                        <input class="w3-input w3-round" type="date" name="due_date"/>
                        <label>Who</label>
                        <input class="w3-input w3-round" type="text" name="who"/>
                        <label>What</label>
                        <input class="w3-input w3-round" type="text" name="what"/>
                    </fieldset>
                    <br/>
                    <button class="w3-btn w3-cyan w3-text-white w3-mb-2 w3-round-large" type="submit">Submit</button>
                </form>
                <br/>
            `

        if (task){
            pagHTML += `
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Edit</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id" readonly value="${task.id}"/>
                        <label>Task</label>
                        <input class="w3-input w3-round" type="text" name="what" value="${task.what}"/>
                        <label>Due Date</label>
                        <input class="w3-input w3-round" type="date" name="due_date" value="${task.due_date}"/>
                        <label>Who</label>
                        <input class="w3-input w3-round" type="text" name="who" value="${task.who}"/>
                    </fieldset>
                    <br/>
                    <button class="w3-btn w3-cyan w3-text-white w3-mb-2 w3-round-large" type="submit">Submit</button>
                </form>
                <br/>
                `
        }
        
    pagHTML += `
                <div name"to-do" class="row">
                    <div class="column">
                        <table class="w3-table-all">
                            <tr>
                                <th>Task</th>
                                <th>Due Date</th>
                                <th>Who</th>
                            </tr>
                `
            for(let i = 0; i < tasks.length ; i++){
                if (!(tasks[i].done)){
                pagHTML += `
                            <tr>
                                <td>${tasks[i].what}</td>
                                <td>${tasks[i].due_date}</td>
                                <td>${tasks[i].who}</td>
                                <td>
                                    <a href="/tasks/edit/${tasks[i].id}" style="text-decoration: none">
                                        <button class="w3-btn w3-cyan w3-text-white w3-mb-2 w3-round-large" type="submit">Edit</button>
                                    </a>
                                    <a href="/tasks/done/${tasks[i].id}" style="text-decoration: none">
                                        <button class="w3-btn w3-cyan w3-text-white w3-mb-2 w3-round-large" type="submit">Done</button>
                                    </a>
                                </td>
                            </tr>
                `
                }
            }

    pagHTML += `
                        </table>
                    </div>
                
                    <div name"done" class="column">
                        <table class="w3-table-all">
                            <tr>
                                <th>Task</th>
                                <th>Due Date</th>
                                <th>Who</th>
                            </tr>
            `
            for(let i = 0; i < tasks.length ; i++){
                if (tasks[i].done){
                pagHTML += `
                            <tr>
                                <td>${tasks[i].what}</td>
                                <td>${tasks[i].due_date}</td>
                                <td>${tasks[i].who}</td>
                            </tr>
                `
                }
            }
        

    pagHTML += `
                        </table>
                    </div>
                </div>
                <br/>
                <footer class="w3-container w3-cyan w3-text-white">
                    <h5>Generated by EngWeb2023 in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.submissionPage = function(submissionMessage, d) {
     return `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Gestor de Tarefas</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-cyan w3-text-white">
                    <h1>Task List</h1>
                </header>
                <h5> ${submissionMessage}</h5>
                <footer class="w3-container w3-cyan w3-text-white">
                    <h5>Generated by EngWeb2023 in ${d} [<a href="/">Return</a>]</h5>
                </footer>
            </div>
        </body>
    </html>
    `
}

exports.errorPage = function(errorMessage, d) {
    return `
    <h5> ${d}: Error: ${errorMessage}</h5>
    <address>Generated by EngWeb2023 in ${d} - [<a href="/">Return</a>]</address>
    `
}