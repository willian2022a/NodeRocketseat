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

const server = http.createServer(async (req,res) => {
	const buffers = []

	//await dentro de uma stream aguarda cada pedaço da stream ser retornado.
	for await (const chunk of req){
		buffers.push(chunk)
	}

	const fullStreamContent = Buffer.concat(buffers).toString()
	console.log(fullStreamContent)

	return res.end(fullStreamContent)

	// return req
	// 				.pipe(new InverseNumberStream())
	// 				.pipe(res) 
})

server.listen(3334)