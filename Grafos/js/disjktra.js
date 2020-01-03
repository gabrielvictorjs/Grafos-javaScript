

var array = 
[
    [0,1,1,0,0],
    [1,0,1,1,0],
    [1,1,0,0,1],
    [0,1,0,0,1],
    [0,0,1,1,0],
]

var dis =
[
    [0,2,3,0,0],
    [2,0,5,6,0],
    [3,5,0,0,3],
    [0,6,0,0,4],
    [0,0,3,4,0],
]

var array2 = [];
array2[0] = []; 

dijkstra(0);
   

function dijkstra(pos) {
    let disTotal =0;
    let dist = [];
    let posicao_controle = [];
    let array_controle = gera_array_de_controle(array);
    // console.log(menor(pegar_distancias(adj_vetor(pos),pos)));
    console.log(loop(pos));
    function loop(pos) {
        // let res =  (pegar_distancias(adj_vetor(pos),pos));
        // disTotal += res[1];
        novo_array(pos,dist);
        if (array_controle.length == 0) {
            console.log(dist)
            return;
        }
        loop(posicao_controle[0]);
    }
    function adj_vetor(pos) {
        return array[pos];
    }
    function pegar_distancias(vetor,pos) {
        let data = [];
        vetor.forEach(function(element,key) {
            if (element == 1) {
                data.push([key,dis[pos][key]])
            }
        });
        return data;
    }
    
    function menor(vetor) {
        let menor = 10000;
        let pos;
        vetor.forEach(function(element,key){
            if (element[1] < menor) {
                menor = element[1];
                pos = element;
            } 
        });
        return pos; 
    }
    function novo_array(pos,array_de_distancias) {
        console.log(pos);
        let array = (pegar_distancias(adj_vetor(pos),pos));    
        let array_final = [];

        array = reorganizar_array(array,array_controle);

        array_de_distancias.forEach(function(element) {
            array.push(element);
        });

        let min = menor(array);

        array.forEach(function(element) {
            if (element[1] != min[1]) {
                array_final.push(element);
            }else{
                posicao_controle = element;
            }
        });
        array_controle = elimina_elemento_controle(array_controle,pos);
        return array_final;
    }

    function gera_array_de_controle(array) {
        let vetor = [];
        for (let index = 0; index < array.length; index++) {
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

}