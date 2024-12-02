import fs from "node:fs/promises" //importando o metodo fs do proprio node e adicionando /promises para usar async e await
//fs serve para manipular arquivos

const DATABASE_PATH = new URL("db.json", import.meta.url) //estou criando um caminho novo para chegar o arquivo que salva as requisicoes, as primeiras aspas sao o nome do arquivo, apos isso, e o caminho dele

export class Database{
    #database = {} //# nele para tornar as funcoes dentro dele privadas

    constructor(){ //metodo construtor e criado automaticamente depois que chamei o new database, estou usando para criar a funcao que salva as requisicoes em um arquivo

        fs.readFile(DATABASE_PATH, "utf-8").then((data) =>{//ler os arquivos de database_path e ler em formato utf-8
            this.#database = JSON.parse(data) //o banco de dados recebe os dados e o transforma em json
        }).catch(() => this.#persist) //coloquei aqui porque se der erro, o catch executa a funcao de persist e recria o banco

    }

    #persist() { //criando a funcao que salva dinamicamente as requisicoes em um arquivo 
        fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database)) //crio o arquivo, passo o caminho de onde quero criar o database e converto o this.database para json
    }

    insert(table, data){ //tabela que quero inserir e os dados que quero inserir
        if(Array.isArray(this.#database[table])){ //se o array de database é mesmo um array e se tem uma tabela dentro dele
            this.#database[table].push(data) //se for um array, a tabela puxa os dados
        }

        else { //se a tabela não existir
            this.#database[table] = [data] //adiciono a tabela no database e o peimeiro item da coleção será os dados

            
        }   this.#persist()//agora as requisicoes tambem serao salvas no arquivo db.json
    }   //o que o if else faz, se tiver a tabela, a tabela tem que puxar os dados, se não tiver, cria a tabela e o primeiro item será  os dados.

    select(table){ //selecionar a tabela
        return this.#database[table] ?? [] //retorna a tabela de database //se nao tiver nada, retorna um aray vazio
    }
}