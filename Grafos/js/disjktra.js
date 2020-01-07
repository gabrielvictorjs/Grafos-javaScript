

var array = 
[
    [0,1,1,0,0,0],
    [1,0,1,1,0,0],
    [1,1,0,0,1,0],
    [0,1,0,0,1,1],
    [0,0,1,1,0,1],
    [0,0,0,1,1,0],
    
]

var dis =
[
    [0,2,3,0,0,0],
    [2,0,1,4,0,0],
    [3,1,0,0,3,0],
    [0,4,0,0,2,3],
    [0,0,3,2,0,4],
    [0,0,0,3,4,0],
    
]

var array2 = [];
array2[0] = []; 

// dijkstra(0);



function dijkstra(pos) {
    let disTotal = 0;
    let mantrizFinal = gera_matriz_final();
    let dist = [];//armazena os pontos visitados
    let posicao_controle = [];
    let array_controle = gera_array_de_controle(array);

    loop(pos);
    return mantrizFinal;
    function loop(pos) {
        // let res =  (pegar_distancias(adj_vetor(pos),pos));
        // disTotal += res[1];
        
        if (array_controle.length == 1) {
        
            return;
        }
        novo_array(pos,dist);
        loop(posicao_controle[0]);
    }
    function adj_vetor(pos) {
        return array[pos];
    }
    function pegar_distancias(vetor,pos) {
        let data = [];
        vetor.forEach(function(element,key) {
            if (element == 1) {
                data.push([key,dis[pos][key],pos])
            }
        });
        return data;
    }
    
    function menor(vetor) {
        let menor = 10000;
        let pos;
        vetor.forEach(function(element,key){
            if ((element[1] < menor) && (verifica_se_ja_foi_acessado(element[0])) == true) {
                
                menor = element[1];
                pos = element;  
               
                
            } 
        });
        return (pos); 
    }
    function novo_array(pos,array_de_distancias) {
        // console.log(array_controle)
        array_controle = elimina_elemento_controle(array_controle,pos);
        let arrayInside = (pegar_distancias(adj_vetor(pos),pos));    //retorna as adjacencias referentes aquela posição
        let array_final = [];
        
        arrayInside = reorganizar_array(arrayInside,array_controle); //reorganiza o vetor retirando as posicoes já acessadas
        
        array_de_distancias.forEach(function(element) {
            arrayInside.push(element);
        });
        
        let min = menor(arrayInside); //console.log(arrayInside)
        // console.log(min,pos,' ',arrayInside)
        
        arrayInside.forEach(function(element) {
            if (element[1] != min[1]) {
                array_final.push(element);
            }
            if(element[1] == min[1] && verifica_se_ja_foi_acessado(element[0])){
                posicao_controle = element;
                mantrizFinal[element[2]][element[0]]=1;
                mantrizFinal[element[0]][element[2]]=1;
            } 
            
        });
        
       
        
        dist = array_final;
    }

    function gera_array_de_controle(array) {
        let vetor = [];
        for (let index = 0; index < (array.length); index++) {
            vetor[index] = index;
        }
        return vetor;
    }

    function reorganizar_array(array,controle) {
        let novo_array = [];
        array.forEach(function(element){
            let verifica = false;
            controle.forEach(function(value) {
                if (element[0] == value) {
                    verifica = true;
                }
            });
            if (verifica) {
                novo_array.push(element); 
            }
        });
        return novo_array;
    }

    function elimina_elemento_controle(vetor,elemento){
        let array = [];
        vetor.forEach(function(value){
            if (value != elemento) {
                array.push(value);
            }
        });
        // console.log(array);
        return array;
    }
    function gera_matriz_final() {
        let cont = array.length;
        let matriz = []; 
        
        for (let index = 0; index < cont; index++) {
            let vetor = [];
            for (let i = 0; i < cont; i++) {
               vetor.push(0);
            }
            matriz[index] = vetor;
        }
       return matriz;
    }
    function verifica_se_ja_foi_acessado(valor) {
        let verifica = false;
        array_controle.forEach(function(element) {
            if (element == valor) {
                verifica = true;
            }
        });
        return verifica;
    }

}

