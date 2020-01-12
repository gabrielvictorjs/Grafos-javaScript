function newGrafo(vertices) {
    const matrizAdjacencia = []
    const matrizDestOrigem = []

    for (let i = 0; i < vertices; i++) {
        matrizAdjacencia[i] = []
        matrizDestOrigem[i] = []
    }
    for (let i = 0; i < vertices; i++) {
        for (let j = 0; j < vertices; j++) {
            matrizAdjacencia[i].push(0)
        }
    }
    return {
        matrizAdjacencia,
        vertices,
        possibilidadesCaminhos: 0, //quantidade de possíveis caminhos na heurística do caixeiro viajante
        verticesVisitadosCaixeiro: [],
        pesoCaixeiroViajante: 0,
        pesoAnterior: Number.MAX_SAFE_INTEGER,
        caminhoAtual: 1,
        verticeInicial: null,
        ultimo: null,
        
        calculaPossibilidadeCaminhos(vertices){
            let possibilidades = 1
            for(let i = vertices ; i > 0 ; i--){
                possibilidades *= i
            }
            return possibilidades
        },

        visitarVizinhos(grafo, verticeAtual){
            
            if(grafo.vertices === grafo.verticesVisitadosCaixeiro.length){
                grafo.caminhoAtual++
                
                if(grafo.pesoAnterior > grafo.pesoCaixeiroViajante){
                    grafo.pesoAnterior = grafo.pesoCaixeiroViajante
                }
                if(grafo.caminhoAtual === grafo.possibilidadesCaminhos){
                    return grafo.pesoCaixeiroViajante + grafo.matrizAdjacencia[grafo.ultimo][grafo.verticeInicial]
                }else{
                    grafo.verticesVisitadosCaixeiro = []
                    grafo.pesoCaixeiroViajante = 0
                    return grafo.visitarVizinhos(grafo,grafo.verticeInicial)
                }
                
                
            }else{
                grafo.verticesVisitadosCaixeiro.push(verticeAtual)
                for(let i = 0 ; i < grafo.vertices; i++){
                    if(!grafo.verticesVisitadosCaixeiro.includes(i)){
                        grafo.pesoCaixeiroViajante += grafo.matrizAdjacencia[verticeAtual][i]
                        return grafo.visitarVizinhos(grafo,i)
                    }else if(grafo.vertices === grafo.verticesVisitadosCaixeiro.length){
                        grafo.ultimo = verticeAtual
                        return grafo.visitarVizinhos(grafo,grafo.verticeInicial)
                    }
                }
            }
            
        },


        //heurística do caixeiro viajante
        calculaCaminhoCaixeiro(grafo, verticeInicial){
            grafo.verticeInicial = verticeInicial
            if(grafo.vertices > 1 && verticeInicial >= 0 && verticeInicial < grafo.vertices){
                grafo.possibilidadesCaminhos = grafo.calculaPossibilidadeCaminhos(grafo.vertices)
                grafo.pesoCaixeiroViajante = grafo.visitarVizinhos(grafo, verticeInicial)
                return grafo.pesoCaixeiroViajante
            }
        },
        
        addAresta(origem, destino, peso) {
            if (origem >= 0 && origem < this.vertices && destino >= 0 && destino < this.vertices && peso > 0) {
                this.matrizAdjacencia[origem][destino] = peso
                this.matrizAdjacencia[destino][origem] = peso
            } else {
                console.log("Valores informados inválidos.")
            }

        },
        printGrafo() {
            let print = this.matrizAdjacencia.map((arrayDestino, indice) => {
                let retorno = `${indice} : `
                arrayDestino.forEach((pesoDestino, indice) => {
                    if (pesoDestino > 0)
                        retorno += ` ${indice} `
                })
                return retorno
            })
            print.forEach((mostrar) => console.log(mostrar))
        },

        printMatriz(){
            console.log("\n Pesos: \n")
            this.matrizAdjacencia.forEach((arrayDestino)=>{
                let text = ""
                arrayDestino.forEach((value)=>{
                    text += value + " "
                })
                console.log(text)
                text = ""
            })
            console.log("\n")
        },
        caminhoPercorrido(){
            let text = "Caminho percorrido: "
            let i = 0
            let guardar = null
            let guardarPesos = []
            this.verticesVisitadosCaixeiro.forEach((value)=>{
                i++
                if(i===1)
                    guardar = value
                text += value + " -> "
            })
            text += guardar
            console.log(text)
        }
    }
}



function generateRandomPeso(){
    let min=3
    let max=900
    let random = Math.floor(Math.random() * (+max - +min)) + +min;
    return random
}

function generateRandomVertice(){
    let min=3
    let max=6
    let random = Math.floor(Math.random() * (+max - +min)) + +min;
    return random
}

function generateRandomVerticeInicial(){
    let min=0
    let max=4
    let random = Math.floor(Math.random() * (+max - +min)) + +min;
    return random
}
let quantVertices = generateRandomVertice() //quantidades de vértices do grafo
grafo = newGrafo(quantVertices)
grafo.addAresta(0, 1, generateRandomPeso())
grafo.addAresta(0, 2, generateRandomPeso())
grafo.addAresta(0, 3, generateRandomPeso())
grafo.addAresta(0, 4, generateRandomPeso())
grafo.addAresta(0, 5, generateRandomPeso())
grafo.addAresta( 1, 0, generateRandomPeso())
grafo.addAresta( 1, 2, generateRandomPeso())
grafo.addAresta( 1, 3, generateRandomPeso())
grafo.addAresta( 1, 4, generateRandomPeso())
grafo.addAresta( 1, 5, generateRandomPeso())
grafo.addAresta(2, 0, generateRandomPeso())
grafo.addAresta(2, 1, generateRandomPeso())
grafo.addAresta(2, 3, generateRandomPeso())
grafo.addAresta(2, 4, generateRandomPeso())
grafo.addAresta(2, 5, generateRandomPeso())
grafo.addAresta(3, 0, generateRandomPeso())
grafo.addAresta(3, 1, generateRandomPeso())
grafo.addAresta(3, 2, generateRandomPeso())
grafo.addAresta(3, 4, generateRandomPeso())
grafo.addAresta(3, 5, generateRandomPeso())
grafo.addAresta(4, 0, generateRandomPeso())
grafo.addAresta(4, 1, generateRandomPeso())
grafo.addAresta(4, 2, generateRandomPeso())
grafo.addAresta(4, 3, generateRandomPeso())
grafo.addAresta(4, 5, generateRandomPeso())
grafo.addAresta(5, 0, generateRandomPeso())
grafo.addAresta(5, 1, generateRandomPeso())
grafo.addAresta(5, 2, generateRandomPeso())
grafo.addAresta(5, 3, generateRandomPeso())
grafo.addAresta(5, 4, generateRandomPeso())

grafo.printMatriz()

grafo.printGrafo()
console.log("\n");
let vi = generateRandomVerticeInicial() // vértice inicial
while(vi > quantVertices - 1){
    vi = generateRandomVerticeInicial()
}
console.log(`Vertice inicial: ${vi} Quantidade vertices: ${quantVertices}`)
console.log("Total percorrido pelo caixeiro Viajante: " + grafo.calculaCaminhoCaixeiro(grafo,vi))
grafo.caminhoPercorrido()

/* 
As funções random irão calcular automaticamente os pesos, o vértice inicial e a
quantidade de vértices
o atributo (grafo.verticesVisitadosCaixeiro) retorna um array com a sequência de vértices visitados
o atributo (grafo.pesoCaixeiroViajante) retorna o valor percorrido pelo caixeiro viajante
*/