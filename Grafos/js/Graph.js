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

function vertices() {
    view.clearRect(0, 0, canvas.width, canvas.height);
    if (busca() > 5 || busca() < 0) {
        return;
    }
console.log(busca());


var a = new Ghaph(busca()); 
array = a.array();


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


    function busca(params) {
        return document.getElementById('vertices').value;
    }

}

















