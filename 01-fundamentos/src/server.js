import http from 'node:http'
/* quando estamos trabalhando com o type "module" é preciso colocar o tipo do arquivo 
no final da importação, como abaixo que tem o json.js */
import { json } from './middlewares/json.js'; 

/*Stateful -> aplicação se salvar informações na memória e a partir do 
momento em que essa aplicação é parada, essa informação é perdida.
*/

/*Stateless -> aplicação se salvar informações na em recursos externos à aplicação.
Salvando em banco de dados, arquivos de texto... O que faz com que mesmo se a aplicação for 
parada, ao reiniciar irá se manter igual.
*/

// Cabeçalhos (Requisição/resposta) => Metadados

const users = []

const server = http.createServer(async (req,res) => {
    const { method, url } = req;

    await json(req, res)

    if(method == 'GET' && url == '/users'){
        return res.end(JSON.stringify(users));
    }
    if(method == 'POST' && url == '/users'){
        const { name, email } = req.body;
        users.push({
            id: 1,
            name,
            email
        });
        return res.writeHead(201).end(JSON.stringify(users))
    }
    return res.writeHead(404).end()
})

server.listen(3333)