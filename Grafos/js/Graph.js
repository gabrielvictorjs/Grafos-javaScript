class Ghaph {
    constructor(vertex)
    {
        this.size = vertex;
        this.vertex = [];
        this.create_vertex();
    }
    create_vertex()
    {
        for (let index = 0; index < this.size; index++) {
            this.vertex[index] = [];
            for (let i = 0; i < this.size; i++) {
                this.vertex[index][i] = [];
            }
        }
        
    }
    insert(position,value)
    {
        for (let index = 0; index < this.size; index++) {
                (value == index)? this.vertex[position][index] = 1 : this.vertex[position][index] = 0 ;
        }
    }
    view()
    {
        console.log(this.vertex);
    }
    array(){
        return this.vertex;
    }
}

// var a = new Ghaph(3);
// array = a.array();


function tipo_de_grafo() {
    let radio = document.getElementsByName('rad');
    for (let index = 0; index < radio.length; index++) {
        if (radio[index].checked) {
            var type = radio[index].value;
        }    
    }   
    (type == 0)? dirigido():nao_dirigido();

    function nao_dirigido() { 
        array.forEach(function (element,key) {
            element.forEach(function(element2,key2){
                let number =  Math.round(Math.random()*1);
                if(typeof(element2) != typeof(1)){
                    array[key][key2] = number;
                    array[key2][key] = number;
                }
            });
        });  
    }
    function dirigido() {
        array.forEach(function (element,key) {
            element.forEach(function(element2,key2){
                array[key][key2] = Math.round(Math.random()*1);
            });
        });  
    }
}



// array = []; 
// array[0] = [0,0];
// array[1] = [1,0]
// console.log(array);

var c = document.getElementById("canvas");
var view = c.getContext("2d");
const data = [];
var dis;
var backup = []; 

function ball(p,color,number) {
    view.beginPath();
    view.arc(p[0], p[1], 20, 0, 2 * Math.PI);
    view.fillStyle = ''+color+'';
    view.fill();
    view.beginPath();
    view.fillStyle = 'black';
    view.fillText(number+1, p[0], p[1]);
}

function letras(p,d) {
    
    view.beginPath();
    view.fillStyle = 'black';
    view.font = "12px Georgia";
    view.fillText(Math.round(d), p[0], p[1]+20); 
    
}

function call(p,index) {
        // console.log(p,index);
        ball(p,'red',index);
        save_cordenates(p,index);
}

function line(p1,p2) {
    // console.log('p1 '+p1)
    view.beginPath();
    view.moveTo(p1[0],p1[1]);
    view.lineTo(p2[0],p2[1]);
    view.stroke();
}

function generate_points() {
    function genereate_pointX() {
        return Math.round((Math.random()*300)+50);
    }
    function genereate_pointY() {
        return Math.round((Math.random()*900)+50);
    }
    return [genereate_pointY(),genereate_pointX()];
}



function save_cordenates(p,number) {
    data[number] = p;
}

function ponto_reta(p1,p2,p) {
    let a;
    let y;

    a = (p2[1]-p1[1])/(p2[0]-p1[0]);
    y = (a*p)-(a*p1[0])+p1[1];
    
    return y;
}


// data.forEach(value => {
//     var td = document.createElement("tr");
//     value.forEach(element => {
//         var node = document.createElement("td"); 
//         var textnode = document.createTextNode(element);         
//         node.appendChild(textnode);
//         td.appendChild(node);                             
//         document.getElementById("linha").appendChild(td); 
//     });
// });

function draw_point() {
    array.forEach(function (element,key) {
        element.forEach(function(element2,key2){
            if(element2==1 && (key != key2)){ 
                line(data[key],data[key2]);
                // line(aresta(data[key],data[key2],20),aresta(data[key2],data[key],20));
            
                aresta(data[key],data[key2],20);
                // aresta_line(data[key],data[key2],20,data[key2],data[key]);
                
            }
        });
    });
}

// setInterval(function () {
//     var p = aresta(data[0],data[1]);
//     points(data[0],data[1],'green')
//     data[0] = p[0];
//     data[1] = p[1];
// },10)



function aresta(p1,p2,dis) {
    if(dist(p1,p2)==0){
        return;
    }
    if(p1[0] > p2[0]){
        let y = ponto_reta(p1,p2,p1[0]-1);
        let x = p1[0]-1;
        var arrayA = [x,y];
    }else{
        let y = ponto_reta(p1,p2,p1[0]+1);
        let x = p1[0]+1;
        var arrayA = [x,y];
    }
    var d = dist(arrayA,p2);
    if(d <= dis){
        return points(arrayA,'green');
    }else{ 
        aresta(arrayA,p2,dis);
    }
}




