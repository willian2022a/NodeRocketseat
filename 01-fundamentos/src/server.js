import http from 'node:http'
/* quando estamos trabalhando com o type "module" é preciso colocar o tipo do arquivo 
no final da importação, como abaixo que tem o json.js */
import { json } from './middlewares/json.js'; 

import { routes } from './routes.js';

/*Stateful -> aplicação se salvar informações na memória e a partir do 
momento em que essa aplicação é parada, essa informação é perdida.
*/

/*Stateless -> aplicação se salvar informações na em recursos externos à aplicação.
Salvando em banco de dados, arquivos de texto... O que faz com que mesmo se a aplicação for 
parada, ao reiniciar irá se manter igual.
*/

// Cabeçalhos (Requisição/resposta) => Metadados

const server = http.createServer(async (req,res) => {
    const { method, url } = req;

    await json(req, res)

    const route = routes.find(route => {
        return route.method == method && route.path.test(url);
    });

    console.log(route)
    if(route){
        const routeParams = req.url.match(route.path)
        console.log(routeParams)
        req.params = { ...routeParams.groups }
        return route.handler(req,res)
    }

    return res.writeHead(404).end()
})

server.listen(3333)