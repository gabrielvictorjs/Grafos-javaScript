


function generate_point() {
    var x = Math.round(Math.random()*1000);
    var y = Math.round(Math.random()*400);
    return [x,y];
}

function call(p1,p2) {
    line(p1,p2)
    points(p1,p2,'red');
    points(p2,p1,'blue');
    
    
}


function ponto_reta(p1,p2,p) {

    let a,b;
    let y;
    a = (p2[1]-p1[1])/(p2[0]-p1[0]);

    y = (a*p)-(a*p1[0])+p1[1];
    return y;
}

function teste(p1,p2,p) {
    // console.log(p)
    let a,b;
    let y;
    a = (p2[1]-p1[1])/(p2[0]-p1[0]);
    b = p1[1] - (a*p1[0]);
    y = (a*p) + b;
    return b;
}


var c = document.getElementById("canvas");
var view = c.getContext("2d");

function line(p1,p2) {
    view.beginPath();
    view.moveTo(p1[0],p1[1]);
    view.lineTo(p2[0],p2[1]);   
    view.stroke(); 
}
function points(p1,p2,color) {
    view.beginPath();
    view.arc(p1[0]*1,ponto_reta(p1,p2,p1[0]*1), 5, 0, 2 * Math.PI);
    view.fillStyle = ''+color+'';
    view.fill();
}

// view.beginPath();
// view.arc(100*0.9, ponto_reta([50,50],[100,100],100*0.9), 5, 0, 2 * Math.PI);
// view.fillStyle = 'red';
// view.fill();




function aresta(p1,p2,dis) {
    if(p1[0] > p2[0]){
        let y = ponto_reta(p1,p2,p1[0]-1);
        let x = p1[0]-1;
        var array = [x,y];
    }else{
        let y = ponto_reta(p1,p2,p1[0]+1);
        let x = p1[0]+1;
        var array = [x,y];
    }
    var d = dist(array,p2);
    (d <= dis)? points(array,p2,'green') : aresta(array,p2,dis);
}



var data = [];
data[0] = generate_point();
data[1] = generate_point();
console.log(data);
call(data[0],data[1]);
aresta(data[0],data[1],20)
aresta(data[1],data[0],20)



function dist(p1,p2){
    var x = p2[0] - p1[0];
    var y = p2[1] - p1[1];
    return Math.sqrt((x*x)+(y*y));
}





