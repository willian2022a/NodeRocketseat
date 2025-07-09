//process.stdin.pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream';

//streams/readables não permitem usar dados primitivos
class OneToHundredStream extends Readable {
	index = 1;

	_read() {
		const i = this.index++;

		if (i > 100) {
			//push é o método que uma readable/stream usa para fornecer informação para quem estiver consumindo ela.
			this.push(null)
		} else {
			const buf = Buffer.from(String(i))
			this.push(buf)
		}
	}
}

class MultiplyByTenStream extends Writable {
	//chunk - pedaço que foi lido da stream de leitura
	//encoding - como o chunk está codificado
	//callback - é uma função que a stream de escrita precisa chamar quando ela já utilizou a informação (chunk).
	_write(chunk, encoding, callback) {
		console.log(Number(chunk.toString()) * 10)
		callback()
	}
}

class InverseNumberStream extends Transform {
	_transform(chunk, encoding, callback) {
		const transformed = Number(chunk.toString()) * -1;
		/* primeiro parametro de um callback é o erro. Assim apenas para efeito de aprendizagem está sendo passado
		null, indicando que não nenhum erro */
		callback(null, Buffer.from(String(transformed)))
	}
}

//new OneToHundredStream().pipe(process.stdout)
new OneToHundredStream() //stream de leitura
	.pipe(new InverseNumberStream()) //stream de conversão
	.pipe(new MultiplyByTenStream()) //stream de escrita

/* Existe também a Stream duplex, que le e escreve, como um arquivo, 
em que é possível ler e possível escrever nele.*/