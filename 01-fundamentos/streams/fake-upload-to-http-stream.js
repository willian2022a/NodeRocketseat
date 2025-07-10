import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 5) {
        //push é o método que uma readable/stream usa para fornecer informação para quem estiver consumindo ela.
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
    }, 1000)
  }
}

/* fetch api é uma api completa para trabalhar com requisições e 
respostas dentro da web.
*/

/*esse fetch abriu uma conexão e está aos poucos enviando os dados para o nosso servidor stream-http-server */
fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half'
}).then((response) => {
  return response.text()
}).then((data) => {
  console.log(data)
});