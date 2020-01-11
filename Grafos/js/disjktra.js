

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
    [0,200,300,0,0,0],
    [200,0,100,400,0,0],
    [300,100,0,0,300,0],
    [0,400,0,0,200,300],
    [0,0,300,200,0,400],
    [0,0,0,300,400,0],
    
]
var data =
[
    [200,200],
    [400,100],
    [400,300],
    [600,100],
    [600,300],
    [800,200],
    
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
            arrayInside.push(element);//junta os elementos com os elementos anteriores
        });
        
        let min = menor(arrayInside); //console.log(arrayInside)
        // return;
        arrayInside.forEach(function(element) {

            if (element[1] != min[1]) {//compara a distancia dos elementos no array com a distancia minima
                array_final.push(element);
            }
            if(element[1] == min[1] && verifica_se_ja_foi_acessado(element[0])){
                // console.log(element);
                posicao_controle = element;
                mantrizFinal[element[2]][element[0]]=1;
                mantrizFinal[element[0]][element[2]]=1;
                
                if (posicao_inical != element[2]) {
                    disTotal+=element[1];
                    matriz_de_distancias[posicao_inical][element[0]] = disTotal;
                }else{
                    disTotal = element[1];
                    matriz_de_distancias[posicao_inical][element[0]] = element[1];
                }
                
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

// console.log(acessa_distancias_dj(dijkstra(0),3,dis));//entra com o dijsktra da posicao e a posicao

function acessa_distancias_dj(vetor,pos,array_de_distancias) {
    let matriz_controle = cria_matriz(vetor);
    let distancias = [];
    let dist = 0;
    percorre(vetor,pos,dist);
    return distancias;
    function percorre(vetor,pos,dist) {
        vetor[pos].forEach(function(value,key) {
            if (value == 1 && matriz_controle[key][pos]!=1) {
                distancias[key] = dist+array_de_distancias[key][pos];
                adiciona_matriz_controle(key,pos);
                percorre(vetor,key,distancias[key]);
            } 
        });  
    }

    function adiciona_matriz_controle(key,key2) {
        matriz_controle[key][key2] = 1;
        matriz_controle[key2][key] = 1;
    }//adiciona os vetores ja conectados na matriz controle

    
}

function dijkstra_pontos(pos,pos_final) {
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

// console.log(dijkstra_distancias(1))

// fleury(array,dis);

function fleury(array,dis) {//matriz adijacencia e matriz de caminhos
    let dist = [];
    vertice_impar().forEach(element => {
        // let vetor = dijkstra_distancias(element);
        let vetor = acessa_distancias_dj(dijkstra(0),element,dis);
        dist.push(vetor); 
    });
    
    distancias(1,dijkstra(0));
    let vetor_distancias = (menor_caminho(vertice_impar(),dist))
    
    // console.log(soma_das_distancias(vetor_distancias,dijkstra(0),array))
    vetor_distancias = adiciona_distancias_vetor(vetor_distancias,array);
    
    // console.log(calcula_vetor_menor_distancia(vetor_distancias));
    let matriz_distancia_fic = matriz_distancias_aux((calcula_vetor_menor_distancia(vetor_distancias)),array)
    console.log(exe(5,array));
    function exe(ponto,array) {
        let matriz = cria_matriz(array);
        percorre(ponto);
        function percorre(posicao) {
            array[posicao].forEach(function(element,key){
                    if (element == 1 && matriz[posicao][key]==0) {
                        if (matriz_distancia_fic[posicao][key] == 1) {
                            matriz_distancia_fic[posicao][key] = 0
                            matriz_distancia_fic[key][posicao] = 0
                            percorre(key);console.log(key)
                        }else{
                            matriz[posicao][key]=1;
                            matriz[key][posicao]=1;
                            percorre(key);console.log(key);
                        }
                        
                    }
            });
        }
    }//percorre o vetor 

    function matriz_distancias_aux(vetor,array_para_criar_matriz) {
        let matriz = cria_matriz(array_para_criar_matriz);
        criar_matriz_aux(divide_o_vetor());
        return matriz;
        function criar_matriz_aux(vetor) {
            // console.log(vetor)
            vetor.forEach(element => {
                matriz[element[0]][element[1]] = 1;
                matriz[element[1]][element[0]] = 1;
            });
        }

        function divide_o_vetor() {
            
            let aux = [];
            let cont = [];
            let cont2=0;
            vetor.forEach(function(element,key) {
                cont2+=1;
                cont.push(element); 
                if (cont2 == 2) {
                    aux.push(cont);
                    cont = [];
                    cont2=0;
                }
            });
            return aux;
        }
    }//matriz com as conexoes auxiliares

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
    function calcula_vetor_menor_distancia(array) {
        let tamanho_vetor = (array[0].length)-1; //tamanho da posicao individual do vetor;
        let menor = 10000;
        let menor_vetor;

        array.forEach(function(element) {
            if (element[tamanho_vetor]<menor) {
                menor_vetor = element;
                menor = element[tamanho_vetor];
            }
        });

        function converte(vetor) {
            let tamanho = vetor.length -1;
            let novo_vetor = [];
            vetor.forEach(function(element,key) {
                if (key!=tamanho) {
                    novo_vetor.push(element);
                }
            });
            return novo_vetor;
        }//retira a distancia do vetor
        return converte(menor_vetor);
    }//retorna o vetor que tem menor distancia
    function adiciona_distancias_vetor(array_vetor_distancias,array) {
        let matriz = array_vetor_distancias;
        // console.log(array_vetor_distancias)
        // return;
        array_vetor_distancias.forEach(function(element,key) {
            let distancia = soma_das_distancias(element,dijkstra(0),array)
            matriz[key].push(distancia);
        });
        return matriz;
    }//adiciona as distancias ao final do vetor e calcula o menor

    function soma_das_distancias(vetor,array,matriz_adjacencia) {
        //vetor = pontos para calcular a distancia;
        //array = dijstra;
        
        // return;
        let matriz = cria_matriz(matriz_adjacencia);
        let distancia_total = 0;
        percorre_vetor(vetor[0])
        return distancia_total;
        function percorre_vetor(pos) {
            array[pos].forEach(function(element,key) { 
                    if(element == 1 && key!= pos && verifica_pertence(key) && matriz[pos][key] != 1){   
                        matriz[pos][key] = 1;
                        matriz[key][pos] = 1;
                        let aux = dis[pos][key]+distancia_total;
                        distancia_total = aux;
                        percorre_vetor(key);
                    }
            });
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

        function verifica_pertence(value) {
            let logica = false;
            vetor.forEach(element => {
                if(element == value){
                    logica = true;
                   
                }
            });
            return logica;
        }
    }//calcula as distancias de um intervalo de pontos
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
       return distancias_dos_caminhos;
        
        function menor_distancia_vetor(vetor) {
            let menor = 10000;
            let pos = vetor[0].length-1;
            vetor.forEach(element => {
                if (element[pos] < menor) {
                    menor = element;
                }
            });
            return menor;
        }//pega a menor distancia e retorna o vetor que ela está inserida.
        function acessa_posicoes() {
            caminho.forEach(function(element,key){
                caminho.forEach(function(value,key2){
                    if (element != value && matriz[key][key2] != 1) {
                        matriz[key][key2] = 1;
                        matriz[key2][key] = 1; 
                        // console.log(key,key2)
                        
                        let valor = acessa_posicoes_aux(element,value);
                        // console.log(val);
                        let final = [element,value,valor[0],valor[1]]
                        distancias_dos_caminhos.push(final);
                        // return [key,key2,distancias[key,key2]];
                        // console.log(valor[2]+distancias[key][value])
                    }
                });
            });
        }
        function acessa_posicoes_aux(chave,chave2) {
            let controle;
            caminho.forEach(function(element,key){
                caminho.forEach(function(value,key2){
                    if (matriz[key][key2] !=1 && chave != element && chave != value && chave2 != element && chave2 != value && element != value) {
                        matriz[key][key2] = 1;
                        matriz[key2][key] = 1;
                        // console.log(chave,chave2,element,value,distancias[key][value]);
                        controle = [element,value,distancias[key][value]];
                        return;
                    }
                });
            });
            return controle;
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
                // console.log(vetor_distancia)
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

desenho(array,data);

function desenho(array,data) {
    var c = document.getElementById("canvas");
    var view = c.getContext("2d");
    // console.log(dis)
    desenha_conexoes(array,data)
    desenha_aresta_matriz(data);
    escreve_distancia(array,data)
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

    function letras(p,d) {
    
        view.beginPath();
        view.fillStyle = 'black';
        view.font = "12px Georgia";
        view.fillText(Math.round(d), p[0], p[1]+20); 
        
    }
    function line(p1,p2) {
        // console.log('p1 '+p1)
        view.beginPath();
        view.moveTo(p1[0],p1[1]);
        view.lineTo(p2[0],p2[1]);
        view.stroke();
    }
    function desenha_arestas(pontox,pontoy,color,number) {
        view.beginPath();console.log(number)
        view.beginPath();
        view.arc(pontox, pontoy, 20, 0, 2 * Math.PI);
        view.fillStyle = ''+color+'';
        view.fill();
        view.beginPath();
        view.fillStyle = 'black';
        view.fillText(number, pontox, pontoy);
    }
    function escreve_distancia(array,data) {
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
                            letras(ponto_medio(data[key],data[key2]),d);
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