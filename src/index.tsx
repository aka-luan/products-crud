import React from 'react';
import ReactDOM from 'react-dom';
import { createServer } from 'miragejs'
import { App } from './App';


/* criação do servidor fake com a lib mirageJS */
createServer({
  routes() {
    this.namespace = 'api'
    
    this.get('/products', () => {
      return [{}]
    })

    this.post('/products', (schema, req) => {
      const data = JSON.parse(req.requestBody)

      return data
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
