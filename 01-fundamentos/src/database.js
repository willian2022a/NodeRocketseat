import fs from 'node:fs/promises';

//variavel global que retorna o caminho completo até o arquivo corrente.
console.log(import.meta.url);

// UUID => Unique Universal ID

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
  // # significa que a variavel e privada e não pode ser acessada de fora da classe
  #database = {}

  constructor(){
    fs.readFile(databasePath,'utf8')
    .then(data => {
      this.#database = JSON.parse(data);
    }).catch(() => {
      this.#persist();
    })
  }

  #persist(){
    console.log('>>>>> ', JSON.stringify(this.#database));
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table){
    const data = this.#database[table] ?? [];

    return data;
  }

  insert(table, data){
    if(Array.isArray(this.#database[table])){
      console.log('>> users 1 ')
      this.#database[table].push(data)
    }else{
      console.log('>> users 2')
      this.#database[table] = [data]
    }

    this.#persist();
    return data;
  }
} 