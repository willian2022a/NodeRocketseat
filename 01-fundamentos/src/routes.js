import { Database } from './database.js'; //Sempre lembrar da extensao por ser type "module" o type do meu package.json
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database()

export const routes = [
  {
    method:'GET',
    path: buildRoutePath('/users'),
    handler: (req,res) => {
      const users = database.select('users');
      return res.end(JSON.stringify(users));
    }
  },
  {
    method:'POST',
    path: buildRoutePath('/users'),
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
  {
    method:'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req,res) => {
      console.log('req.params', req.params)
      const { id } = req.params
      database.delete('users',id)
      return res.writeHead(204).end();
    }
  },
]