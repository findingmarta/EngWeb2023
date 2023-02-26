import json

def ordCidade(c):
    return c['nome']

f = open("TPC2/mapa.json", encoding='utf-8')
mapa = json.load(f)

#
cidades = mapa['cidades']
cidades.sort(key=ordCidade)
distritos = {}
ligacoes = mapa['ligações']
codigos = {}

#
for c in cidades:
    if c['distrito'] not in distritos.keys():
        distritos[c['distrito']] = []
    distritos[c['distrito']].append((c['id'], c['nome']))

    codigos[c['id']] = c['nome']

#
distritos_lista = list(distritos.keys())
distritos_lista.sort()

pagIndex = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <center>
            <h1>Mapa Virtual</h1>
        </center>
        <table>
            <tr>
                <td valign="top">
"""

for d in distritos_lista:
    pagIndex += f"""
                    <dl>
                        <dt><h3>{d}</h3></dt>
                    </dl>
                    <dd>
                        <ul>
    """
    for cod, cid in distritos[d]:
        pagIndex += f"""
                            <li>
                                <a href="/{cod}">{cid}</a>
                            </li>
        """
    
    pagIndex += """
                        </ul>
                    </dd>
                </td>
    """

pagIndex += """
            </tr>
        </table>
    </body>
</html>
"""

#
with open("TPC2/index.html", "w", encoding="utf-8") as f:
    f.write(pagIndex)



for c in cidades:
    pagCities = f"""
    <!DOCTYPE html>
    <html>
        <head>
            <title>Mapa Virtual</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <center>
                <h1>Mapa Virtual</h1>
            </center>
            <table>
                <tr>
                    <td>
                        <dl>
                            <dt><h2>{c['nome']}</h2></dt>
                        </dl>
                        <p>
                            <b>População: </b>
                            {c['população']}
                        </p>
                        <p>
                            <b>Descrição: </b>
                            {c['descrição']}
                        </p>
                        <p>
                            <b>Distrito:  </b>
                            {c['distrito']}
                        </p>
                        <p>
                            <b>Ligações:  </b>
                        </p>

                        <dd>
                            <ul>
    """
    for l in ligacoes:
        if c['id'] == l['origem']:
            pagCities += f"""
                                <li>
                                    <a href="/{l['destino']}">{codigos[l['destino']]}</a>
                                </li>
                                <p>
                                    <b>Distância:  </b>
                                    {l['distância']} Km
                                </p>
            """
    
    pagCities += """
                            </ul>    
                        </dd>
                    </td>
                </tr>
            </table>
            <p>
                <a href="/">Voltar ao índice</a>
            </p>
        </body>
    </html>
    """

    with open(f"TPC2/{c['id']}.html", "w", encoding="utf-8") as f:
        f.write(pagCities)