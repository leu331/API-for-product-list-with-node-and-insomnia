import { parseRoutePath } from "./utils/parseRoutePath.js"
export const routes = [
   {
    method: "GET",
    path: "/products",  
    controller: ({request, response, database}) => { //controler entre chaves para que nao seja obrigatoria a sequencia de request e response para funcionar
        const products = database.select("products")//metodo select de database.js
        return response.end(JSON.stringify(products))//devolve os produtos
    },
   },

   {
    method: "POST",
    path: "/products",
    controller: ({request, response, database}) => { //controler entre chaves para que nao seja obrigatoria a sequencia de request e response para funcionar
        const {name, price} = request.body

        database.insert("products", {name, price}) //insere dentro de database uma tabela de nome products e recebe como dados nome e preco

        return response.writeHead(201).end()//request body e o corpo da requisicao que escrevemos no insomnia
    },
   },

   {
    method: "DELETE",
    path: "/products/:id",
    controller: ({request, response}) => { //controler entre chaves para que nao seja obrigatoria a sequencia de request e response para funcionar
        return response.end("Produto removido com ID: " + request.params.id)
    },
   },

].map((route)=> ({
    ...route,
    path: parseRoutePath(route.path)
})

)