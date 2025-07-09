import http from 'node:http'

/*Stateful -> aplicação se salvar informações na memória e a partir do 
momento em que essa aplicação é parada, essa informação é perdida.
*/

/*Stateless -> aplicação se salvar informações na em recursos externos à aplicação.
Salvando em banco de dados, arquivos de texto... O que faz com que mesmo se a aplicação for 
parada, ao reiniciar irá se manter igual.
*/

// Cabeçalhos (Requisição/resposta) => Metadados

const users = []

const server = http.createServer((req,res) => {
    const { method, url } = req;

    if(method == 'GET' && url == '/users'){
        return res
        .setHeaders('Content-type','application/json')
        .end(JSON.stringify(users));
    }
    if(method == 'POST' && url == '/users'){
        users.push({
            id: 1,
            name: 'John Doe',
            email:'johndoe@example.com'
        });
        return res.writeHead(201).end(JSON.stringify(users))
    }
    return res.writeHead(404).end()
})

server.listen(3333)