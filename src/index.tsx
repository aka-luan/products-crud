import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model, ActiveModelSerializer } from 'miragejs'
import { App } from './App';

/* criação do servidor fake com a lib mirageJS */
createServer({
  models: {
    product: Model
  },

  serializers: {
    application: ActiveModelSerializer
  },

  routes() {
    this.namespace = 'api'
    
    this.get('/products', (schema) => {
      return schema.all('product')
    })

    this.post('/products', (schema, req) => {
      const data = JSON.parse(req.requestBody)
      return schema.create('product', data)
    })
    
    this.patch("/products/:id")
    this.del('/products/:id')
}
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
