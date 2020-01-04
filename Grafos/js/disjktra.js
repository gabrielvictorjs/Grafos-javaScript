

var array = 
[
    [0,1,1,0,0,0],
    [1,0,1,1,0,0],
    [1,1,0,1,1,0],
    [0,1,1,0,1,1],
    [0,0,1,1,0,1],
    [0,0,0,1,1,0],
    
]

var dis =
[
    [0,4,2,0,0,0],
    [4,0,1,5,0,0],
    [2,1,0,8,10,0],
    [0,5,8,0,2,6],
    [0,0,10,2,0,2],
    [0,0,0,6,2,0],
    
]

var array2 = [];
array2[0] = []; 

dijkstra(0);
   

function dijkstra(pos) {
    let disTotal =0;
    let mantrizFinal = gera_matriz_final();
    let dist = [];//armazena os pontos visitados
    let posicao_controle = [];
    let array_controle = gera_array_de_controle(array);

    console.log(loop(pos));
    function loop(pos) {
        // let res =  (pegar_distancias(adj_vetor(pos),pos));
        // disTotal += res[1];
        
        if (array_controle.length == 1) {
            console.log(mantrizFinal)
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
            }else{
                posicao_controle = element;
                // console.log(posicao_controle)
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