function points(p,color) {
    view.beginPath();
    view.arc(p[0],p[1], 5, 0, 2 * Math.PI);
    view.fillStyle = ''+color+'';
    view.fill();
}


function dist(p1,p2){
    var x = p2[0] - p1[0];
    var y = p2[1] - p1[1];
    return Math.sqrt((x*x)+(y*y));
}

function percorre() {
    array.forEach(function(element){
        intervalo(element);
    });

    function intervalo(params) {
        let cont = 0;
        
        let start = setInterval(function() {
        if (params[cont] == 1) {
            ball(data[cont],'yellow',cont);
        }    
            
        (cont == array.length)? clearInterval(start):cont+=1;
        }, 1000);
    }
}//percorre o grafo

function escreve_distancia() {
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
                        let d = dist(data[key],data[key2]);
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

    function adiciona_matriz_controle(key,key2) {
        matriz_controle[key][key2] = 1;
        matriz_controle[key2][key] = 1;
    }//adiciona os vetores ja conectados na matriz controle

    
}

function cria_matriz_de_distancias() {
    let matriz = [];
    for (let index = 0; index < array.length; index++) {
        let vetor = [];
        for (let i = 0; i < array.length; i++) {
            vetor.push(0);
        }
        matriz[index] = vetor;
    }
    return matriz;
}//cria matriz para poder colocar as distancias para usar em dijstra

function preenche_matriz_dis(matriz) {
    array.forEach(function(element,key) {
        element.forEach(function(value,key2) {
            if (value == 1) {
                matriz[key][key2] = Math.round(dist(data[key],data[key2]));
            }
        });
    });
    return matriz;
}

function fleury(array,dis) {//matriz adijacencia e matriz de caminhos
    let dist = [];

    vertice_impar(array).forEach(element => {
        // let vetor = dijkstra_distancias(element);
        let vetor = acessa_distancias_dj(dijkstra(0),element,dis);
        dist.push(vetor); 
    });
    
    // distancias(1,dijkstra(0));
    // let vetor_distancias = (menor_caminho(vertice_impar(),dist))
    // console.log(menor_caminho(vertice_impar(),dist))
    menor_caminho(vertice_impar(array),dist)
    return;
    // console.log(soma_das_distancias(vetor_distancias,dijkstra(0),array))
    // vetor_distancias = adiciona_distancias_vetor(vetor_distancias,array);
    
    // console.log(calcula_vetor_menor_distancia(vetor_distancias));

    function matriz_distancias_aux(vetor,array_para_criar_matriz) {
        let matriz = cria_matriz(array_para_criar_matriz);
        matriz.forEach(function(element,key) {
            matriz.forEach(function(value,key2) {
                
            });
        });
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
    function vertice_impar(array) {
        let mat = [];
        array.forEach(function(element,key) {
            let cont=0;
            element.forEach(function(value,key2) {
                if (value == 1 && key != key2) {
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
    console.log(vetor_distancia);
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
function vertices() {
    view.clearRect(0, 0, canvas.width, canvas.height);
    if (busca() > 5 || busca() < 0) {
        return;
    }
// console.log(busca());


var a = new Ghaph(busca()); 
array = a.array();

// let matriz = cria_matriz_de_distancias();
// preenche_matriz_dis(matriz);
// console.log(matriz);

for (let index = 0; index < array.length; index++) {

    gen(generate_points(),index)

    function gen(p,index) {
        if (data[0]==undefined) {
            return call(p,index);
        }
        if(dist(data[0],p) <= 400 || dist(data[0],p) == undefined)
        {
            call(p,index)
        }else
        {
            gen(generate_points(),index);
        }
    }
}//delimita a distancia entre os pontos
// console.log(data)

tipo_de_grafo();
draw_point();
// percorre();
escreve_distancia();
let matriz = cria_matriz_de_distancias();
dis = preenche_matriz_dis(matriz); //distacia de todos os pontos



(acessa_distancias_dj(dijkstra(0),1,dis))
fleury(array,dis);
// console.log(dijkstra_distancias(1));
// console.log(dijkstra_distancias(2));
    function busca(params) {
        return document.getElementById('vertices').value;
    }

}

















