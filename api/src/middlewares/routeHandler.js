import { extractQueryParams } from "../utils/extract-query-params.js"; //importa a funcao de extrair o query dos parametros
import { routes } from "../routes.js"; //importa a funcao de rotas
import { Database } from "../database.js"; //importando o database, importo ele aqui pois quero passar esse banco de dados para todas as rotas http

//importante compartilhar entre todas as rotas, para que exista apenas uma instancia, nao fazendo com que haja alteracao de dados no processo de requisicao

const database = new Database() //criando a variavel databse e passando para ela como valor, o database que criamos em database.js

export function routeHandler(request, response){
    const route = routes.find((route)=>{
        return route.method === request.method && route.path.test(request.url)
    })

    if (route){
        const routeParams = request.url.match(route.path)

        const {query, ...params} = routeParams.groups
        
        

        request.params = params
        request.query = query ? extractQueryParams(query) : {}
        
        return route.controller({request, response, database})// o controller tem acesso a requisicao, a resposta e ao banco de dados. 
        // Coloquei entre chaves para que isso se torne um objeto e nao seja obrigatorio que tenha que seguir a sequencia de request, responsee database para funcionar
       
    }
    
    return response.writeHead(404).end("Rota não encontrada") //o writeHead para escolher o valor do codigo

}