function dijkstra_distancias(pos) {
    let disTotal =0;
    let matriz_de_distancias = gera_matriz_final();
    let posicao_inical = pos;
    let mantrizFinal = gera_matriz_final();
    let dist = [];//armazena os pontos visitados
    let posicao_controle = [];
    let array_controle = gera_array_de_controle(array);

    loop(pos);
    return matriz_de_distancias[pos];


    function loop(pos) {
        // let res =  (pegar_distancias(adj_vetor(pos),pos));
        // disTotal += res[1];
        
        if (array_controle.length == 1) {
        
            return;
        }
        novo_array(pos,dist);
        loop(posicao_controle[0]);
    }
    function adj_vetor(pos) {
        return array[pos];
    }
    function pegar_distancias(vetor,pos) {
        let data = [];
        vetor.forEach(function(element,key) {
            if (element == 1) {
                data.push([key,dis[pos][key],pos])
            }
        });
        return data;
    }
    
    function menor(vetor) {
        let menor = 10000;
        let pos;
        vetor.forEach(function(element,key){
            if (element[1] < menor && verifica_se_ja_foi_acessado(element[0])) {
                menor = element[1];
                pos = element;
            } 
        });
        return (pos); 
    }
    function novo_array(pos,array_de_distancias) {
        // console.log(array_controle)
        array_controle = elimina_elemento_controle(array_controle,pos);
        let arrayInside = (pegar_distancias(adj_vetor(pos),pos));    //retorna as adjacencias referentes aquela posição
        let array_final = [];
        
        arrayInside = reorganizar_array(arrayInside,array_controle); //reorganiza o vetor retirando as posicoes já acessadas
        
        array_de_distancias.forEach(function(element) {
            arrayInside.push(element);
        });
        
        let min = menor(arrayInside); //console.log(arrayInside)
        // return;
        arrayInside.forEach(function(element) {
            if (element[1] != min[1]) {
                array_final.push(element);
            }
            if(element[1] == min[1] && verifica_se_ja_foi_acessado(element[0])){
                
                posicao_controle = element;
                mantrizFinal[element[2]][element[0]]=1;
                mantrizFinal[element[0]][element[2]]=1;

                if (posicao_inical != element[2]) {
                    disTotal+=element[1];
                    matriz_de_distancias[posicao_inical][element[0]] = disTotal;
                }else{
                    matriz_de_distancias[posicao_inical][element[0]] = element[1]; 
                }
                // console.log(disTotal)
                // console.log(matriz_de_distancias[posicao_inical])
                
                
            }
        });
        
        
        dist = array_final;
    }

    
    function gera_array_de_controle(array) {
        let vetor = [];
        for (let index = 0; index < (array.length); index++) {
            vetor[index] = index;
        }
        return vetor;
    }

    function reorganizar_array(array,controle) {
        let novo_array = [];
        array.forEach(function(element){
            let verifica = false;
            controle.forEach(function(value) {
                if (element[0] == value) {
                    verifica = true;
                }
            });
            if (verifica) {
                novo_array.push(element); 
            }
        });
        return novo_array;
    }

    function elimina_elemento_controle(vetor,elemento){
        let array = [];
        vetor.forEach(function(value){
            if (value != elemento) {
                array.push(value);
            }
        });
        // console.log(array);
        return array;
    }
    function gera_matriz_final() {
        let cont = array.length;
        let matriz = []; 
        
        for (let index = 0; index < cont; index++) {
            let vetor = [];
            for (let i = 0; i < cont; i++) {
               vetor.push(0);
            }
            matriz[index] = vetor;
        }
       return matriz;
    }
    function verifica_se_ja_foi_acessado(valor) {
        let verifica = false;
        array_controle.forEach(function(element) {
            if (element == valor) {
                verifica = true;
            }
        });
        return verifica;
    }

}

function cria_matriz(array) {
    let mat = [];
    array.forEach(function(element,key) {
        let vetor = [];
        element.forEach(function(value,key2) {
            vetor.push(0);
        });
        mat[key] = vetor;
    });
    return mat;
}

// console.log(dis);

fleury(array,dis);

function fleury(array) {
    let dist = [];
    vertice_impar().forEach(element => {
        let vetor = dijkstra_distancias(element);
        dist.push(vetor); 
    });

    console.log(dist);
    menor_caminho(vertice_impar(),dist);  
    
    
    function vertice_impar() {
        let mat = [];
        array.forEach(function(element,key) {
            let cont=0;
            element.forEach(function(value,key2) {
                if (value == 1) {
                    cont+=1;
                }
            });
            if (cont % 2 == 1) {
                mat.push(key);
            }
        });
        return mat;
    }

    function menor_caminho(caminho,distancias) {
        let contole = [];
        let matriz = gerar_matriz();
        let distancias_dos_caminhos = [];
        acessa_posicoes();
        function acessa_posicoes() {
            caminho.forEach(function(element,key){
                caminho.forEach(function(value,key2){
                    if (element != value && matriz[key][key2] != 1) {
                        matriz[key][key2] = 1;
                        matriz[key2][key] = 1; 
                        // console.log(key,key2)
                        let valor = acessa_posicoes_aux(element,value);
                        
                        // let final = [key,key2,valor[0],valor[1],valor[2]+distancias[key][key2]]
                        // distancias_dos_caminhos.push(final);
                        // return [key,key2,distancias[key,key2]];
                    }
                });
            });
        }
        function acessa_posicoes_aux(chave,chave2) {
            caminho.forEach(function(element,key){
                caminho.forEach(function(value,key2){
                    if (matriz[key][key2] !=1 && chave != element && chave != value && chave2 != element && chave2 != value && element != value) {
                        matriz[key][key2] = 1;
                        matriz[key2][key] = 1;
                        console.log(chave,chave2,element,value,distancias[key][value]);
                        return;
                        // return [key,key2,distancias[element][value]];
                    }
                });
            });
        }
        function gerar_matriz() {
            let matriz = [];
            
            caminho.forEach(function(element) {
                let vetor = [];
                caminho.forEach(element => {
                    vetor.push(0);
                });
                matriz.push(vetor);
            });
            return matriz;
        }
    }
    distancias(1,dijkstra(0));

    function distancias(pos,array) {
    let vetor_distancia = [];
    let chaves = [];

    // busca_distancia(pos);
    // console.log(vetor_distancia);
    function busca_distancia(pos) {
        
                valida(pos,0);
        
    }

    function valida(pos,total) {
        // console.log(pos,vetor_distancia)
        array[pos].forEach(function(element,key) {
            if (element == 1 && !verifica(key)) {
                chaves.push(pos);
                chaves.push(key);
                let t = dis[pos][key]+total;
                vetor_distancia[key] = t; 
                console.log(vetor_distancia)
                valida(key,t);
            }
        });
        
        function verifica(key) {
            let logica = false;
            chaves.forEach(function(element) {
                if (key == element) {
                    logica = true;
                }
            });
            return logica;
        }
        
    }
    }
}