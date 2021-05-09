import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model, ActiveModelSerializer } from 'miragejs'
import { App } from './App';

/**
 * Cria um servidor que roda na memória e permite adição de rotas
 */
createServer({

  models: {
    product: Model
  },

  serializers: {
    application: ActiveModelSerializer
  },

  /**
   * Cria as rotas necessárias para a aplicação funcionar
   */
  routes() {
    this.namespace = 'api'
    
    /**
     * Rota utilizada para dar get em todos os produtos no server
     */
    this.get('/products', (schema) => {
      return schema.all('product')
    })

    /**
     * Rota utilizada para dar postar um novo produto no servidor
     */
    this.post('/products', (schema, req) => {
      const data = JSON.parse(req.requestBody)
      return schema.create('product', data)
    })
    
    /**
     * Rota utilizada para editar um produto no servidor
     */
    this.patch("/products/:id")
    /**
     * Rota utilizada para deletar um produto no servidor
     */
    this.del('/products/:id')
}
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
