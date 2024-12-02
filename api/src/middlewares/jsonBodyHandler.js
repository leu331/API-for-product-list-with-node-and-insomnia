export async function jsonBodyHandler(request, response) {
    //lugar para adicionar os chunks
    const buffers = []

    //coleta os chunks de dados da requisicao
    for await (const chunk of request){
        buffers.push(chunk)
    }

    try {
        //concatenar os chunks e converter para strings. Em seguida, converte a string para json.
        request.body = JSON.parse(Buffer.concat(buffers).toString())
    } 
    catch (error) {
        request.body = null
    }

    response.setHeader("Content-Type", "application/json")
}