import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
	_transform(chunk, encoding, callback) {
		const transformed = Number(chunk.toString()) * -1;

		console.log(transformed)
		/* primeiro parametro de um callback é o erro. Assim apenas para efeito de aprendizagem está sendo passado
		null, indicando que não nenhum erro */
		callback(null, Buffer.from(String(transformed)))
	}
}

// req => ReadableStream
// res => WritableStream

/* Buffer é uma representação de um espaço na memória do computador usado
para transitar dados de uma maneira muito rápida, para ser muito performático. 
O Buffer guarda os dados de memória de forma binária */

const server = http.createServer(async (req,res) => {
	const buffers = []

	//await dentro de uma stream aguarda cada pedaço da stream ser retornado.
	for await (const chunk of req){
		buffers.push(chunk) //adicionando as parte do pacote dentro do array buffers.
	}

	const fullStreamContent = Buffer.concat(buffers).toString()
	console.log(fullStreamContent)

	return res.end(fullStreamContent)

	// return req
	// 				.pipe(new InverseNumberStream())
	// 				.pipe(res) 
})

server.listen(3334)