import http from 'node:http'
/* quando estamos trabalhando com o type "module" é preciso colocar o tipo do arquivo 
no final da importação, como abaixo que tem o json.js */
import { json } from './middlewares/json.js'; 

import { Database } from './database.js';

import { randomUUID } from 'node:crypto'

/*Stateful -> aplicação se salvar informações na memória e a partir do 
momento em que essa aplicação é parada, essa informação é perdida.
*/

/*Stateless -> aplicação se salvar informações na em recursos externos à aplicação.
Salvando em banco de dados, arquivos de texto... O que faz com que mesmo se a aplicação for 
parada, ao reiniciar irá se manter igual.
*/

// Cabeçalhos (Requisição/resposta) => Metadados

const users = [];

const database = new Database();

const server = http.createServer(async (req,res) => {
    const { method, url } = req;

    await json(req, res)

    if(method == 'GET' && url == '/users'){
        const users = database.select('users')
        return res.end(JSON.stringify(users));
    }
    if(method == 'POST' && url == '/users'){
        console.log('>> ', req.body)
        const { name, email } = req.body;
        const users = {
            id: randomUUID(),
            name,
            email
        };

        console.log('>> users ',users)

        database.insert('users',users)
        return res.writeHead(201).end(JSON.stringify(users))
    }
    return res.writeHead(404).end()
})

server.listen(3333)