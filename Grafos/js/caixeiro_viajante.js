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



function generateRandom(){
    let min=1
    let max=900
    let random = Math.floor(Math.random() * (+max - +min)) + +min;
    return random
}

grafo = newGrafo(6)
grafo.addAresta(0, 0, generateRandom())
grafo.addAresta(0, 1, generateRandom())
grafo.addAresta(0, 2, generateRandom())
grafo.addAresta(0, 3, generateRandom())
grafo.addAresta(0, 4, generateRandom())
grafo.addAresta(0, 5, generateRandom())
grafo.addAresta(0, 6, generateRandom())
grafo.addAresta(0, 7, generateRandom())
grafo.addAresta(0, 8, generateRandom())
grafo.addAresta( 1, 0, generateRandom())
grafo.addAresta( 1, 1, generateRandom())
grafo.addAresta( 1, 2, generateRandom())
grafo.addAresta( 1, 3, generateRandom())
grafo.addAresta( 1, 4, generateRandom())
grafo.addAresta( 1, 5, generateRandom())
grafo.addAresta( 1, 6, generateRandom())
grafo.addAresta( 1, 7, generateRandom())
grafo.addAresta( 1, 8, generateRandom())
grafo.addAresta(2, 0, generateRandom())
grafo.addAresta(2, 1, generateRandom())
grafo.addAresta(2, 2, generateRandom())
grafo.addAresta(2, 3, generateRandom())
grafo.addAresta(2, 4, generateRandom())
grafo.addAresta(2, 5, generateRandom())
grafo.addAresta(2, 6, generateRandom())
grafo.addAresta(2, 7, generateRandom())
grafo.addAresta(2, 8, generateRandom())
grafo.addAresta(3, 0, generateRandom())
grafo.addAresta(3, 1, generateRandom())
grafo.addAresta(3, 2, generateRandom())
grafo.addAresta(3, 3, generateRandom())
grafo.addAresta(3, 4, generateRandom())
grafo.addAresta(3, 5, generateRandom())
grafo.addAresta(3, 6, generateRandom())
grafo.addAresta(3, 7, generateRandom())
grafo.addAresta(3, 8, generateRandom())
grafo.addAresta(4, 0, generateRandom())
grafo.addAresta(4, 1, generateRandom())
grafo.addAresta(4, 2, generateRandom())
grafo.addAresta(4, 3, generateRandom())
grafo.addAresta(4, 4, generateRandom())
grafo.addAresta(4, 5, generateRandom())
grafo.addAresta(4, 6, generateRandom())
grafo.addAresta(4, 7, generateRandom())
grafo.addAresta(4, 8, generateRandom())
grafo.addAresta(5, 0, generateRandom())
grafo.addAresta(5, 1, generateRandom())
grafo.addAresta(5, 2, generateRandom())
grafo.addAresta(5, 3, generateRandom())
grafo.addAresta(5, 4, generateRandom())
grafo.addAresta(5, 5, generateRandom())
grafo.addAresta(5, 6, generateRandom())
grafo.addAresta(5, 7, generateRandom())
grafo.addAresta(5, 8, generateRandom())
grafo.addAresta(6, 0, generateRandom())
grafo.addAresta(6, 1, generateRandom())
grafo.addAresta(6, 2, generateRandom())
grafo.addAresta(6, 3, generateRandom())
grafo.addAresta(6, 4, generateRandom())
grafo.addAresta(6, 5, generateRandom())
grafo.addAresta(6, 6, generateRandom())
grafo.addAresta(6, 7, generateRandom())
grafo.addAresta(6, 8, generateRandom())
grafo.addAresta(7, 0, generateRandom())
grafo.addAresta(7, 1, generateRandom())
grafo.addAresta(7, 2, generateRandom())
grafo.addAresta(7, 3, generateRandom())
grafo.addAresta(7, 4, generateRandom())
grafo.addAresta(7, 5, generateRandom())
grafo.addAresta(7, 6, generateRandom())
grafo.addAresta(7, 7, generateRandom())
grafo.addAresta(7, 8, generateRandom())
grafo.addAresta(8, 0, generateRandom())
grafo.addAresta(8, 1, generateRandom())
grafo.addAresta(8, 2, generateRandom())
grafo.addAresta(8, 3, generateRandom())
grafo.addAresta(8, 4, generateRandom())
grafo.addAresta(8, 5, generateRandom())
grafo.addAresta(8, 6, generateRandom())
grafo.addAresta(8, 7, generateRandom())
grafo.addAresta(8, 8, generateRandom())
grafo.printMatriz()

grafo.printGrafo()
console.log("\n");

console.log("Total percorrido pelo caixeiro Viajante: " + grafo.calculaCaminhoCaixeiro(grafo,2))
grafo.caminhoPercorrido()
