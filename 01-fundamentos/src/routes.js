import { Database } from './database.js'; //Sempre lembrar da extensao por ser type "module" o type do meu package.json
import { randomUUID } from 'node:crypto';

const database = new Database()

export const routes = [
  {
    method:'GET',
    path:'/users',
    handler: (req,res) => {
      const users = database.select('users');
      return res.end(JSON.stringify(users));
    }
  },
  {
    method:'POST',
    path:'/users',
    handler: (req,res) => {
      const { name, email } = req.body;

      const user = {
        id: randomUUID(),
        name, 
        email
      }

      database.insert('users',user);
      return res.writeHead(201).end();
    }
  },
]