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
    let max=10
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
// console.log(grafo.verticeInicial)
/* 
As funções random irão calcular automaticamente os pesos, o vértice inicial e a
quantidade de vértices
o atributo (grafo.verticesVisitadosCaixeiro) retorna um array com a sequência de vértices visitados
o atributo (grafo.pesoCaixeiroViajante) retorna o valor percorrido pelo caixeiro viajante
*/
var par_ordenado_global;

document.getElementById('vertice_inicial').innerHTML = grafo.verticeInicial;
document.getElementById('distancia_total').innerHTML = grafo.pesoCaixeiroViajante;

desenho(grafo.matrizAdjacencia);

function desenho(matrizAdjacencia,) {
    
    let c = document.getElementById("canvas");
    let view = c.getContext("2d");
    let data = gera_pontos(matrizAdjacencia);
    par_rodenado_global = data;
    let array = gera_array(matrizAdjacencia);
    // console.log(data)
    // return;
   
    desenha_conexoes(array,data)
    desenha_aresta_matriz(data);
    escreve_distancia(array,data,matrizAdjacencia);
    
    function gera_array(matrizAdjacencia) {
        let data = [];
        matrizAdjacencia.forEach(function(element,key) {
            let vetor = [];
            element.forEach(function(value,key2){
                (value != 0)? vetor.push(1):vetor.push(0);
            });
            data.push(vetor);
        });
        return data;
    }
    function gera_pontos(matrizAdjacencia){
        let data = [];
        
        matrizAdjacencia.forEach(function(element,key) {
            
            data.push(ran());
        });

        return data;
        
        function ran() {
            return [Math.round(Math.random()*800)+100,Math.round(Math.random()*200)+50];
        }
    }

    function desenha_aresta_matriz(data) {
        
        data.forEach(function(element,key){
                    desenha_arestas(element[0],element[1],'red',key);
        });
    } 
    function desenha_conexoes(array,data){
        array.forEach(function(element,key) {
            element.forEach(function(value,key2){
                if (value == 1) {
                    line(data[key],data[key2])
                }
            });
        });
    }
    
    function letras(p,d,color) {
    
        view.beginPath();
        view.fillStyle = ''+color+'';
        view.font = "12px Georgia";
        view.fillText(Math.round(d), p[0], p[1]); 
        
    }
    function line(p1,p2) {
        // console.log('p1 '+p1)
        view.beginPath();
        view.moveTo(p1[0],p1[1]);
        view.lineTo(p2[0],p2[1]);
        view.stroke();
    }
    function desenha_arestas(pontox,pontoy,color,number) {
        view.beginPath();
        view.beginPath();
        view.arc(pontox, pontoy, 20, 0, 2 * Math.PI);
        view.fillStyle = ''+color+'';
        view.fill();
        view.beginPath();
        view.fillStyle = 'white';
        view.fillText(number, pontox, pontoy);
    }
    function escreve_distancia(array,data,dis) {
        let dados = [];
        let chavePrimaria = [];
    
        // console.log(array[0][0])
        array.forEach(function(element,key){
            element.forEach(function(value,key2){//console.log(percorre_vetor(dados,key))
                // console.log(chavePrimaria,key)
                    if(!percorre_vetor(chavePrimaria,key)){
                        // console.log('aaaaaaaaaaaaaa')
                        chavePrimaria.push(key);
                    }
                    if (!percorre_vetor(dados,key2)) { 
                        dados.push(key2);
                        
                    }
                    if (!percorre_vetor(chavePrimaria,key2) && (array[key][key2]==1 || array[key2][key] == 1)) {
                            let d = dis[key][key2];
                            letras(ponto_medio(data[key],data[key2]),d,'black');
                        }
               
            });
        });
    
        function ponto_medio(p1,p2) {
            return [(p2[0] + p1[0])/2,(p2[1]+p1[1])/2];
        }
    
        // console.log(data);
        function percorre_vetor(data,chave) {
            let logica = false;
            data.forEach(function (element2) {
                if(element2 == chave){
                    logica = true;
                }
            });
            return logica;
        }
    }
}

function percorre_grafo() {

    let c = document.getElementById("canvas");
    let view = c.getContext("2d");
    let data = par_rodenado_global;
    let vetor = grafo.verticesVisitadosCaixeiro;
    vetor.push(grafo.verticeInicial)
            // console.log(data);
        // return;
    intervalo();
        function intervalo() {
            let cont = 0;
            let aux;
            let start = setInterval(function() {
                if (aux) {
                    line_conexao(aux,data[vetor[cont]],'red')
                }
                if (cont>0) {
                    desenha_arestas(data[vetor[cont-1]][0],data[vetor[cont-1]][1],'red',vetor[cont-1])
                }
                aux = data[vetor[cont]];
            desenha_arestas(data[vetor[cont]][0],data[vetor[cont]][1],'yellow',vetor[cont])
            if (cont == vetor.length) {
                clearInterval(start)
            }
            
            cont+=1;
            
            }, 1000);
        }

        function desenha_arestas(pontox,pontoy,color,number) {
            view.beginPath();
            view.beginPath();
            view.arc(pontox, pontoy, 20, 0, 2 * Math.PI);
            view.fillStyle = ''+color+'';
            view.fill();
            view.beginPath();
            view.fillStyle = 'black';
            view.fillText(number, pontox, pontoy);
        }
        function line_conexao(p1,p2,color) {
            // console.log('p1 '+p1)
            view.beginPath();
            view.lineWidth = 4;
            view.moveTo(p1[0],p1[1]);
            view.lineTo(p2[0],p2[1]);
            view.strokeStyle = ''+color+'';
            view.stroke();
        }
        
}

function resetar() {
    window.location.reload()
}