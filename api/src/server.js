//importando o http do node
import { jsonBodyHandler } from "./middlewares/jsonBodyHandler.js"
import http from "node:http"
import { routeHandler } from "./middlewares/routeHandler.js"


//crio o servidor e a função que tem como parâmetros a requisição e a devolutiva
const server = http.createServer(async(request, response) =>{
    // const {method, url} = request //achando o metodo

    await jsonBodyHandler(request, response)

    routeHandler(request, response)

    // if (method === "GET" && url === "/products"){
    //     return response.end("A lista de produtos")
    // }

    // if (method === "POST" && url === "/products"){
        
    //     return response.writeHead(201).end(JSON.stringify(request.body))
    // }
    //define o header de resposta como json
    
})
server.listen(3333)